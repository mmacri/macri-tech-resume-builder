-- Force initialize the database with actual resume data
-- First, clean up any existing data
DELETE FROM resume_items;
DELETE FROM resume_sections;

-- Create sections
INSERT INTO resume_sections (section_name, display_order) VALUES 
  ('about', 1),
  ('experience', 2),
  ('education', 3),
  ('skills', 4),
  ('interests', 5),
  ('awards', 6);

-- Get section IDs for data insertion
-- Note: We'll need to run separate inserts after this to populate the items