-- Remove duplicate portfolio projects (keep only the first 6 by display_order)
DELETE FROM portfolio_projects 
WHERE id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY display_order, created_at) as rn
    FROM portfolio_projects
  ) ranked 
  WHERE rn <= 6
);