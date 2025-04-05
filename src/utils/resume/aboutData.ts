
import { supabase } from '@/integrations/supabase/client';

export const createAboutData = async (sectionId: string) => {
  const aboutData = {
    title: 'Michael Macri',
    description: JSON.stringify({
      full_name: 'Michael Macri',
      headline: 'Value-driven leader with 25 years of experience',
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
      ]
    }),
    section_id: sectionId,
    display_order: 1
  };

  const { error } = await supabase
    .from('resume_items')
    .insert(aboutData);
    
  if (error) {
    console.error('Error creating about data:', error);
    throw error;
  }
};
