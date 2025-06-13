
-- Fix the role errors and admin checking functions
-- First, clean up any broken role references
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.is_user_admin(uuid);

-- Recreate the admin checking functions with proper logic
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
    -- Update their profile to reflect admin status if it exists
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

-- Create the legacy function for backward compatibility
CREATE OR REPLACE FUNCTION public.is_user_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN public.is_admin(user_id);
END;
$$;

-- Ensure the sync function works properly
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

-- Add RLS policies for blog_posts if they don't exist
DO $$
BEGIN
  -- Enable RLS on blog_posts
  ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
  
  -- Create policies for blog_posts
  CREATE POLICY "Anyone can view blog posts" 
    ON public.blog_posts 
    FOR SELECT 
    TO public 
    USING (true);
    
  CREATE POLICY "Admins can create blog posts" 
    ON public.blog_posts 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (public.is_admin(auth.uid()));
    
  CREATE POLICY "Admins can update blog posts" 
    ON public.blog_posts 
    FOR UPDATE 
    TO authenticated 
    USING (public.is_admin(auth.uid()));
    
  CREATE POLICY "Admins can delete blog posts" 
    ON public.blog_posts 
    FOR DELETE 
    TO authenticated 
    USING (public.is_admin(auth.uid()));
    
EXCEPTION
  WHEN duplicate_object THEN
    -- Policies already exist, skip
    NULL;
END $$;

-- Add RLS policies for blog_comments if they don't exist
DO $$
BEGIN
  -- Enable RLS on blog_comments
  ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
  
  -- Create policies for blog_comments
  CREATE POLICY "Anyone can view approved comments" 
    ON public.blog_comments 
    FOR SELECT 
    TO public 
    USING (approved = true OR public.is_admin(auth.uid()));
    
  CREATE POLICY "Anyone can create comments" 
    ON public.blog_comments 
    FOR INSERT 
    TO public 
    WITH CHECK (true);
    
  CREATE POLICY "Admins can update comments" 
    ON public.blog_comments 
    FOR UPDATE 
    TO authenticated 
    USING (public.is_admin(auth.uid()));
    
  CREATE POLICY "Admins and comment authors can delete comments" 
    ON public.blog_comments 
    FOR DELETE 
    TO authenticated 
    USING (public.is_admin(auth.uid()) OR auth.uid() = user_id);
    
EXCEPTION
  WHEN duplicate_object THEN
    -- Policies already exist, skip
    NULL;
END $$;
