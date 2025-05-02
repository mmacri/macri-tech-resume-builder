
import { useEffect } from 'react';
import { fallbackResumeData } from '@/utils/resume/fallbackData';
import { createFallbackSections } from '@/utils/resume/createFallbackSections';

/**
 * Hook for processing resume data and handling various states
 */
export const useResumeProcessing = (
  isLoading: boolean,
  error: Error | null,
  resumeSections: any[] | undefined,
  onDataLoaded: (sections: any[]) => void,
  onDataError: (error: Error) => void
) => {
  // Effect to enhance experience data with fallbacks if needed
  const enhanceExperienceData = (sections: any[]) => {
    // Check if experience section exists and has data
    const experienceSection = sections.find(s => s.section_name === 'experience');
    if (!experienceSection || !experienceSection.items || experienceSection.items.length === 0) {
      console.log('No experience data found in database, adding static experience data');
      
      // Create a copy of the sections and add static experience data
      const enhancedSections = [...sections];
      const expIndex = experienceSection ? 
        enhancedSections.findIndex(s => s.id === experienceSection.id) : 
        -1;
      
      // Get current timestamp for created_at and updated_at properties
      const timestamp = new Date().toISOString();
      
      if (expIndex >= 0) {
        // Update the existing experience section
        enhancedSections[expIndex] = {
          ...experienceSection,
          items: fallbackResumeData.experiences
        };
      } else {
        // Add a new experience section
        enhancedSections.push({
          id: 'experience',
          section_name: 'experience',
          display_order: enhancedSections.length + 1,
          items: fallbackResumeData.experiences,
          created_at: timestamp,
          updated_at: timestamp
        });
      }
      
      return enhancedSections;
    }
    
    // Return the original sections if no enhancement needed
    return sections;
  };

  // Effect to handle data loading results
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Error loading resume data:', error);
        // If there's an error, use fallback data instead of showing error
        const fallbackSections = createFallbackSections();
        console.log('Using fallback data due to error');
        onDataLoaded(fallbackSections);
        
        // Still report the error to help debug
        onDataError(error);
      } else if (!resumeSections || resumeSections.length === 0) {
        console.log('No resume sections found, using fallback data');
        const fallbackSections = createFallbackSections();
        onDataLoaded(fallbackSections);
      } else {
        const sectionCount = resumeSections?.length || 0;
        console.log(`Loaded ${sectionCount} resume sections in Resume page`);
        
        // Enhance the data with fallbacks if needed
        const enhancedSections = enhanceExperienceData(resumeSections);
        onDataLoaded(enhancedSections);
      }
    }
  }, [isLoading, error, resumeSections, onDataLoaded, onDataError]);
};
