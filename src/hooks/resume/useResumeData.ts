
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Hook for fetching resume data for the Resume page
 */
export const useResumeData = () => {
  return useQuery({
    queryKey: ['resumeSections', 'resume'],
    queryFn: async () => {
      console.log('Fetching resume sections data for Resume page');
      
      try {
        // Fetch sections with items in a single efficient query using Supabase joins
        const { data: sections, error: sectionsError } = await supabase
          .from('resume_sections')
          .select(`
            id,
            section_name,
            display_order,
            resume_items (
              id,
              title,
              description,
              organization,
              location,
              start_date,
              end_date,
              display_order
            )
          `)
          .order('display_order', { ascending: true });
        
        if (sectionsError) {
          console.error('Error fetching sections:', sectionsError);
          throw sectionsError;
        }
        
        if (!sections || sections.length === 0) {
          console.warn('No resume sections found in database');
          return [];
        }
        
        // Transform and sort the data
        const formattedSections = sections.map(section => ({
          ...section,
          items: (section.resume_items || []).sort((a: any, b: any) => a.display_order - b.display_order)
        }));
        
        console.log(`Fetched sections for Resume page: ${formattedSections.length}`);
        
        // Log the experience section data specifically for debugging
        const experienceSection = formattedSections.find(s => s.section_name === 'experience');
        if (experienceSection) {
          console.log('Experience section found with', experienceSection.items?.length || 0, 'items');
          if (experienceSection.items && experienceSection.items.length > 0) {
            console.log('First experience item:', experienceSection.items[0]);
          }
        }
        
        return formattedSections;
      } catch (error) {
        console.error('Error in resume sections query:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 3
  });
};
