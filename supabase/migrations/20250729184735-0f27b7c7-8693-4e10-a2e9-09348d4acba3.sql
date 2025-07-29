-- Fix remaining functions with search path issues

-- Update update_timestamp function
CREATE OR REPLACE FUNCTION public.update_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Update view_all_users function  
CREATE OR REPLACE FUNCTION public.view_all_users()
 RETURNS TABLE(id uuid, username text, full_name text, is_admin boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
BEGIN
    RETURN QUERY SELECT profiles.id, profiles.username, profiles.full_name, profiles.is_admin FROM public.profiles;
END;
$function$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, is_admin)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.email), 
    new.email,
    new.email IN ('mike@mikemacri.com', 'mike@gmail.com')
  );
  RETURN new;
END;
$function$;