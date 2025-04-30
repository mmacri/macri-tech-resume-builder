
import { supabase } from '@/integrations/supabase/client';

export const checkResumeSections = async () => {
  try {
    // Check if resume sections exist
    const { data: sections, error: sectionsError } = await supabase
      .from('resume_sections')
      .select('*')
      .order('display_order', { ascending: true });
      
    if (sectionsError) {
      console.error('Error checking resume sections:', sectionsError);
      return { success: false, error: sectionsError, sections: [] };
    }
    
    console.log('Resume sections check result:', sections);
    
    if (!sections || sections.length === 0) {
      console.warn('No resume sections found in the database');
      return { success: false, error: null, sections: [] };
    }
    
    // Check items for each section
    const sectionsWithItemCounts = await Promise.all(
      sections.map(async (section) => {
        const { data: items, error: itemsError } = await supabase
          .from('resume_items')
          .select('id')
          .eq('section_id', section.id);
          
        if (itemsError) {
          console.error(`Error counting items for section ${section.section_name}:`, itemsError);
          return { ...section, itemCount: 0 };
        }
        
        return { ...section, itemCount: items?.length || 0 };
      })
    );
    
    console.log('Sections with item counts:', sectionsWithItemCounts);
    
    return { 
      success: true, 
      error: null, 
      sections: sectionsWithItemCounts,
      hasItems: sectionsWithItemCounts.some(s => s.itemCount > 0)
    };
  } catch (error) {
    console.error('Error in checkResumeSections:', error);
    return { success: false, error, sections: [] };
  }
};

export const checkExperienceItems = async () => {
  try {
    // First, get the experience section ID
    const { data: experienceSection, error: sectionError } = await supabase
      .from('resume_sections')
      .select('*')
      .ilike('section_name', 'experience')
      .maybeSingle();
      
    if (sectionError) {
      console.error('Error fetching experience section:', sectionError);
      return { success: false, error: sectionError, items: [] };
    }
    
    if (!experienceSection) {
      console.warn('Experience section not found');
      return { success: false, error: null, items: [] };
    }
    
    // Now, get all experience items
    const { data: items, error: itemsError } = await supabase
      .from('resume_items')
      .select('*')
      .eq('section_id', experienceSection.id)
      .order('display_order', { ascending: true });
      
    if (itemsError) {
      console.error('Error fetching experience items:', itemsError);
      return { success: false, error: itemsError, items: [] };
    }
    
    console.log('Experience items check result:', items);
    
    return { 
      success: true, 
      error: null, 
      items: items || [],
      sectionId: experienceSection.id
    };
  } catch (error) {
    console.error('Error in checkExperienceItems:', error);
    return { success: false, error, items: [] };
  }
};
