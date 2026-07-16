
-- ============================================================
-- ROLES
-- ============================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  service_interest TEXT,
  contacted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat TEXT NOT NULL,
  description TEXT NOT NULL,
  quote TEXT NOT NULL,
  attribution TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published testimonials"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert testimonials"
  ON public.testimonials FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
