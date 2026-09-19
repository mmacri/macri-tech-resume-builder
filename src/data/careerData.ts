import momentumEdgeScreenshot from '@/assets/momentum-edge-screenshot.png';
import cipAuditReadyScreenshot from '@/assets/cip-audit-ready-screenshot.png';
import audit101Screenshot from '@/assets/audit101-screenshot.png';
import gitlabCsmScreenshot from '@/assets/gitlab-csm-dashboard-screenshot.png';
import frameworkFusionScreenshot from '@/assets/framework-fusion-screenshot.png';
import mec2SkillsScreenshot from '@/assets/mec2-skills-screenshot.png';
import homeFitScreenshot from '@/assets/homefit-recovery-screenshot.png';
import hoaCommunityScreenshot from '@/assets/hoa-community-screenshot.png';
import policyHubScreenshot from '@/assets/policy-hub-screenshot.jpg';
import partnerEnablementScreenshot from '@/assets/partner-enablement-dashboard.jpg';
import customerSuccessScreenshot from '@/assets/customer-success-dashboard.jpg';

export const profile = {
  name: 'Michael Macri, MBA',
  shortName: 'Mike Macri',
  headline: 'Senior Customer Success Engineering Leader',
  currentRole: 'Senior Manager, Customer Success Engineering - AMER',
  currentCompany: 'GitLab',
  currentDates: '2026 - Present',
  location: 'Remote',
  linkedin: 'https://www.linkedin.com/in/mikemacri',
  summary:
    'Senior Customer Success leader building and leading post-sales technical teams across GitLab, VMware, and ServiceNow. Drives enterprise adoption, consumption, customer health, expansion, retention, and value realization through data-driven operating models and partnership with Sales, Renewals, Product, and Engineering. Experienced leading teams and strategic customers across DevSecOps, AI/ML, cloud, security, and governance, translating complex technology into measurable customer and business outcomes.',
  positioning:
    'Building and leading post-sales technical teams that connect adoption, consumption, customer health, expansion, retention, and value realization.',
  secondary:
    'Mike combines data-driven operating models with cross-functional leadership across DevSecOps, AI/ML, cloud, security, and governance environments.',
};

export const careerCompanies = [
  { name: 'GitLab', years: '2026-Present', current: true },
  { name: 'ServiceNow', years: '2021-2025' },
  { name: 'VMware', years: '2011-2021' },
];

export const careerProgression = [
  'Technical Foundation',
  'Customer Success',
  'Solution Engineering',
  'Partner & GTM',
  'AI / Governance',
  'Customer Success Engineering Leadership',
];

export const capabilities = [
  {
    title: 'Customer Success Engineering & Leadership',
    topics: ['CSE leadership', 'people management', 'coaching and team development', 'customer technical outcomes', 'adoption and consumption', 'customer health', 'retention/expansion alignment', 'scaled customer success'],
  },
  {
    title: 'DevSecOps & Platform Adoption',
    topics: ['GitLab', 'DevSecOps', 'CI/CD', 'software delivery', 'security', 'platform consolidation', 'maturity', 'technical adoption', 'value realization'],
  },
  {
    title: 'Solution Engineering & Technical Enablement',
    topics: ['solution engineering', 'technical advisory', 'workshops', 'labs', 'enablement', 'architecture', 'demonstrations', 'technical discovery', 'business outcome alignment'],
  },
  {
    title: 'Partner Ecosystems & GTM',
    topics: ['GSI', 'channel', 'co-sell', 'alliances', 'partner enablement', 'joint business planning', 'routes to market', 'sales alignment'],
  },
  {
    title: 'AI, Risk & Governance',
    topics: ['AI governance', 'responsible AI', 'GRC', 'security', 'compliance', 'enterprise risk', 'policy', 'controls', 'automation'],
  },
];

