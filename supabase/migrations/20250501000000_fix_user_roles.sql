
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
    UPDATE public.profiles
    SET is_admin = true
    WHERE id = (SELECT id FROM public.profiles ORDER BY created_at ASC LIMIT 1);
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
