-- Ensure contact_messages table has proper RLS policies
-- First, let's review and clean up any existing policies

-- Drop any overly permissive policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON public.contact_messages;
DROP POLICY IF EXISTS "Public read access" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can read contact messages" ON public.contact_messages;

-- Ensure we have the correct policies for contact messages security

-- Policy 1: Only admins can view contact messages (SELECT)
DROP POLICY IF EXISTS "Admins can view all contact messages" ON public.contact_messages;
CREATE POLICY "secure_contact_messages_select_admin_only" ON public.contact_messages
FOR SELECT 
TO authenticated
USING (check_admin_status(auth.uid()));

-- Policy 2: Anyone can submit contact messages (INSERT) - this is correct for a contact form
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "secure_contact_messages_insert_public" ON public.contact_messages
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Add comment documenting the security model
COMMENT ON TABLE public.contact_messages IS 'Contact form messages - INSERT open to public for form submissions, SELECT restricted to admins only for privacy';

-- Verify no other policies allow unauthorized access
-- List current policies (for verification in logs)
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'contact_messages' AND schemaname = 'public';