-- Remove the overly permissive public read policy that exposes user data
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;

-- Ensure we have proper policies for secure access
-- (These should already exist, but we'll recreate them to be safe)

-- Policy for users to view their own profile
CREATE POLICY IF NOT EXISTS "secure_profiles_select_own" ON public.profiles
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Policy for admins to view all profiles (using the existing check_admin_status function)
CREATE POLICY IF NOT EXISTS "secure_profiles_select_admin" ON public.profiles
FOR SELECT 
TO authenticated
USING (check_admin_status(auth.uid()));

-- Add a comment to document the security fix
COMMENT ON TABLE public.profiles IS 'User profiles table with secure RLS policies - only authenticated users can view their own profile, admins can view all profiles';