
import { supabase } from '@/integrations/supabase/client';
import { initializeResumeData } from './initializeResumeData';
import { forceInitExperience } from './forceInitExperience';
import { toast } from 'sonner';

/**
 * Utility to diagnose and fix database issues
 */
export const fixDatabaseIssues = async (): Promise<boolean> => {
  try {
    console.log('Checking for database issues...');
    
    // Test database connection first
    const { data, error } = await supabase.from('resume_sections').select('count').limit(1);
    
    if (error) {
      console.error('Database connection error:', error);
      toast.error(`Database connection issue: ${error.message}`);
      return false;
    }
    
    console.log('Database connection successful, attempting to initialize resume data...');
    
    // Force initialize resume data with all sections
    const initResult = await initializeResumeData({ force: true });
    
    if (!initResult.success) {
      console.error('Failed to initialize resume data:', initResult.message);
      toast.error(`Initialization failed: ${initResult.message}`);
      return false;
    }
    
    // Ensure experience data is created
    console.log('Forcing experience data initialization...');
    const experienceResult = await forceInitExperience();
    
    if (!experienceResult.initialized) {
      console.log('Experience initialization status:', experienceResult.message);
    } else {
      console.log('Experience data initialized successfully');
    }
    
    // Double check that data exists now
    const { data: sections, error: sectionsError } = await supabase
      .from('resume_sections')
      .select('*');
      
    if (sectionsError) {
      console.error('Error checking sections after initialization:', sectionsError);
      return false;
    }
    
    if (!sections || sections.length === 0) {
      console.error('No resume sections found after initialization');
      toast.error('Database initialization failed - no sections created');
      return false;
    }
    
    console.log(`Found ${sections.length} resume sections after initialization`);
    toast.success(`Database fixed successfully! Created ${sections.length} resume sections.`);
    return true;
  } catch (error) {
    console.error('Error fixing database issues:', error);
    toast.error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};
