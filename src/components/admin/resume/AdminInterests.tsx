import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Pencil, Trash, ArrowUp, ArrowDown, Plus } from 'lucide-react';

interface InterestItem {
  id: string;
  description: string;
  display_order: number;
  section_id: string;
}

const AdminInterests = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<InterestItem> | null>(null);
  const queryClient = useQueryClient();

  // Fetch interests section ID
  const { data: sections } = useQuery({
    queryKey: ['interestsSection'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('section_name', 'interests');
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        const { data: newSection, error: createError } = await supabase
          .from('resume_sections')
          .insert({ section_name: 'interests', display_order: 5 })
          .select()
          .single();
        
        if (createError) throw createError;
        return [newSection];
      }
      
      return data;
    }
  });

  // Fetch interests items
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ['interestsItems', sections ? sections[0]?.id : null],
    queryFn: async () => {
      if (!sections || !sections[0]) {
        return [];
      }
      
      // Check if there are any interests items
      const { data: existingItems, error: checkError } = await supabase
        .from('resume_items')
        .select('count')
        .eq('section_id', sections[0].id)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {  // PGRST116 is "No rows returned" error
        console.error('Error checking interests items:', checkError);
        throw checkError;
      }
      
      // If no items exist, create sample interest items
      if (!existingItems || existingItems.count === 0) {
        console.log('No interest items found, creating sample data...');
        
        const sampleInterests = [
          {
            title: 'Interest Paragraph',
            description: 'Outside of work, I enjoy hiking and exploring the outdoors. Photography has become a recent passion of mine, allowing me to capture the natural beauty I encounter during my adventures.',
            section_id: sections[0].id,
            display_order: 1
          },
          {
            title: 'Interest Paragraph',
            description: 'I\'m also an avid reader of science fiction and technology books. When I\'m not coding or hiking, you can find me playing chess or experimenting with new cooking recipes.',
            section_id: sections[0].id,
            display_order: 2
          }
        ];
        
        for (const interest of sampleInterests) {
          const { error: insertError } = await supabase
            .from('resume_items')
            .insert(interest);
          
          if (insertError) {
            console.error('Error creating sample interest:', insertError);
            toast.error(`Error creating sample interest: ${insertError.message}`);
          }
        }
      }
      
      // Fetch all interests items
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

  // Create or update interest item
  const mutation = useMutation({
    mutationFn: async (item: Partial<InterestItem>) => {
      if (!item.description) {
        throw new Error('Interest description is required');
      }
      
      if (!sections || !sections[0]) {
        throw new Error('Interests section not found');
      }
      
      const itemData = {
        description: item.description,
        section_id: sections[0].id,
        title: 'Interest Paragraph'
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
      queryClient.invalidateQueries({ queryKey: ['interestsItems'] });
      toast.success(currentItem?.id ? 'Interest updated successfully' : 'Interest added successfully');
      setIsDialogOpen(false);
      setCurrentItem(null);
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  // Delete interest item
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resume_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interestsItems'] });
      toast.success('Interest deleted successfully');
    },
    onError: (error: Error) => {
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
      queryClient.invalidateQueries({ queryKey: ['interestsItems'] });
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const handleMoveUp = (item: any, index: number) => {
    if (index === 0 || !items) return; // Already at the top
    
    const prevItem = items[index - 1];
    changeOrderMutation.mutate({ id: item.id, newOrder: prevItem.display_order });
    changeOrderMutation.mutate({ id: prevItem.id, newOrder: item.display_order });
  };

  const handleMoveDown = (item: any, index: number) => {
    if (!items || index === items.length - 1) return; // Already at the bottom
    
    const nextItem = items[index + 1];
    changeOrderMutation.mutate({ id: item.id, newOrder: nextItem.display_order });
    changeOrderMutation.mutate({ id: nextItem.id, newOrder: item.display_order });
  };

  const handleNewItem = () => {
    setCurrentItem({ 
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setCurrentItem({
      id: item.id,
      description: item.description
    });
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this interest?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem && currentItem.description) {
      mutation.mutate(currentItem as any);
    } else {
      toast.error('Interest description is required');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Interests Management</h2>
        <Button onClick={handleNewItem} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Interest
        </Button>
      </div>

      {isItemsLoading ? (
        <div>Loading interests...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="w-24">
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={index === 0}
                        onClick={() => handleMoveUp(item, index)}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={!items || index === items.length - 1}
                        onClick={() => handleMoveDown(item, index)}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xl">
                    <div className="truncate">{item.description}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No interests found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentItem?.id ? 'Edit Interest' : 'Add New Interest'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="description">Interest Description</label>
                <Textarea
                  id="description"
                  value={currentItem?.description || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                  placeholder="Enter interest description"
                  rows={4}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save Interest'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInterests;
