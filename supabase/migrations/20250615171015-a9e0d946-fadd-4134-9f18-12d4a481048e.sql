
-- Security Fixes Migration (v5)
-- This migration performs a full cleanup of conflicting RLS policies
-- before establishing a single, secure source of truth for admin checks.

-- Step 1: Aggressively drop ALL legacy and conflicting policies on blog_posts.
DROP POLICY IF EXISTS "Admins can create blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "secure_blog_posts_select_all" ON public.blog_posts;
DROP POLICY IF EXISTS "secure_blog_posts_insert_admin" ON public.blog_posts;
DROP POLICY IF EXISTS "secure_blog_posts_update_admin" ON public.blog_posts;
DROP POLICY IF EXISTS "secure_blog_posts_delete_admin" ON public.blog_posts;
DROP POLICY IF EXISTS "secure_blog_posts_manage_admin" ON public.blog_posts;

-- Step 2: Aggressively drop ALL legacy and conflicting policies on blog_comments.
DROP POLICY IF EXISTS "Anyone can view approved comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Admins can update comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Admins and comment authors can delete comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Anyone can create comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Admins can update any comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Admins can delete any comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.blog_comments;
DROP POLICY IF EXISTS "secure_comments_select_approved" ON public.blog_comments;
DROP POLICY IF EXISTS "secure_comments_insert_auth" ON public.blog_comments;
DROP POLICY IF EXISTS "secure_comments_update_admin" ON public.blog_comments;
DROP POLICY IF EXISTS "secure_comments_update_own" ON public.blog_comments;
DROP POLICY IF EXISTS "secure_comments_delete_admin" ON public.blog_comments;
DROP POLICY IF EXISTS "secure_comments_delete_own" ON public.blog_comments;
DROP POLICY IF EXISTS "secure_comments_select_approved_or_admin" ON public.blog_comments;
DROP POLICY IF EXISTS "secure_comments_delete_admin_or_own" ON public.blog_comments;

-- Step 3: Replace the core admin checking function to ensure it's up to date.
CREATE OR REPLACE FUNCTION public.check_admin_status(user_id uuid DEFAULT auth.uid())
RETURNS boolean LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF user_id IS NULL THEN RETURN false; END IF;
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id AND is_admin = true);
END;
$$;

-- Step 4: Recreate a single, definitive set of policies for blog_posts.
CREATE POLICY "secure_blog_posts_select_all" ON public.blog_posts FOR SELECT TO public USING (true);
CREATE POLICY "secure_blog_posts_manage_admin" ON public.blog_posts FOR ALL TO authenticated USING (public.check_admin_status(auth.uid())) WITH CHECK (public.check_admin_status(auth.uid()));

-- Step 5: Recreate a single, definitive set of policies for blog_comments.
CREATE POLICY "secure_comments_select_approved_or_admin" ON public.blog_comments FOR SELECT TO public USING (approved = true OR public.check_admin_status(auth.uid()));
CREATE POLICY "secure_comments_insert_auth" ON public.blog_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "secure_comments_update_admin" ON public.blog_comments FOR UPDATE TO authenticated USING (public.check_admin_status(auth.uid()));
CREATE POLICY "secure_comments_delete_admin_or_own" ON public.blog_comments FOR DELETE TO authenticated USING (public.check_admin_status(auth.uid()) OR auth.uid() = user_id);

-- Step 6: Now that all policy dependencies are updated, safely clean up old functions.
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.is_user_admin(uuid);
DROP FUNCTION IF EXISTS public.is_admin();

-- Step 7: Standardize user creation and sync logic.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, is_admin)
  VALUES (
    new.id, COALESCE(new.raw_user_meta_data->>'full_name', new.email), new.email,
    new.email IN ('mike@mikemacri.com', 'mike@gmail.com')
  );
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION public.sync_missing_profiles()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE auth_user RECORD;
BEGIN
  FOR auth_user IN SELECT au.id, au.email FROM auth.users au LEFT JOIN public.profiles p ON p.id = au.id WHERE p.id IS NULL LOOP
    INSERT INTO public.profiles (id, username, full_name, is_admin)
    VALUES (auth_user.id, auth_user.email, COALESCE(auth_user.email, 'New User'), auth_user.email IN ('mike@mikemacri.com', 'mike@gmail.com'));
  END LOOP;
END;
$$;

-- Step 8: Run sync to ensure data consistency.
SELECT sync_missing_profiles();
