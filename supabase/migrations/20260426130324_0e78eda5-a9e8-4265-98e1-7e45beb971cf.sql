-- ============================================================
-- 1. Roles infrastructure (separate from profiles to prevent
--    privilege-escalation attacks).
-- ============================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security-definer role check (bypasses RLS, no recursion).
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Only admins can view, insert, or modify roles.
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow each user to read their *own* role rows so the client can
-- check "am I an admin?" without admin privileges.
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- 2. Learn funnel events
-- ============================================================
CREATE TABLE public.learn_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id uuid NOT NULL,
  event_name text NOT NULL,
  concept_id text,
  stage text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.learn_events ENABLE ROW LEVEL SECURITY;

-- Users can write their own events.
CREATE POLICY "Users can insert their own learn events"
  ON public.learn_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own events.
CREATE POLICY "Users can view their own learn events"
  ON public.learn_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can read everyone's events for funnel analysis.
CREATE POLICY "Admins can view all learn events"
  ON public.learn_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Indexes for the funnel dashboard queries.
CREATE INDEX idx_learn_events_event_name ON public.learn_events (event_name);
CREATE INDEX idx_learn_events_created_at ON public.learn_events (created_at DESC);
CREATE INDEX idx_learn_events_concept_id ON public.learn_events (concept_id);
CREATE INDEX idx_learn_events_user_id ON public.learn_events (user_id);
CREATE INDEX idx_learn_events_session_id ON public.learn_events (session_id);
