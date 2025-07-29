-- Fix Function Search Path Mutable issues by adding SET search_path TO 'public'

-- Update check_admin_status function
CREATE OR REPLACE FUNCTION public.check_admin_status(user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF user_id IS NULL THEN RETURN false; END IF;
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id AND is_admin = true);
END;
$function$;

-- Update sync_missing_profiles function
CREATE OR REPLACE FUNCTION public.sync_missing_profiles()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE auth_user RECORD;
BEGIN
  FOR auth_user IN SELECT au.id, au.email FROM auth.users au LEFT JOIN public.profiles p ON p.id = au.id WHERE p.id IS NULL LOOP
    INSERT INTO public.profiles (id, username, full_name, is_admin)
    VALUES (auth_user.id, auth_user.email, COALESCE(auth_user.email, 'New User'), auth_user.email IN ('mike@mikemacri.com', 'mike@gmail.com'));
  END LOOP;
END;
$function$;

-- Update approve_comments function
CREATE OR REPLACE FUNCTION public.approve_comments(comment_ids uuid[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    UPDATE public.blog_comments
    SET approved = true
    WHERE id = ANY(comment_ids);
END;
$function$;

-- Update promote_user function
CREATE OR REPLACE FUNCTION public.promote_user(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    UPDATE public.profiles
    SET is_admin = true
    WHERE id = user_id;
END;
$function$;

-- Update get_blog_analytics function
CREATE OR REPLACE FUNCTION public.get_blog_analytics()
 RETURNS TABLE(total_posts integer, total_comments integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        (SELECT COUNT(*) FROM public.blog_posts) AS total_posts,
        (SELECT COUNT(*) FROM public.blog_comments) AS total_comments;
END;
$function$;