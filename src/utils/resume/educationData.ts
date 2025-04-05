
import { supabase } from '@/integrations/supabase/client';

export const createEducationData = async (sectionId: string) => {
  const educationItems = [
    {
      title: "Xavier University - Williams College of Business",
      organization: "MBA",
      description: "Management of Information Systems",
      section_id: sectionId,
      display_order: 1
    },
    {
      title: "Xavier University",
      organization: "B.S.",
      description: "Industrial Organizational Psychology",
      section_id: sectionId,
      display_order: 2
    }
  ];

  for (const education of educationItems) {
    const { error } = await supabase
      .from('resume_items')
      .insert(education);
      
    if (error) {
      console.error('Error creating education data:', error);
      throw error;
    }
  }
};
