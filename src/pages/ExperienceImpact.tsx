import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, TrendingUp, Shield, Briefcase, CheckCircle, ExternalLink } from 'lucide-react';

const ExperienceImpact: React.FC = () => {
  const roleLenses = [
    {
      id: 'customer-success',
      icon: Users,
      title: 'Customer Success Engineering',
      tagline: 'Driving adoption and retention at scale',
      keyPoints: [
        'Led technical success motions across pooled book of business',
        'Built engagement frameworks aligned to customer business metrics',
        'Designed scalable operating models for TAM, CSM, and Product teams'
      ],
      outcomes: [
        'NPS of 83 (20 points above target)',
        '20% renewal growth through adoption programs',
        'Built three dispersed post-sales teams',
        'Aligned technical success with expansion objectives'
      ],
      decisionImpact: 'Gave leadership consistent visibility into customer health, enabling confident renewal and expansion decisions.',
      caseStudyLink: '/portfolio/customer-success',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'solution-engineering',
      icon: Briefcase,
      title: 'Solution Engineering & Technical Enablement',
      tagline: 'Removing adoption barriers through repeatable frameworks',
      keyPoints: [
        'Built standardized onboarding playbooks and maturity checkpoints',
        'Created KPI frameworks that accelerate customer progression',
        'Designed scalable enablement across partner and customer ecosystems'
      ],
      outcomes: [
        '250% pipeline growth through enablement frameworks',
        'Consistent services and solution attach',
        'Reusable assets (workshops, checklists, playbooks)',
        'Scalable execution across regulated industries'
      ],
      decisionImpact: 'Enabled sales and delivery leaders to prioritize accounts and allocate resources based on clear adoption signals.',
      caseStudyLink: '/portfolio/solution-engineering',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'partner-ecosystem',
      icon: TrendingUp,
      title: 'Partner Ecosystems',
      tagline: 'Building high-yield co-sell motions',
      keyPoints: [
        'Led GSI and strategic partner motions across the Americas',
        'Aligned technical enablement with commercial execution',
        'Built joint business plans and managed co-sell delivery'
      ],
      outcomes: [
        'Two record-setting $50M+ partner-led deals',
        '$440M through multi-tiered routes-to-market',
        '200% increase in certifications',
        '21% increase in partner-driven pipeline'
      ],
      decisionImpact: 'Clarified partner investment decisions by providing leadership with predictable, measurable co-sell outcomes.',
      caseStudyLink: '/portfolio/partner-development',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'risk-governance',
      icon: Shield,
      title: 'Risk, Governance & DevSecOps',
      tagline: 'Turning compliance complexity into executive clarity',
      keyPoints: [
        'Delivered cloud-native security and compliance advisory',
        'Reduced enterprise risk while strengthening platform trust',
        'Owned AI/ML governance enablement as internal SME'
      ],
      outcomes: [
        '$900M in enterprise risk reduction',
        'SME for ServiceNow inaugural AI usage policies',
        'Standardized policy-to-process workflows',
        'Governance maturity for regulated customers'
      ],
      decisionImpact: 'Allowed executives to confidently approve technology investments with clear risk visibility and accountability.',
      caseStudyLink: '/portfolio/compliance',
      color: 'bg-green-50 border-green-200'
    }
  ];

  return (
    <>
      <SEOHead
        title="Experience & Impact - Mike Macri"
        description="Cross-functional leadership across Customer Success Engineering, Solution Engineering, Partner Ecosystems, and Risk-Driven Platforms with measurable outcomes at scale."
        keywords="Mike Macri experience, customer success engineering, solution engineering, partner development, risk governance, DevSecOps"
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
              Cross-functional leader with experience spanning Customer Success Engineering, Solution Engineering, partner ecosystems, and risk-driven platforms. Driving adoption, renewal growth, and measurable customer value at scale.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-macri-primary">20%</div>
              <div className="text-sm text-gray-600">Renewal Growth</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-macri-primary">250%</div>
              <div className="text-sm text-gray-600">Pipeline Growth</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-macri-primary">83 NPS</div>
              <div className="text-sm text-gray-600">Customer Score</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-macri-primary">$900M</div>
              <div className="text-sm text-gray-600">Risk Reduction</div>
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
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <role.icon className="w-6 h-6 text-macri-primary" />
                      </div>
                      <div>
                        <h2 className="font-saira font-bold text-2xl text-macri-primary">
                          {role.title}
                        </h2>
                        <p className="text-gray-600 text-sm italic">{role.tagline}</p>
                      </div>
                    </div>
                    
                    {/* Key Points - Scannable bullets */}
                    <ul className="space-y-2 my-4">
                      {role.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-macri-primary mt-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Decision Impact Callout */}
                    <div className="p-4 bg-white/70 border-l-4 border-macri-primary rounded-r-lg mb-4">
                      <p className="text-sm font-semibold text-macri-primary mb-1">Decision Impact</p>
                      <p className="text-gray-700 text-sm">{role.decisionImpact}</p>
                    </div>
                    
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
                  <div className="lg:w-80">
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">Key Outcomes</h3>
                    <ul className="space-y-3">
                      {role.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{outcome}</span>
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
              <h3 className="font-semibold text-xl text-macri-primary">Principal Consultant</h3>
              <p className="text-gray-600 font-medium">Momentum Edge Consulting • May 2025 - Present</p>
              <p className="text-gray-700 mt-2">Technical advisor for regulated public sector and enterprise customers. Post-sale adoption readiness, operating model alignment, and technical value realization.</p>
            </div>
            
            {/* ServiceNow */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-macri-primary shadow-sm">
              <h3 className="font-semibold text-xl text-macri-primary">Manager, Solution Advisory – Legal Ethics & Compliance</h3>
              <p className="text-gray-600 font-medium">ServiceNow • Dec 2021 - May 2025</p>
              <p className="text-gray-700 mt-2">Post-sales solution advisory driving platform adoption, governance maturity, and enterprise risk reduction. SME for AI/ML governance enablement.</p>
            </div>
            
            {/* VMware Director */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-macri-primary shadow-sm">
              <h3 className="font-semibold text-xl text-macri-primary">Partner Business & Technical Alliance Director – Americas</h3>
              <p className="text-gray-600 font-medium">VMware • Nov 2019 - Dec 2021</p>
              <p className="text-gray-700 mt-2">GSI and strategic partner motions. Two $50M+ landmark deals. Partner playbooks and go-to-market alignment.</p>
            </div>
            
            {/* VMware Progressive */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-gray-300 shadow-sm">
              <h3 className="font-semibold text-xl text-macri-primary">Progressive Leadership Roles</h3>
              <p className="text-gray-600 font-medium">VMware • 2011 - 2019</p>
              <p className="text-gray-700 mt-2">Staff TAM → Sr Manager Customer Success → Partner SE Leader. $440M partner revenue. 83 NPS. Three dispersed post-sales teams.</p>
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
