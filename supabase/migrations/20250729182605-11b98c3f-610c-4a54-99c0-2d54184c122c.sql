-- Insert missing interests data into resume_items
INSERT INTO resume_items (title, description, section_id, display_order) 
VALUES 
  ('Interest Paragraph', 'Outside of my professional work, I stay current with advancements in AI, automation, and cloud computing—exploring practical applications that solve complex problems.', 
   (SELECT id FROM resume_sections WHERE section_name = 'interests'), 1),
  ('Interest Paragraph', 'I also enjoy traveling between my homes in Washington, California, and Illinois, with outdoor activities like hiking and fishing to recharge.', 
   (SELECT id FROM resume_sections WHERE section_name = 'interests'), 2),
  ('Interest Paragraph', 'Indoors, I pursue photography, AI-powered content projects, and innovative investing in crypto and global stock markets.', 
   (SELECT id FROM resume_sections WHERE section_name = 'interests'), 3);

-- Create Contact page
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contact messages
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages" ON contact_messages
  FOR SELECT USING (check_admin_status(auth.uid()));

-- Add update trigger for contact_messages
CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();