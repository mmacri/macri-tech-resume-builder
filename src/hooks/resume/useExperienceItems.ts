
import { useQuery } from '@tanstack/react-query';
import { ExperienceItem } from '@/types/experience';
import { fetchExperienceItems, populateExperienceItems, findOrCreateExperienceSection } from '@/utils/resume/experienceUtils';

export type { ExperienceItem } from '@/types/experience';

export const useExperienceItems = (sectionId: string | undefined) => {
  // Fetch experience items
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['experienceItems', sectionId],
    queryFn: async () => {
      try {
        let effectiveSectionId = sectionId;
        
        if (!effectiveSectionId) {
          console.log('No section ID provided to useExperienceItems, attempting to find experience section...');
          // Try to find or create the experience section ID
          effectiveSectionId = await findOrCreateExperienceSection();
          
          // After finding or creating a section, populate it with experience items if needed
          const items = await populateExperienceItems(effectiveSectionId);
          return items;
        }
        
        const items = await fetchExperienceItems(effectiveSectionId);
        
        // If no items found, try to populate them
        if (items.length === 0) {
          return await populateExperienceItems(effectiveSectionId);
        }
        
        return items;
      } catch (error) {
        console.error('Error in useExperienceItems:', error);
        throw error;
      }
    },
    enabled: true, // Enable the query even without sectionId, we'll try to find it
    staleTime: 5000, // 5 seconds before considering data stale
  });

  return {
    items: data || [], // Return items directly and ensure it's never undefined
    isItemsLoading: isLoading,
    error,
    refetch
  };
};
