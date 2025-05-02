
import { useEffect } from 'react';
import { toast } from 'sonner';
import { forceInitExperience } from '@/utils/resume/forceInitExperience';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to handle experience section initialization
 */
export const useExperienceInit = (
  resumeSections: any[] | undefined, 
  isAdmin: boolean,
  refetch: () => void
) => {
  // Effect to force initialize experience data if needed
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
              toast.info('Experience data initialization skipped - may already exist');
            }
          })
          .catch(err => {
            console.error('Failed to initialize experience data:', err);
            toast.error('Failed to initialize experience data');
          });
      }
    }
  }, [resumeSections, isAdmin, refetch]);
};
