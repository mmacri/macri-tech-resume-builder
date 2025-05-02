
import React from 'react';
import { format, parse } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ExperienceSectionProps {
  items?: any[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  // Function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    try {
      const date = parse(dateString, 'yyyy-MM-dd', new Date());
      return format(date, 'MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Static experience items for the home page
  const staticExperiences = [
    {
      title: "Sr. Manager, Solution Consulting – Legal Ethics & Compliance",
      organization: "ServiceNow",
      location: "Remote",
      start_date: "2021-12-01",
      end_date: null,
      description: "Led internal design and consultative solutioning for GRC, Policy, IRM, and SPM modules within ServiceNow's compliance function.\nCollaborated with stakeholders across Legal, Risk, Security, Product, and Engineering to build value allignment and ServiceNow workflows use.\nCreated and managed PolicyHub 1.0, simplifying access to enterprise policies and accelerating internal enablement across servicenow.\nIntegrated AI/ML governance into enterprise frameworks, serving as SME for the creation of ServiceNow's inaugural responsible AI risk policies & requirements.\nDrove senior executives initiatives that streamlined compliance design to secure budget, that protected against a $900M annual security/compliance risk."
    },
    {
      title: "Partner Business & Technical Alliance Director -Americas",
      organization: "VMware",
      location: "San Francisco, CA",
      start_date: "2019-11-01",
      end_date: "2021-12-01",
      description: "Led GTM and presales efforts with GSI and SI partners such including DXC, Capgemini, and Accenture.\nDeveloped scalable embedded partner programs and re-platformed service offerings (e.g., DXC VMware Cloud on AWS), aligning go-to-market strategy with partner executive goals.\nDefined and executed joint business plans that led to repeated achievements above 450% of target.\nCollaborated across matrixed SC, ProServ, and specialist teams to support technical sales cycles for strategic system integrator offerings."
    },
    {
      title: "Partner Staff Solutions Engineer Leader",
      organization: "VMware",
      location: "Chicago, IL",
      start_date: "2017-12-01",
      end_date: "2019-12-01",
      description: "Identified market alignments with partners to deliver targeted SaaS and hybrid cloud campaigns that increased pipeline capture by 21% sell through growth.\nIdentified joint market opportunities and launched upsell and cross-sell programs resulting in a 20% revenue increase from renewals.\nCoached partner architects and SCs to deliver consultative sales motions, resulting in $440M sell-through revenue and 21% YoY growth."
    },
    {
      title: "Sr Manager, Customer Success, TAMs & Product Specialists – West Coast Regional Practice",
      organization: "VMware",
      location: "Seattle, WA",
      start_date: "2014-11-01",
      end_date: "2017-12-01",
      description: "Hired, mentored, and developed customer success teams to deliver a trusted brand increasing product adoption by 44% and improved NPS by 30 points (20 points above goal).\nDeveloped and delivered engagement frameworks that aligned technical outcomes with business value metrics, driving operational efficiency and consistent expansion."
    },
    {
      title: "Staff Technical Account Manager",
      organization: "VMware",
      location: "Seattle, WA",
      start_date: "2011-12-01",
      end_date: "2014-11-01",
      description: "Created engagement deliverables aligning customer metrics and enhancing operational efficiency, leading to services attach on all deals.\nCreative solutions that drove product adoption and roadmap expansions. (E.G 500 Costco storefronts in 10 minutes, eliminating on-site visits to free budget for value growth product purchases."
    },
    {
      title: "Technical Partner Lead – Channel Partner Strategy (North America)",
      organization: "VMware",
      location: "Seattle, WA",
      start_date: "2011-01-01",
      end_date: "2011-12-01",
      description: "Served as the technical SME and lead for 3 of VMware's top 10 North American partners, enabling C-level alignment and driving partner adoption of VMware jointly created services.\nDesigned and implemented scalable self-service demo labs initiatives with cloud for partners (Zones, CDW, En Pointe, HP, PCMall) enabling partner-SC enablement and solution delivery."
    }
  ];

  return (
    <section className="resume-section" id="experience">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Experience</h2>

        {staticExperiences.map((item, index) => (
          <div key={index} className="card mb-8">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-macri-primary text-sm">
                  {formatDate(item.start_date)} - {formatDate(item.end_date)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                <h5 className="text-base font-normal text-gray-600">{item.organization}</h5>
                {item.location && (
                  <p className="text-sm text-gray-500">{item.location}</p>
                )}
              </div>
              {item.description && (
                <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                  {item.description.split('\n')
                    .filter((point: string) => point.trim().length > 0)
                    .map((point: string, i: number) => (
                      <li key={i}>{point.trim()}</li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {isAdmin && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline"
              onClick={() => {
                localStorage.setItem('activeResumeTab', 'experience');
                navigate('/admin#resume');
              }}
            >
              Manage Experience Items
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
