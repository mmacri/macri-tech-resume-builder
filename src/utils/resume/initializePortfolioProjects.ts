
import { supabase } from '@/integrations/supabase/client';

export const createPortfolioProjects = async () => {
  const projects = [
    {
      title: 'Policy & Compliance Hub',
      description: 'A self-service portal centralizing 400+ policies to enable fast, secure access to critical compliance documentation and reduce training dependency.',
      technologies: ['ServiceNow', 'GRC', 'Policy & Compliance', 'Risk Management'],
      image_url: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1',
      link: '#',
      display_order: 1
    },
    {
      title: 'Customer Success Dashboard',
      description: 'Advanced dashboard system that increased product adoption by 21% and raised NPS by 30 points through improved tracking and visualization of customer metrics.',
      technologies: ['Salesforce', 'PowerBI', 'Data Analytics'],
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      link: '#',
      display_order: 2
    },
    {
      title: 'Strategic Partner Enablement',
      description: 'Comprehensive GSI partner program that delivered 644% revenue growth in FY21 H1 and 466% in FY21 H2.',
      technologies: ['Business Development', 'Partner Management', 'VMware Solutions'],
      image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      link: '#',
      display_order: 3
    }
  ];

  for (const project of projects) {
    const { error } = await supabase
      .from('portfolio_projects')
      .insert(project);
      
    if (error) {
      console.error('Error creating portfolio project:', error);
      throw error;
    }
  }
};