export const experiences = [
  {
    id: 'gitlab',
    title: 'Senior Manager, Customer Success Engineering - AMER',
    organization: 'GitLab',
    location: 'Remote',
    startDate: '2026',
    endDate: 'Present',
    period: '2026 - Present',
    current: true,
    theme: 'Customer Success Engineering Leadership',
    summary:
      "Lead a Customer Success Engineering team across AMER supporting private-sector customers across SMB, Mid-Market, Enterprise, Financial Services, and Key accounts. Own post-sales technical engagement across GitLab's subscription and usage-based offerings, aligning product and AI consumption, adoption, customer health, risk, expansion, and renewal outcomes.",
    bullets: [
      'Lead, coach, and develop 7 Customer Success Engineers through performance reviews, ongoing coaching, and operating standards for CTAs, quarterly health assessments, account documentation, and engagement across the customer lifecycle.',
      'Built data-driven portfolio operating frameworks across ARR, product and AI consumption, customer health, engagement, renewal runway, risk, and expansion signals, enabling leadership to prioritize accounts, mitigate renewal risk, and surface growth opportunities.',
      'Drive GitLab Duo Agent Platform adoption, strategic account initiatives, and executive escalations with customer and internal executives; partner with Sales, Renewals, and regional leadership on value realization, expansion, renewal risk, and long-term retention.',
    ],
  },
  {
    id: 'momentum-edge',
    title: 'Principal Consultant',
    organization: 'Momentum Edge Consulting',
    location: 'Remote',
    startDate: 'May 2025',
    endDate: 'Present',
    period: 'May 2025 - Present',
    current: true,
    advisory: true,
    theme: 'Independent Consulting / Advisory',
    summary:
      'Technical advisor to regulated public sector and enterprise customers, focused on post-sale adoption readiness, operating models, and technical value realization.',
    bullets: [
      'Deliver executive-ready assessments and roadmaps that accelerate adoption and decision-making across utilities, government, and regulated industries.',
      'Create reusable workshops, evaluation checklists, and implementation playbooks that remove adoption barriers and support scalable execution.',
    ],
  },
  {
    id: 'servicenow',
    title: 'Senior Manager, Solution Advisory - Legal Ethics & Compliance',
    organization: 'ServiceNow',
    location: 'Remote',
    startDate: 'Dec 2021',
    endDate: 'May 2025',
    period: 'Dec 2021 - May 2025',
    theme: 'Solution Advisory / Security / Governance / Automation',
    summary:
      'Led post-sales solution advisory across Sales, Security, Legal, and Product, driving platform adoption and governance programs that reduced $900M in enterprise risk for regulated environments.',
    bullets: [
      'Standardized policy-to-process workflows across compliance frameworks, improving consistency and adoption across customer and internal teams.',
      "Owned AI/ML governance enablement as an SME; defined requirements and guidance used for ServiceNow's first enterprise AI usage policies.",
      'Translated regulatory and AI governance requirements into scalable operating models, dashboards, templates, and enablement playbooks used across enterprise stakeholders.',
    ],
  },
  {
    id: 'vmware-alliance',
    title: 'Partner Business & Technical Alliance Director - Americas',
    organization: 'VMware',
    location: 'San Francisco, CA',
    startDate: 'Nov 2019',
    endDate: 'Dec 2021',
    period: 'Nov 2019 - Dec 2021',
    theme: 'Partner & Alliance Leadership',
    summary:
      'Led GSI and strategic partner motions across the Americas, aligning technical enablement, solution strategy, and customer outcomes with commercial execution.',
    bullets: [
      'Built joint business plans and managed co-sell execution, contributing to two record-setting $50M+ partner-led deals and sustained target overperformance.',
      'Aligned Product and Engineering on partner-led integrations and go-to-market plans; enabled field teams with repeatable partner playbooks (e.g., VMware on AWS with DXC).',
    ],
  },
  {
    id: 'vmware-partner-se',
    title: 'Partner Staff Solutions Engineer Leader',
    organization: 'VMware',
    location: 'Chicago, IL',
    startDate: 'Dec 2017',
    endDate: 'Dec 2019',
    period: 'Dec 2017 - Dec 2019',
    theme: 'Partner Solutions Engineering',
    summary: "Led partner solutions engineering for VMware's largest channel partnership (CDW), focused on scalable enablement, adoption, and pipeline acceleration.",
    bullets: [
      'Partnered with CDW to drive $440M through multi-tiered routes-to-market, increasing pipeline capture by 20%, certifications by 200%, and solution adoption by 20% in the first year.',
      'Designed partner training, workshops, and roadmap sessions; coached architects, increasing partner-driven pipeline by 21%.',
    ],
  },
  {
    id: 'vmware-customer-success',
    title: 'Senior Manager, Customer Success, TAMs & Product Specialists - West Coast Regional Practice',
    organization: 'VMware',
    location: 'Seattle, WA',
    startDate: 'Nov 2014',
    endDate: 'Dec 2017',
    period: 'Nov 2014 - Dec 2017',
    theme: 'Customer Success Leadership',
    summary: 'Built and led three dispersed post-sales teams (TAMs, Customer Success, Product Specialists) delivering adoption, expansion, and customer value across a regional book of business.',
    bullets: [
      'Built engagement frameworks and program deliverables aligned to customer business metrics, improving NPS by 20 points and driving operational efficiency.',
      'Partnered with Sales and Post-Sales leadership to align technical success with expansion and retention objectives.',
    ],
  },
  {
    id: 'vmware-tam',
    title: 'Staff Technical Account Manager / Customer Success Manager',
    organization: 'VMware',
    location: 'Seattle, WA',
    startDate: 'Dec 2011',
    endDate: 'Nov 2014',
    period: 'Dec 2011 - Nov 2014',
    theme: 'Strategic Account Leadership',
    summary: 'Managed strategic enterprise accounts, aligning technical outcomes to business metrics, accelerating adoption and roadmap execution, and consistently leading services attach.',
    bullets: [],
  },
];

