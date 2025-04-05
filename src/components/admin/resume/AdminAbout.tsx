
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface AboutSection {
  id: string;
  content: string;
  name: string;
  section_id: string;
}

const AdminAbout = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Fetch about section ID
  const { data: sections } = useQuery({
    queryKey: ['aboutSection'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*')
        .eq('section_name', 'about');
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        const { data: newSection, error: createError } = await supabase
          .from('resume_sections')
          .insert({ section_name: 'about', display_order: 1 })
          .select()
          .single();
        
        if (createError) throw createError;
        return [newSection];
      }
      
      return data;
    }
  });

  // Fetch about content
  const { data: aboutData } = useQuery({
    queryKey: ['aboutContent', sections ? sections[0]?.id : null],
    queryFn: async () => {
      if (!sections || !sections[0]) {
        return null;
      }
      
      // Check if there's any about data
      const { data, error } = await supabase
        .from('resume_items')
        .select('*')
        .eq('section_id', sections[0].id)
        .maybeSingle();
      
      // If no about data, create default
      if (!data && !error) {
        console.log('No about data found, creating sample data...');
        
        const sampleAbout = {
          title: 'John Doe',
          description: 'I am an experienced full-stack developer with a passion for creating clean, efficient, and user-friendly applications. With expertise in React, Node.js, and modern web technologies, I deliver robust solutions that meet business needs while providing excellent user experiences.',
          section_id: sections[0].id,
          display_order: 1
        };
        
        const { data: newData, error: insertError } = await supabase
          .from('resume_items')
          .insert(sampleAbout)
          .select()
          .single();
          
        if (insertError) {
          console.error('Error creating sample about section:', insertError);
          toast.error(`Error creating sample about section: ${insertError.message}`);
        } else {
          setName(newData.title);
          setContent(newData.description);
          return newData;
        }
      }
      
      if (error && error.code !== 'PGRST116') {  // PGRST116 is "No rows returned" error
        throw error;
      }
      
      // Set the state values once data is loaded
      if (data) {
        setName(data.title || '');
        setContent(data.description || '');
      }
      
      return data;
    },
    enabled: !!sections && sections.length > 0
  });

  // Update about content
  const mutation = useMutation({
    mutationFn: async () => {
      if (!sections || !sections[0]) {
        throw new Error('About section not found');
      }
      
      const aboutItem = {
        title: name,
        description: content,
        section_id: sections[0].id
      };
      
      if (aboutData) {
        // Update
        const { data, error } = await supabase
          .from('resume_items')
          .update({
            ...aboutItem,
            updated_at: new Date().toISOString()
          })
          .eq('id', aboutData.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create
        const { data, error } = await supabase
          .from('resume_items')
          .insert({
            ...aboutItem,
            display_order: 1
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutContent'] });
      toast.success('About information updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>About Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="name">Your Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="about">About Content</label>
              <Textarea
                id="about"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write something about yourself..."
                rows={8}
                required
              />
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAbout;
