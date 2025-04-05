
import { supabase } from '@/integrations/supabase/client';
import { initializeProfile } from './initializeProfile';
import { initializeResumeSections } from './initializeResumeSections';
import { populateSectionItems } from './populateSectionItems';
import { createPortfolioProjects } from './initializePortfolioProjects';

export const initializeResumeData = async (): Promise<{ success: boolean }> => {
  console.log('Initializing real resume data...');
  
  try {
    // Initialize profile
    await initializeProfile();

    // Initialize resume sections
    const sections = await initializeResumeSections();

    // Populate section items
    for (const section of sections) {
      // Check if section already has items
      const { count, error } = await supabase
        .from('resume_items')
        .select('count')
        .eq('section_id', section.id)
        .single() || { count: 0, error: null };
      
      if (error && error.code !== 'PGRST116') {
        console.log('Error checking item count:', error);
      }
      
      const itemCount = count || 0;
      console.log(`Section ${section.section_name} has ${itemCount} items`);
      
      if (itemCount === 0) {
        await populateSectionItems(section.id, section.section_name);
      }
    }

    // Initialize portfolio projects if they don't exist
    const { count: projectCount } = await supabase
      .from('portfolio_projects')
      .select('count')
      .single() || { count: 0 };
    
    if (projectCount === 0) {
      await createPortfolioProjects();
    }

    return { success: true };
  } catch (error) {
    console.error('Error in initializeResumeData:', error);
    throw error;
  }
};