export const keyAchievements = [
  {
    title: 'Customer Success Leadership at Scale',
    description: 'Lead and develop a 7-person AMER CSE team supporting multi-million-dollar ARR customers from SMB through Key accounts, connecting adoption, consumption, customer health, expansion, and renewal outcomes.',
  },
  {
    title: 'Adoption, Expansion & Retention',
    description: 'Built scalable customer and partner success motions contributing to 20% renewal growth, 250% pipeline growth, sustained platform adoption, and a 20-point NPS improvement at VMware.',
  },
  {
    title: 'AI, DevSecOps & Enterprise Transformation',
    description: 'Lead GitLab AI adoption initiatives and previously owned enterprise AI/ML governance enablement at ServiceNow, combining technical adoption with responsible AI, security, governance, and measurable customer value.',
  },
];

export const metrics = [
  {
    metric: '$900M',
    label: 'Enterprise Risk Reduction',
    organization: 'ServiceNow',
    context: 'PolicyHub, governance, and compliance advisory work for regulated enterprise environments.',
    contribution: 'Connected policy, controls, and risk workflows into executive-readable governance models.',
    outcome: 'Supported quantifiable enterprise risk reduction without exposing confidential customer detail.',
  },
  {
    metric: '250%',
    label: 'Pipeline Growth',
    organization: 'VMware',
    context: 'Partner and technical enablement programs across solution engineering and ecosystem motions.',
    contribution: 'Built repeatable playbooks, technical workshops, and partner enablement models.',
    outcome: 'Helped accelerate partner-led pipeline through clearer solution adoption paths.',
  },
  {
    metric: '20%',
    label: 'Renewal Growth',
    organization: 'VMware',
    context: 'Customer Success and TAM operating models across regional post-sales teams.',
    contribution: 'Aligned technical success planning, adoption programs, and customer health visibility.',
    outcome: 'Improved renewal performance through more consistent technical engagement and value realization.',
  },
  {
    metric: '83',
    label: 'NPS',
    organization: 'VMware',
    context: 'Regional customer success leadership and post-sales technical engagement.',
    contribution: 'Built engagement frameworks and coached teams around customer business metrics.',
    outcome: 'Delivered customer experience performance 20 points above target.',
  },
];

