
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';

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
          console.warn('No resume sections found in database, trying to initialize data');
          
          // If admin, try to initialize data automatically
          if (isAdmin) {
            try {
              const result = await initializeResumeData({});
              if (result.success) {
                toast.success('Resume data initialized successfully!');
                const { data: newSections, error: newSectionsError } = await supabase
                  .from('resume_sections')
                  .select('*')
                  .order('display_order', { ascending: true });
                
                if (newSectionsError) {
                  throw newSectionsError;
                }
                
                // If we successfully initialized and got sections, return them
                if (newSections && newSections.length > 0) {
                  return newSections;
                }
              } else {
                toast.error('Failed to initialize resume data. Please try manually from Admin Dashboard.');
              }
            } catch (initError) {
              console.error('Error initializing data:', initError);
            }
          }
          
          toast.warning('No resume data found. Please initialize data from the Admin Dashboard.');
          return [];
        }
        
        console.log('Fetched sections for Resume page:', sections);
        return sections;
      } catch (error) {
        console.error('Error in resume sections query:', error);
        // Return empty array to use fallback data
        return [];
      }
    },
    staleTime: 60000 // 1 minute cache
  });

  // Effect to handle data loading results
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Error loading resume data:', error);
        onDataError(error as Error);
      } else if (resumeSections) {
        console.log(`Loaded ${resumeSections.length || 0} resume sections in Resume page`);
        
        // If we have sections, fetch their items
        if (resumeSections.length > 0) {
          const fetchSectionsWithItems = async () => {
            try {
              const sectionsWithItems = await Promise.all(resumeSections.map(async (section) => {
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
                
                return {
                  ...section,
                  items: items || []
                };
              }));
              
              onDataLoaded(sectionsWithItems);
            } catch (fetchError) {
              console.error('Error fetching section items:', fetchError);
              onDataLoaded(resumeSections.map(section => ({ ...section, items: [] })));
            }
          };
          
          fetchSectionsWithItems();
        } else {
          onDataLoaded([]);
        }
      } else {
        onDataLoaded([]);
      }
    }
  }, [isLoading, error, resumeSections, onDataLoaded, onDataError]);

  return null; // This is a non-visual component
};

export default ResumeDataLoader;
