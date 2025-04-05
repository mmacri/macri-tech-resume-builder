
import { useState } from 'react';
import { toast } from 'sonner';
import { useExperienceSections } from './resume/useExperienceSections';
import { useExperienceItems, ExperienceItem } from './resume/useExperienceItems';
import { useExperienceMutations } from './resume/useExperienceMutations';

export const useExperienceManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<ExperienceItem> | null>(null);
  
  // Get experience sections
  const { sections } = useExperienceSections();
  const sectionId = sections && sections.length > 0 ? sections[0].id : undefined;
  
  // Get experience items for the section
  const { items, isItemsLoading } = useExperienceItems(sectionId);
  
  // Get mutations for handling experiences
  const { 
    mutation, 
    handleDeleteItem, 
    handleMoveUp, 
    handleMoveDown 
  } = useExperienceMutations(sectionId, items);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem && currentItem.title) {
      mutation.mutate(currentItem, {
        onSuccess: () => {
          toast.success(currentItem?.id ? 'Experience updated successfully' : 'Experience added successfully');
          setIsDialogOpen(false);
          setCurrentItem(null);
        }
      });
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
