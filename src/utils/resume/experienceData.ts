
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
        title: "Sr. Manager, Solution Consulting – Legal Ethics & Compliance",
        organization: "ServiceNow",
        location: "Remote",
        start_date: "2021-12-01",
        end_date: null,
        description: "Led internal design and consultative solutioning for GRC, Policy, IRM, and SPM modules within ServiceNow's compliance function.\nCollaborated with stakeholders across Legal, Risk, Security, Product, and Engineering to build value allignment and ServiceNow workflows use.\nCreated and managed PolicyHub 1.0, simplifying access to enterprise policies and accelerating internal enablement across servicenow.\nIntegrated AI/ML governance into enterprise frameworks, serving as SME for the creation of ServiceNow's inaugural responsible AI risk policies & requirements.\nDrove senior executives initiatives that streamlined compliance design to secure budget, that protected against a $900M annual security/compliance risk.",
        section_id: sectionId,
        display_order: 1
      },
      {
        title: "Partner Business & Technical Alliance Director -Americas",
        organization: "VMware",
        location: "San Francisco, CA",
        start_date: "2019-11-01",
        end_date: "2021-12-01",
        description: "Led GTM and presales efforts with GSI and SI partners such including DXC, Capgemini, and Accenture.\nDeveloped scalable embedded partner programs and re-platformed service offerings (e.g., DXC VMware Cloud on AWS), aligning go-to-market strategy with partner executive goals.\nDefined and executed joint business plans that led to repeated achievements above 450% of target.\nCollaborated across matrixed SC, ProServ, and specialist teams to support technical sales cycles for strategic system integrator offerings.",
        section_id: sectionId,
        display_order: 2
      },
      {
        title: "Partner Staff Solutions Engineer Leader",
        organization: "VMware",
        location: "Chicago, IL",
        start_date: "2017-12-01",
        end_date: "2019-12-01",
        description: "Identified market alignments with partners to deliver targeted SaaS and hybrid cloud campaigns that increased pipeline capture by 21% sell through growth.\nIdentified joint market opportunities and launched upsell and cross-sell programs resulting in a 20% revenue increase from renewals.\nCoached partner architects and SCs to deliver consultative sales motions, resulting in $440M sell-through revenue and 21% YoY growth.",
        section_id: sectionId,
        display_order: 3
      },
      {
        title: "Sr Manager, Customer Success, TAMs & Product Specialists – West Coast Regional Practice",
        organization: "VMware",
        location: "Seattle, WA",
        start_date: "2014-11-01",
        end_date: "2017-12-01",
        description: "Hired, mentored, and developed customer success teams to deliver a trusted brand increasing product adoption by 44% and improved NPS by 30 points (20 points above goal).\nDeveloped and delivered engagement frameworks that aligned technical outcomes with business value metrics, driving operational efficiency and consistent expansion.",
        section_id: sectionId,
        display_order: 4
      },
      {
        title: "Staff Technical Account Manager",
        organization: "VMware",
        location: "Seattle, WA",
        start_date: "2011-12-01",
        end_date: "2014-11-01",
        description: "Created engagement deliverables aligning customer metrics and enhancing operational efficiency, leading to services attach on all deals.\nCreative solutions that drove product adoption and roadmap expansions. (E.G 500 Costco storefronts in 10 minutes, eliminating on-site visits to free budget for value growth product purchases.",
        section_id: sectionId,
        display_order: 5
      },
      {
        title: "Technical Partner Lead – Channel Partner Strategy (North America)",
        organization: "VMware",
        location: "Seattle, WA",
        start_date: "2011-01-01",
        end_date: "2011-12-01",
        description: "Served as the technical SME and lead for 3 of VMware's top 10 North American partners, enabling C-level alignment and driving partner adoption of VMware jointly created services.\nDesigned and implemented scalable self-service demo labs initiatives with cloud for partners (Zones, CDW, En Pointe, HP, PCMall) enabling partner-SC enablement and solution delivery.",
        section_id: sectionId,
        display_order: 6
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

    return createdItems;
  } catch (error) {
    console.error('Error in createExperienceData:', error);
    throw error;
  }
};
