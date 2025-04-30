
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  display_order: number;
  section_id: string;
  created_at: string;
  updated_at: string;
}

export const useExperienceItems = (sectionId: string | undefined) => {
  // Fetch experience items
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['experienceItems', sectionId],
    queryFn: async () => {
      try {
        if (!sectionId) {
          console.log('No section ID provided to useExperienceItems, attempting to find experience section...');
          
          // Try to find the experience section ID
          const { data: sections, error: sectionsError } = await supabase
            .from('resume_sections')
            .select('id, section_name')
            .ilike('section_name', 'experience')
            .maybeSingle();
            
          if (sectionsError) {
            console.error('Error looking up experience section:', sectionsError);
            throw new Error(`Could not find experience section: ${sectionsError.message}`);
          }
          
          if (!sections) {
            console.log('Experience section not found in database. Creating one...');
            
            // Create the experience section if it doesn't exist
            const { data: newSection, error: createError } = await supabase
              .from('resume_sections')
              .insert({ section_name: 'experience', display_order: 2 })
              .select()
              .single();
              
            if (createError) {
              console.error('Error creating experience section:', createError);
              throw new Error(`Failed to create experience section: ${createError.message}`);
            }
            
            if (newSection) {
              console.log('Created new experience section:', newSection);
              sectionId = newSection.id;
              
              // After creating a section, we need to populate it with experience items
              await populateExperienceItems(sectionId);
              
              return await fetchExperienceItems(sectionId);
            }
            
            throw new Error('Failed to create or find experience section');
          }
          
          sectionId = sections.id;
          console.log(`Found experience section ID: ${sectionId} (${sections.section_name})`);
        }
        
        return await fetchExperienceItems(sectionId);
      } catch (error) {
        console.error('Error in useExperienceItems:', error);
        throw error;
      }
    },
    enabled: true, // Enable the query even without sectionId, we'll try to find it
    staleTime: 5000, // 5 seconds before considering data stale
  });

  return {
    items: data || [], // Return items directly and ensure it's never undefined
    isItemsLoading: isLoading,
    error,
    refetch
  };
};

// Helper function to fetch experience items
const fetchExperienceItems = async (sectionId: string) => {
  console.log('Fetching experience items for section:', sectionId);
  
  const { data, error } = await supabase
    .from('resume_items')
    .select('*')
    .eq('section_id', sectionId)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching experience items:', error);
    throw error;
  }
  
  console.log('Experience items found:', data?.length || 0);
  if (data && data.length > 0) {
    console.log('First experience item:', data[0]);
  } else {
    console.log('No experience items found for section ID:', sectionId);
    
    // Check if we need to initialize the experience items
    try {
      await populateExperienceItems(sectionId);
      
      // Fetch again after populating
      const { data: refreshedData, error: refreshError } = await supabase
        .from('resume_items')
        .select('*')
        .eq('section_id', sectionId)
        .order('display_order', { ascending: true });
        
      if (refreshError) {
        console.error('Error fetching refreshed experience items:', refreshError);
        throw refreshError;
      }
      
      console.log('After populating, found experience items:', refreshedData?.length || 0);
      return refreshedData || [];
    } catch (initError) {
      console.error('Error populating experience items:', initError);
      // Return empty array if population fails
      return [];
    }
  }
  
  return data || [];
};

