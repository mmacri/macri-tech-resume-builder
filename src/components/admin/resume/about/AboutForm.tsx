
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainInfoTab from './MainInfoTab';
import SkillsTab from './SkillsTab';
import SuccessTab from './SuccessTab';
import ReferencesTab from './ReferencesTab';
import { AboutData } from './types';

const AboutForm = () => {
  const [activeTab, setActiveTab] = useState("main");
  const [aboutData, setAboutData] = useState<AboutData>({
    full_name: '',
    headline: '',
    intro_text: '',
    locations: [''],
    skills_items: [''],
    success_items: [''],
    references: ['']
  });
  const queryClient = useQueryClient();

  // Fetch about section ID
  const { data: sections, isLoading: isSectionsLoading } = useQuery({
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
  const { data: aboutItem, isLoading: isAboutLoading } = useQuery({
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
        
        const defaultAboutData: AboutData = {
          full_name: 'Michael Macri',
          headline: '',
          intro_text: 'A value-driven leader with 25 years of experience recognized for customer success programs, partner management, and solution advisory, specializing in enterprise technology adoption, renewal, and upsell.',
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
          ],
          references: [
            "I have worked with Mike for the past 5 years during my time as an Enterprise Sales Exec at VMware. From Day 1 Mike has been a tremendous business partner (not only to me but most importantly, to my customers). Mike leads by example in holding himself and his team accountable resulting in the highest levels of customer satisfaction and building long-term, trusted, customer relationships. Working with Mike has been a pleasure; his attention to detail, work ethic, and unyielding commitment to delivering customer business goals &amp; outcomes has been invaluable.",
            "I find Mike to be a manager that is a true mentor, coach, and leader. Mike not only guides but listens. When I found myself in a quandary his 'Next Step' has always got me further in my endeavors, from customer maturity to conversations with Directors and above we always moved the needle."
          ]
        };
        
        const sampleAbout = {
          title: 'About',
          description: JSON.stringify(defaultAboutData),
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
          throw insertError;
        }
        
        return newData;
      }
      
      if (error && error.code !== 'PGRST116') {  // PGRST116 is "No rows returned" error
        throw error;
      }
      
      return data;
    },
    enabled: !!sections && sections.length > 0
  });

  // Initialize state with loaded data
  useEffect(() => {
    if (aboutItem?.description) {
      try {
        const parsedData = JSON.parse(aboutItem.description);
        setAboutData({
          full_name: parsedData.full_name || '',
          headline: parsedData.headline || '',
          intro_text: parsedData.intro_text || '',
          locations: parsedData.locations || [''],
          skills_items: parsedData.skills_items || [''],
          success_items: parsedData.success_items || [''],
          references: parsedData.references || ['']
        });
      } catch (e) {
        console.error("Error parsing about data:", e);
        toast.error("Error parsing about data");
      }
    }
  }, [aboutItem]);

  // Update about content
  const mutation = useMutation({
    mutationFn: async () => {
      if (!sections || !sections[0]) {
        throw new Error('About section not found');
      }
      
      const aboutItemData = {
        title: 'About',
        description: JSON.stringify(aboutData),
        section_id: sections[0].id
      };
      
      if (aboutItem) {
        // Update
        const { data, error } = await supabase
          .from('resume_items')
          .update({
            ...aboutItemData,
            updated_at: new Date().toISOString()
          })
          .eq('id', aboutItem.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create
        const { data, error } = await supabase
          .from('resume_items')
          .insert({
            ...aboutItemData,
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

  if (isSectionsLoading || isAboutLoading) {
    return <div>Loading about information...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="main">Main Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="success">Success</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <MainInfoTab 
            aboutData={aboutData} 
            setAboutData={setAboutData} 
          />
        </TabsContent>
        
        <TabsContent value="skills">
          <SkillsTab 
            skillsItems={aboutData.skills_items}
            updateSkills={(newSkills) => setAboutData({...aboutData, skills_items: newSkills})}
          />
        </TabsContent>
        
        <TabsContent value="success">
          <SuccessTab 
            successItems={aboutData.success_items}
            updateSuccessItems={(newItems) => setAboutData({...aboutData, success_items: newItems})}
          />
        </TabsContent>
        
        <TabsContent value="references">
          <ReferencesTab 
            references={aboutData.references}
            updateReferences={(newRefs) => setAboutData({...aboutData, references: newRefs})}
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </form>
  );
};

export default AboutForm;
