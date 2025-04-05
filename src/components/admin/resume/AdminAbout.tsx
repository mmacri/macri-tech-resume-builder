
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { PlusCircle, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AboutSection {
  id: string;
  description: string;
  title: string;
  section_id: string;
}

interface AboutData {
  full_name: string;
  headline: string;
  intro_text: string;
  locations: string[];
  skills_items: string[];
  success_items: string[];
  references: string[];
}

const AdminAbout = () => {
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

  const handleAddLocation = () => {
    setAboutData({
      ...aboutData,
      locations: [...aboutData.locations, '']
    });
  };

  const handleRemoveLocation = (index: number) => {
    setAboutData({
      ...aboutData,
      locations: aboutData.locations.filter((_, i) => i !== index)
    });
  };

  const handleUpdateLocation = (index: number, value: string) => {
    const newLocations = [...aboutData.locations];
    newLocations[index] = value;
    setAboutData({
      ...aboutData,
      locations: newLocations
    });
  };

  const handleAddSkill = () => {
    setAboutData({
      ...aboutData,
      skills_items: [...aboutData.skills_items, '']
    });
  };

  const handleRemoveSkill = (index: number) => {
    setAboutData({
      ...aboutData,
      skills_items: aboutData.skills_items.filter((_, i) => i !== index)
    });
  };

  const handleUpdateSkill = (index: number, value: string) => {
    const newSkills = [...aboutData.skills_items];
    newSkills[index] = value;
    setAboutData({
      ...aboutData,
      skills_items: newSkills
    });
  };

  const handleAddSuccess = () => {
    setAboutData({
      ...aboutData,
      success_items: [...aboutData.success_items, '']
    });
  };

  const handleRemoveSuccess = (index: number) => {
    setAboutData({
      ...aboutData,
      success_items: aboutData.success_items.filter((_, i) => i !== index)
    });
  };

  const handleUpdateSuccess = (index: number, value: string) => {
    const newSuccess = [...aboutData.success_items];
    newSuccess[index] = value;
    setAboutData({
      ...aboutData,
      success_items: newSuccess
    });
  };

  const handleAddReference = () => {
    setAboutData({
      ...aboutData,
      references: [...aboutData.references, '']
    });
  };

  const handleRemoveReference = (index: number) => {
    setAboutData({
      ...aboutData,
      references: aboutData.references.filter((_, i) => i !== index)
    });
  };

  const handleUpdateReference = (index: number, value: string) => {
    const newReferences = [...aboutData.references];
    newReferences[index] = value;
    setAboutData({
      ...aboutData,
      references: newReferences
    });
  };

  if (isSectionsLoading || isAboutLoading) {
    return <div>Loading about information...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="main">Main Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="success">Success</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>
          
          <TabsContent value="main">
            <Card>
              <CardHeader>
                <CardTitle>About Information</CardTitle>
                <CardDescription>Edit your main information displayed in the About section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Full Name</label>
                  <Input
                    id="name"
                    value={aboutData.full_name}
                    onChange={(e) => setAboutData({...aboutData, full_name: e.target.value})}
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="headline">Headline (Optional)</label>
                  <Input
                    id="headline"
                    value={aboutData.headline}
                    onChange={(e) => setAboutData({...aboutData, headline: e.target.value})}
                    placeholder="Your headline or tagline"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="intro">Introduction</label>
                  <Textarea
                    id="intro"
                    value={aboutData.intro_text}
                    onChange={(e) => setAboutData({...aboutData, intro_text: e.target.value})}
                    placeholder="Write something about yourself..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label>Locations</label>
                  <div className="space-y-2">
                    {aboutData.locations.map((location, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={location}
                          onChange={(e) => handleUpdateLocation(index, e.target.value)}
                          placeholder="Location"
                          required
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveLocation(index)}
                          disabled={aboutData.locations.length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAddLocation}
                      className="flex items-center"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Location
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skilled In</CardTitle>
                <CardDescription>Edit the skills displayed in your About section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Format as: "Category: Description"</p>
                  {aboutData.skills_items.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={skill}
                        onChange={(e) => handleUpdateSkill(index, e.target.value)}
                        placeholder="Skill: Description"
                        className="flex-1"
                        required
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveSkill(index)}
                        disabled={aboutData.skills_items.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddSkill}
                    className="flex items-center"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Skill
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="success">
            <Card>
              <CardHeader>
                <CardTitle>Demonstrated Success</CardTitle>
                <CardDescription>Edit your success highlights displayed in the About section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Format as: "Category: Description"</p>
                  {aboutData.success_items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={item}
                        onChange={(e) => handleUpdateSuccess(index, e.target.value)}
                        placeholder="Success: Description"
                        className="flex-1"
                        required
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveSuccess(index)}
                        disabled={aboutData.success_items.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddSuccess}
                    className="flex items-center"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Success Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="references">
            <Card>
              <CardHeader>
                <CardTitle>References</CardTitle>
                <CardDescription>Edit the references displayed in the About section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {aboutData.references.map((reference, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={reference}
                        onChange={(e) => handleUpdateReference(index, e.target.value)}
                        placeholder="Reference quote"
                        className="flex-1"
                        rows={4}
                        required
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveReference(index)}
                        disabled={aboutData.references.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddReference}
                    className="flex items-center"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Reference
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAbout;
