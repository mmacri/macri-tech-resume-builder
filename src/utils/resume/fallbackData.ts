
import { FallbackResumeData } from './html/resumeTypes';

/**
 * Default fallback data for resume PDF generation
 */
export const fallbackResumeData: FallbackResumeData = {
  aboutData: {
    title: "Mike Macri",
    subtitle: "Solution Consulting & Partner GTM Leader",
    description: JSON.stringify({
      full_name: "Mike Macri",
      email: "contact@mikemacri.com",
      phone: "(555) 123-4567",
      address: "Seattle, WA",
      headline: "Solution Consulting & Partner GTM Leader",
      intro_text: "Solution Consulting and Partner GTM leader with a proven track record of building high-performing solution engineering and customer success teams in the enterprise cloud ecosystem. Skilled in coaching Solution Consultants, developing scalable technical sales motions, and delivering partner-aligned growth with GSIs, SIs, and ISVs. Expertise at building customer value realization strategies, integrating AI-driven frameworks, and aligning with sales, marketing, and services teams to drive outcomes. Known for creating impact, guiding complex deals to closure, and fostering cross-functional collaboration in matrixed environments.",
      locations: ["Edmonds, WA", "San Diego, CA", "Remote"],
      skills_items: [
        "Operational Efficiency: Implementing practical solutions that cut training time and prevent compliance issues.",
        "Team Leadership: Building and aligning high-performing teams for clear, measurable results."
      ],
      success_items: [
        "Solutions through Software Development: Created PolicyHub for on-demand access to 400+ policies, reducing training time and compliance risk.",
        "Customer Success: Built playbooks and dashboards that increased product adoption by 21% and raised NPS by 30 points."
      ],
      references: [
        "I have worked with Mike for the past 5 years during my time as an Enterprise Sales Exec at VMware. From Day 1 Mike has been a tremendous business partner.",
        "I find Mike to be a manager that is a true mentor, coach, and leader. Mike not only guides but listens."
      ]
    })
  },
  experiences: [
    {
      title: "Sr. Manager, Solution Consulting – Legal Ethics & Compliance",
      organization: "ServiceNow",
      start_date: "2021-12-01",
      end_date: null,
      description: "• Led internal design and consultative solutioning for GRC, Policy, IRM, and SPM modules within ServiceNow's compliance function.\n• Collaborated with stakeholders across Legal, Risk, Security, Product, and Engineering to build value allignment and ServiceNow workflows use.\n• Created and managed PolicyHub 1.0, simplifying access to enterprise policies and accelerating internal enablement across servicenow.\n• Integrated AI/ML governance into enterprise frameworks, serving as SME for the creation of ServiceNow's inaugural responsible AI risk policies & requirements.\n• Drove senior executives initiatives that streamlined compliance design to secure budget, that protected against a $900M annual security/compliance risk."
    },
    {
      title: "Partner Business & Technical Alliance Director - Americas",
      organization: "VMware",
      start_date: "2019-11-01",
      end_date: "2021-12-01",
      description: "• Led GTM and presales efforts with GSI and SI partners such including DXC, Capgemini, and Accenture.\n• Developed scalable embedded partner programs and re-platformed service offerings (e.g., DXC VMware Cloud on AWS), aligning go-to-market strategy with partner executive goals.\n• Defined and executed joint business plans that led to repeated achievements above 450% of target.\n• Collaborated across matrixed SC, ProServ, and specialist teams to support technical sales cycles for strategic system integrator offerings."
    },
    {
      title: "Partner Staff Solutions Engineer Leader",
      organization: "VMware",
      start_date: "2017-12-01",
      end_date: "2019-11-01",
      description: "• Identified market alignments with partners to deliver targeted SaaS and hybrid cloud campaigns that increased pipeline capture by 21% sell through growth.\n• Identified joint market opportunities and launched upsell and cross-sell programs resulting in a 20% revenue increase from renewals.\n• Coached partner architects and SCs to deliver consultative sales motions, resulting in $440M sell-through revenue and 21% YoY growth."
    },
    {
      title: "Sr Manager, Customer Success, TAMs & Product Specialists – West Coast Regional Practice",
      organization: "VMware",
      start_date: "2014-11-01",
      end_date: "2017-12-01",
      description: "• Hired, mentored, and developed customer success teams to deliver a trusted brand increasing product adoption by 44% and improved NPS by 30 points (20 points above goal).\n• Developed and delivered engagement frameworks that aligned technical outcomes with business value metrics, driving operational efficiency and consistent expansion."
    },
    {
      title: "Staff Technical Account Manager",
      organization: "VMware",
      start_date: "2011-12-01",
      end_date: "2014-11-01",
      description: "• Created engagement deliverables aligning customer metrics and enhancing operational efficiency, leading to services attach on all deals.\n• Creative solutions that drove product adoption and roadmap expansions. (E.G 500 Costco storefronts in 10 minutes, eliminating on-site visits to free budget for value growth product purchases."
    }
  ],
  education: [
    {
      title: "Xavier University - Williams College of Business",
      organization: "MBA",
      description: "Management of Information Systems"
    },
    {
      title: "Xavier University",
      organization: "B.S.",
      description: "Industrial Organizational Psychology"
    }
  ],
  skills: [
    { title: "Information Security" },
    { title: "Business Development" },
    { title: "Strategic Partnerships" },
    { title: "Cloud Computing" },
    { title: "GRC" },
    { title: "AI Governance" },
    { title: "Team Leadership" }
  ]
};
