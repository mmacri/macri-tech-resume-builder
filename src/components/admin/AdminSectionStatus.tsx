
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface SectionStatusProps {
  onAllSectionsPopulated?: () => void;
}

const AdminSectionStatus: React.FC<SectionStatusProps> = ({ onAllSectionsPopulated }) => {
  const [allPopulated, setAllPopulated] = useState(false);

  // Check if all resume sections have data
  const { data: sectionCounts, isLoading: isLoadingSections } = useQuery({
    queryKey: ['resumeSectionCounts'],
    queryFn: async () => {
      const sections = ['about', 'experience', 'education', 'skills', 'interests', 'awards'];
      const counts = {};
      
      for (const section of sections) {
        // Get section ID first
        const { data: sectionData } = await supabase
          .from('resume_sections')
          .select('id')
          .eq('section_name', section)
          .single();
          
        if (sectionData) {
          // Count items in this section
          const { data: countData, error } = await supabase
            .from('resume_items')
            .select('count')
            .eq('section_id', sectionData.id)
            .single();
            
          counts[section] = countData?.count || 0;
        } else {
          counts[section] = 0;
        }
      }
      
      return counts;
    }
  });

  // Check for portfolio projects
  const { data: projectCount, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['portfolioProjectCount'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('count')
        .single();
        
      if (error) throw error;
      return data?.count || 0;
    }
  });

  // Check for users
  const { data: userCount, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['adminUserCount'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .single();
        
      if (error) throw error;
      return data?.count || 0;
    }
  });

  // Once data is loaded, check if all sections have data
  useEffect(() => {
    if (!isLoadingSections && !isLoadingProjects && !isLoadingUsers && sectionCounts) {
      // Check if all sections have at least one item
      const allSectionsHaveData = 
        Object.values(sectionCounts).every(count => (count as number) > 0) && 
        (projectCount || 0) > 0 &&
        (userCount || 0) > 0;
        
      setAllPopulated(allSectionsHaveData);
      
      if (allSectionsHaveData && onAllSectionsPopulated) {
        onAllSectionsPopulated();
      }
    }
  }, [sectionCounts, projectCount, userCount, isLoadingSections, isLoadingProjects, isLoadingUsers, onAllSectionsPopulated]);

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
          <AlertTitle className="text-amber-600">Still Loading Data</AlertTitle>
          <AlertDescription>
            Some sections may still be loading data. Browse through the different sections to ensure all data is properly populated.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AdminSectionStatus;
