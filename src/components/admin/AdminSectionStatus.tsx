
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, AlertCircle, Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface StatusSection {
  section_name: string;
  id: string;
  item_count: number;
}

interface AdminSectionStatusProps {
  onAllSectionsPopulated?: () => void;
}

const AdminSectionStatus = ({ onAllSectionsPopulated }: AdminSectionStatusProps) => {
  // Query to fetch resume sections with their item counts
  const { data: sections, isLoading, refetch } = useQuery({
    queryKey: ['resumeSectionsStatus'],
    queryFn: async () => {
      // First, get all resume sections
      const { data: resumeSections, error: sectionsError } = await supabase
        .from('resume_sections')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (sectionsError) {
        throw sectionsError;
      }
      
      if (!resumeSections || resumeSections.length === 0) {
        return [];
      }
      
      // For each section, count the items
      const sectionsWithCounts = await Promise.all(
        resumeSections.map(async (section) => {
          const { count, error: countError } = await supabase
            .from('resume_items')
            .select('id', { count: 'exact', head: true })
            .eq('section_id', section.id);
          
          if (countError) {
            console.error(`Error counting items for section ${section.section_name}:`, countError);
            return {
              ...section,
              item_count: 0
            };
          }
          
          return {
            ...section,
            item_count: count || 0
          };
        })
      );
      
      return sectionsWithCounts;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
  
  useEffect(() => {
    // Check if all sections have at least one item
    if (sections && sections.length > 0 && !isLoading) {
      const allPopulated = sections.every(section => section.item_count > 0);
      if (allPopulated && onAllSectionsPopulated) {
        onAllSectionsPopulated();
      }
    }
  }, [sections, isLoading, onAllSectionsPopulated]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Missing Resume Sections</AlertTitle>
        <AlertDescription>
          No resume sections found. Initialize resume data to create sections.
        </AlertDescription>
      </Alert>
    );
  }

  const allPopulated = sections.every(section => section.item_count > 0);
  
  if (allPopulated) {
    return (
      <Alert variant="success" className="bg-green-50 border-green-500 text-green-900">
        <Check className="h-4 w-4 text-green-500" />
        <AlertTitle>All Sections Ready</AlertTitle>
        <AlertDescription>
          All resume sections are populated with data. You can now edit each section.
        </AlertDescription>
      </Alert>
    );
  }
  
  const missingSections = sections.filter(section => section.item_count === 0);
  
  return (
    <Alert variant="warning" className="bg-yellow-50 border-yellow-500 text-yellow-900">
      <AlertCircle className="h-4 w-4 text-yellow-500" />
      <AlertTitle>Missing Content</AlertTitle>
      <AlertDescription className="space-y-2">
        <div>The following sections are missing content:</div>
        <ul className="list-disc pl-5">
          {missingSections.map(section => (
            <li key={section.id}>{section.section_name}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default AdminSectionStatus;
