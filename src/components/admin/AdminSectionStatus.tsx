
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useInitializeResumeData } from '@/hooks/useInitializeResumeData';

interface SectionStatusProps {
  onAllSectionsPopulated?: () => void;
}

const AdminSectionStatus: React.FC<SectionStatusProps> = ({ onAllSectionsPopulated }) => {
  const [allPopulated, setAllPopulated] = useState(false);
  const { initializeData, isInitializing, isSuccess } = useInitializeResumeData();

  // Check if all resume sections have data
  const { data: sectionCounts, isLoading: isLoadingSections, refetch: refetchSections } = useQuery({
    queryKey: ['resumeSectionCounts'],
    queryFn: async () => {
      console.log('Checking resume sections for data...');
      const sections = ['about', 'experience', 'education', 'skills', 'interests', 'awards'];
      const counts = {};
      
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
  const { data: projectCount, isLoading: isLoadingProjects, refetch: refetchProjects } = useQuery({
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
  const { data: userCount, isLoading: isLoadingUsers, refetch: refetchUsers } = useQuery({
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

  // Once data is loaded, check if all sections have data
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
      
      if (allSectionsHaveData && onAllSectionsPopulated) {
        onAllSectionsPopulated();
      }
    }
  }, [sectionCounts, projectCount, userCount, isLoadingSections, isLoadingProjects, isLoadingUsers, onAllSectionsPopulated]);

  // Refetch data when initialization is done
  useEffect(() => {
    if (isSuccess) {
      refetchSections();
      refetchProjects();
      refetchUsers();
    }
  }, [isSuccess, refetchSections, refetchProjects, refetchUsers]);

  const handleInitializeData = () => {
    console.log('Initializing data...');
    initializeData();
  };

  if (isLoadingSections || isLoadingProjects || isLoadingUsers) {
    return (
      <Alert className="mb-6 bg-gray-100">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <AlertTitle>Checking data status...</AlertTitle>
        <AlertDescription>
          Verifying that all resume sections, portfolio projects, and users are populated.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {allPopulated ? (
        <Alert className="mb-6 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
          <AlertTitle className="text-green-600">All Sections Populated!</AlertTitle>
          <AlertDescription>
            All resume sections, portfolio projects, and users are now populated with data. You can browse, edit, add, or delete items as needed.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="mb-6 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
          <AlertTitle className="text-amber-600">Missing Data</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>
              Some sections are missing data. Click the button below to initialize all sections with Michael Macri's resume data.
            </p>
            <Button 
              onClick={handleInitializeData} 
              variant="outline" 
              className="w-fit"
              disabled={isInitializing}
            >
              {isInitializing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Initializing Data...
                </>
              ) : (
                "Initialize Resume Data"
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AdminSectionStatus;
