
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { forceInitExperience } from '@/utils/resume/forceInitExperience';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';
import { fallbackResumeData } from '@/utils/resume/fallbackData';

interface ResumeDataLoaderProps {
  onDataLoaded: (sections: any[]) => void;
  onDataError: (error: Error) => void;
}

/**
 * Component responsible for loading resume data and initializing if needed
 */
const ResumeDataLoader: React.FC<ResumeDataLoaderProps> = ({ onDataLoaded, onDataError }) => {
  const { isAdmin } = useAuth();
  
  // Create static fallback sections
  const createFallbackSections = () => {
    console.log('Creating fallback resume sections from static data for home page');
    
    // Convert fallbackResumeData to the format expected by the components
    const sections = [
      {
        id: 'about',
        section_name: 'about',
        display_order: 1,
        items: [fallbackResumeData.aboutData]
      },
      {
        id: 'experience',
        section_name: 'experience',
        display_order: 2,
        items: fallbackResumeData.experiences
      },
      {
        id: 'education',
        section_name: 'education',
        display_order: 3,
        items: fallbackResumeData.education
      },
      {
        id: 'skills',
        section_name: 'skills',
        display_order: 4,
        items: fallbackResumeData.skills
      },
      {
        id: 'interests',
        section_name: 'interests',
        display_order: 5,
        items: [{title: "Interests"}]
      },
      {
        id: 'awards',
        section_name: 'awards',
        display_order: 6,
        items: [{title: "Award 1"}, {title: "Award 2"}, {title: "Award 3"}]
      }
    ];
    
    return sections;
  };
  
  // Fetch all resume sections data to pass to components
  const { data: resumeSections, isLoading, error, refetch } = useQuery({
    queryKey: ['resumeSections', 'home'],
    queryFn: async () => {
      console.log('Fetching resume sections data for Home page');
      
      try {
        // Attempt to auto-initialize data if admin
        if (isAdmin) {
          try {
            console.log('Attempting to auto-initialize resume data...');
            const initResult = await initializeResumeData({});
            if (initResult.success) {
              console.log('Auto-initialized resume data successfully');
            }
          } catch (initError) {
            console.error('Error auto-initializing data:', initError);
          }
        }

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
          console.warn('No resume sections found in database, will use fallback data');
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
          
          // Log experience items for debugging
          if (section.section_name === 'experience' && items && items.length > 0) {
            console.log('Experience section items:', items.length);
            console.log('First experience item:', items[0]);
          }
          
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
    retry: 3
  });

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

  // Effect to log data load results
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Error loading resume data:', error);
        // Always use fallback data if there's an error
        const fallbackSections = createFallbackSections();
        onDataLoaded(fallbackSections);
        onDataError(error as Error);
      } else if (!resumeSections || resumeSections.length === 0) {
        console.warn('No resume sections loaded in Home, using fallback data');
        const fallbackSections = createFallbackSections();
        onDataLoaded(fallbackSections);
      } else {
        console.log(`Loaded ${resumeSections.length} resume sections in Home`);
        
        // Check if experience section has data
        const experienceSection = resumeSections.find(s => s.section_name === 'experience');
        if (!experienceSection || !experienceSection.items || experienceSection.items.length === 0) {
          // Create enhanced sections with fallback experience data
          const enhancedSections = [...resumeSections];
          
          if (experienceSection) {
            // Update existing experience section
            const expIndex = enhancedSections.findIndex(s => s.id === experienceSection.id);
            if (expIndex >= 0) {
              enhancedSections[expIndex] = {
                ...experienceSection,
                items: fallbackResumeData.experiences
              };
            }
          } else {
            // Add new experience section with fallback data
            enhancedSections.push({
              id: 'experience',
              section_name: 'experience',
              display_order: enhancedSections.length + 1,
              items: fallbackResumeData.experiences
            });
          }
          
          console.log('Added fallback experience data to sections');
          onDataLoaded(enhancedSections);
        } else {
          console.log(`Experience section has ${experienceSection.items.length} items`);
          onDataLoaded(resumeSections);
        }
      }
    }
  }, [isLoading, error, resumeSections, onDataLoaded, onDataError]);

  return null; // This is a non-visual component
};

export default ResumeDataLoader;
