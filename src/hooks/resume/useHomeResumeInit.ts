
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';
import { forceInitExperience } from '@/utils/resume/forceInitExperience';

/**
 * Hook to handle resume data initialization for the Home page
 */
export const useHomeResumeInit = (
  resumeSections: any[] | undefined,
  isLoading: boolean,
  refetch: () => void
) => {
  const { isAdmin } = useAuth();

  // Initial data check and auto-initialization
  useEffect(() => {
    if (!isLoading && (!resumeSections || resumeSections.length === 0)) {
      console.log('No resume sections found on initial load, attempting to force initialize...');
      
      // Initialize data automatically if admin
      if (isAdmin) {
        initializeResumeData({ force: true })
          .then(result => {
            if (result.success) {
              console.log('Successfully initialized resume data');
              toast.success('Resume data initialized successfully');
              setTimeout(() => refetch(), 1000); // Refetch after a short delay
            } else {
              console.error('Failed to initialize resume data:', result.message);
              toast.error('Failed to initialize resume data. Please try again.');
            }
          })
          .catch(err => {
            console.error('Error during force initialization:', err);
          });
      }
    }
  }, [isLoading, resumeSections, isAdmin, refetch]);

  // Check if we need to force initialize experience data
  useEffect(() => {
    if (!isLoading && resumeSections && resumeSections.length > 0) {
      const experienceSection = resumeSections.find(s => s.section_name === 'experience');
      if (experienceSection && (!experienceSection.items || experienceSection.items.length === 0)) {
        console.log('Experience section exists but has no items, attempting to force initialize...');
        
        // Only initialize if admin
        if (isAdmin) {
          forceInitExperience()
            .then(result => {
              if (result.initialized) {
                toast.success('Experience data initialized successfully');
                refetch();
              } else if (result.message) {
                console.log('Force init message:', result.message);
              }
            })
            .catch(err => {
              console.error('Failed to initialize experience data:', err);
            });
        }
      }
    }
  }, [isLoading, resumeSections, isAdmin, refetch]);

  return {
    isAdmin
  };
};
