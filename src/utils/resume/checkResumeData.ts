
import { supabase } from '@/integrations/supabase/client';

export interface ResumeCheckResult {
  success: boolean;
  sections?: any[];
  hasItems?: boolean;
  error?: any;
  message?: string;
}

export interface ExperienceCheckResult {
  success: boolean;
  items?: any[];
  error?: any;
  message?: string;
}

/**
 * Checks if resume sections exist in the database
 */
export const checkResumeSections = async (): Promise<ResumeCheckResult> => {
  try {
    console.log('Checking resume sections...');
    const { data: sections, error } = await supabase
      .from('resume_sections')
      .select('*')
      .order('display_order', { ascending: true });
      
    if (error) {
      return { 
        success: false, 
        error,
        message: `Error checking resume sections: ${error.message}`
      };
    }
    
    if (!sections || sections.length === 0) {
      return { 
        success: true, 
        sections: [],
        hasItems: false,
        message: 'No resume sections found'
      };
    }
    
    // Check if any section has items
    let hasItems = false;
    for (const section of sections) {
      const { count, error: countError } = await supabase
        .from('resume_items')
        .select('*', { count: 'exact', head: true })
        .eq('section_id', section.id);
        
      if (countError) {
        console.error(`Error checking items for section ${section.section_name}:`, countError);
        continue;
      }
      
      if ((count || 0) > 0) {
        hasItems = true;
        break;
      }
    }
    
    return {
      success: true,
      sections,
      hasItems,
      message: `Found ${sections.length} sections, ${hasItems ? 'with' : 'without'} items`
    };
  } catch (error) {
    console.error('Error in checkResumeSections:', error);
    return {
      success: false,
      error,
      message: `Error checking resume sections: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

/**
 * Specifically checks for experience items in the database
 */
export const checkExperienceItems = async (): Promise<ExperienceCheckResult> => {
  try {
    console.log('Checking experience items...');
    
    // Find the experience section first
    const { data: experienceSection, error: sectionError } = await supabase
      .from('resume_sections')
      .select('id')
      .ilike('section_name', 'experience')
      .maybeSingle();
      
    if (sectionError) {
      return {
        success: false,
        error: sectionError,
        message: `Error finding experience section: ${sectionError.message}`
      };
    }
    
    if (!experienceSection) {
      return {
        success: true,
        items: [],
        message: 'No experience section found'
      };
    }
    
    // Now get the items in the experience section
    const { data: items, error: itemsError } = await supabase
      .from('resume_items')
      .select('*')
      .eq('section_id', experienceSection.id)
      .order('display_order', { ascending: true });
      
    if (itemsError) {
      return {
        success: false,
        error: itemsError,
        message: `Error fetching experience items: ${itemsError.message}`
      };
    }
    
    return {
      success: true,
      items: items || [],
      message: `Found ${items?.length || 0} experience items`
    };
  } catch (error) {
    console.error('Error in checkExperienceItems:', error);
    return {
      success: false,
      error,
      message: `Error checking experience items: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
