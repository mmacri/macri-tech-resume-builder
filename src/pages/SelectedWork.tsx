import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, CheckCircle, Globe, Shield, Users, TrendingUp, Briefcase } from 'lucide-react';

// Import screenshots
import momentumEdgeScreenshot from '@/assets/momentum-edge-screenshot.png';
import cipAuditReadyScreenshot from '@/assets/cip-audit-ready-screenshot.png';
import audit101Screenshot from '@/assets/audit101-screenshot.png';
import gitlabCsmScreenshot from '@/assets/gitlab-csm-dashboard-screenshot.png';
import frameworkFusionScreenshot from '@/assets/framework-fusion-screenshot.png';
import mec2SkillsScreenshot from '@/assets/mec2-skills-screenshot.png';

interface CaseStudy {
  id: string;
  title: string;
  category: 'governance' | 'partner' | 'customer-success' | 'solution-engineering';
  problem: string;
  environment: string;
  solution: string;
  outcomes: string[];
  detailLink?: string;
}

interface Platform {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  category: string;
}

const SelectedWork: React.FC = () => {
  const caseStudies: CaseStudy[] = [
    {
      id: 'policy-hub',
      title: 'ServiceNow Policy Hub',
      category: 'governance',
      problem: 'Enterprise organizations lacked a unified platform for policy lifecycle management, creating compliance gaps and audit exposure.',
      environment: 'Fortune 500 enterprises with complex regulatory requirements across multiple jurisdictions. Cross-functional stakeholders including Legal, Security, and Product.',
      solution: 'Created the PolicyHub module within ServiceNow IRM, establishing a governance and executive insight platform that streamlined policy creation, approval workflows, and compliance tracking.',
      outcomes: [
        'Contributed to $900M in quantifiable risk reduction',
        'Established standardized policy governance across departments',
        'Reduced audit preparation time by streamlining documentation',
        'Integrated compliance workflows into existing ServiceNow ecosystem'
      ],
      detailLink: '/portfolio/compliance'
    },
    {
      id: 'ai-governance',
      title: 'AI / ML Governance Enablement',
      category: 'governance',
      problem: 'Organizations deploying AI/ML lacked structured governance frameworks, creating regulatory and ethical risk exposure.',
      environment: 'ServiceNow internal operations and enterprise customers adopting AI/ML solutions. Regulatory scrutiny increasing across jurisdictions.',
      solution: 'Served as SME for ServiceNow\'s inaugural AI risk policies. Integrated AI/ML governance into enterprise compliance frameworks with structured decision criteria.',
      outcomes: [
        'Established ServiceNow\'s first AI risk policy framework',
        'Created reusable governance templates for customers',
        'Reduced AI deployment risk through structured review processes',
        'Enabled responsible AI adoption at enterprise scale'
      ],
      detailLink: '/portfolio/compliance'
    },
    {
      id: 'partner-cosell',
      title: 'VMware Partner Co-Sell & Enablement',
      category: 'partner',
      problem: 'Partner ecosystem lacked technical enablement and joint go-to-market alignment, limiting deal velocity and size.',
      environment: 'Americas partner network including GSIs, channel partners, and ISVs. Complex multi-cloud solutions requiring deep technical expertise.',
      solution: 'Designed joint business plans and co-selling motions. Built partner enablement programs including training, demo labs, and solution architectures.',
      outcomes: [
        'Two record-setting $50M+ partner-led deals',
        '$440M in routed pipeline through partners',
        '450% sales target achievement',
        '200% increase in partner certifications'
      ],
      detailLink: '/portfolio/partner-development'
    },
    {
      id: 'customer-success-model',
      title: 'Customer Success Operating Model',
      category: 'customer-success',
      problem: 'Regional customer success teams lacked standardized engagement frameworks, leading to inconsistent customer outcomes.',
      environment: 'VMware US West Coast region with diverse enterprise customers. TAM, CSM, and Product Specialist teams requiring coordination.',
      solution: 'Built engagement framework and program deliverables aligning technical outcomes with business metrics. Designed pooled and regional operating models.',
      outcomes: [
        '83 NPS score (20 points above company target)',
        '21% adoption increase through structured engagement',
        '30-point NPS improvement over baseline',
        'Scalable model adopted across regions'
      ],
      detailLink: '/portfolio/customer-success'
    }
  ];

  const platforms: Platform[] = [
    {
      id: 'momentum-edge',
      title: 'Momentum Edge Consulting',
      description: 'Strategic IT solutions, CIO advisory, healthcare IT, cybersecurity compliance, and AI governance practice.',
      url: 'https://www.momentumedgeconsulting.com',
      image: momentumEdgeScreenshot,
      category: 'IT Consulting'
    },
    {
      id: 'framework-fusion',
      title: 'Framework Fusion Engine',
      description: 'Centralized compliance framework library with control mapping across NERC CIP, NIST, ISO, and more.',
      url: 'https://mmacri.github.io/framework-fusion-engine/',
      image: frameworkFusionScreenshot,
      category: 'Compliance Tools'
    },
    {
      id: 'cip-audit-ready',
      title: 'CIP Audit Ready Training',
      description: 'NERC/CIP audit preparation curriculum with interactive assessments and evidence collection guidance.',
      url: 'https://mmacri.github.io/cip-audit-ready/',
      image: cipAuditReadyScreenshot,
      category: 'Training'
    },
    {
      id: 'audit101',
      title: 'Audit 101 - Common Controls',
      description: 'Multi-framework compliance training covering common controls, enablement paths, and certifications.',
      url: 'https://mmacri.github.io/audit101/',
      image: audit101Screenshot,
      category: 'Training'
    },
    {
      id: 'csm-dashboard',
      title: 'CSM Dashboard',
      description: 'Customer success dashboard prototype using PROVE methodology for enterprise account health tracking.',
      url: 'https://mmacri.github.io/GitLAB-Health/',
      image: gitlabCsmScreenshot,
      category: 'Customer Success'
    },
    {
      id: 'mec-grc',
      title: 'MEC GRC Portfolio',
      description: 'Interactive skills visualization showcasing compliance, governance, and AI enablement expertise.',
      url: 'https://mmacri.github.io/mec2',
      image: mec2SkillsScreenshot,
      category: 'IT Consulting'
    }
  ];

  const getCategoryIcon = (category: CaseStudy['category']) => {
    switch (category) {
      case 'governance': return Shield;
      case 'partner': return TrendingUp;
      case 'customer-success': return Users;
      case 'solution-engineering': return Briefcase;
    }
  };

  const getCategoryLabel = (category: CaseStudy['category']) => {
    switch (category) {
      case 'governance': return 'Security & Governance';
      case 'partner': return 'Partner Development';
      case 'customer-success': return 'Customer Success';
      case 'solution-engineering': return 'Solution Engineering';
    }
  };

  return (
    <>
      <SEOHead
        title="Selected Work - Case Studies & Platforms | Mike Macri"
        description="Executive-readable case studies showcasing frameworks, solutions, and measurable outcomes across security governance, partner development, and customer success."
        keywords="Mike Macri case studies, policy hub, AI governance, partner enablement, customer success, compliance frameworks"
        url="https://mikemacri.com/selected-work"
      />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-saira font-bold text-4xl lg:text-5xl text-macri-primary mb-6">
            Selected Work
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Case studies and platforms demonstrating measurable outcomes across security governance, partner ecosystems, and customer success.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-8">
            Case Studies
          </h2>
          
          <div className="space-y-8">
            {caseStudies.map((study) => {
              const Icon = getCategoryIcon(study.category);
              return (
                <div 
                  key={study.id}
                  className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-macri-primary" />
                    <Badge variant="secondary">{getCategoryLabel(study.category)}</Badge>
                  </div>
                  
                  <h3 className="font-saira font-bold text-2xl text-macri-primary mb-6">
                    {study.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Problem</h4>
                        <p className="text-gray-700">{study.problem}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Environment & Constraints</h4>
                        <p className="text-gray-700">{study.environment}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">What Was Built</h4>
                        <p className="text-gray-700">{study.solution}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Outcomes</h4>
                      <ul className="space-y-3">
                        {study.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {study.detailLink && (
                        <Button
                          variant="outline"
                          className="mt-6 border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white"
                          asChild
                        >
                          <a href={study.detailLink}>
                            Learn More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platforms & Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-4">
            Platforms & Tools
          </h2>
          <p className="text-gray-600 mb-8">
            Live platforms demonstrating practical applications of compliance, governance, and customer success frameworks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={platform.image}
                    alt={`Screenshot of ${platform.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">{platform.category}</Badge>
                  <h3 className="font-semibold text-lg text-macri-primary mb-2 group-hover:text-macri-primary-dark">
                    {platform.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {platform.description}
                  </p>
                  <span className="text-sm font-medium text-macri-primary flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    Visit Site
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-macri-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-3xl mb-4">
            Ready to Discuss?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's explore how my experience can help drive your business forward.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="collaboration"
              className="px-8"
              asChild
            >
              <a href="/contact">
                Get In Touch
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="collaborationOutline"
              className="px-8"
              asChild
            >
              <a href="/resume">
                View Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectedWork;
