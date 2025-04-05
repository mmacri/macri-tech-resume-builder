
import { supabase } from '@/integrations/supabase/client';

export const createInterestsData = async (sectionId: string) => {
  const interestItems = [
    {
      title: "Interest Paragraph",
      description: "Outside of my professional work, I stay current with advancements in AI, automation, and cloud computing—exploring practical applications that solve complex problems.",
      section_id: sectionId,
      display_order: 1
    },
    {
      title: "Interest Paragraph",
      description: "I also enjoy traveling between my homes in Washington, California, and Illinois, with outdoor activities like hiking and fishing to recharge.",
      section_id: sectionId,
      display_order: 2
    },
    {
      title: "Interest Paragraph",
      description: "Indoors, I pursue photography, AI-powered content projects, and innovative investing in crypto and global stock markets.",
      section_id: sectionId,
      display_order: 3
    }
  ];

  for (const interest of interestItems) {
    const { error } = await supabase
      .from('resume_items')
      .insert(interest);
      
    if (error) {
      console.error('Error creating interest data:', error);
      throw error;
    }
  }
};
