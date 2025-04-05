
import { supabase } from '@/integrations/supabase/client';
import { initializeProfile } from './initializeProfile';
import { initializeResumeSections } from './initializeResumeSections';
import { populateSectionItems } from './populateSectionItems';
import { createPortfolioProjects } from './initializePortfolioProjects';

/**
 * Initialize resume data with real content that matches the website
 */
export const initializeResumeData = async (): Promise<{ success: boolean }> => {
  console.log('Initializing real resume data...');
  
  try {
    // Check if resume sections already exist
    const { count: sectionCount, error: countError } = await supabase
      .from('resume_sections')
      .select('*', { count: 'exact', head: true });
      
    if (countError) {
      console.error('Error checking resume sections count:', countError);
      throw countError;
    }
    
    console.log(`Found ${sectionCount} resume sections`);
    
    // Initialize profile if it doesn't exist
    await initializeProfile();

    // Initialize resume sections if they don't exist
    const sections = await initializeResumeSections();

    // Populate section items if they don't exist
    for (const section of sections) {
      // Check if section already has items
      const { count, error } = await supabase
        .from('resume_items')
        .select('*', { count: 'exact', head: true })
        .eq('section_id', section.id);
      
      if (error && error.code !== 'PGRST116') {
        console.log('Error checking item count:', error);
      }
      
      const itemCount = count || 0;
      console.log(`Section ${section.section_name} has ${itemCount} items`);
      
      if (itemCount === 0) {
        console.log(`Populating items for section ${section.section_name}`);
        // Pass both sectionId and sectionName as arguments
        await populateSectionItems(section.id, section.section_name);
      }
    }

    // Initialize portfolio projects if they don't exist
    const { count: projectCount, error: projectError } = await supabase
      .from('portfolio_projects')
      .select('*', { count: 'exact', head: true });
      
    if (projectError) {
      console.error('Error checking portfolio projects count:', projectError);
      throw projectError;
    }
    
    console.log(`Found ${projectCount} portfolio projects`);
    
    if (projectCount === 0) {
      console.log('No portfolio projects found, creating them');
      await createPortfolioProjects();
    }

    return { success: true };
  } catch (error) {
    console.error('Error in initializeResumeData:', error);
    throw error;
  }
};
