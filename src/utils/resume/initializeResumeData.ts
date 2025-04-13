
import { supabase } from '@/integrations/supabase/client';
import { initializeProfile } from './initializeProfile';
import { initializeResumeSections } from './initializeResumeSections';
import { populateSectionItems } from './populateSectionItems';
import { createPortfolioProjects } from './initializePortfolioProjects';
import { InitializeDataOptions } from '@/hooks/resume/useInitializeResumeData';

/**
 * Initialize resume data with real content that matches the website
 */
export const initializeResumeData = async (options: InitializeDataOptions = {}): Promise<{ success: boolean }> => {
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
    
    // If force option is true, delete existing data
    if (options.force && sectionCount > 0) {
      console.log('Force option is true, deleting existing data...');
      
      // Delete all resume items first (due to foreign key constraints)
      const { error: deleteItemsError } = await supabase
        .from('resume_items')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all items
        
      if (deleteItemsError) {
        console.error('Error deleting resume items:', deleteItemsError);
        throw deleteItemsError;
      }
      
      // Then delete all resume sections
      const { error: deleteSectionsError } = await supabase
        .from('resume_sections')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all sections
        
      if (deleteSectionsError) {
        console.error('Error deleting resume sections:', deleteSectionsError);
        throw deleteSectionsError;
      }
    }
    
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
      
      if (itemCount === 0 || options.force) {
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
    
    if (projectCount === 0 || options.force) {
      console.log('No portfolio projects found or force option is true, creating them');
      await createPortfolioProjects();
    }

    return { success: true };
  } catch (error) {
    console.error('Error in initializeResumeData:', error);
    throw error;
  }
};
