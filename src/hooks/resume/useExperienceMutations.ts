
import { useState } from 'react';
import { UpdateOptions } from '@/types/experienceMutations';
import { 
  addExperienceItem, 
  updateExperienceItem, 
  deleteExperienceItem, 
  reorderExperienceItems 
} from '@/utils/resume/experienceMutations';

/**
 * Hook providing mutation functions for experience items
 */
export const useExperienceMutations = () => {
  return {
    addItem: addExperienceItem,
    updateItem: updateExperienceItem,
    deleteItem: deleteExperienceItem,
    reorderItems: reorderExperienceItems
  };
};

export type { UpdateOptions };
