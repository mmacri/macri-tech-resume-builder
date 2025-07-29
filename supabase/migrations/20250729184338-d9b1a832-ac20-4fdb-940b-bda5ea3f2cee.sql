-- Remove duplicate portfolio projects
DELETE FROM portfolio_projects 
WHERE id IN (
  SELECT id FROM (
    SELECT id, 
           ROW_NUMBER() OVER (PARTITION BY title, display_order ORDER BY created_at ASC) as rn
    FROM portfolio_projects
  ) t 
  WHERE t.rn > 1
);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_display_order ON portfolio_projects(display_order);
CREATE INDEX IF NOT EXISTS idx_resume_sections_name ON resume_sections(section_name);
CREATE INDEX IF NOT EXISTS idx_resume_items_section_display ON resume_items(section_id, display_order);