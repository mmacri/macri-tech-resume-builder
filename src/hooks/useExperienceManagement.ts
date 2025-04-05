
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useExperienceSections } from './resume/useExperienceSections';
import { useExperienceItems } from './resume/useExperienceItems';
import { useExperienceMutations } from './resume/useExperienceMutations';
import { useAdminUpdate } from '@/contexts/AdminUpdateContext';
import { toast } from 'sonner';

export const useExperienceManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const queryClient = useQueryClient();
  const { updateResume, updateIndex } = useAdminUpdate();

  // Fix: Access sections directly instead of from data property
  const { sections, isLoading: isSectionsLoading } = useExperienceSections();
  // Fix: Access items directly instead of from data property, and use isItemsLoading directly
  const { items, isItemsLoading } = useExperienceItems(sections?.[0]?.id);
  const { addItem, updateItem, deleteItem, reorderItems } = useExperienceMutations();

  // If neither is selected, default to updating Resume
  const effectiveUpdateResume = updateIndex === false && updateResume === false ? true : updateResume;

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      if (formData.id) {
        // Update existing item
        return await updateItem(formData, { updateIndex, updateResume: effectiveUpdateResume });
      } else {
        // Add new item
        if (!sections || !sections[0]) {
          throw new Error('Experience section not found. Please initialize resume data first.');
        }
        
        const highestOrder = items && items.length > 0 
          ? Math.max(...items.map(i => i.display_order))
          : 0;
          
        return await addItem({
          ...formData,
          section_id: sections[0].id,
          display_order: highestOrder + 1
        }, { updateIndex, updateResume: effectiveUpdateResume });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
      const actionText = currentItem?.id ? 'updated' : 'added';
      const targetText = getTargetText(updateIndex, effectiveUpdateResume);
      toast.success(`Experience ${actionText} successfully for ${targetText}`);
      setIsDialogOpen(false);
      setCurrentItem(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const handleNewItem = () => {
    setCurrentItem({
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      description: '',
      duties: []
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setCurrentItem({
      id: item.id,
      title: item.title,
      company: item.organization,
      location: item.location,
      start_date: item.start_date,
      end_date: item.end_date,
      description: item.description,
      duties: item.duties || []
    });
    setIsDialogOpen(true);
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteItem(id, { updateIndex, updateResume: effectiveUpdateResume });
        queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
        const targetText = getTargetText(updateIndex, effectiveUpdateResume);
        toast.success(`Experience deleted successfully from ${targetText}`);
      } catch (error) {
        toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handleMoveUp = async (item: any, index: number) => {
    if (index === 0 || !items) return;
    
    const prevItem = items[index - 1];
    try {
      await reorderItems(item.id, prevItem.id, { updateIndex, updateResume: effectiveUpdateResume });
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
    } catch (error) {
      toast.error(`Error reordering items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleMoveDown = async (item: any, index: number) => {
    if (!items || index === items.length - 1) return;
    
    const nextItem = items[index + 1];
    try {
      await reorderItems(item.id, nextItem.id, { updateIndex, updateResume: effectiveUpdateResume });
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
    } catch (error) {
      toast.error(`Error reordering items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSubmit = (formData: any) => {
    mutation.mutate(formData);
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

// Helper function to generate target text based on selected options
const getTargetText = (updateIndex: boolean, updateResume: boolean) => {
  if (updateIndex && updateResume) {
    return 'both Index and Resume pages';
  } else if (updateIndex) {
    return 'Index page';
  } else if (updateResume) {
    return 'Resume page';
  }
  return 'Resume page'; // Default
};
