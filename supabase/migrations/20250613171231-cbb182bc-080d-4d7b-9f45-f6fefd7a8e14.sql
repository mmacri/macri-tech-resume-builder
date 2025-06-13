
-- First, clean up existing policies more thoroughly
DO $$ 
BEGIN
    -- Drop policies for profiles table
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
    
    -- Drop policies for blog_posts table
    DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
    DROP POLICY IF EXISTS "Admins can create blog posts" ON public.blog_posts;
    DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
    DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;
    
    -- Drop policies for blog_comments table
    DROP POLICY IF EXISTS "Anyone can view approved comments" ON public.blog_comments;
    DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.blog_comments;
    DROP POLICY IF EXISTS "Admins can update any comments" ON public.blog_comments;
    DROP POLICY IF EXISTS "Users can update their own comments" ON public.blog_comments;
    DROP POLICY IF EXISTS "Admins can delete any comments" ON public.blog_comments;
    DROP POLICY IF EXISTS "Users can delete their own comments" ON public.blog_comments;
    
    -- Drop policies for portfolio_projects table
    DROP POLICY IF EXISTS "Anyone can view portfolio projects" ON public.portfolio_projects;
    DROP POLICY IF EXISTS "Admins can manage portfolio projects" ON public.portfolio_projects;
    
    -- Drop policies for resume_sections table
    DROP POLICY IF EXISTS "Anyone can view resume sections" ON public.resume_sections;
    DROP POLICY IF EXISTS "Admins can manage resume sections" ON public.resume_sections;
    
    -- Drop policies for resume_items table
    DROP POLICY IF EXISTS "Anyone can view resume items" ON public.resume_items;
    DROP POLICY IF EXISTS "Admins can manage resume items" ON public.resume_items;
    
EXCEPTION WHEN OTHERS THEN
    -- Continue if policies don't exist
    NULL;
END $$;

-- Create the secure admin checking function
CREATE OR REPLACE FUNCTION public.check_admin_status(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_email text;
  admin_status boolean := false;
BEGIN
  IF user_id IS NULL THEN
    RETURN false;
  END IF;
  
  SELECT email INTO user_email 
  FROM auth.users
  WHERE id = user_id;
  
  IF user_email = 'mike@mikemacri.com' OR user_email = 'mike@gmail.com' THEN
    INSERT INTO profiles (id, username, full_name, is_admin)
    VALUES (user_id, user_email, 'Mike Macri, M.B.A.', true)
    ON CONFLICT (id) DO UPDATE SET is_admin = true;
    RETURN true;
  END IF;
  
  SELECT COALESCE(is_admin, false) INTO admin_status
  FROM profiles 
  WHERE id = user_id;
  
  RETURN admin_status;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_items ENABLE ROW LEVEL SECURITY;

-- Create new secure RLS policies
CREATE POLICY "secure_profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "secure_profiles_select_admin" ON public.profiles FOR SELECT TO authenticated USING (public.check_admin_status(auth.uid()));
CREATE POLICY "secure_profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "secure_profiles_update_admin" ON public.profiles FOR UPDATE TO authenticated USING (public.check_admin_status(auth.uid()));
CREATE POLICY "secure_profiles_insert_admin" ON public.profiles FOR INSERT TO authenticated WITH CHECK (public.check_admin_status(auth.uid()));
CREATE POLICY "secure_profiles_delete_admin" ON public.profiles FOR DELETE TO authenticated USING (public.check_admin_status(auth.uid()));

CREATE POLICY "secure_blog_posts_select_all" ON public.blog_posts FOR SELECT TO public USING (true);
CREATE POLICY "secure_blog_posts_insert_admin" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.check_admin_status(auth.uid()));
CREATE POLICY "secure_blog_posts_update_admin" ON public.blog_posts FOR UPDATE TO authenticated USING (public.check_admin_status(auth.uid()));
CREATE POLICY "secure_blog_posts_delete_admin" ON public.blog_posts FOR DELETE TO authenticated USING (public.check_admin_status(auth.uid()));

CREATE POLICY "secure_comments_select_approved" ON public.blog_comments FOR SELECT TO public USING (approved = true OR public.check_admin_status(auth.uid()));
CREATE POLICY "secure_comments_insert_auth" ON public.blog_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "secure_comments_update_admin" ON public.blog_comments FOR UPDATE TO authenticated USING (public.check_admin_status(auth.uid()));
CREATE POLICY "secure_comments_update_own" ON public.blog_comments FOR UPDATE TO authenticated USING (auth.uid() = user_id AND NOT approved);
CREATE POLICY "secure_comments_delete_admin" ON public.blog_comments FOR DELETE TO authenticated USING (public.check_admin_status(auth.uid()));
CREATE POLICY "secure_comments_delete_own" ON public.blog_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "secure_portfolio_select_all" ON public.portfolio_projects FOR SELECT TO public USING (true);
CREATE POLICY "secure_portfolio_manage_admin" ON public.portfolio_projects FOR ALL TO authenticated USING (public.check_admin_status(auth.uid())) WITH CHECK (public.check_admin_status(auth.uid()));

CREATE POLICY "secure_resume_sections_select_all" ON public.resume_sections FOR SELECT TO public USING (true);
CREATE POLICY "secure_resume_sections_manage_admin" ON public.resume_sections FOR ALL TO authenticated USING (public.check_admin_status(auth.uid())) WITH CHECK (public.check_admin_status(auth.uid()));

CREATE POLICY "secure_resume_items_select_all" ON public.resume_items FOR SELECT TO public USING (true);
CREATE POLICY "secure_resume_items_manage_admin" ON public.resume_items FOR ALL TO authenticated USING (public.check_admin_status(auth.uid())) WITH CHECK (public.check_admin_status(auth.uid()));

-- Add foreign key constraints if they don't exist
DO $$ 
BEGIN
    ALTER TABLE public.resume_items 
    ADD CONSTRAINT fk_resume_items_section_id 
    FOREIGN KEY (section_id) REFERENCES public.resume_sections(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ 
BEGIN
    ALTER TABLE public.blog_comments 
    ADD CONSTRAINT fk_blog_comments_post_id 
    FOREIGN KEY (post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;
