
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';
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
  const [autoInitAttempted, setAutoInitAttempted] = useState(false);
  
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
        
        // If no sections found, return empty array
        if (!sections || sections.length === 0) {
          console.warn('No resume sections found in database');
          return [];
        }
        
        console.log('Fetched sections for Resume page:', sections.length);
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
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
        
        // Check if any sections actually have items
        const hasItems = sectionsWithItems.some(section => 
          section.items && section.items.length > 0
        );
        
        if (!hasItems) {
          console.warn('No resume items found in any section');
        }
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error in resume sections query:', error);
        throw error;
      }
    },
    staleTime: 60000, // 1 minute cache
    retry: 3,
    retryDelay: 1000
  });

  // Auto-initialize data if admin and no data found
  useEffect(() => {
    if (isAdmin && 
        !isLoading && 
        (!resumeSections || resumeSections.length === 0) && 
        !autoInitAttempted) {
      
      setAutoInitAttempted(true);
      
      console.log('No resume sections found. Attempting auto-initialization...');
      
      // Auto-initialize after a short delay to prevent race conditions
      const timer = setTimeout(() => {
        initializeResumeData({ force: true })
          .then(result => {
            if (result.success) {
              console.log('Auto-initialization successful');
              toast.success('Resume data initialized automatically');
              refetch();
            } else {
              console.error('Auto-initialization failed:', result.message);
            }
          })
          .catch(err => {
            console.error('Error during auto-initialization:', err);
          });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, resumeSections, isAdmin, refetch, autoInitAttempted]);
  
  // Effect to force initialize experience data if needed
  useEffect(() => {
    if (!isLoading && resumeSections && resumeSections.length > 0) {
      const experienceSection = resumeSections.find(s => s.section_name === 'experience');
      
      if (experienceSection && (!experienceSection.items || experienceSection.items.length === 0)) {
        console.log('Experience section exists but has no items, attempting to force initialize...');
        
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
        const sectionCount = resumeSections?.length || 0;
        console.log(`Loaded ${sectionCount} resume sections in Resume page`);
        
        // Pass the sections even if empty - this allows conditional UI rendering
        onDataLoaded(resumeSections || []);
      }
    }
  }, [isLoading, error, resumeSections, onDataLoaded, onDataError]);

  return null; // This is a non-visual component
};

export default ResumeDataLoader;
