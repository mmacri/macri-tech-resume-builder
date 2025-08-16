
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
  // Effect to process data when loading is complete - with memoization to prevent unnecessary calls
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Error loading resume data:', error);
        // Always use fallback data if there's an error
        const fallbackSections = createFallbackSections();
        onDataLoaded(fallbackSections);
        onDataError(error);
      } else if (!resumeSections || resumeSections.length === 0) {
        // Only log warning once per session to reduce console spam
        if (!window.sessionStorage.getItem('fallback-warning-logged')) {
          console.warn('No resume sections loaded in Home, using fallback data');
          window.sessionStorage.setItem('fallback-warning-logged', 'true');
        }
        const fallbackSections = createFallbackSections();
        onDataLoaded(fallbackSections);
      } else {
        console.log(`Loaded ${resumeSections.length} resume sections in Home`);
        onDataLoaded(resumeSections);
      }
    }
  }, [isLoading, error, resumeSections?.length]); // Use length dependency to avoid full array comparison
};
