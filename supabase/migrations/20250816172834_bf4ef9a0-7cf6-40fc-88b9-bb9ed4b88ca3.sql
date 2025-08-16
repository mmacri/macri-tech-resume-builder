-- Fix critical security vulnerability: Remove public access to profiles table
-- This prevents exposure of email addresses and admin status to unauthorized users

-- Drop the overly permissive policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Drop any other potentially problematic public policies
DROP POLICY IF EXISTS "Allow public to view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public read access" ON public.profiles;

-- Ensure we have proper secure policies in place:

-- 1. Admins can view all profiles (for user management)
DROP POLICY IF EXISTS "secure_profiles_select_admin" ON public.profiles;
CREATE POLICY "secure_profiles_select_admin" ON public.profiles
FOR SELECT 
TO authenticated
USING (check_admin_status(auth.uid()));

-- 2. Users can view their own profile only
DROP POLICY IF EXISTS "secure_profiles_select_own" ON public.profiles;
CREATE POLICY "secure_profiles_select_own" ON public.profiles
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- 3. Admins can update any profile (for user management)
DROP POLICY IF EXISTS "secure_profiles_update_admin" ON public.profiles;
CREATE POLICY "secure_profiles_update_admin" ON public.profiles
FOR UPDATE 
TO authenticated
USING (check_admin_status(auth.uid()));

-- 4. Users can update their own profile
DROP POLICY IF EXISTS "secure_profiles_update_own" ON public.profiles;
CREATE POLICY "secure_profiles_update_own" ON public.profiles
FOR UPDATE 
TO authenticated
USING (auth.uid() = id);

-- 5. Only admins can delete profiles
DROP POLICY IF EXISTS "secure_profiles_delete_admin" ON public.profiles;
CREATE POLICY "secure_profiles_delete_admin" ON public.profiles
FOR DELETE 
TO authenticated
USING (check_admin_status(auth.uid()));

-- 6. Only admins can insert new profiles
DROP POLICY IF EXISTS "secure_profiles_insert_admin" ON public.profiles;
CREATE POLICY "secure_profiles_insert_admin" ON public.profiles
FOR INSERT 
TO authenticated
WITH CHECK (check_admin_status(auth.uid()));

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add security documentation
COMMENT ON TABLE public.profiles IS 'User profiles - Access restricted to authenticated users only. Users can view/edit own profile, admins can manage all profiles. Public access removed for security.';

-- Verify current policies (for security audit trail)
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'profiles' AND schemaname = 'public'
ORDER BY policyname;