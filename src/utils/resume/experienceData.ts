
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
        description: "• Led internal design and consultative solutioning for GRC, Policy, Integrated Risk Management (IRM), Strategic Portfolio Management (SPM), and ITOM modules\n• Created PolicyHub and managed operational governance for the internal Legal, Ethics & Compliance department\n• Designed and drove technical deployment of the Ethics & Compliance AI Governance Model\n• Streamlined Compliance and Risk workflows across global operating units to reduce user friction and improve adoption\n• Responsible for management of cross-functional relationships with executive leadership and strategic solution planning",
        section_id: sectionId,
        display_order: 1
      },
      {
        title: "Partner Business & Technical Alliance Director - Americas",
        organization: "VMware",
        location: "San Francisco, CA",
        start_date: "2019-11-01",
        end_date: "2021-12-01",
        description: "• Led strategic partner go-to-market and presales engineering alignment with Global System Integrators (e.g., DXC, Deloitte)\n• Defined and delivered on new partner business motions and innovative joint solutions that delivered 644% target in FY21 H1\n• Developed partner-focused business plans and managed executive alignment across multiple business unit leaders\n• Built and managed global alliance scorecard metrics for new annual recurring revenue margin and non-transactional value",
        section_id: sectionId,
        display_order: 2
      },
      {
        title: "Partner Staff Solutions Engineer Leader",
        organization: "VMware",
        location: "Chicago, IL",
        start_date: "2017-12-01",
        end_date: "2019-11-01",
        description: "• Managed 11 solution engineers in presales activities for partners generating $1.3B in revenue across the Central US and Canada\n• Drove 21% YoY growth, 87% YoY renewals, and 105% YoY SaaS growth through strategic relationship management\n• Coached partner sales engineers on technical and value selling methodologies\n• Leveraged third-party services and partner relationships to create joint solutions that improved technical sales cycles",
        section_id: sectionId,
        display_order: 3
      },
      {
        title: "Sr Manager, WW Customer Success – TAMs & Product Specialists",
        organization: "VMware",
        location: "Seattle, WA",
        start_date: "2014-11-01",
        end_date: "2017-12-01",
        description: "• Led a global team of Technical Account Managers and cloud specialists, managing team performance/metrics\n• Created service delivery frameworks that drove 44% improved product adoption and 30 points of NPS improvement\n• Designed detailed customer success metrics and executive engagement playbooks for enterprise accounts\n• Managed budget and resource forecasting across multiple territories to meet customer and business KPIs",
        section_id: sectionId,
        display_order: 4
      },
      {
        title: "Staff Technical Account Manager",
        organization: "VMware",
        location: "Seattle, WA",
        start_date: "2011-12-01",
        end_date: "2014-11-01",
        description: "• Led weekly governance and executive technical review meetings with CxO and director-level stakeholders\n• Created technical and operational architecture for three Fortune 100 enterprise customers\n• Delivered hybrid cloud adoption and migration strategies for on-premises, private/public cloud environments\n• Developed security and compliance frameworks that mapped to security best practices for audit requirements",
        section_id: sectionId,
        display_order: 5
      },
      {
        title: "Technical Partner Lead – Channel Partner Strategy",
        organization: "VMware",
        location: "Seattle, WA",
        start_date: "2011-01-01",
        end_date: "2011-12-01",
        description: "• Technical lead for top North American partners, enabling strategic alignment and technical enablement\n• Created partner-focused demos and tools that improved the selling capabilities of partner sales engineers\n• Delivered technical training including architecture workshops and certification courses to optimize products",
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
