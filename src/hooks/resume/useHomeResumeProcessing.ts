
import { useEffect } from 'react';
import { fallbackResumeData } from '@/utils/resume/fallbackData';
import { createFallbackSections } from '@/utils/resume/createFallbackSections';

/**
 * Hook to handle resume data processing for the Home page
 */
export const useHomeResumeProcessing = (
  resumeSections: any[] | undefined,
  isLoading: boolean,
  error: Error | null,
  onDataLoaded: (sections: any[]) => void,
  onDataError: (error: Error) => void
) => {
  // Effect to log data load results and process the data
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Error loading resume data:', error);
        // Always use fallback data if there's an error
        const fallbackSections = createFallbackSections();
        onDataLoaded(fallbackSections);
        onDataError(error);
      } else if (!resumeSections || resumeSections.length === 0) {
        console.warn('No resume sections loaded in Home, using fallback data');
        const fallbackSections = createFallbackSections();
        onDataLoaded(fallbackSections);
      } else {
        console.log(`Loaded ${resumeSections.length} resume sections in Home`);
        
        // Check if experience section has data
        const experienceSection = resumeSections.find(s => s.section_name === 'experience');
        if (!experienceSection || !experienceSection.items || experienceSection.items.length === 0) {
          // Create enhanced sections with fallback experience data
          const enhancedSections = [...resumeSections];
          
          // Get the current timestamp for created_at and updated_at properties
          const timestamp = new Date().toISOString();
          
          if (experienceSection) {
            // Update existing experience section
            const expIndex = enhancedSections.findIndex(s => s.id === experienceSection.id);
            if (expIndex >= 0) {
              enhancedSections[expIndex] = {
                ...experienceSection,
                items: fallbackResumeData.experiences
              };
            }
          } else {
            // Add new experience section with fallback data
            enhancedSections.push({
              id: 'experience',
              section_name: 'experience',
              display_order: enhancedSections.length + 1,
              items: fallbackResumeData.experiences,
              created_at: timestamp,
              updated_at: timestamp
            });
          }
          
          console.log('Added fallback experience data to sections');
          onDataLoaded(enhancedSections);
        } else {
          console.log(`Experience section has ${experienceSection.items.length} items`);
          onDataLoaded(resumeSections);
        }
      }
    }
  }, [isLoading, error, resumeSections, onDataLoaded, onDataError]);
};
