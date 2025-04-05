
import { supabase } from '@/integrations/supabase/client';

export const createAwardsData = async (sectionId: string) => {
  const awardItems = [
    {
      title: "AI Security and Governance Certification - Securiti (2024)",
      section_id: sectionId,
      display_order: 1
    },
    {
      title: "VMware Certified Professional",
      section_id: sectionId,
      display_order: 2
    },
    {
      title: "GSI Americas Regions Technical Alliance Manager of the Quarter - FY21Q4",
      section_id: sectionId,
      display_order: 3
    },
    {
      title: "GSI Americas Regions Technical Alliance Manager of the Quarter - FY21Q3",
      section_id: sectionId,
      display_order: 4
    },
    {
      title: "GSI Partners - Rockstar of the Half Award - FY21H2",
      section_id: sectionId,
      display_order: 5
    },
    {
      title: "Partner Solutions Engineer of the Quarter - FY19Q4",
      section_id: sectionId,
      display_order: 6
    },
    {
      title: "VMware Americas VP Award of Service Excellence",
      section_id: sectionId,
      display_order: 7
    }
  ];

  for (const award of awardItems) {
    const { error } = await supabase
      .from('resume_items')
      .insert(award);
      
    if (error) {
      console.error('Error creating award data:', error);
      throw error;
    }
  }
};
