
-- Tighten public INSERT policy with content checks
DROP POLICY "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a valid lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(trim(name)) BETWEEN 1 AND 200
    AND char_length(trim(email)) BETWEEN 3 AND 320
    AND char_length(trim(message)) BETWEEN 1 AND 5000
  );

-- Lock down has_role: only the database engine / our policies need it
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;
-- Policies invoke has_role through SECURITY DEFINER; they don't need a runtime EXECUTE grant on the caller.
