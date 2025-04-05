
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from 'lucide-react';

interface AboutSection {
  id: string;
  full_name: string;
  headline: string;
  intro_text: string;
  locations: string[];
  skills_items: string[];
  success_items: string[];
  created_at: string;
  updated_at: string;
}

const AdminAbout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<AboutSection> | null>(null);
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

  // Fetch about data
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['aboutData', sections ? sections[0]?.id : null],
    queryFn: async () => {
      if (!sections || !sections[0]) {
        return null;
      }
      
      const { data, error } = await supabase
        .from('resume_items')
        .select('*')
        .eq('section_id', sections[0].id)
        .eq('title', 'about_info')
        .maybeSingle();
      
      if (error) throw error;
      
      if (!data) {
        return {
          full_name: 'Michael Macri',
          headline: '',
          intro_text: '',
          locations: ['Edmonds, WA', 'San Diego, CA', 'San Francisco, CA', 'Chicago, IL', 'South Bend, IN', 'Denver, CO', 'Remote'],
          skills_items: [
            'Operational Efficiency: Implementing practical solutions that cut training time and prevent compliance issues.',
            'Team Leadership: Building and aligning high-performing teams for clear, measurable results.',
            'Process Improvement: Streamlining workflows to reduce redundancy and enhance transparency.',
            'Product Adoption: Developing self-service tools and playbooks that drive usage and build customer trust.'
          ],
          success_items: [
            'Policy & Compliance: Created PolicyHub for on-demand access to 400+ policies, reducing training time and compliance risk.',
            'Customer Success: Built playbooks and dashboards that increased product adoption by 21% and raised NPS by 30 points.',
            'GTM Strategy: Defined and executed business plans driving 644% revenue growth in FY21 H1, 466% in FY21 H2 and a quarterly pipeline increase of 250%.',
            'Partner Growth: Secured top-tier partnerships with GSIs, boosting revenue and outperforming competitors.',
            'AI/ML Initiatives: Acted as SME for enterprise AI/ML policy creation, ensuring ethical compliance and effective data governance.'
          ]
        };
      }
      
      try {
        // If description is valid JSON, parse it
        const parsedData = JSON.parse(data.description || '{}');
        return {
          id: data.id,
          ...parsedData
        };
      } catch (e) {
        // If not valid JSON, return default
        return {
          id: data.id,
          full_name: 'Michael Macri',
          headline: '',
          intro_text: '',
          locations: ['Edmonds, WA', 'San Diego, CA', 'San Francisco, CA', 'Chicago, IL', 'South Bend, IN', 'Denver, CO', 'Remote'],
          skills_items: [],
          success_items: []
        };
      }
    },
    enabled: !!sections && sections.length > 0
  });

  // Save about data
  const mutation = useMutation({
    mutationFn: async (item: Partial<AboutSection>) => {
      if (!sections || !sections[0]) {
        throw new Error('About section not found');
      }
      
      // Store serializable data in the description field as JSON
      const serializedData = JSON.stringify({
        full_name: item.full_name || 'Michael Macri',
        headline: item.headline || '',
        intro_text: item.intro_text || '',
        locations: item.locations || [],
        skills_items: item.skills_items || [],
        success_items: item.success_items || []
      });
      
      const itemData = {
        title: 'about_info',
        description: serializedData,
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
        // Create
        const { data, error } = await supabase
          .from('resume_items')
          .insert({
            ...itemData,
            display_order: 1
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutData'] });
      toast.success('About information updated successfully');
      setIsDialogOpen(false);
      setCurrentItem(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const handleEditAboutInfo = () => {
    if (aboutData) {
      setCurrentItem({
        id: aboutData.id,
        full_name: aboutData.full_name,
        headline: aboutData.headline,
        intro_text: aboutData.intro_text,
        locations: aboutData.locations,
        skills_items: aboutData.skills_items,
        success_items: aboutData.success_items
      });
    } else {
      setCurrentItem({ 
        full_name: 'Michael Macri',
        headline: '',
        intro_text: '',
        locations: ['Edmonds, WA', 'San Diego, CA', 'San Francisco, CA', 'Chicago, IL', 'South Bend, IN', 'Denver, CO', 'Remote'],
        skills_items: [],
        success_items: []
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      mutation.mutate(currentItem);
    }
  };

  if (isLoading) {
    return <div>Loading about information...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">About Section Management</h2>
        <Button onClick={handleEditAboutInfo} size="sm">
          <Pencil className="mr-2 h-4 w-4" /> Edit About Information
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div>
                <strong>Name:</strong> {aboutData?.full_name}
              </div>
              <div>
                <strong>Headline:</strong> {aboutData?.headline || "-"}
              </div>
              <div>
                <strong>Intro Text:</strong> {aboutData?.intro_text || "-"}
              </div>
              <div>
                <strong>Locations:</strong> {aboutData?.locations?.join(", ") || "-"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {aboutData?.skills_items && aboutData.skills_items.length > 0 ? (
                aboutData.skills_items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No skills highlights defined</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {aboutData?.success_items && aboutData.success_items.length > 0 ? (
                aboutData.success_items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No success highlights defined</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit About Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="full_name">Full Name</label>
                <Input
                  id="full_name"
                  value={currentItem?.full_name || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, full_name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="headline">Headline</label>
                <Input
                  id="headline"
                  value={currentItem?.headline || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, headline: e.target.value })}
                  placeholder="Your professional headline"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="intro_text">Introduction Text</label>
                <Textarea
                  id="intro_text"
                  value={currentItem?.intro_text || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, intro_text: e.target.value })}
                  placeholder="A brief introduction about yourself"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="locations">Locations (comma separated)</label>
                <Textarea
                  id="locations"
                  value={currentItem?.locations?.join("\n") || ''}
                  onChange={(e) => setCurrentItem({ 
                    ...currentItem, 
                    locations: e.target.value.split("\n").map(loc => loc.trim()).filter(loc => loc) 
                  })}
                  placeholder="Each location on a new line"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">Enter each location on a new line</p>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="skills">Skills Highlights (each on a new line)</label>
                <Textarea
                  id="skills"
                  value={currentItem?.skills_items?.join("\n") || ''}
                  onChange={(e) => setCurrentItem({ 
                    ...currentItem, 
                    skills_items: e.target.value.split("\n").map(skill => skill.trim()).filter(skill => skill) 
                  })}
                  placeholder="Each skill highlight on a new line"
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">Enter each skill highlight on a new line</p>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="success">Success Highlights (each on a new line)</label>
                <Textarea
                  id="success"
                  value={currentItem?.success_items?.join("\n") || ''}
                  onChange={(e) => setCurrentItem({ 
                    ...currentItem, 
                    success_items: e.target.value.split("\n").map(success => success.trim()).filter(success => success) 
                  })}
                  placeholder="Each success highlight on a new line"
                  rows={5}
                />
                <p className="text-sm text-muted-foreground">Enter each success highlight on a new line</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save About Information'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAbout;
