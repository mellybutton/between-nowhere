/**
 * Hook for checking whether the current user is an admin.
 * Reads from public.user_roles via RLS (users can read their own rows).
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./auth-context";

export function useIsAdmin() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["is-admin", user?.id ?? "anon"],
    enabled: !!user,
    queryFn: async (): Promise<boolean> => {
      if (!user) return false;
      const { data, error } = await supabase
        .from("user_roles" as never)
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) return false;
      return !!data;
    },
  });
}
