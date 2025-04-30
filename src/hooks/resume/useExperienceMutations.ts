
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UpdateOptions {
  updateIndex?: boolean;
  updateResume?: boolean;
}

export const useExperienceMutations = () => {
  const queryClient = useQueryClient();

  const addItem = async (item: any, options: UpdateOptions = { updateIndex: false, updateResume: true }) => {
    const { updateIndex = false, updateResume = true } = options;
    
    // Logic to add item, with updateIndex and updateResume flags
    console.log(`Adding item with options: updateIndex=${updateIndex}, updateResume=${updateResume}`);
    
    const { data, error } = await supabase
      .from('resume_items')
      .insert({
        title: item.title,
        organization: item.organization,
        location: item.location,
        start_date: item.start_date,
        end_date: item.end_date,
        description: item.description,
        section_id: item.section_id,
        display_order: item.display_order
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error adding experience item:', error);
      throw error;
    }
    
    return data;
  };

  const updateItem = async (item: any, options: UpdateOptions = { updateIndex: false, updateResume: true }) => {
    const { updateIndex = false, updateResume = true } = options;
    
    // Logic to update item, with updateIndex and updateResume flags
    console.log(`Updating item with options: updateIndex=${updateIndex}, updateResume=${updateResume}`);
    
    const { data, error } = await supabase
      .from('resume_items')
      .update({
        title: item.title,
        organization: item.organization,
        location: item.location,
        start_date: item.start_date,
        end_date: item.end_date,
        description: item.description,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating experience item:', error);
      throw error;
    }
    
    return data;
  };

  const deleteItem = async (id: string, options: UpdateOptions = { updateIndex: false, updateResume: true }) => {
    const { updateIndex = false, updateResume = true } = options;
    
    // Logic to delete item, with updateIndex and updateResume flags
    console.log(`Deleting item with options: updateIndex=${updateIndex}, updateResume=${updateResume}`);
    
    const { error } = await supabase
      .from('resume_items')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting experience item:', error);
      throw error;
    }
    
    return true;
  };

  const reorderItems = async (id1: string, id2: string, options: UpdateOptions = { updateIndex: false, updateResume: true }) => {
    const { updateIndex = false, updateResume = true } = options;
    
    // Logic to reorder items, with updateIndex and updateResume flags
    console.log(`Reordering items with options: updateIndex=${updateIndex}, updateResume=${updateResume}`);
    
    // Get the current display orders
    const { data: item1, error: error1 } = await supabase
      .from('resume_items')
      .select('display_order')
      .eq('id', id1)
      .single();
    
    const { data: item2, error: error2 } = await supabase
      .from('resume_items')
      .select('display_order')
      .eq('id', id2)
      .single();
    
    if (error1 || error2) {
      console.error('Error fetching items for reordering:', error1 || error2);
      throw error1 || error2;
    }
    
    // Swap the display orders
    const { error: updateError1 } = await supabase
      .from('resume_items')
      .update({ display_order: item2.display_order })
      .eq('id', id1);
    
    const { error: updateError2 } = await supabase
      .from('resume_items')
      .update({ display_order: item1.display_order })
      .eq('id', id2);
    
    if (updateError1 || updateError2) {
      console.error('Error updating display orders:', updateError1 || updateError2);
      throw updateError1 || updateError2;
    }
    
    return true;
  };

  return {
    addItem,
    updateItem,
    deleteItem,
    reorderItems
  };
};
