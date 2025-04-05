
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

export interface SectionStatusCounts {
  [key: string]: number;
}

export const useResumeStatusChecks = () => {
  const [allPopulated, setAllPopulated] = useState(false);
  
  // Check if all resume sections have data
  const { 
    data: sectionCounts, 
    isLoading: isLoadingSections, 
    refetch: refetchSections 
  } = useQuery({
    queryKey: ['resumeSectionCounts'],
    queryFn: async () => {
      console.log('Checking resume sections for data...');
      const sections = ['about', 'experience', 'education', 'skills', 'interests', 'awards'];
      const counts: SectionStatusCounts = {};
      
      try {
        for (const section of sections) {
          // Get section ID first
          const { data: sectionData, error: sectionError } = await supabase
            .from('resume_sections')
            .select('id')
            .eq('section_name', section)
            .maybeSingle();
            
          if (sectionError) {
            console.error(`Error fetching section ${section}:`, sectionError);
          }
            
          if (sectionData) {
            // Count items in this section
            const { data: itemsData, error: itemsError } = await supabase
              .from('resume_items')
              .select('id')
              .eq('section_id', sectionData.id);
              
            if (itemsError) {
              console.error(`Error counting items for section ${section}:`, itemsError);
            }
            
            counts[section] = itemsData?.length || 0;
            console.log(`${section} section has ${counts[section]} items`);
          } else {
            counts[section] = 0;
            console.log(`${section} section not found`);
          }
        }
      } catch (error) {
        console.error('Error in resumeSectionCounts query:', error);
      }
      
      return counts;
    }
  });

  // Check for portfolio projects
  const { 
    data: projectCount, 
    isLoading: isLoadingProjects, 
    refetch: refetchProjects 
  } = useQuery({
    queryKey: ['portfolioProjectCount'],
    queryFn: async () => {
      try {
        console.log('Checking portfolio projects...');
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('id');
          
        if (error) {
          console.error('Error fetching portfolio projects:', error);
          return 0;
        }
        
        console.log(`Found ${data?.length || 0} portfolio projects`);
        return data?.length || 0;
      } catch (error) {
        console.error('Error in portfolioProjectCount query:', error);
        return 0;
      }
    }
  });

  // Check for users
  const { 
    data: userCount, 
    isLoading: isLoadingUsers, 
    refetch: refetchUsers 
  } = useQuery({
    queryKey: ['adminUserCount'],
    queryFn: async () => {
      try {
        console.log('Checking user profiles...');
        const { data, error } = await supabase
          .from('profiles')
          .select('id');
          
        if (error) {
          console.error('Error fetching profiles:', error);
          return 0;
        }
        
        console.log(`Found ${data?.length || 0} user profiles`);
        return data?.length || 0;
      } catch (error) {
        console.error('Error in adminUserCount query:', error);
        return 0;
      }
    }
  });

  // Calculate if all sections are populated
  useEffect(() => {
    if (!isLoadingSections && !isLoadingProjects && !isLoadingUsers && sectionCounts) {
      console.log('Checking if all data is populated:', {
        sectionCounts,
        projectCount,
        userCount
      });
      
      // Check if all sections have at least one item
      const allSectionsHaveData = 
        sectionCounts && Object.values(sectionCounts).every(count => (count as number) > 0) && 
        (projectCount || 0) > 0 &&
        (userCount || 0) > 0;
      
      console.log('All sections populated:', allSectionsHaveData);
      setAllPopulated(allSectionsHaveData);
    }
  }, [sectionCounts, projectCount, userCount, isLoadingSections, isLoadingProjects, isLoadingUsers]);

  const refreshAllData = () => {
    refetchSections();
    refetchProjects();
    refetchUsers();
  };

  return {
    allPopulated,
    sectionCounts,
    projectCount,
    userCount,
    isLoading: isLoadingSections || isLoadingProjects || isLoadingUsers,
    refreshAllData
  };
};
