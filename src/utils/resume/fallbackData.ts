
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
      title: "Sr Manager, InfoSec Solution & Automation Engineering",
      organization: "ServiceNow",
      start_date: "2021-12-01",
      end_date: null,
      description: "Created PolicyHub – a self-service portal centralizing 400+ policies – to enable fast, secure access to critical compliance documentation and reduce training dependency.\nEnhanced product features in GRC, Policy & Compliance, Strategic Portfolio Manager, and risk management by aligning cross-functional processes.\nCollaborated with executives to resolve production vulnerabilities, mitigating $900M in annual revenue risk."
    },
    {
      title: "Partner Business Development & Technical Alliance Director",
      organization: "VMware",
      start_date: "2019-11-01",
      end_date: "2021-12-01",
      description: "Managed VMware's largest alliances with strategic system integrators, driving multi-hundred-million-dollar growth.\nDefined and executed joint business plans that delivered 644% revenue growth in FY21 H1."
    },
    {
      title: "Partner Staff Solutions Engineer Leader",
      organization: "VMware",
      start_date: "2017-12-01",
      end_date: "2019-11-01",
      description: "Managed 11 solution engineers in presales activities for partners generating $1.3B in revenue across the Central US and Canada.\nDrove 21% YoY growth, 87% YoY renewals, and 105% YoY SaaS growth through strategic relationship management."
    },
    {
      title: "Sr Manager, WW Customer Success – TAMs & Product Specialists",
      organization: "VMware",
      start_date: "2014-11-01",
      end_date: "2017-12-01",
      description: "Led a global team of Technical Account Managers and cloud specialists, managing team performance/metrics.\nCreated service delivery frameworks that drove 44% improved product adoption and 30 points of NPS improvement."
    },
    {
      title: "Staff Technical Account Manager",
      organization: "VMware",
      start_date: "2011-12-01",
      end_date: "2014-11-01",
      description: "Led weekly governance and executive technical review meetings with CxO and director-level stakeholders.\nCreated technical and operational architecture for three Fortune 100 enterprise customers."
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
