
import { FallbackResumeData } from './html/resumeTypes';

/**
 * Default fallback data for resume PDF generation
 */
export const fallbackResumeData: FallbackResumeData = {
  aboutData: {
    title: "Mike Macri",
    subtitle: "Information Security & Business Development Professional",
    description: JSON.stringify({
      full_name: "Mike Macri",
      email: "mike@mikemacri.com",
      phone: "(555) 123-4567",
      address: "Seattle, WA",
      headline: "Information Security & Business Development Professional",
      intro_text: "Dedicated technology executive who combines technical expertise with business acumen to drive partner alliances, optimize global operations, and deliver comprehensive solutions to complex challenges.",
      locations: ["Edmonds, WA", "San Diego, CA", "Remote"],
      skills_items: [
        "Operational Efficiency: Implementing practical solutions that cut training time and prevent compliance issues.",
        "Team Leadership: Building and aligning high-performing teams for clear, measurable results."
      ],
      success_items: [
        "Policy & Compliance: Created PolicyHub for on-demand access to 400+ policies, reducing training time and compliance risk.",
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
      organization: "ServiceNow.com",
      start_date: "2021-12-01",
      end_date: null,
      description: "Created PolicyHub – a self-service portal centralizing 400+ policies – to enable fast, secure access to critical compliance documentation and reduce training dependency.\nEnhanced product features in GRC, Policy & Compliance, Strategic Portfolio Manager, and risk management by aligning cross-functional processes.\nCollaborated with executives to resolve production vulnerabilities, mitigating $900M in annual revenue risk."
    },
    {
      title: "Partner Business Development & Technical Alliance Director",
      organization: "VMware.com",
      start_date: "2019-11-01",
      end_date: "2021-12-01",
      description: "Managed VMware's largest alliances with strategic system integrators, driving multi-hundred-million-dollar growth.\nDefined and executed joint business plans that delivered 644% revenue growth in FY21 H1."
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
    { title: "GRC" }
  ]
};
