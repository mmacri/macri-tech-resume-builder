import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Pencil, Trash, ArrowUp, ArrowDown, Plus } from 'lucide-react';

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  start_date: string | null;
  end_date: string | null;
  display_order: number;
  section_id: string;
  created_at: string;
  updated_at: string;
}

const AdminEducation = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const queryClient = useQueryClient();

  const { data: sections } = useQuery({
    queryKey: ['educationSection'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('section_name', 'education');
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        const { data: newSection, error: createError } = await supabase
          .from('resume_sections')
          .insert({ section_name: 'education', display_order: 3 })
          .select()
          .single();
        
        if (createError) throw createError;
        return [newSection];
      }
      
      return data;
    }
  });

  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ['educationItems', sections ? sections[0]?.id : null],
    queryFn: async () => {
      if (!sections || !sections[0]) {
        return [];
      }
      
      const { data: existingItems, error: checkError } = await supabase
        .from('resume_items')
        .select('count')
        .eq('section_id', sections[0].id)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking education items:', checkError);
        throw checkError;
      }
      
      if (!existingItems || existingItems.count === 0) {
        console.log('No education items found, creating sample data...');
        
        const sampleEducation = [
          {
            title: 'Master of Computer Science',
            organization: 'Stanford University',
            location: 'Stanford, CA',
            start_date: '2014-09-01',
            end_date: '2016-06-30',
            description: 'Focus on Artificial Intelligence and Machine Learning',
            section_id: sections[0].id,
            display_order: 1
          },
          {
            title: 'Bachelor of Science in Computer Engineering',
            organization: 'MIT',
            location: 'Cambridge, MA',
            start_date: '2010-09-01',
            end_date: '2014-06-30',
            description: 'Graduated with honors, 3.85 GPA',
            section_id: sections[0].id,
            display_order: 2
          }
        ];
        
        for (const education of sampleEducation) {
          const { error: insertError } = await supabase
            .from('resume_items')
            .insert(education);
          
          if (insertError) {
            console.error('Error creating sample education:', insertError);
            toast.error(`Error creating sample education: ${insertError.message}`);
          }
        }
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

  const mutation = useMutation({
    mutationFn: async (item: Partial<EducationItem>) => {
      if (!item.school) {
        throw new Error('School name is required');
      }
      
      if (!sections || !sections[0]) {
        throw new Error('Education section not found');
      }
      
      const itemData = {
        title: item.school,
        organization: item.degree || null,
        description: item.field || null,
        start_date: item.start_date || null,
        end_date: item.end_date || null,
        section_id: sections[0].id
      };
      
      if (item.id) {
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
      queryClient.invalidateQueries({ queryKey: ['educationItems'] });
      toast.success(currentItem?.id ? 'Education updated successfully' : 'Education added successfully');
      setIsDialogOpen(false);
      setCurrentItem(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resume_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['educationItems'] });
      toast.success('Education deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const changeOrderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string, newOrder: number }) => {
      const { error } = await supabase
        .from('resume_items')
        .update({ display_order: newOrder })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['educationItems'] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const handleMoveUp = (item: any, index: number) => {
    if (index === 0 || !items) return;
    
    const prevItem = items[index - 1];
    changeOrderMutation.mutate({ id: item.id, newOrder: prevItem.display_order });
    changeOrderMutation.mutate({ id: prevItem.id, newOrder: item.display_order });
  };

  const handleMoveDown = (item: any, index: number) => {
    if (!items || index === items.length - 1) return;
    
    const nextItem = items[index + 1];
    changeOrderMutation.mutate({ id: item.id, newOrder: nextItem.display_order });
    changeOrderMutation.mutate({ id: nextItem.id, newOrder: item.display_order });
  };

  const handleNewItem = () => {
    setCurrentItem({ 
      school: '', 
      degree: '', 
      field: '',
      start_date: '',
      end_date: '',
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setCurrentItem({
      id: item.id,
      school: item.title,
      degree: item.organization,
      field: item.description,
      start_date: item.start_date,
      end_date: item.end_date
    });
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem && currentItem.school) {
      mutation.mutate(currentItem as any);
    } else {
      toast.error('School name is required');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education Management</h2>
        <Button onClick={handleNewItem} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Education Entry
        </Button>
      </div>

      {isItemsLoading ? (
        <div>Loading education entries...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Field of Study</TableHead>
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
                  <TableCell>{item.organization || '-'}</TableCell>
                  <TableCell>{item.description || '-'}</TableCell>
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
                <TableCell colSpan={5} className="text-center">No education entries found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentItem?.id ? 'Edit Education' : 'Add New Education'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="school">School</label>
                <Input
                  id="school"
                  value={currentItem?.school || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, school: e.target.value })}
                  placeholder="University/College Name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="degree">Degree</label>
                <Input
                  id="degree"
                  value={currentItem?.degree || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, degree: e.target.value })}
                  placeholder="Degree (e.g. Bachelor's, Master's)"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="field">Field of Study</label>
                <Input
                  id="field"
                  value={currentItem?.field || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, field: e.target.value })}
                  placeholder="Field of Study"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="start_date">Start Date</label>
                  <Input
                    id="start_date"
                    type="date"
                    value={currentItem?.start_date || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, start_date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="end_date">End Date</label>
                  <Input
                    id="end_date"
                    type="date"
                    value={currentItem?.end_date || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, end_date: e.target.value })}
                    placeholder="Leave blank for 'Present'"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save Education'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEducation;
