
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { forceInitExperience } from '@/utils/resume/forceInitExperience';

interface ResumeDataLoaderProps {
  onDataLoaded: (sections: any[]) => void;
  onDataError: (error: Error) => void;
}

/**
 * Component responsible for loading resume data for the Resume page
 */
const ResumeDataLoader: React.FC<ResumeDataLoaderProps> = ({ onDataLoaded, onDataError }) => {
  const { isAdmin } = useAuth();
  
  // Fetch resume sections data
  const { data: resumeSections, isLoading, error, refetch } = useQuery({
    queryKey: ['resumeSections'],
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
        
        // Use empty array instead of throwing error for empty sections
        if (!sections || sections.length === 0) {
          console.warn('No resume sections found in database, using fallback data');
          toast.warning('No resume data found. Please initialize data from the Admin Dashboard.');
          return [];
        }
        
        console.log('Fetched sections for Resume page:', sections);
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
          console.log(`Fetching items for section ${section.section_name} in Resume page`);
          
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
          
          console.log(`Found ${items?.length || 0} items for section ${section.section_name} in Resume page`);
          
          return {
            ...section,
            items: items || []
          };
        }));
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error in resume sections query:', error);
        // Return empty array to use fallback data
        return [];
      }
    },
    staleTime: 60000 // 1 minute cache
  });

  // Check if we need to force initialize experience data
  useEffect(() => {
    if (!isLoading && resumeSections) {
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
              }
            })
            .catch(err => {
              console.error('Failed to initialize experience data:', err);
            });
        }
      }
    }
  }, [isLoading, resumeSections, isAdmin, refetch]);

  // Effect to handle data loading results
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Error loading resume data:', error);
        onDataError(error as Error);
      } else {
        console.log(`Loaded ${resumeSections?.length || 0} resume sections in Resume page`);
        onDataLoaded(resumeSections || []);
      }
    }
  }, [isLoading, error, resumeSections, onDataLoaded, onDataError]);

  return null; // This is a non-visual component
};

export default ResumeDataLoader;
