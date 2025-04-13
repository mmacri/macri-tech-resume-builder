
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
        console.log('No section ID provided to useExperienceItems');
        return [];
      }
      
      console.log('Fetching experience items for section:', sectionId);
      
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
      console.log('Experience data:', data);
      return data || [];
    },
    enabled: !!sectionId,
    staleTime: 5000 // 5 seconds before considering data stale
  });

  return {
    items: data || [], // Return items directly and ensure it's never undefined
    isItemsLoading: isLoading,
    error,
    refetch
  };
};
