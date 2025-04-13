
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  display_order: number;
  section_id: string;
  created_at: string;
  updated_at: string;
}

export const useExperienceItems = (sectionId: string | undefined) => {
  // Fetch experience items
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['experienceItems', sectionId],
    queryFn: async () => {
      if (!sectionId) {
        console.log('No section ID provided to useExperienceItems, attempting to find experience section...');
        
        // Try to find the experience section ID
        const { data: sections, error: sectionsError } = await supabase
          .from('resume_sections')
          .select('id')
          .eq('section_name', 'experience')
          .maybeSingle();
          
        if (sectionsError) {
          console.error('Error looking up experience section:', sectionsError);
          throw new Error(`Could not find experience section: ${sectionsError.message}`);
        }
        
        if (!sections) {
          console.log('Experience section not found in database. Please initialize resume data first.');
          return [];
        }
        
        sectionId = sections.id;
        console.log('Found experience section ID:', sectionId);
      }
      
      console.log('Fetching experience items for section:', sectionId);
      
      // Check if the section exists
      const { data: sectionData, error: sectionError } = await supabase
        .from('resume_sections')
        .select('section_name')
        .eq('id', sectionId)
        .maybeSingle();
        
      if (sectionError) {
        console.error('Error verifying section exists:', sectionError);
        throw sectionError;
      }
      
      if (!sectionData) {
        console.error(`Section with ID ${sectionId} not found`);
        throw new Error(`Section with ID ${sectionId} not found`);
      }
      
      console.log(`Verified section exists: ${sectionData.section_name} (${sectionId})`);
      
      // Check if there are any experience items
      const { count, error: countError } = await supabase
        .from('resume_items')
        .select('*', { count: 'exact', head: true })
        .eq('section_id', sectionId);
        
      if (countError) {
        console.error('Error checking experience items count:', countError);
        throw countError;
      }
      
      console.log(`Found ${count} experience items for section ID: ${sectionId}`);
      
      // Fetch all experience items
      const { data, error } = await supabase
        .from('resume_items')
        .select('*')
        .eq('section_id', sectionId)
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching experience items:', error);
        throw error;
      }
      
      console.log('Found experience items:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('First experience item:', data[0]);
      } else {
        console.log('No experience items found for this section, may need to initialize data');
      }
      
      return data || [];
    },
    enabled: true, // Enable the query even without sectionId, we'll try to find it
    staleTime: 5000 // 5 seconds before considering data stale
  });

  return {
    items: data || [], // Return items directly and ensure it's never undefined
    isItemsLoading: isLoading,
    error,
    refetch
  };
};
