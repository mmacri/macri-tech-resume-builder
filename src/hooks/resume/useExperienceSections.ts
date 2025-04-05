
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
      console.log('Fetching experience section');
      
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('section_name', 'experience');
      
      if (error) {
        console.error('Error fetching experience section:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('No experience section found, creating one');
        // Create experience section if it doesn't exist
        const { data: newSection, error: createError } = await supabase
          .from('resume_sections')
          .insert({ section_name: 'experience', display_order: 2 })
          .select()
          .single();
        
        if (createError) {
          console.error('Error creating experience section:', createError);
          throw createError;
        }
        return [newSection];
      }
      
      console.log('Found experience section:', data);
      return data;
    },
    staleTime: 5000 // 5 seconds before considering data stale
  });

  return {
    sections: data || [], // Ensure we never return undefined
    isLoading,
    error
  };
};
