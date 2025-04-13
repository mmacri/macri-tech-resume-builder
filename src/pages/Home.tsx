
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  // Static experience data to use as fallback
  const staticExperienceData = [
    {
      id: "exp-1",
      title: "Sr Manager, InfoSec Solution & Automation Engineering",
      organization: "ServiceNow.com: Legal, Ethics & Compliance Program",
      location: null,
      start_date: "2021-12-01",
      end_date: null,
      description: "Created PolicyHub – a self-service portal centralizing 400+ policies – to enable fast, secure access to critical compliance documentation and reduce training dependency.\nEnhanced product features in GRC, Policy & Compliance, Strategic Portfolio Manager, and risk management by aligning cross-functional processes.\nCollaborated with executives to resolve production vulnerabilities, mitigating $900M in annual revenue risk.\nStreamlined workflows and implemented common controls to reduce redundant operations and boost data transparency.",
      display_order: 1,
      section_id: "exp-section",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "exp-2",
      title: "Partner Business Development & Technical Alliance Director – GSI's Americas",
      organization: "VMware.com: Global System Integrators Program (GSI/MSP Sales)",
      location: null,
      start_date: "2019-11-01",
      end_date: "2021-12-01",
      description: "Managed VMware's largest alliances with strategic system integrators, driving multi-hundred-million-dollar growth.\nDefined and executed joint business plans that delivered 644% revenue growth in FY21 H1 and 466% in FY21 H2.\nExpanded the quarterly pipeline by 250% through partnerships with DXC, Capgemini, and others.\nAwarded Partner Business Manager MVP and Regional Technical Alliance Manager of the Quarter on multiple occasions.",
      display_order: 2,
      section_id: "exp-section",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "exp-3",
      title: "Partner Staff Solutions Engineer",
      organization: "VMware.com: Channel Partner Engineering",
      location: null,
      start_date: "2017-12-01",
      end_date: "2019-12-01",
      description: "Partnered with CDW to drive $440M through multi-tiered routes-to-market.\nDelivered targeted SaaS and hybrid cloud campaigns that increased pipeline capture by 20%.\nLaunched new upsell and cross-sell programs that resulted in a 20% revenue increase from renewals.\nImplemented technical enablement programs that boosted solution adoption by 20%.",
      display_order: 3,
      section_id: "exp-section",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "exp-4",
      title: "Sr Manager, Customer Success TAMs & Product Specialists – West Coast Regional Practice",
      organization: "VMware.com - Pre & Post Sales Solutions",
      location: null,
      start_date: "2014-10-01",
      end_date: "2017-12-01",
      description: "Developed and branded customer success teams that increased solution adoption by 44% and improved NPS by 30 points (20 points above goal).\nCreated customer success playbooks, account plans, and success metrics that were adopted nationally.\nBuilt Salesforce and Power BI dashboards to identify and track key customer success metrics.",
      display_order: 4,
      section_id: "exp-section",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "exp-5",
      title: "Staff Technical Account Manager – Team Lead",
      organization: "VMware.com - Technical Account Solutions",
      location: null,
      start_date: "2011-12-01",
      end_date: "2014-11-01",
      description: "Automated Costco's storefront deployment across 500+ locations, reducing setup time from 4 hours to 10 minutes and generating significant CAPEX/OPEX savings.\nEnabled Nike's adoption of VMware-integrated OpenStack solutions, enhancing operational efficiency and scalability.",
      display_order: 5,
      section_id: "exp-section",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "exp-6",
      title: "Senior Systems Engineer – National Channel Partners Team",
      organization: "VMware",
      location: null,
      start_date: "2011-05-01",
      end_date: "2011-12-01",
      description: "Managed channel partner engagement and enablement plans that increased VMware demand by $16.5M in realized revenue.",
      display_order: 6,
      section_id: "exp-section",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "exp-7",
      title: "Group Manager / Lead Senior Consultant",
      organization: "ISOutsource",
      location: null,
      start_date: "2007-01-01",
      end_date: "2011-05-01",
      description: "Improved project efficiency and profit margins by 14% using pod-based frameworks.",
      display_order: 7,
      section_id: "exp-section",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "exp-8",
      title: "Entrepreneur / Managing Partner",
      organization: "Connecting Point",
      location: null,
      start_date: "2002-11-01",
      end_date: "2006-12-01",
      description: "Founded a professional services division that led to acquisition and rebranding as Connecting Point of Indiana.",
      display_order: 8,
      section_id: "exp-section",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Fetch all resume sections data to pass to components
  const { data: resumeSections, isLoading } = useQuery({
    queryKey: ['resumeSections'],
    queryFn: async () => {
      console.log('Fetching resume sections data');
      
      try {
        // Get all sections
        const { data: sections, error: sectionsError } = await supabase
          .from('resume_sections')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (sectionsError) {
          console.error('Error fetching sections:', sectionsError);
          throw sectionsError;
        }
        
        console.log('Fetched sections:', sections);
        
        // For each section, get its items
        const sectionsWithItems = await Promise.all(sections.map(async (section) => {
          console.log(`Fetching items for section ${section.section_name}`);
          
          const { data: items, error: itemsError } = await supabase
            .from('resume_items')
            .select('*')
            .eq('section_id', section.id)
            .order('display_order', { ascending: true });
          
          if (itemsError) {
            console.error(`Error fetching items for section ${section.section_name}:`, itemsError);
            throw itemsError;
          }
          
          console.log(`Found ${items?.length || 0} items for section ${section.section_name}`);
          
          // Special case for experience section - use static data if no items found
          if (section.section_name === 'experience' && (!items || items.length === 0)) {
            return {
              ...section,
              items: staticExperienceData
            };
          }
          
          return {
            ...section,
            items: items || []
          };
        }));
        
        return sectionsWithItems;
      } catch (error) {
        console.error('Error fetching resume sections:', error);
        // Return a minimal fallback structure with static experience data
        return [
          {
            id: "exp-section",
            section_name: "experience",
            display_order: 2,
            items: staticExperienceData
          }
        ];
      }
    },
    // Set a very large staleTime to avoid refetching too often while we debug
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: false // Disable retries to avoid spamming with errors
  });

  const getSectionItems = (sectionName: string) => {
    if (isLoading) return [];
    
    // Special case for experience section - always return static data for now
    if (sectionName === 'experience') {
      return staticExperienceData;
    }
    
    if (!resumeSections) return [];
    const section = resumeSections.find(s => s.section_name === sectionName);
    const items = section ? section.items : [];
    console.log(`Getting items for ${sectionName}:`, items);
    return items;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <AboutSection items={getSectionItems('about')} />
      <hr className="m-0" />
      <ExperienceSection items={getSectionItems('experience')} />
      <hr className="m-0" />
      <EducationSection items={getSectionItems('education')} />
      <hr className="m-0" />
      <SkillsSection items={getSectionItems('skills')} />
      <hr className="m-0" />
      <InterestsSection items={getSectionItems('interests')} />
      <hr className="m-0" />
      <AwardsSection items={getSectionItems('awards')} />
    </>
  );
};

export default Home;
