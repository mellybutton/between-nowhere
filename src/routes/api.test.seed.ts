/**
 * TEST-ONLY seeding endpoint.
 *
 * Creates (or reuses) a known user and pre-marks concepts as completed so
 * automated tests can jump directly to a stage transition without clicking
 * through every preceding concept.
 *
 * Security model — this route is hard-gated by TWO checks. Both must pass:
 *
 *   1. The `TEST_SEED_TOKEN` runtime secret MUST be set on the server.
 *      If absent, the endpoint always returns 404 (no leak that it exists).
 *   2. The caller MUST send `x-test-seed-token: <same value>` on the request.
 *      Compared with timing-safe equals.
 *
 * Production deployments should leave `TEST_SEED_TOKEN` unset. Set it ONLY
 * in test/preview environments where you're running Playwright/integration
 * tests against the real backend.
 *
 * Request body (POST JSON):
 *   {
 *     "email": "test-user@example.test",      // required, must end in .test or .example
 *     "password": "...",                       // required, ≥8 chars
 *     "completeConceptIds"?: string[],         // explicit concept ids to mark complete
 *     "completeStages"?: Stage[],              // OR mark all concepts in these stages complete
 *     "reset"?: boolean                        // wipe this user's concept_progress first
 *   }
 *
 * Returns:
 *   { userId, email, completed: string[], accessToken, refreshToken }
 */
import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { learnFlowConcepts, type LearnConcept } from "@/data/learnFlow";

const STAGES = [
  "intuition",
  "infrastructure",
  "coordination",
  "equipment",
  "advanced",
] as const satisfies readonly LearnConcept["stage"][];

const BodySchema = z
  .object({
    // Constrain test emails to throwaway TLDs so we can't accidentally
    // overwrite a real user.
    email: z
      .string()
      .email()
      .max(254)
      .refine(
        (e) => /\.(test|example)$/i.test(e.split("@")[1] ?? ""),
        "Test emails must end in .test or .example",
      ),
    password: z.string().min(8).max(128),
    completeConceptIds: z.array(z.string().min(1).max(64)).max(200).optional(),
    completeStages: z.array(z.enum(STAGES)).max(STAGES.length).optional(),
    reset: z.boolean().optional(),
  })
  .refine(
    (b) =>
      (b.completeConceptIds && b.completeConceptIds.length > 0) ||
      (b.completeStages && b.completeStages.length > 0) ||
      b.reset === true,
    "Provide completeConceptIds, completeStages, or reset:true",
  );

function notFound() {
  // 404 instead of 401/403 so the endpoint is invisible when disabled.
  return new Response("Not found", { status: 404 });
}

function constantTimeMatch(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export const Route = createFileRoute("/api/test/seed")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env.TEST_SEED_TOKEN;
        if (!expected) return notFound();

        const provided = request.headers.get("x-test-seed-token");
        if (!provided || !constantTimeMatch(expected, provided)) {
          return notFound();
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = BodySchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", issues: parsed.error.issues },
            { status: 400 },
          );
        }
        const body = parsed.data;

        // 1. Find or create the user.
        // listUsers + filter is fine for the small test-user count we expect.
        const { data: existingList, error: listErr } =
          await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
        if (listErr) {
          return Response.json(
            { error: "Failed to look up users", detail: listErr.message },
            { status: 500 },
          );
        }
        let userId = existingList.users.find(
          (u) => u.email?.toLowerCase() === body.email.toLowerCase(),
        )?.id;

        if (!userId) {
          const { data: created, error: createErr } =
            await supabaseAdmin.auth.admin.createUser({
              email: body.email,
              password: body.password,
              email_confirm: true,
            });
          if (createErr || !created.user) {
            return Response.json(
              {
                error: "Failed to create user",
                detail: createErr?.message ?? "unknown",
              },
              { status: 500 },
            );
          }
          userId = created.user.id;
        } else {
          // Reset password so tests using a fresh password still work.
          await supabaseAdmin.auth.admin.updateUserById(userId, {
            password: body.password,
          });
        }

        // 2. Optionally wipe existing progress for a clean slate.
        if (body.reset) {
          const { error: delErr } = await supabaseAdmin
            .from("concept_progress")
            .delete()
            .eq("user_id", userId);
          if (delErr) {
            return Response.json(
              { error: "Failed to reset progress", detail: delErr.message },
              { status: 500 },
            );
          }
        }

        // 3. Resolve the set of concept ids to mark completed.
        const explicit = new Set(body.completeConceptIds ?? []);
        const fromStages = new Set<string>();
        if (body.completeStages?.length) {
          for (const c of learnFlowConcepts) {
            if (body.completeStages.includes(c.stage)) fromStages.add(c.id);
          }
        }
        const targetIds = Array.from(new Set([...explicit, ...fromStages]));

        // Validate explicit ids actually exist in the flow.
        const knownIds = new Set(learnFlowConcepts.map((c) => c.id));
        const unknown = [...explicit].filter((id) => !knownIds.has(id));
        if (unknown.length) {
          return Response.json(
            { error: "Unknown concept ids", unknown },
            { status: 400 },
          );
        }

        // 4. Upsert completion rows.
        let completed: string[] = [];
        if (targetIds.length) {
          const now = new Date().toISOString();
          const rows = targetIds.map((conceptId) => ({
            user_id: userId,
            concept_id: conceptId,
            status: "completed" as const,
            attempts: 1,
            was_correct_first_try: true,
            completed_at: now,
          }));
          const { error: upsertErr } = await supabaseAdmin
            .from("concept_progress")
            .upsert(rows, { onConflict: "user_id,concept_id" });
          if (upsertErr) {
            return Response.json(
              { error: "Failed to upsert progress", detail: upsertErr.message },
              { status: 500 },
            );
          }
          completed = targetIds;
        }

        // 5. Issue a session the test client can use directly.
        const { data: session, error: signInErr } =
          await supabaseAdmin.auth.signInWithPassword({
            email: body.email,
            password: body.password,
          });
        if (signInErr || !session.session) {
          return Response.json(
            {
              error: "User seeded but sign-in failed",
              detail: signInErr?.message ?? "no session",
            },
            { status: 500 },
          );
        }

        return Response.json({
          userId,
          email: body.email,
          completed,
          accessToken: session.session.access_token,
          refreshToken: session.session.refresh_token,
        });
      },
    },
  },
});
