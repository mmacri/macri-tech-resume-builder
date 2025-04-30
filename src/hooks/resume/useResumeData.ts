
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useResumeData = () => {
  return useQuery({
    queryKey: ['downloadResumeData'],
    queryFn: async () => {
      console.log('Fetching resume data for download');
      
      try {
        // Get all sections
        const { data: sections, error: sectionsError } = await supabase
          .from('resume_sections')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (sectionsError) {
          console.error('Error fetching sections:', sectionsError);
          throw sectionsError;
        }
        
        if (!sections || sections.length === 0) {
          console.log('No resume sections found in database');
          return [];
        }
        
        // Log the sections we got 
        console.log(`Found ${sections.length} resume sections`);
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
          try {
            const { data: items, error: itemsError } = await supabase
              .from('resume_items')
              .select('*')
              .eq('section_id', section.id)
              .order('display_order', { ascending: true });
            
            if (itemsError) {
              console.error(`Error fetching items for section ${section.section_name}:`, itemsError);
              return {
                ...section,
                items: []
              };
            }
            
            return {
              ...section,
              items: items || []
            };
          } catch (error) {
            console.error(`Error processing section ${section.section_name}:`, error);
            return {
              ...section,
              items: []
            };
          }
        }));
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error in download resume data query:', error);
        // Instead of returning empty array, let it throw so we can catch in the UI
        throw error;
      }
    },
    staleTime: 30000, // 30 seconds
    retry: 2,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error('Resume data fetch error:', error);
      toast.error('Failed to fetch resume data. Using fallback data instead.');
    }
  });
};
