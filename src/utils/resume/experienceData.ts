
import { supabase } from '@/integrations/supabase/client';

export const createExperienceData = async (sectionId: string) => {
  console.log('Creating experience data for section ID:', sectionId);
  
  if (!sectionId) {
    console.error('No section ID provided to createExperienceData');
    throw new Error('Section ID is required for createExperienceData');
  }
  
  try {
    // First, check if there are already items for this section
    const { count, error: countError } = await supabase
      .from('resume_items')
      .select('*', { count: 'exact', head: true })
      .eq('section_id', sectionId);
      
    if (countError) {
      console.error('Error checking for existing items:', countError);
      throw countError;
    }
    
    if ((count || 0) > 0) {
      console.log(`Section already has ${count} items, skipping creation`);
      return;
    }
  
    // Clear any existing experience items for this section as a safety measure
    const { error: deleteError } = await supabase
      .from('resume_items')
      .delete()
      .eq('section_id', sectionId);
      
    if (deleteError) {
      console.error('Error deleting existing experience items:', deleteError);
      throw deleteError;
    }
    
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
    
    // Insert each experience one by one to make debugging easier
    for (const experience of experiences) {
      console.log(`Creating experience: ${experience.title}`);
      try {
        const { data, error } = await supabase
          .from('resume_items')
          .insert(experience)
          .select();
          
        if (error) {
          console.error(`Error creating experience data for ${experience.title}:`, error);
          throw error;
        }
        
        console.log(`Successfully created experience: ${experience.title}`);
      } catch (err) {
        console.error(`Failed to create experience item: ${experience.title}`, err);
        throw err;
      }
    }
    
    console.log('Successfully created all experience items');
    
    // Verify that the items were actually created
    const { data: createdItems, error: verifyError } = await supabase
      .from('resume_items')
      .select('*')
      .eq('section_id', sectionId)
      .order('display_order', { ascending: true });
      
    if (verifyError) {
      console.error('Error verifying created items:', verifyError);
    } else {
      console.log(`Verified created items: ${createdItems?.length || 0}`);
      if (createdItems && createdItems.length > 0) {
        console.log('First created item:', createdItems[0]);
      }
    }
  } catch (error) {
    console.error('Error in createExperienceData:', error);
    throw error;
  }
};
