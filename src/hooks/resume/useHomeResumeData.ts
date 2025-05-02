
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch resume data for the Home page
 */
export const useHomeResumeData = () => {
  return useQuery({
    queryKey: ['resumeSections', 'home'],
    queryFn: async () => {
      console.log('Fetching resume sections data for Home page');
      
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
        
        // Instead of throwing an error for empty sections, return an empty array
        // This allows the page to render with fallback data in the components
        if (!sections || sections.length === 0) {
          console.warn('No resume sections found in database, will use fallback data');
          return [];
        }
        
        console.log('Fetched sections for Home:', sections.length);
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
          console.log(`Fetching items for section ${section.section_name}`);
          
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
          
          const itemCount = items?.length || 0;
          console.log(`Found ${itemCount} items for section ${section.section_name}`);
          
          // Log experience items for debugging
          if (section.section_name === 'experience' && items && items.length > 0) {
            console.log('Experience section items:', items.length);
            console.log('First experience item:', items[0]);
          }
          
          return {
            ...section,
            items: items || []
          };
        }));
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error fetching resume sections:', error);
        // Return empty array instead of throwing to allow fallback data in components
        return [];
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 3
  });
};
