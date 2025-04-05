
import { supabase } from '@/integrations/supabase/client';

/**
 * Creates resume section if it doesn't exist
 */
export const initializeResumeSections = async () => {
  const sections = [
    { section_name: 'about', display_order: 1 },
    { section_name: 'experience', display_order: 2 },
    { section_name: 'education', display_order: 3 },
    { section_name: 'skills', display_order: 4 },
    { section_name: 'interests', display_order: 5 },
    { section_name: 'awards', display_order: 6 }
  ];

  const createdSections = [];

  for (const section of sections) {
    const { data: existingSection } = await supabase
      .from('resume_sections')
      .select('*')
      .eq('section_name', section.section_name)
      .single();

    if (!existingSection) {
      console.log(`Creating ${section.section_name} section`);
      const { data: newSection, error } = await supabase
        .from('resume_sections')
        .insert(section)
        .select()
        .single();
      
      if (error) {
        console.error(`Error creating ${section.section_name} section:`, error);
        throw error;
      }
      
      createdSections.push(newSection);
    } else {
      createdSections.push(existingSection);
    }
  }
  
  return createdSections;
};
