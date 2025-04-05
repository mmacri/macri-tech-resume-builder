
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ExperienceItem {
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

interface ExperienceSection {
  id: string;
  section_name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useExperienceManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<ExperienceItem> | null>(null);
  const queryClient = useQueryClient();

  // Fetch experience section ID
  const { data: sections } = useQuery({
    queryKey: ['experienceSections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('section_name', 'experience');
      
      if (error) throw error;
      
      // If no experience section exists, create one
      if (!data || data.length === 0) {
        const { data: newSection, error: createError } = await supabase
          .from('resume_sections')
          .insert({ section_name: 'experience', display_order: 2 })
          .select()
          .single();
        
        if (createError) throw createError;
        return [newSection];
      }
      
      return data;
    }
  });

  // Fetch experience items
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ['experienceItems', sections ? sections[0]?.id : null],
    queryFn: async () => {
      if (!sections || !sections[0]) {
        return [];
      }
      
      const { data, error } = await supabase
        .from('resume_items')
        .select('*')
        .eq('section_id', sections[0].id)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!sections && sections.length > 0
  });

  // Create or update experience item
  const mutation = useMutation({
    mutationFn: async (item: Partial<ExperienceItem>) => {
      if (!item.title) {
        throw new Error('Title is required');
      }
      
      if (!sections || !sections[0]) {
        throw new Error('Experience section not found');
      }
      
      const itemData = {
        title: item.title,
        organization: item.organization || null,
        location: item.location || null,
        start_date: item.start_date || null,
        end_date: item.end_date || null,
        description: item.description || null,
        section_id: sections[0].id
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
      toast.success(currentItem?.id ? 'Experience updated successfully' : 'Experience added successfully');
      setIsDialogOpen(false);
      setCurrentItem(null);
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

  const handleNewItem = () => {
    setCurrentItem({ 
      title: '', 
      organization: '', 
      location: '',
      start_date: '',
      end_date: '',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: ExperienceItem) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem && currentItem.title) {
      mutation.mutate(currentItem);
    } else {
      toast.error('Title is required');
    }
  };

  return {
    items,
    isItemsLoading,
    isDialogOpen,
    setIsDialogOpen,
    currentItem,
    setCurrentItem,
    mutation,
    handleNewItem,
    handleEditItem,
    handleDeleteItem,
    handleMoveUp,
    handleMoveDown,
    handleSubmit
  };
};
