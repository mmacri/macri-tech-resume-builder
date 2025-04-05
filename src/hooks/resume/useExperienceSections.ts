
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ResumeSection {
  id: string;
  section_name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useExperienceSections = () => {
  // Get experience section ID
  const { data, isLoading, error } = useQuery({
    queryKey: ['experienceSection'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('section_name', 'experience');
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        // Create experience section if it doesn't exist
        const { data: newSection, error: createError } = await supabase
          .from('resume_sections')
          .insert({ section_name: 'experience', display_order: 2 })
          .select()
          .single();
        
        if (createError) throw createError;
        return [newSection];
      }
      
      return data;
    }
  });

  return {
    sections: data, // Return sections directly 
    isLoading,
    error
  };
};
