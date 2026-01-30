import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, TrendingUp, Shield, Briefcase, CheckCircle, ExternalLink } from 'lucide-react';

const ExperienceImpact: React.FC = () => {
  const roleLenses = [
    {
      id: 'solution-engineering',
      icon: Briefcase,
      title: 'Solution Engineering & Technical Enablement',
      description: 'Led distributed technical teams supporting enterprise and regulated customers. Built scalable onboarding, maturity models, and enablement frameworks that reduced adoption friction and accelerated platform value realization.',
      outcomes: [
        '20%+ adoption and renewal growth',
        '250% pipeline influence through technical advisory',
        'NPS 83 (20 points above target)',
        'PolicyHub module creation for ServiceNow',
        'AI/ML governance framework establishment'
      ],
      caseStudyLink: '/portfolio/solution-engineering',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'security-compliance',
      icon: Shield,
      title: 'Security, Compliance & Governance Leadership',
      description: 'Led governance and compliance advisory across ServiceNow. Built policy-to-process operating models and AI governance guidance. Focus on decision quality, not compliance theater.',
      outcomes: [
        '~$900M in enterprise risk reduction',
        'SME for ServiceNow inaugural AI risk policies',
        'Cross-departmental compliance framework integration',
        'Common controls architecture development',
        'Structured governance for product roadmaps'
      ],
      caseStudyLink: '/portfolio/compliance',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'partner-ecosystem',
      icon: TrendingUp,
      title: 'Partner & Ecosystem Development',
      description: 'Led GSI and strategic partner motions across the Americas. Built joint business plans, co-sell motions, and partner enablement. Aligned technical capability to commercial execution.',
      outcomes: [
        '$50M+ partner-led landmark deals (2x)',
        '$440M in routed pipeline through partners',
        '450% sales target achievement',
        'Joint business planning with DXC, CDW',
        'Partner enablement program development'
      ],
      caseStudyLink: '/portfolio/partner-development',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'customer-success',
      icon: Users,
      title: 'Customer Success & Post-Sales Strategy',
      description: 'Built and led TAM, CSM, and specialist teams. Designed engagement frameworks tied to customer business metrics. Improved retention, expansion, and executive trust.',
      outcomes: [
        '83 NPS score (20 points above company target)',
        '21% adoption increase through engagement frameworks',
        'Regional team leadership across US West Coast',
        'Customer success operating model development',
        'Executive alignment and value realization programs'
      ],
      caseStudyLink: '/portfolio/customer-success',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <>
      <SEOHead
        title="Experience & Impact - Mike Macri"
        description="Cross-functional leadership across Solution Engineering, Security Governance, Partner Development, and Customer Success with measurable outcomes at scale."
        keywords="Mike Macri experience, solution engineering, security compliance, partner development, customer success, GRC leadership"
        url="https://mikemacri.com/experience"
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-saira font-bold text-4xl lg:text-5xl text-macri-primary mb-6">
              Experience & Impact
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A cross-functional leader who builds repeatable frameworks and insight-driven platforms that translate complex security, compliance, and technical systems into measurable business outcomes.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-macri-primary">$900M</div>
              <div className="text-sm text-gray-600">Risk Reduction</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-macri-primary">450%</div>
              <div className="text-sm text-gray-600">Sales Target</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-macri-primary">83 NPS</div>
              <div className="text-sm text-gray-600">Customer Score</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-macri-primary">$100M+</div>
              <div className="text-sm text-gray-600">Landmark Deals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Lenses */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {roleLenses.map((role) => (
              <div 
                key={role.id}
                id={role.id}
                className={`rounded-xl border-2 p-8 ${role.color} transition-shadow hover:shadow-lg`}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <role.icon className="w-6 h-6 text-macri-primary" />
                      </div>
                      <h2 className="font-saira font-bold text-2xl text-macri-primary">
                        {role.title}
                      </h2>
                    </div>
                    
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                      {role.description}
                    </p>
                    
                    <Button
                      variant="outline"
                      className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white"
                      asChild
                    >
                      <a href={role.caseStudyLink}>
                        View Case Studies
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  
                  {/* Outcomes */}
                  <div className="lg:w-96">
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">Key Outcomes</h3>
                    <ul className="space-y-3">
                      {role.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline - Condensed */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-8 text-center">
            Career Timeline
          </h2>
          
          <div className="space-y-6">
            {/* Momentum Edge */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-green-500 shadow-sm">
              <Badge className="mb-2 bg-green-100 text-green-800 border-green-200">Current</Badge>
              <h3 className="font-semibold text-xl text-macri-primary">Principal Consultant & Solution Engineer</h3>
              <p className="text-gray-600 font-medium">Momentum Edge Consulting • Apr 2025 - Present</p>
              <p className="text-gray-700 mt-2">IT governance, compliance frameworks, AI-driven solutions for healthcare, utilities, and municipal organizations.</p>
            </div>
            
            {/* ServiceNow */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-macri-primary shadow-sm">
              <h3 className="font-semibold text-xl text-macri-primary">Sr. Manager, Solution Advisory – Legal Ethics & Compliance</h3>
              <p className="text-gray-600 font-medium">ServiceNow • Dec 2021 - Jun 2025</p>
              <p className="text-gray-700 mt-2">$900M risk reduction through GRC solution advisory. SME for AI risk policies. PolicyHub creation.</p>
            </div>
            
            {/* VMware Director */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-macri-primary shadow-sm">
              <h3 className="font-semibold text-xl text-macri-primary">Partner Business & Technical Alliance Director – Americas</h3>
              <p className="text-gray-600 font-medium">VMware • Nov 2019 - Dec 2021</p>
              <p className="text-gray-700 mt-2">Two $50M+ landmark deals. 450% sales target achievement. Partner-led integrations with DXC.</p>
            </div>
            
            {/* VMware Progressive */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-gray-300 shadow-sm">
              <h3 className="font-semibold text-xl text-macri-primary">Progressive Leadership Roles</h3>
              <p className="text-gray-600 font-medium">VMware • 2011 - 2019</p>
              <p className="text-gray-700 mt-2">Staff TAM → Sr Manager Customer Success → Partner SE Leader. $440M partner revenue. 83 NPS.</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              className="bg-macri-primary hover:bg-macri-primary-dark text-white"
              asChild
            >
              <a href="/resume">
                View Full Resume
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-macri-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-3xl mb-4">
            Explore Detailed Case Studies
          </h2>
          <p className="text-xl mb-8 text-white/90">
            See specific examples of frameworks, solutions, and measurable outcomes.
          </p>
          
          <Button 
            size="lg"
            variant="collaboration"
            className="px-8"
            asChild
          >
            <a href="/selected-work">
              View Selected Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ExperienceImpact;
