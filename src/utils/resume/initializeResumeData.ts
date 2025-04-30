
import { supabase } from '@/integrations/supabase/client';
import { initializeProfile } from './initializeProfile';
import { initializeResumeSections } from './initializeResumeSections';
import { populateSectionItems } from './populateSectionItems';
import { createPortfolioProjects } from './initializePortfolioProjects';
import { InitializeDataOptions } from '@/hooks/resume/useInitializeResumeData';

/**
 * Initialize resume data with real content that matches the website
 */
export const initializeResumeData = async (options: InitializeDataOptions = {}): Promise<{ success: boolean, message?: string }> => {
  console.log('Initializing real resume data with options:', options);
  
  try {
    // Initial variable to track profile creation success
    let profileId;
    
    try {
      // Initialize profile if it doesn't exist
      console.log('Initializing profile...');
      profileId = await initializeProfile();
      console.log('Profile initialized successfully:', profileId);
    } catch (profileError) {
      console.error('Error initializing profile:', profileError);
      // Continue even if profile creation fails - we'll try to work with existing data
      console.log('Continuing with resume initialization despite profile error');
    }

    // Check if resume sections already exist
    const { data: existingSections, error: sectionsError } = await supabase
      .from('resume_sections')
      .select('*')
      .order('display_order', { ascending: true });
      
    if (sectionsError) {
      console.error('Error checking for existing resume sections:', sectionsError);
      return { success: false, message: `Error checking sections: ${sectionsError.message}` };
    }
    
    const sectionCount = existingSections?.length || 0;
    console.log(`Found ${sectionCount} resume sections`);
    
    // If force option is true, delete existing data
    if (options.force && sectionCount > 0) {
      console.log('Force option is true, deleting existing data...');
      
      try {
        // Delete all resume items first (due to foreign key constraints)
        const { error: deleteItemsError } = await supabase
          .from('resume_items')
          .delete()
          .is('id', 'not.null'); // Delete all items
          
        if (deleteItemsError) {
          console.error('Error deleting resume items:', deleteItemsError);
          return { success: false, message: `Error deleting items: ${deleteItemsError.message}` };
        }
        
        // Then delete all resume sections
        const { error: deleteSectionsError } = await supabase
          .from('resume_sections')
          .delete()
          .is('id', 'not.null'); // Delete all sections
          
        if (deleteSectionsError) {
          console.error('Error deleting resume sections:', deleteSectionsError);
          return { success: false, message: `Error deleting sections: ${deleteSectionsError.message}` };
        }
        
        console.log('Successfully deleted existing data');
      } catch (deleteError) {
        console.error('Error in deletion process:', deleteError);
        return { success: false, message: `Error in deletion process: ${deleteError instanceof Error ? deleteError.message : 'Unknown error'}` };
      }
    }

    // Initialize or get existing resume sections
    let sections = existingSections || [];
    
    if (sectionCount === 0) {
      try {
        console.log('No sections found, initializing resume sections...');
        sections = await initializeResumeSections();
        console.log('Initialized sections:', sections);
        
        if (!sections || sections.length === 0) {
          throw new Error('Failed to create resume sections');
        }
      } catch (sectionsError) {
        console.error('Error initializing resume sections:', sectionsError);
        return { success: false, message: `Error initializing sections: ${sectionsError instanceof Error ? sectionsError.message : 'Unknown error'}` };
      }
    }

    // Populate section items if they don't exist or if force option is true
    try {
      console.log('Starting to populate section items...');
      for (const section of sections) {
        // Check if section already has items
        const { count, error } = await supabase
          .from('resume_items')
          .select('*', { count: 'exact', head: true })
          .eq('section_id', section.id);
        
        if (error) {
          console.error(`Error checking item count for section ${section.section_name}:`, error);
          continue;
        }
        
        const itemCount = count || 0;
        console.log(`Section ${section.section_name} has ${itemCount} items`);
        
        if (itemCount === 0 || options.force) {
          console.log(`Populating items for section ${section.section_name} (${section.id})`);
          // Pass both sectionId and sectionName as arguments
          try {
            await populateSectionItems(section.id, section.section_name);
            console.log(`Successfully populated ${section.section_name} items`);
          } catch (populateError) {
            console.error(`Error populating items for section ${section.section_name}:`, populateError);
            // Continue with other sections even if one fails
          }
        }
      }
      console.log('Finished populating all section items');
    } catch (itemsError) {
      console.error('Error populating section items:', itemsError);
      return { success: false, message: `Error populating items: ${itemsError instanceof Error ? itemsError.message : 'Unknown error'}` };
    }

    // Initialize portfolio projects if they don't exist
    try {
      console.log('Checking portfolio projects...');
      const { count: projectCount, error: projectError } = await supabase
        .from('portfolio_projects')
        .select('*', { count: 'exact', head: true });
        
      if (projectError) {
        console.error('Error checking portfolio projects count:', projectError);
        return { success: false, message: `Error checking projects: ${projectError.message}` };
      }
      
      console.log(`Found ${projectCount} portfolio projects`);
      
      if (projectCount === 0 || options.force) {
        console.log('No portfolio projects found or force option is true, creating them');
        await createPortfolioProjects();
        console.log('Portfolio projects created successfully');
      }
    } catch (projectsError) {
      console.error('Error initializing portfolio projects:', projectsError);
      return { success: false, message: `Error initializing projects: ${projectsError instanceof Error ? projectsError.message : 'Unknown error'}` };
    }

    // Verify that experience items were actually created
    try {
      const { data: experienceSection } = await supabase
        .from('resume_sections')
        .select('id')
        .eq('section_name', 'experience')
        .maybeSingle();
        
      if (experienceSection) {
        const { count: expItemCount, error: expCountError } = await supabase
          .from('resume_items')
          .select('*', { count: 'exact', head: true })
          .eq('section_id', experienceSection.id);
          
        if (expCountError) {
          console.error('Error counting experience items:', expCountError);
        } else {
          console.log(`Verified experience items count: ${expItemCount || 0}`);
          
          // If still no experience items, try to create them directly
          if ((expItemCount || 0) === 0) {
            console.log('No experience items after initialization, creating them directly...');
            const { createExperienceData } = await import('./experienceData');
            await createExperienceData(experienceSection.id);
            console.log('Directly created experience items');
          }
        }
      }
    } catch (verifyError) {
      console.error('Error verifying experience items:', verifyError);
    }

    return { success: true, message: "Resume data initialized successfully!" };
  } catch (error) {
    console.error('Error in initializeResumeData:', error);
    return { 
      success: false, 
      message: `Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
