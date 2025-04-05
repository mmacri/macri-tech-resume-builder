
import { supabase } from '@/integrations/supabase/client';

export const createSkillsData = async (sectionId: string) => {
  const skillsItems = [
    {
      title: "Methodologies and Focus",
      description: "Value Selling, Spin Seller, Golden Circle, Phoenix-Project Solutioning, Ethical AI, and Problem Solver",
      section_id: sectionId,
      display_order: 1
    },
    {
      title: "Analytics and Business Intelligence",
      description: "AI/ML implementation, Prompt Engineering, Business Analytics in ServiceNow, PowerBI, and Salesforce",
      section_id: sectionId,
      display_order: 2
    },
    {
      title: "Routes to Market",
      description: "Sell to, sell through, Managed Services, OEM, ISV, and GSI",
      section_id: sectionId,
      display_order: 3
    },
    {
      title: "Solutioning - ServiceNow",
      description: "ServiceNow Core, GRC/IRM, ITSM, ITOM, SecOps, Performance Analytics, CSM, and ITBM",
      section_id: sectionId,
      display_order: 4
    },
    {
      title: "Solutioning - VMware",
      description: "VMware vSphere, vSAN, NSX, SD-WAN, vRealize, vROPS, VMC on AWS, and Tanzu",
      section_id: sectionId,
      display_order: 5
    },
    {
      title: "Solutioning - Cloud",
      description: "AWS, Azure, GCP, Docker, SnowFlake, Splunk, Hybrid Cloud, and HashiCorp",
      section_id: sectionId,
      display_order: 6
    },
    {
      title: "Compliance Frameworks",
      description: "NIST 800-53, NIST AI 600-1, NIST 800-190, NIST CSF, HIPAA, PCI, SOC 2, CIS, STIGS and EU AI Act",
      section_id: sectionId,
      display_order: 7
    },
    {
      title: "Programming",
      description: "Python, Glide, Javascript, HTML, CSS, React, Vue, LLM, and API integrations",
      section_id: sectionId,
      display_order: 8
    }
  ];

  for (const skill of skillsItems) {
    const { error } = await supabase
      .from('resume_items')
      .insert(skill);
      
    if (error) {
      console.error('Error creating skill data:', error);
      throw error;
    }
  }
};
