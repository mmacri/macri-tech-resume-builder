
import { useEffect } from 'react';
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
  // Effect to process data when loading is complete
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
        onDataLoaded(resumeSections);
      }
    }
  }, [isLoading, error, resumeSections, onDataLoaded, onDataError]);
};
