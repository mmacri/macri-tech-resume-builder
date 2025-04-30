
import { supabase } from '@/integrations/supabase/client';
import { initializeResumeData } from './initializeResumeData';
import { createExperienceData } from './experienceData';
import { toast } from 'sonner';

/**
 * Utility to diagnose and fix common database issues
 */
export const diagnoseDatabaseIssues = async (): Promise<{ 
  success: boolean; 
  issues: string[];
  fixes: string[];
}> => {
  const issues: string[] = [];
  const fixes: string[] = [];
  
  try {
    console.log('Running database diagnostics...');
    
    // Check for resume sections
    const { data: sections, error: sectionError } = await supabase
      .from('resume_sections')
      .select('*');
      
    if (sectionError) {
      issues.push(`Database connection error: ${sectionError.message}`);
      console.error('Database connection error:', sectionError);
      return { success: false, issues, fixes };
    }
    
    if (!sections || sections.length === 0) {
      issues.push('Missing resume sections');
      console.log('No resume sections found - will attempt to fix');
      
      try {
        const result = await initializeResumeData({ force: true });
        if (result.success) {
          fixes.push('Created resume sections structure');
          console.log('Successfully created resume sections');
        } else {
          issues.push(`Failed to create resume sections: ${result.message}`);
          console.error('Failed to create resume sections:', result.message);
        }
      } catch (initError) {
        issues.push(`Error initializing data: ${initError instanceof Error ? initError.message : 'Unknown error'}`);
        console.error('Error initializing data:', initError);
      }
    } else {
      console.log(`Found ${sections.length} resume sections`);
      
      // Check sections for missing items
      for (const section of sections) {
        const { count, error: countError } = await supabase
          .from('resume_items')
          .select('*', { count: 'exact', head: true })
          .eq('section_id', section.id);
          
        if (countError) {
          issues.push(`Error checking items for section ${section.section_name}: ${countError.message}`);
          console.error(`Error checking items for section ${section.section_name}:`, countError);
          continue;
        }
        
        if ((count || 0) === 0) {
          issues.push(`Section "${section.section_name}" has no items`);
          console.log(`Section ${section.section_name} has no items - will attempt to fix`);
          
          if (section.section_name === 'experience') {
            try {
              await createExperienceData(section.id);
              fixes.push(`Added items to "${section.section_name}" section`);
              console.log(`Successfully added items to ${section.section_name} section`);
            } catch (dataError) {
              issues.push(`Failed to add items to "${section.section_name}" section: ${dataError instanceof Error ? dataError.message : 'Unknown error'}`);
              console.error(`Failed to add items to ${section.section_name} section:`, dataError);
            }
          }
        } else {
          console.log(`Section ${section.section_name} has ${count} items`);
        }
      }
    }
    
    return {
      success: issues.length === 0 || fixes.length > 0,
      issues,
      fixes
    };
  } catch (error) {
    console.error('Error diagnosing database issues:', error);
    issues.push(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false, issues, fixes };
  }
};

/**
 * Fix common database issues
 */
export const fixDatabaseIssues = async (): Promise<boolean> => {
  try {
    const diagnosis = await diagnoseDatabaseIssues();
    
    if (diagnosis.issues.length === 0) {
      toast.success('No database issues detected');
      return true;
    }
    
    // Display issues
    for (const issue of diagnosis.issues) {
      toast.error(`Issue: ${issue}`);
    }
    
    // Report fixes
    for (const fix of diagnosis.fixes) {
      toast.success(`Fixed: ${fix}`);
    }
    
    // If fixes were applied, run another check to make sure everything is fixed
    if (diagnosis.fixes.length > 0) {
      console.log('Fixes applied, running second diagnostic check...');
      
      try {
        // Force initialize all resume data
        const initResult = await initializeResumeData({ force: true });
        if (initResult.success) {
          toast.success('Successfully initialized all resume data');
          return true;
        } else {
          toast.error(`Failed to initialize data: ${initResult.message}`);
          return false;
        }
      } catch (error) {
        toast.error(`Error during fix: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return false;
      }
    }
    
    return diagnosis.success;
  } catch (error) {
    console.error('Error fixing database issues:', error);
    toast.error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};
