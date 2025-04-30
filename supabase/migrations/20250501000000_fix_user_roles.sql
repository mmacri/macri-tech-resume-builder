
-- Fix the sync_missing_profiles function to handle roles correctly
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
    -- Create profile with simplified admin check (based on known email)
    INSERT INTO public.profiles (
      id, 
      username, 
      full_name, 
      is_admin
    ) VALUES (
      auth_user.id, 
      auth_user.email, 
      coalesce(auth_user.email, 'New User'), 
      -- Set admin based on email for simplicity
      auth_user.email = 'mike@mikemacri.com' OR auth_user.email = 'mike@gmail.com'
    );
  END LOOP;
  
  -- Ensure there's at least one admin user
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE is_admin = true) THEN
    -- Create a default profile with admin privileges if none exists
    INSERT INTO public.profiles (
      id,
      username,
      full_name,
      is_admin
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      'admin@example.com',
      'Default Admin',
      true
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
END;
$$;

-- Fix the handle_new_user function that creates profiles on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    username, 
    is_admin
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    -- Make the users with these emails admins by default
    new.email = 'mike@mikemacri.com' OR new.email = 'mike@gmail.com'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the is_admin function to have a simpler implementation
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = user_id AND is_admin = true
  );
END;
$$;

-- Create a trigger for the handle_new_user function if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END
$$;

-- Run the sync_missing_profiles function to create any missing profiles
SELECT sync_missing_profiles();

-- Initialize resume sections if they don't exist
DO $$
BEGIN
  -- Check if resume sections exist
  IF NOT EXISTS (SELECT 1 FROM public.resume_sections LIMIT 1) THEN
    -- Insert basic resume sections
    INSERT INTO public.resume_sections (section_name, display_order)
    VALUES 
      ('about', 1),
      ('experience', 2),
      ('education', 3),
      ('skills', 4),
      ('interests', 5),
      ('awards', 6)
    ON CONFLICT DO NOTHING;

    RAISE NOTICE 'Resume sections initialized';
  END IF;
END
$$;
