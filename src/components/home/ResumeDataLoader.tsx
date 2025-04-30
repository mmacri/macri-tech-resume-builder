
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
 * Component responsible for loading resume data and initializing if needed
 */
const ResumeDataLoader: React.FC<ResumeDataLoaderProps> = ({ onDataLoaded, onDataError }) => {
  const { isAdmin } = useAuth();
  
  // Fetch all resume sections data to pass to components, but use fallback data if database is empty
  const { data: resumeSections, isLoading, error, refetch } = useQuery({
    queryKey: ['resumeSections'],
    queryFn: async () => {
      console.log('Fetching resume sections data for Home page');
      
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
        
        // Instead of throwing an error for empty sections, return an empty array
        // This allows the page to render with fallback data in the components
        if (!sections || sections.length === 0) {
          console.warn('No resume sections found in database, using fallback data');
          return [];
        }
        
        console.log('Fetched sections for Home:', sections.length);
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
          console.log(`Fetching items for section ${section.section_name}`);
          
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
          
          const itemCount = items?.length || 0;
          console.log(`Found ${itemCount} items for section ${section.section_name}`);
          
          return {
            ...section,
            items: items || []
          };
        }));
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error fetching resume sections:', error);
        // Return empty array instead of throwing to allow fallback data in components
        return [];
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 2
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

  // Effect to log data load results
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Error loading resume data:', error);
        onDataError(error as Error);
      } else if (!resumeSections || resumeSections.length === 0) {
        console.warn('No resume sections loaded in Home, using fallback data');
        onDataLoaded([]);
      } else {
        console.log(`Loaded ${resumeSections.length} resume sections in Home`);
        onDataLoaded(resumeSections);
      }
    }
  }, [isLoading, error, resumeSections, onDataLoaded, onDataError]);

  return null; // This is a non-visual component
};

export default ResumeDataLoader;
