
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
        // Get all sections
        const { data: sections, error: sectionsError } = await supabase
          .from('resume_sections')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (sectionsError) {
          console.error('Error fetching sections:', sectionsError);
          throw sectionsError;
        }
        
        // If no sections found, return empty array
        if (!sections || sections.length === 0) {
          console.warn('No resume sections found in database');
          return [];
        }
        
        console.log('Fetched sections for Resume page:', sections.length);
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
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
          
          console.log(`Found ${items?.length || 0} items for section ${section.section_name}`);
          
          return {
            ...section,
            items: items || []
          };
        }));
        
        // Log the experience section data specifically for debugging
        const experienceSection = sectionsWithItems.find(s => s.section_name === 'experience');
        if (experienceSection) {
          console.log('Experience section found with', experienceSection.items?.length || 0, 'items');
          if (experienceSection.items && experienceSection.items.length > 0) {
            console.log('First experience item:', experienceSection.items[0]);
          } else {
            console.warn('No experience items found in experience section');
          }
        } else {
          console.warn('No experience section found');
        }
        
        // Check if any sections actually have items
        const hasItems = sectionsWithItems.some(section => 
          section.items && section.items.length > 0
        );
        
        if (!hasItems) {
          console.warn('No resume items found in any section');
        }
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error in resume sections query:', error);
        throw error;
      }
    },
    staleTime: 60000, // 1 minute cache
    retry: 3,
    retryDelay: 1000
  });
};
