
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ExperienceSection {
  id: string;
  section_name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useExperienceSections = () => {
  // Fetch experience section ID
  const { data: sections, isLoading: isSectionsLoading } = useQuery({
    queryKey: ['experienceSections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('section_name', 'experience');
      
      if (error) throw error;
      
      // If no experience section exists, create one
      if (!data || data.length === 0) {
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
    sections,
    isSectionsLoading
  };
};
