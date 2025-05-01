
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useExperienceSections } from './resume/useExperienceSections';
import { useExperienceItems, ExperienceItem } from './resume/useExperienceItems';
import { useExperienceMutations, UpdateOptions } from './resume/useExperienceMutations';
import { useAdminUpdate } from '@/contexts/AdminUpdateContext';
import { toast } from 'sonner';

export const useExperienceManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const queryClient = useQueryClient();
  const { updateResume, updateIndex } = useAdminUpdate();

  // Get the experience section ID
  const { sections, isLoading: isSectionsLoading } = useExperienceSections();
  const sectionId = sections?.[0]?.id;
  
  // Get experience items
  const { items, isItemsLoading } = useExperienceItems(sectionId);
  const { addItem, updateItem, deleteItem, reorderItems } = useExperienceMutations();

  // If neither is selected, default to updating Resume
  const effectiveUpdateResume = updateIndex === false && updateResume === false ? true : updateResume;

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      console.log('Submitting form data:', formData);
      
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
      // Invalidate multiple related queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
      queryClient.invalidateQueries({ queryKey: ['resumeSections'] });
      
      const actionText = currentItem?.id ? 'updated' : 'added';
      const targetText = getTargetText(updateIndex, effectiveUpdateResume);
      toast.success(`Experience ${actionText} successfully for ${targetText}`);
      setIsDialogOpen(false);
      setCurrentItem(null);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

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
    console.log('Editing item:', item);
    setCurrentItem({
      id: item.id,
      title: item.title,
      organization: item.organization,
      location: item.location,
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      description: item.description || '',
      section_id: item.section_id
    });
    setIsDialogOpen(true);
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteItem(id, { updateIndex, updateResume: effectiveUpdateResume });
        // Invalidate multiple related queries to ensure consistency
        queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
        queryClient.invalidateQueries({ queryKey: ['resumeSections'] });
        
        const targetText = getTargetText(updateIndex, effectiveUpdateResume);
        toast.success(`Experience deleted successfully from ${targetText}`);
      } catch (error) {
        toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handleMoveUp = async (item: ExperienceItem, index: number) => {
    if (index === 0 || !items) return;
    
    const prevItem = items[index - 1];
    try {
      await reorderItems(item.id, prevItem.id, { updateIndex, updateResume: effectiveUpdateResume });
      // Invalidate multiple related queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
      queryClient.invalidateQueries({ queryKey: ['resumeSections'] });
    } catch (error) {
      toast.error(`Error reordering items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleMoveDown = async (item: ExperienceItem, index: number) => {
    if (!items || index === items.length - 1) return;
    
    const nextItem = items[index + 1];
    try {
      await reorderItems(item.id, nextItem.id, { updateIndex, updateResume: effectiveUpdateResume });
      // Invalidate multiple related queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['experienceItems'] });
      queryClient.invalidateQueries({ queryKey: ['resumeSections'] });
    } catch (error) {
      toast.error(`Error reordering items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', currentItem);
    mutation.mutate(currentItem);
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
