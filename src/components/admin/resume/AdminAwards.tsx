
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Pencil, Trash, ArrowUp, ArrowDown, Plus } from 'lucide-react';

interface AwardItem {
  id: string;
  title: string;
  display_order: number;
  section_id: string;
  created_at: string;
  updated_at: string;
}

const AdminAwards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<AwardItem> | null>(null);
  const queryClient = useQueryClient();

  // Fetch awards section ID
  const { data: sections } = useQuery({
    queryKey: ['awardsSection'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('section_name', 'awards');
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        const { data: newSection, error: createError } = await supabase
          .from('resume_sections')
          .insert({ section_name: 'awards', display_order: 6 })
          .select()
          .single();
        
        if (createError) throw createError;
        return [newSection];
      }
      
      return data;
    }
  });

  // Fetch awards items
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ['awardsItems', sections ? sections[0]?.id : null],
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

  // Create or update award item
  const mutation = useMutation({
    mutationFn: async (item: Partial<AwardItem>) => {
      if (!item.title) {
        throw new Error('Award title is required');
      }
      
      if (!sections || !sections[0]) {
        throw new Error('Awards section not found');
      }
      
      const itemData = {
        title: item.title,
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
      queryClient.invalidateQueries({ queryKey: ['awardsItems'] });
      toast.success(currentItem?.id ? 'Award updated successfully' : 'Award added successfully');
      setIsDialogOpen(false);
      setCurrentItem(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  // Delete award item
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resume_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awardsItems'] });
      toast.success('Award deleted successfully');
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
      queryClient.invalidateQueries({ queryKey: ['awardsItems'] });
    },
    onError: (error) => {
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
      title: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setCurrentItem({
      id: item.id,
      title: item.title
    });
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this award?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem && currentItem.title) {
      mutation.mutate(currentItem as any);
    } else {
      toast.error('Award title is required');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Awards & Certifications Management</h2>
        <Button onClick={handleNewItem} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Award/Certification
        </Button>
      </div>

      {isItemsLoading ? (
        <div>Loading awards...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Award/Certification</TableHead>
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
                  <TableCell className="font-medium">{item.title}</TableCell>
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
                <TableCell colSpan={3} className="text-center">No awards found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentItem?.id ? 'Edit Award/Certification' : 'Add New Award/Certification'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Award/Certification Title</label>
                <Input
                  id="title"
                  value={currentItem?.title || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                  placeholder="Enter award or certification title"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save Award'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAwards;
