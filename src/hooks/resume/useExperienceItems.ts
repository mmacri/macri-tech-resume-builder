
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  display_order: number;
  section_id: string;
  created_at: string;
  updated_at: string;
}

export const useExperienceItems = (sectionId: string | undefined) => {
  // Fetch experience items
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['experienceItems', sectionId],
    queryFn: async () => {
      if (!sectionId) {
        console.log('No section ID provided to useExperienceItems, attempting to find experience section...');
        
        // Try to find the experience section ID
        const { data: sections, error: sectionsError } = await supabase
          .from('resume_sections')
          .select('id, section_name')
          .eq('section_name', 'experience')
          .maybeSingle();
          
        if (sectionsError) {
          console.error('Error looking up experience section:', sectionsError);
          throw new Error(`Could not find experience section: ${sectionsError.message}`);
        }
        
        if (!sections) {
          console.log('Experience section not found in database. Please initialize resume data first.');
          
          // Create the experience section if it doesn't exist
          try {
            console.log('Attempting to create experience section...');
            const { data: newSection, error: createError } = await supabase
              .from('resume_sections')
              .insert({ section_name: 'experience', display_order: 2 })
              .select()
              .single();
              
            if (createError) {
              console.error('Error creating experience section:', createError);
              // Fall back to checking for any sections
            } else if (newSection) {
              console.log('Created new experience section:', newSection);
              sectionId = newSection.id;
              return []; // Return empty array for initial load
            }
          } catch (createSectionError) {
            console.error('Error in section creation:', createSectionError);
          }
          
          // Still check if ANY sections exist to help troubleshoot
          const { data: allSections, error: allSectionsError } = await supabase
            .from('resume_sections')
            .select('section_name, id')
            .order('display_order', { ascending: true });
            
          if (allSectionsError) {
            console.error('Error checking for any sections:', allSectionsError);
          } else {
            console.log('Available sections:', allSections?.length || 0);
            console.log('Sections data:', allSections);
          }
          
          return [];
        }
        
        sectionId = sections.id;
        console.log(`Found experience section ID: ${sectionId} (${sections.section_name})`);
      }
      
      console.log('Fetching experience items for section:', sectionId);
      
      // Fetch all experience items without checking section existence first
      // This simplifies the logic and reduces potential error points
      const { data, error } = await supabase
        .from('resume_items')
        .select('*')
        .eq('section_id', sectionId)
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching experience items:', error);
        throw error;
      }
      
      console.log('Experience items found:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('First experience item:', data[0]);
      } else {
        console.log('No experience items found for section ID:', sectionId);
      }
      
      return data || [];
    },
    enabled: true, // Enable the query even without sectionId, we'll try to find it
    staleTime: 5000, // 5 seconds before considering data stale
    retry: 2, // Increase retries
    retryDelay: 1000,
  });

  return {
    items: data || [], // Return items directly and ensure it's never undefined
    isItemsLoading: isLoading,
    error,
    refetch
  };
};
