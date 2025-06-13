
-- Fix the admin role checks and ensure proper user roles
-- This migration addresses the role errors in the logs

-- First, let's make sure the profiles table has proper constraints
ALTER TABLE public.profiles 
ALTER COLUMN is_admin SET DEFAULT false;

-- Update the is_admin function to be more robust
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_email text;
  admin_status boolean := false;
BEGIN
  -- Return false if no user_id provided
  IF user_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Get the user's email from auth.users
  SELECT email INTO user_email 
  FROM auth.users
  WHERE id = user_id;
  
  -- Check if user is a known admin by email (hardcoded admins)
  IF user_email = 'mike@mikemacri.com' OR user_email = 'mike@gmail.com' THEN
    -- Update their profile to reflect admin status
    UPDATE profiles 
    SET is_admin = true 
    WHERE id = user_id;
    
    RETURN true;
  END IF;
  
  -- Check the profiles table for admin status
  SELECT COALESCE(is_admin, false) INTO admin_status
  FROM profiles 
  WHERE id = user_id;
  
  RETURN admin_status;
EXCEPTION
  WHEN OTHERS THEN
    -- Return false on any error
    RETURN false;
END;
$$;

-- Update the sync_missing_profiles function to handle the role properly
CREATE OR REPLACE FUNCTION public.sync_missing_profiles()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  auth_user RECORD;
BEGIN
  -- Loop through auth.users that don't have a profile yet
  FOR auth_user IN 
    SELECT au.id, au.email
    FROM auth.users au
    LEFT JOIN public.profiles p ON p.id = au.id
    WHERE p.id IS NULL
  LOOP
    -- Create profile with admin check based on known emails
    INSERT INTO public.profiles (
      id, 
      username, 
      full_name, 
      is_admin
    ) VALUES (
      auth_user.id, 
      auth_user.email, 
      COALESCE(auth_user.email, 'New User'), 
      -- Set admin based on email
      auth_user.email = 'mike@mikemacri.com' OR auth_user.email = 'mike@gmail.com'
    );
  END LOOP;
  
  -- Ensure there's at least one admin user
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE is_admin = true) THEN
    -- Find the first user and make them admin
    UPDATE public.profiles 
    SET is_admin = true 
    WHERE id = (
      SELECT id FROM public.profiles 
      ORDER BY created_at ASC 
      LIMIT 1
    );
  END IF;
END;
$$;

-- Run the sync function to ensure profiles are created
SELECT sync_missing_profiles();
