
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useInitializeResumeData = () => {
  // Initialize data function
  const initializeDataMutation = useMutation({
    mutationFn: async () => {
      console.log('Initializing real resume data...');
      
      try {
        // Check if we have a profile
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .limit(1);
        
        // Instead of checking profiles.length, we'll directly create the profile if needed
        if (!profiles || profiles.length === 0) {
          console.log('Creating default admin profile');
          // Use a UUID we generate here rather than relying on a special role
          const { data: authUser } = await supabase.auth.getUser();
          const profileId = authUser?.user?.id || '00000000-0000-0000-0000-000000000000';
          
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: profileId,
              full_name: 'Michael Macri',
              username: 'admin',
              is_admin: true
            });
            
          if (profileError) {
            console.error('Error creating profile:', profileError);
            throw profileError;
          }
        }

        // Initialize resume sections if they don't exist
        const sections = [
          { section_name: 'about', display_order: 1 },
          { section_name: 'experience', display_order: 2 },
          { section_name: 'education', display_order: 3 },
          { section_name: 'skills', display_order: 4 },
          { section_name: 'interests', display_order: 5 },
          { section_name: 'awards', display_order: 6 }
        ];

        for (const section of sections) {
          const { data: existingSection } = await supabase
            .from('resume_sections')
            .select('*')
            .eq('section_name', section.section_name)
            .single();

          if (!existingSection) {
            console.log(`Creating ${section.section_name} section`);
            const { data: newSection, error } = await supabase
              .from('resume_sections')
              .insert(section)
              .select()
              .single();
            
            if (error) {
              console.error(`Error creating ${section.section_name} section:`, error);
              throw error;
            }
            
            // Initialize section items based on real data
            await populateSectionItems(newSection.id, section.section_name);
          } else {
            // Check if section already has items
            const { count, error } = await supabase
              .from('resume_items')
              .select('count')
              .eq('section_id', existingSection.id)
              .single() || { count: 0, error: null };
            
            if (error && error.code !== 'PGRST116') {
              console.log('Error checking item count:', error);
            }
            
            const itemCount = count || 0;
            console.log(`Section ${section.section_name} has ${itemCount} items`);
            
            if (itemCount === 0) {
              await populateSectionItems(existingSection.id, section.section_name);
            }
          }
        }

        // Initialize portfolio projects if they don't exist
        const { count: projectCount } = await supabase
          .from('portfolio_projects')
          .select('count')
          .single() || { count: 0 };
        
        if (projectCount === 0) {
          await createPortfolioProjects();
        }

        return { success: true };
      } catch (error) {
        console.error('Error in initializeDataMutation:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Resume data initialized successfully');
    },
    onError: (error: Error) => {
      console.error('Error initializing data:', error);
      toast.error(`Failed to initialize data: ${error.message}`);
    }
  });

  // Helper function to populate section items with real data
  const populateSectionItems = async (sectionId: string, sectionName: string) => {
    try {
      switch (sectionName) {
        case 'about':
          await createAboutData(sectionId);
          break;
        case 'experience':
          await createExperienceData(sectionId);
          break;
        case 'education':
          await createEducationData(sectionId);
          break;
        case 'skills':
          await createSkillsData(sectionId);
          break;
        case 'interests':
          await createInterestsData(sectionId);
          break;
        case 'awards':
          await createAwardsData(sectionId);
          break;
      }
    } catch (error) {
      console.error(`Error populating ${sectionName} section:`, error);
      throw error;
    }
  };

  // About section data
  const createAboutData = async (sectionId: string) => {
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

  // Experience section data - Using the real data from the HTML
  const createExperienceData = async (sectionId: string) => {
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

    for (const experience of experiences) {
      const { error } = await supabase
        .from('resume_items')
        .insert(experience);
        
      if (error) {
        console.error('Error creating experience data:', error);
        throw error;
      }
    }
  };

  // Education section data
  const createEducationData = async (sectionId: string) => {
    const educationItems = [
      {
        title: "Xavier University - Williams College of Business",
        organization: "MBA",
        description: "Management of Information Systems",
        section_id: sectionId,
        display_order: 1
      },
      {
        title: "Xavier University",
        organization: "B.S.",
        description: "Industrial Organizational Psychology",
        section_id: sectionId,
        display_order: 2
      }
    ];

    for (const education of educationItems) {
      const { error } = await supabase
        .from('resume_items')
        .insert(education);
        
      if (error) {
        console.error('Error creating education data:', error);
        throw error;
      }
    }
  };

  // Skills section data
  const createSkillsData = async (sectionId: string) => {
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

  // Interests section data
  const createInterestsData = async (sectionId: string) => {
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

  // Awards section data
  const createAwardsData = async (sectionId: string) => {
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

  // Create portfolio projects
  const createPortfolioProjects = async () => {
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

  return {
    initializeData: initializeDataMutation.mutate,
    isInitializing: initializeDataMutation.isPending,
    isSuccess: initializeDataMutation.isSuccess,
    isError: initializeDataMutation.isError,
    error: initializeDataMutation.error
  };
};