// Helper function to populate experience items if none exist
const populateExperienceItems = async (sectionId: string) => {
  console.log('Populating experience items for section:', sectionId);
  
  // Check if there are already items for this section
  const { count, error: countError } = await supabase
    .from('resume_items')
    .select('*', { count: 'exact', head: true })
    .eq('section_id', sectionId);
    
  if (countError) {
    console.error('Error checking for existing experience items:', countError);
    throw countError;
  }
  
  if ((count || 0) > 0) {
    console.log(`Section already has ${count} items, no need to populate`);
    return;
  }
  
  // Create sample experience items
  const experiences = [
    {
      title: "Sr Manager, InfoSec Solution & Automation Engineering",
      organization: "ServiceNow.com: Legal, Ethics & Compliance Program",
      location: null,
      start_date: "2021-12-01",
      end_date: null,
      description: "Created PolicyHub – a self-service portal centralizing 400+ policies – to enable fast, secure access to critical compliance documentation and reduce training dependency.\nEnhanced product features in GRC, Policy & Compliance, Strategic Portfolio Manager, and risk management by aligning cross-functional processes.\nCollaborated with executives to resolve production vulnerabilities, mitigating $900M in annual revenue risk.\nStreamlined workflows and implemented common controls to reduce redundant operations and boost data transparency.",
      section_id: sectionId,
      display_order: 1
    },
    {
      title: "Partner Business Development & Technical Alliance Director – GSI's Americas",
      organization: "VMware.com: Global System Integrators Program (GSI/MSP Sales)",
      location: null,
      start_date: "2019-11-01",
      end_date: "2021-12-01",
      description: "Managed VMware's largest alliances with strategic system integrators, driving multi-hundred-million-dollar growth.\nDefined and executed joint business plans that delivered 644% revenue growth in FY21 H1 and 466% in FY21 H2.\nExpanded the quarterly pipeline by 250% through partnerships with DXC, Capgemini, and others.\nAwarded Partner Business Manager MVP and Regional Technical Alliance Manager of the Quarter on multiple occasions.",
      section_id: sectionId,
      display_order: 2
    },
    {
      title: "Partner Staff Solutions Engineer",
      organization: "VMware.com: Channel Partner Engineering",
      location: null,
      start_date: "2017-12-01",
      end_date: "2019-12-01",
      description: "Partnered with CDW to drive $440M through multi-tiered routes-to-market.\nDelivered targeted SaaS and hybrid cloud campaigns that increased pipeline capture by 20%.\nLaunched new upsell and cross-sell programs that resulted in a 20% revenue increase from renewals.\nImplemented technical enablement programs that boosted solution adoption by 20%.",
      section_id: sectionId,
      display_order: 3
    },
    {
      title: "Sr Manager, Customer Success TAMs & Product Specialists – West Coast Regional Practice",
      organization: "VMware.com - Pre & Post Sales Solutions",
      location: null,
      start_date: "2014-10-01",
      end_date: "2017-12-01",
      description: "Developed and branded customer success teams that increased solution adoption by 44% and improved NPS by 30 points (20 points above goal).\nCreated customer success playbooks, account plans, and success metrics that were adopted nationally.\nBuilt Salesforce and Power BI dashboards to identify and track key customer success metrics.",
      section_id: sectionId,
      display_order: 4
    },
    {
      title: "Staff Technical Account Manager – Team Lead",
      organization: "VMware.com - Technical Account Solutions",
      location: null,
      start_date: "2011-12-01",
      end_date: "2014-11-01",
      description: "Automated Costco's storefront deployment across 500+ locations, reducing setup time from 4 hours to 10 minutes and generating significant CAPEX/OPEX savings.\nEnabled Nike's adoption of VMware-integrated OpenStack solutions, enhancing operational efficiency and scalability.",
      section_id: sectionId,
      display_order: 5
    },
    {
      title: "Senior Systems Engineer – National Channel Partners Team",
      organization: "VMware",
      location: null,
      start_date: "2011-05-01",
      end_date: "2011-12-01",
      description: "Managed channel partner engagement and enablement plans that increased VMware demand by $16.5M in realized revenue.",
      section_id: sectionId,
      display_order: 6
    },
    {
      title: "Group Manager / Lead Senior Consultant",
      organization: "ISOutsource",
      location: null,
      start_date: "2007-01-01",
      end_date: "2011-05-01",
      description: "Improved project efficiency and profit margins by 14% using pod-based frameworks.",
      section_id: sectionId,
      display_order: 7
    },
    {
      title: "Entrepreneur / Managing Partner",
      organization: "Connecting Point",
      location: null,
      start_date: "2002-11-01",
      end_date: "2006-12-01",
      description: "Founded a professional services division that led to acquisition and rebranding as Connecting Point of Indiana.",
      section_id: sectionId,
      display_order: 8
    }
  ];
  
  console.log(`Attempting to create ${experiences.length} experience items`);
  
  // Delete existing items for this section (if any, to avoid duplicates)
  const { error: deleteError } = await supabase
    .from('resume_items')
    .delete()
    .eq('section_id', sectionId);
    
  if (deleteError) {
    console.error('Error deleting existing items:', deleteError);
    throw deleteError;
  }
  
  // Insert all experience items
  for (const experience of experiences) {
    try {
      const { data, error } = await supabase
        .from('resume_items')
        .insert(experience)
        .select();
        
      if (error) {
        console.error(`Error creating experience: ${experience.title}`, error);
        throw error;
      }
      
      console.log(`Created experience: ${experience.title}`);
    } catch (err) {
      console.error(`Failed to create experience: ${experience.title}`, err);
      throw err;
    }
  }
  
  console.log('Successfully created all experience items');
};
