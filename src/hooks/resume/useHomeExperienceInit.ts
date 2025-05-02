
import { useEffect } from 'react';
import { toast } from 'sonner';
import { forceInitExperience } from '@/utils/resume/forceInitExperience';

/**
 * Hook to handle experience data initialization for the Home page
 */
export const useHomeExperienceInit = (
  resumeSections: any[] | undefined,
  isAdmin: boolean,
  refetch: () => void
) => {
  // Check if we need to force initialize experience data
  useEffect(() => {
    if (!resumeSections || resumeSections.length === 0) return;
    
    const experienceSection = resumeSections.find(s => s.section_name === 'experience');
    
    if (experienceSection && (!experienceSection.items || experienceSection.items.length === 0)) {
      console.log('Experience section exists but has no items, attempting to force initialize...');
      
      if (isAdmin) {
        forceInitExperience()
          .then(result => {
            if (result.initialized) {
              toast.success('Experience data initialized successfully');
              refetch();
            } else {
              console.log('Force init message:', result.message);
            }
          })
          .catch(err => {
            console.error('Failed to initialize experience data:', err);
          });
      }
    }
  }, [resumeSections, isAdmin, refetch]);
};
