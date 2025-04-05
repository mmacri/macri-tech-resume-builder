
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ExperienceItem } from './useExperienceItems';

export const useExperienceMutations = (sectionId: string | undefined, items: ExperienceItem[] | null) => {
  const queryClient = useQueryClient();

  // Create or update experience item
  const mutation = useMutation({
    mutationFn: async (item: Partial<ExperienceItem>) => {
      if (!item.title) {
        throw new Error('Title is required');
      }
      
      if (!sectionId) {
        throw new Error('Experience section not found');
      }
      
      const itemData = {
        title: item.title,
        organization: item.organization || null,
        location: item.location || null,
        start_date: item.start_date || null,
        end_date: item.end_date || null,
        description: item.description || null,
        section_id: sectionId
      };
      
      if (item.id) {
        // Update
        const { data, error } = await supabase
          .from('resume_items')
          .update({
            ...itemData,
            updated_at: new Date().toISOString()
          })
          .eq('id', item.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create - find the highest display_order and add 1
        const highestOrder = items && items.length > 0 
          ? Math.max(...items.map(i => i.display_order))
          : 0;
          
        const { data, error } = await supabase
          .from('resume_items')
          .insert({
            ...itemData,
            display_order: highestOrder + 1
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  // Delete experience item
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resume_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
      toast.success('Experience deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  // Change order
  const changeOrderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string, newOrder: number }) => {
      const { error } = await supabase
        .from('resume_items')
        .update({ display_order: newOrder })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const handleMoveUp = (item: ExperienceItem, index: number) => {
    if (index === 0 || !items) return; // Already at the top
    
    const prevItem = items[index - 1];
    changeOrderMutation.mutate({ id: item.id, newOrder: prevItem.display_order });
    changeOrderMutation.mutate({ id: prevItem.id, newOrder: item.display_order });
  };

  const handleMoveDown = (item: ExperienceItem, index: number) => {
    if (!items || index === items.length - 1) return; // Already at the bottom
    
    const nextItem = items[index + 1];
    changeOrderMutation.mutate({ id: item.id, newOrder: nextItem.display_order });
    changeOrderMutation.mutate({ id: nextItem.id, newOrder: item.display_order });
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      deleteMutation.mutate(id);
    }
  };

  return {
    mutation,
    handleDeleteItem,
    handleMoveUp,
    handleMoveDown
  };
};