export const caseStudies = [
  {
    id: 'scaling-cse',
    title: 'Scaling Customer Success Engineering',
    subtitle: 'Designing technical engagement models that combine digital scale with high-value human expertise.',
    category: 'Customer Success Engineering',
    problem:
      'Technical customer success does not scale if every Customer Success Engineer manually contacts and engages every account for every technical activity. As portfolios grow, technical resources need an operating model that identifies where human expertise creates the greatest customer value.',
    approach:
      'Design customer engagement around complementary motions: digital-first engagement, customer-requested technical engagement, segmentation, health and adoption signals, targeted CSE intervention, one-to-many technical enablement, webinars, hands-on labs, reusable technical content, and pooled expertise where appropriate.',
    solution:
      'Create a signal-driven engagement model that moves from digital engagement to customer intent, technical need identification, CSE engagement, technical outcome, adoption/value/risk signal, and next best action.',
    outcomes: ['Greater reach', 'Better resource focus', 'Repeatable engagement', 'Consistent technical guidance', 'Improved visibility into customer technical needs', 'Scalable customer experience'],
    note: 'Conceptual operating model. No GitLab performance metrics are implied.',
    detailLink: '/selected-work#scaling-cse',
  },
  {
    id: 'policy-hub',
    title: 'ServiceNow Policy Hub',
    subtitle: 'Turning policy and governance complexity into a more usable enterprise operating model.',
    category: 'AI, Risk & Governance',
    problem: 'Enterprise organizations lacked a unified platform for policy lifecycle management, creating compliance gaps and audit exposure.',
    approach: 'Partnered across Legal, Security, Product, and customer-facing teams to translate policy lifecycle needs into practical workflows and executive insight.',
    solution: 'Created the PolicyHub module concept within ServiceNow IRM to streamline policy creation, approval workflows, compliance tracking, and governance reporting.',
    outcomes: ['Contributed to $900M in quantifiable risk reduction', 'Established standardized policy governance across departments', 'Reduced audit preparation friction through streamlined documentation', 'Integrated compliance workflows into the ServiceNow ecosystem'],
    image: policyHubScreenshot,
    detailLink: '/portfolio/compliance',
  },
  {
    id: 'ai-governance',
    title: 'AI / ML Governance Enablement',
    subtitle: 'Helping organizations adopt AI with clearer policy, risk, and control models.',
    category: 'AI, Risk & Governance',
    problem: 'Organizations deploying AI/ML lacked structured governance frameworks, creating regulatory and ethical risk exposure.',
    approach: 'Defined reusable governance patterns and translated emerging AI risk concerns into reviewable policy and control language.',
    solution: "Served as SME for ServiceNow's inaugural AI risk policies and integrated AI/ML governance into enterprise compliance frameworks.",
    outcomes: ["Established ServiceNow's first AI risk policy framework", 'Created reusable governance templates', 'Reduced AI deployment risk through structured review processes', 'Enabled responsible AI adoption at enterprise scale'],
    detailLink: '/portfolio/compliance',
  },
  {
    id: 'partner-cosell',
    title: 'VMware Partner Co-Sell / Enablement',
    subtitle: 'Building repeatable partner motions that connect technical enablement with commercial execution.',
    category: 'Partner Ecosystems & GTM',
    problem: 'Partner ecosystem teams needed stronger technical enablement and joint go-to-market alignment to improve deal velocity and solution confidence.',
    approach: 'Designed joint business plans, demo labs, solution architectures, workshops, and field-ready enablement assets.',
    solution: 'Built partner enablement and co-selling motions for GSI, channel, and strategic ecosystem partners across the Americas.',
    outcomes: ['Two record-setting $50M+ partner-led deals', '$440M in routed pipeline through partners', '200% increase in certifications', '21% increase in partner-driven pipeline'],
    image: partnerEnablementScreenshot,
    detailLink: '/portfolio/partner-development',
  },
  {
    id: 'customer-success-model',
    title: 'Customer Success Operating Model',
    subtitle: 'Creating post-sales technical engagement models that connect adoption, customer health, and renewal confidence.',
    category: 'Customer Success Engineering',
    problem: 'Regional customer success teams lacked standardized engagement frameworks, leading to inconsistent customer outcomes.',
    approach: 'Built engagement frameworks, team coaching routines, customer health visibility, and program deliverables tied to customer business metrics.',
    solution: 'Designed pooled and regional operating models for TAM, CSM, and Product Specialist teams.',
    outcomes: ['83 NPS score, 20 points above target', '20% renewal growth through adoption programs', 'Built three dispersed post-sales teams', 'Aligned technical success with expansion objectives'],
    image: customerSuccessScreenshot,
    detailLink: '/portfolio/customer-success',
  },
];

export const cseProcess = [
  'Digital Engagement',
  'Customer Intent / Signal',
  'Technical Need Identified',
  'CSE Engagement',
  'Technical Outcome',
  'Adoption / Value / Risk Signal',
  'Next Best Action',
];

