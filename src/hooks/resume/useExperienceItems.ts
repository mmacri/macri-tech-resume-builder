
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ['experienceItems', sectionId],
    queryFn: async () => {
      if (!sectionId) {
        return [];
      }
      
      // Check if there are any experience items
      const { data: existingItems, error: checkError } = await supabase
        .from('resume_items')
        .select('count')
        .eq('section_id', sectionId)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {  // PGRST116 is "No rows returned" error
        console.error('Error checking experience items:', checkError);
        throw checkError;
      }
      
      // If no items exist, create sample experience items
      if (!existingItems || existingItems.count === 0) {
        console.log('No experience items found, creating sample data...');
        
        const sampleExperiences = [
          {
            title: 'Senior Web Developer',
            organization: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            start_date: '2020-01-01',
            end_date: 'Present',
            description: 'Led development of enterprise web applications using React and Node.js. Managed a team of 5 developers and implemented CI/CD pipelines.',
            section_id: sectionId,
            display_order: 1
          },
          {
            title: 'Frontend Developer',
            organization: 'Creative Digital Agency',
            location: 'Boston, MA',
            start_date: '2018-03-01',
            end_date: '2019-12-31',
            description: 'Developed responsive web interfaces for various clients using modern JavaScript frameworks and CSS preprocessors.',
            section_id: sectionId,
            display_order: 2
          },
          {
            title: 'Junior Developer',
            organization: 'Startup Innovations',
            location: 'Austin, TX',
            start_date: '2016-06-01',
            end_date: '2018-02-28',
            description: 'Assisted in developing web applications and implemented UI designs using HTML, CSS, and JavaScript.',
            section_id: sectionId,
            display_order: 3
          }
        ];
        
        for (const experience of sampleExperiences) {
          const { error: insertError } = await supabase
            .from('resume_items')
            .insert(experience);
          
          if (insertError) {
            console.error('Error creating sample experience:', insertError);
            toast.error(`Error creating sample experience: ${insertError.message}`);
          }
        }
      }
      
      // Fetch all experience items
      const { data, error } = await supabase
        .from('resume_items')
        .select('*')
        .eq('section_id', sectionId)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!sectionId
  });

  return {
    items,
    isItemsLoading
  };
};