export const projects = [
  {
    id: 'gitlab-health',
    name: 'GitLab Health / CSM Dashboard',
    description: "Customer success dashboard prototype using GitLab's PROVE methodology for account health, adoption, license utilization, and renewal planning.",
    category: 'Customer Success & DevSecOps',
    technologies: ['React', 'TypeScript', 'Data Visualization', 'Customer Health'],
    image: gitlabCsmScreenshot,
    projectUrl: 'https://mmacri.github.io/GitLAB-Health/',
    caseStudyUrl: '/selected-work#scaling-cse',
  },
  {
    id: 'customer-success-dashboard',
    name: 'Customer Success Dashboard',
    description: 'Analytics dashboard concept for customer engagement, adoption signals, and technical success planning.',
    category: 'Customer Success & DevSecOps',
    technologies: ['Customer Success', 'Adoption', 'Health Scoring'],
    image: customerSuccessScreenshot,
    projectUrl: 'https://mmacri.github.io/customer-engagement-tracker/',
    caseStudyUrl: '/portfolio/customer-success',
  },
  {
    id: 'cip-audit-ready',
    name: 'CIP Audit Ready',
    description: 'NERC/CIP audit preparation curriculum with assessments, evidence guidance, and training flows for utility professionals.',
    category: 'Security, GRC & Training',
    technologies: ['NERC CIP', 'Training', 'Compliance', 'GitHub Pages'],
    image: cipAuditReadyScreenshot,
    projectUrl: 'https://mmacri.github.io/cip-audit-ready/',
  },
  {
    id: 'audit101',
    name: 'Audit 101',
    description: 'Common-controls training experience for teams learning cross-framework compliance concepts and audit readiness.',
    category: 'Security, GRC & Training',
    technologies: ['GRC', 'Common Controls', 'Training'],
    image: audit101Screenshot,
    projectUrl: 'https://mmacri.github.io/audit101/',
  },
  {
    id: 'framework-fusion',
    name: 'Framework Fusion Engine',
    description: 'Compliance framework library and control mapping tool for NERC CIP, NIST, ISO, and related governance frameworks.',
    category: 'Security, GRC & Training',
    technologies: ['React', 'TypeScript', 'Control Mapping', 'GRC'],
    image: frameworkFusionScreenshot,
    projectUrl: 'https://mmacri.github.io/framework-fusion-engine/',
  },
  {
    id: 'momentum-edge',
    name: 'Momentum Edge Consulting',
    description: 'Independent consulting platform for technology advisory, cybersecurity compliance, AI governance, and regulated-industry operating models.',
    category: 'Consulting & Business',
    technologies: ['Consulting', 'AI Governance', 'GRC', 'ServiceNow IRM'],
    image: momentumEdgeScreenshot,
    projectUrl: 'https://www.momentumedgeconsulting.com',
    caseStudyUrl: '/portfolio/momentum-edge',
  },
  {
    id: 'mec-grc',
    name: 'MEC GRC Portfolio',
    description: 'Interactive skills visualization for governance, compliance, AI enablement, and technical advisory capabilities.',
    category: 'Consulting & Business',
    technologies: ['React', 'TypeScript', 'GitHub Pages'],
    image: mec2SkillsScreenshot,
    projectUrl: 'https://mmacri.github.io/mec2',
  },
  {
    id: 'homefit-recovery',
    name: 'HomeFit Recovery',
    description: 'Product research and review platform exploring structured content, product comparison, and customer research workflows.',
    category: 'Technical Experiments',
    technologies: ['Content Platform', 'Product Research', 'SEO'],
    image: homeFitScreenshot,
    projectUrl: 'https://www.homefitrecovery.com',
  },
  {
    id: 'hoa-community',
    name: 'HOA Community Forums',
    description: 'Community engagement experiment for private forums, resident reviews, and local communication patterns.',
    category: 'Technical Experiments',
    technologies: ['React', 'Community Platform', 'GitHub Pages'],
    image: hoaCommunityScreenshot,
    projectUrl: 'https://mmacri.github.io/hoa-spotlight',
  },
];

export const projectCategories = ['All', 'Customer Success & DevSecOps', 'Security, GRC & Training', 'Consulting & Business', 'Technical Experiments'];

export const seoDefaults = {
  title: 'Mike Macri MBA | Senior Customer Success Engineering Leader',
  description:
    'Senior Customer Success Engineering leader scaling post-sales technical organizations, operating models, and enablement across GitLab, VMware, and ServiceNow.',
};
