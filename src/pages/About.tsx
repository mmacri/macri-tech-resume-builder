import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MapPin, Calendar, Building, Mail, Users, TrendingUp, Shield, Briefcase, ArrowRight, Rocket } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const About: React.FC = () => {
  const flowchartInView = useInView({ threshold: 0.2 });
  const focusAreas = [
    {
      icon: Users,
      title: 'Customer Success Leadership',
      description: 'Strategic frameworks for customer engagement, retention strategies, and measurable value delivery with NPS improvements.',
      href: '/portfolio/customer-success',
      stats: '83 NPS • 21% adoption increase'
    },
    {
      icon: TrendingUp,
      title: 'Partner Development & Ecosystems',
      description: 'Ecosystem building strategies that secured $100M+ landmark deals and drove $440M in partner-influenced revenue.',
      href: '/portfolio/partner-development',
      stats: '$440M partner revenue • 450% target'
    },
    {
      icon: Shield,
      title: 'Compliance & Risk Leadership',
      description: 'GRC frameworks, AI governance, and compliance automation that delivered $900M in quantifiable risk reduction.',
      href: '/portfolio/compliance',
      stats: '$900M risk reduction • PolicyHub'
    },
    {
      icon: Briefcase,
      title: 'Solution Engineering & Leadership',
      description: 'Technical innovation with PolicyHub module creation, common controls architecture, and enterprise engagement delivery.',
      href: '/portfolio/solution-engineering',
      stats: 'AI/ML governance • Common controls'
    }
  ];

  const journeyMilestones = [
    {
      period: 'Apr 2025 - Present',
      title: 'Principal Consultant & Solution Engineer',
      company: 'Momentum Edge Consulting',
      location: 'United States - Hybrid',
      isCurrent: true,
      highlights: [
        'Founded consulting practice delivering IT, compliance, governance, and AI-driven solutions',
        'Advising healthcare practices, utilities, and municipal organizations on complex compliance initiatives',
        'Strategic subcontracting partner for firms such as IDMA3',
        'Virtual CIO/CISO guidance, AI enablement planning, and cross-functional alignment'
      ],
      areasOfFocus: ['NERC/CIP', 'HIPAA', 'AI Governance', 'Healthcare IT', 'ServiceNow GRC/IRM'],
      link: '/portfolio/momentum-edge'
    },
    {
      period: 'Dec 2021 - Jun 2025',
      title: 'Sr. Manager, Solution Advisory – Legal Ethics & Compliance',
      company: 'ServiceNow',
      location: 'Remote',
      isCurrent: false,
      highlights: [
        'Directed cross-functional solution advisory across Sales, Security, Legal, and Product',
        'Delivered $900M in risk reduction through GRC solution advisory and PolicyHub creation',
        'SME for ServiceNow\'s inaugural AI risk policies and requirements',
        'Shaped product roadmap internally and with enterprise customers'
      ],
      areasOfFocus: ['GRC', 'AI/ML Ethics', 'PolicyHub', 'Risk Reduction'],
      link: '/portfolio/compliance'
    },
    {
      period: 'Nov 2019 - Dec 2021',
      title: 'Partner Business & Technical Alliance Director – Americas',
      company: 'VMware',
      location: 'San Francisco, CA',
      isCurrent: false,
      highlights: [
        'Designed partner joint business plans resulting in two record-setting $50M+ deals',
        'Exceeded sales targets by 450% through GTM with consulting/implementation partners',
        'Aligned product and engineering on partner-led integrations (e.g., VMware on AWS with DXC)'
      ],
      areasOfFocus: ['Partner Alliances', 'GTM Strategy', 'Deal Execution'],
      link: '/portfolio/partner-development'
    },
    {
      period: '2011 - 2019',
      title: 'Progressive Leadership Roles',
      company: 'VMware',
      location: 'Seattle, WA → Chicago, IL',
      isCurrent: false,
      highlights: [
        'Advanced from Staff TAM to Sr Manager, Customer Success to Partner Staff SE Leader',
        'Drove $440M through multi-tiered routes-to-market with CDW partnership',
        'Improved NPS by 30 points (20 above company standard)',
        'Built engagement frameworks growing teams across US West Coast'
      ],
      areasOfFocus: ['Customer Success', 'Team Leadership', 'Partner Development'],
      link: '/portfolio/customer-success'
    },
    {
      period: '2000 - 2011',
      title: 'Technical Foundation & Consulting Excellence',
      company: 'Various / Own Consulting Firm',
      location: 'Nationwide',
      isCurrent: false,
      highlights: [
        'Founded and successfully merged own consulting firm',
        'Delivered strategic technology solutions across healthcare and diverse industries',
        'Established CIO consulting practice and V-Dash implementations for Microsoft',
        'Built deep technical expertise with mainframe and web technologies'
      ],
      areasOfFocus: ['Healthcare IT', 'CIO Consulting', 'Microsoft'],
      link: null
    }
  ];

  return (
    <>
      <SEOHead
        title="About Mike Macri - Professional Background & Experience"
        description="Learn about Mike Macri's professional journey, expertise in solution consulting, governance frameworks, and strategic technology implementations."
        keywords="Mike Macri about, professional background, solution consulting expertise, business consultant biography"
        url="https://mikemacri.com/about"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                <Rocket className="w-3 h-3 mr-1" /> Now: Principal Consultant at Momentum Edge
              </Badge>
              
              <h1 className="font-saira font-bold text-5xl lg:text-6xl text-macri-primary mb-6">
                About Mike Macri
              </h1>
              
              <div className="space-y-4 text-lg text-gray-700 mb-8">
                <p>
                  <strong>Cross-Functional Strategic Leader</strong> excelling at the nexus of <strong>Solution Engineering</strong>, <strong>Customer Success</strong>, <strong>Partner Ecosystem Development</strong>, and <strong>Compliance & Risk Leadership</strong>.
                </p>
                
                <p>
                  Currently leading <strong>Momentum Edge Consulting</strong>, delivering practical IT, compliance, governance, and AI-driven solutions for regulated organizations including healthcare practices, utilities, and city agencies.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-macri-primary mb-1">$900M+</div>
                  <div className="text-xs font-medium text-gray-600">Risk Reduction Delivered</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-macri-primary mb-1">450%</div>
                  <div className="text-xs font-medium text-gray-600">Sales Target Achievement</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-macri-primary mb-1">83 NPS</div>
                  <div className="text-xs font-medium text-gray-600">Net Promoter Score</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-macri-primary mb-1">$100M+</div>
                  <div className="text-xs font-medium text-gray-600">Landmark Deals</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-macri-primary hover:bg-macri-primary-dark text-white px-6"
                  asChild
                >
                  <a href="/portfolio/momentum-edge">
                    Learn About MEC
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-6"
                  asChild
                >
                  <a href="/contact">
                    <Mail className="mr-2 w-4 h-4" />
                    Contact Me
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                  alt="Mike Macri - Professional headshot"
                  className="w-80 h-80 rounded-full border-8 border-white shadow-2xl object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-macri-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Professional Journey */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-4">
              Professional Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              25+ years of progressive leadership across enterprise technology, compliance, and strategic consulting
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-macri-primary/20 transform md:-translate-x-1/2"></div>

            <div className="space-y-8">
              {journeyMilestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow transform -translate-x-1/2 z-10" 
                    style={{ backgroundColor: milestone.isCurrent ? '#16a34a' : 'hsl(var(--macri-primary))' }}>
                  </div>

                  {/* Content card */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className={`bg-white rounded-lg shadow-lg border-2 p-6 hover:shadow-xl transition-shadow ${
                      milestone.isCurrent ? 'border-green-500' : 'border-gray-200 hover:border-macri-primary/50'
                    }`}>
                      {milestone.isCurrent && (
                        <Badge className="mb-3 bg-green-100 text-green-800 border-green-200">
                          Current Role
                        </Badge>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        {milestone.period}
                      </div>
                      
                      <h3 className="font-semibold text-xl text-macri-primary mb-1">
                        {milestone.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{milestone.company}</span>
                        <span className="text-gray-400">•</span>
                        <MapPin className="w-4 h-4" />
                        <span>{milestone.location}</span>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {milestone.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="text-sm text-gray-700 flex items-start">
                            <span className="w-1.5 h-1.5 bg-macri-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {milestone.areasOfFocus.map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>

                      {milestone.link && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white"
                          asChild
                        >
                          <a href={milestone.link}>
                            View Case Study
                            <ArrowRight className="ml-2 w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Focus Areas */}
      <section id="focus-areas" className="py-16 bg-gradient-to-br from-macri-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
              Professional Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore detailed case studies and measurable outcomes across four specialized domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {focusAreas.map((area, index) => (
              <a 
                key={index}
                href={area.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-macri-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-macri-primary/10 rounded-lg group-hover:bg-macri-primary transition-colors">
                    <area.icon className="w-6 h-6 text-macri-primary group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-saira text-xl font-bold text-macri-primary mb-2 group-hover:text-macri-primary-dark">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{area.description}</p>
                    <p className="text-sm font-medium text-macri-primary/70 mb-3">{area.stats}</p>
                    <span className="text-sm font-medium text-macri-primary group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <h3 className="font-saira text-2xl font-bold text-macri-primary mb-3">
                Complete Professional Documentation
              </h3>
              <p className="text-gray-600">
                Access my comprehensive resume and explore my full project portfolio
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8"
                asChild
              >
                <a href="/resume">
                  View Full Resume
                  <ExternalLink className="ml-2 w-5 h-5" />
                </a>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8"
                asChild
              >
                <a href="/portfolio">
                  Browse Portfolio
                  <ExternalLink className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-4">
              Proven Methodologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured frameworks I apply to deliver measurable outcomes across Solution Engineering, Customer Success, and Partner Development
            </p>
          </div>

          {/* Integration Flowchart */}
          <div className="mb-16 bg-gradient-to-r from-macri-primary/5 via-macri-primary/10 to-macri-primary/5 rounded-2xl p-8 border border-macri-primary/20">
            <h3 className="font-saira text-xl font-bold text-center text-macri-primary mb-8">
              End-to-End Customer Value Delivery
            </h3>
            
            {/* Desktop Flowchart */}
            <div className="hidden lg:block" ref={flowchartInView.ref}>
              <div className="relative">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--macri-primary))" />
                    </marker>
                  </defs>
                  {/* SE to CS arrow */}
                  <line 
                    x1="32%" y1="50%" x2="43%" y2="50%" 
                    stroke="hsl(var(--macri-primary))" 
                    strokeWidth="2" 
                    markerEnd="url(#arrowhead)" 
                    className={`transition-all duration-700 delay-500 ${flowchartInView.isInView ? 'opacity-60' : 'opacity-0'}`}
                    style={{ strokeDasharray: 100, strokeDashoffset: flowchartInView.isInView ? 0 : 100, transition: 'stroke-dashoffset 0.8s ease-out 0.5s, opacity 0.5s ease-out 0.5s' }}
                  />
                  {/* CS to PD arrow */}
                  <line 
                    x1="57%" y1="50%" x2="68%" y2="50%" 
                    stroke="hsl(var(--macri-primary))" 
                    strokeWidth="2" 
                    markerEnd="url(#arrowhead)" 
                    className={`transition-all duration-700 delay-700 ${flowchartInView.isInView ? 'opacity-60' : 'opacity-0'}`}
                    style={{ strokeDasharray: 100, strokeDashoffset: flowchartInView.isInView ? 0 : 100, transition: 'stroke-dashoffset 0.8s ease-out 0.7s, opacity 0.5s ease-out 0.7s' }}
                  />
                  {/* Feedback loop - curved line from PD back to SE */}
                  <path 
                    d="M 85% 75% Q 50% 120%, 15% 75%" 
                    fill="none" 
                    stroke="hsl(var(--macri-primary))" 
                    strokeWidth="2" 
                    strokeDasharray="5,5" 
                    className={`transition-opacity duration-1000 delay-1000 ${flowchartInView.isInView ? 'opacity-40' : 'opacity-0'}`}
                  />
                </svg>

                <div className="grid grid-cols-3 gap-8 relative z-10">
                  {/* Solution Engineering */}
                  <div className={`bg-white rounded-xl p-6 shadow-lg border-2 border-macri-primary/30 hover:border-macri-primary transition-all duration-500 group ${flowchartInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0ms' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-macri-primary rounded-lg group-hover:scale-110 transition-transform">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-macri-primary/60 uppercase tracking-wide">Phase 1</div>
                        <h4 className="font-saira font-bold text-lg text-macri-primary">Solution Engineering</h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Design & validate technical solutions aligned to business outcomes</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">Discovery</span>
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">Architecture</span>
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">POC</span>
                    </div>
                  </div>

                  {/* Customer Success */}
                  <div className={`bg-white rounded-xl p-6 shadow-lg border-2 border-macri-primary/30 hover:border-macri-primary transition-all duration-500 group ${flowchartInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-macri-primary rounded-lg group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-macri-primary/60 uppercase tracking-wide">Phase 2</div>
                        <h4 className="font-saira font-bold text-lg text-macri-primary">Customer Success</h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Drive adoption, value realization & advocacy through structured engagement</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">Onboarding</span>
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">Adoption</span>
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">Expansion</span>
                    </div>
                  </div>

                  {/* Partner Development */}
                  <div className={`bg-white rounded-xl p-6 shadow-lg border-2 border-macri-primary/30 hover:border-macri-primary transition-all duration-500 group ${flowchartInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-macri-primary rounded-lg group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-macri-primary/60 uppercase tracking-wide">Phase 3</div>
                        <h4 className="font-saira font-bold text-lg text-macri-primary">Partner Ecosystem</h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Scale through strategic alliances, co-sell motions & ecosystem growth</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">Enablement</span>
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">Co-Sell</span>
                      <span className="text-xs bg-macri-primary/10 text-macri-primary px-2 py-1 rounded">Growth</span>
                    </div>
                  </div>
                </div>

                {/* Feedback Loop Label */}
                <div className="text-center mt-6">
                  <span className="inline-flex items-center gap-2 text-sm text-macri-primary/70 bg-white px-4 py-2 rounded-full border border-macri-primary/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Continuous Feedback Loop — Partner insights inform solution improvements
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Flowchart */}
            <div className="lg:hidden space-y-4">
              {[
                { icon: Briefcase, phase: '1', title: 'Solution Engineering', desc: 'Design & validate technical solutions' },
                { icon: Users, phase: '2', title: 'Customer Success', desc: 'Drive adoption & value realization' },
                { icon: TrendingUp, phase: '3', title: 'Partner Ecosystem', desc: 'Scale through strategic alliances' }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-macri-primary flex items-center gap-4">
                    <div className="p-2 bg-macri-primary rounded-lg flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-macri-primary/60">Phase {item.phase}</div>
                      <h4 className="font-saira font-bold text-macri-primary">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                  {idx < 2 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-5 h-5 text-macri-primary/50 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
              <div className="text-center pt-2">
                <span className="text-xs text-macri-primary/60">↻ Continuous feedback loop</span>
              </div>
            </div>
          </div>

          {/* Solution Engineering Framework */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-macri-primary rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-saira text-2xl font-bold text-macri-primary">
                Solution Engineering Framework
              </h3>
              <a href="/portfolio/solution-engineering" className="ml-auto text-sm text-macri-primary hover:underline flex items-center gap-1">
                View Full Details <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { title: 'Discover & Define', desc: 'Identify challenges, risks, and opportunities through structured discovery' },
                { title: 'Architect & Design', desc: 'Design reference architectures using secure, modular patterns' },
                { title: 'Demonstrate & Validate', desc: 'Deliver POCs, demos, and executive storytelling' },
                { title: 'Automate & Operationalize', desc: 'Build automation and scalable workflows' },
                { title: 'Enable & Expand', desc: 'Document, train, and empower teams to sustain value' }
              ].map((step, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-macri-primary">
                  <div className="text-xs font-bold text-macri-primary mb-1">Step {idx + 1}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Success Framework */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-macri-primary rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-saira text-2xl font-bold text-macri-primary">
                Customer Success Framework
              </h3>
              <a href="/portfolio/customer-success" className="ml-auto text-sm text-macri-primary hover:underline flex items-center gap-1">
                View Full Details <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: 'Onboarding & Setup', desc: 'Align on outcomes, define joint success plans, establish baselines' },
                { title: 'Adoption & Engagement', desc: 'Health scoring, structured touchpoints, proactive gap resolution' },
                { title: 'Value Realization', desc: 'Executive storytelling, recurring reviews, strategic alignment' },
                { title: 'Advocacy & Expansion', desc: 'Champion development, case studies, expansion planning' }
              ].map((step, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-macri-primary">
                  <div className="text-xs font-bold text-macri-primary mb-1">Step {idx + 1}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Development Framework */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-macri-primary rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-saira text-2xl font-bold text-macri-primary">
                Partner Ecosystem Framework
              </h3>
              <a href="/portfolio/partner-development" className="ml-auto text-sm text-macri-primary hover:underline flex items-center gap-1">
                View Full Details <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: 'Strategy & Alignment', desc: 'Define partner value proposition, align stakeholders, prioritize partner types' },
                { title: 'Enablement & Engagement', desc: 'Scalable onboarding, training programs, GTM resources' },
                { title: 'Joint Execution & Co-Sell', desc: 'Pipeline generation, deal governance, performance dashboards' },
                { title: 'Growth & Optimization', desc: 'Partner health evaluation, co-innovation, ecosystem champions' }
              ].map((step, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-macri-primary">
                  <div className="text-xs font-bold text-macri-primary mb-1">Step {idx + 1}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
              Core Values & Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-macri-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-macri-primary" />
              </div>
              <h3 className="font-semibold text-xl text-macri-primary mb-4">Strategic Excellence</h3>
              <p className="text-gray-700">
                Delivering innovative solutions that align with business objectives and drive measurable growth.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-macri-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-macri-primary" />
              </div>
              <h3 className="font-semibold text-xl text-macri-primary mb-4">Collaborative Partnership</h3>
              <p className="text-gray-700">
                Building strong relationships and fostering collaboration to achieve shared success.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-macri-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-macri-primary" />
              </div>
              <h3 className="font-semibold text-xl text-macri-primary mb-4">Results-Driven Focus</h3>
              <p className="text-gray-700">
                Committed to delivering tangible outcomes that exceed expectations and create lasting value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-macri-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-4xl mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's discuss how we can work together to achieve your business objectives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="collaboration"
              className="px-8 py-3"
              asChild
            >
              <a href="/contact">
                Get In Touch
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="collaborationOutline"
              className="px-8 py-3"
              asChild
            >
              <a href="/portfolio">
                View My Work
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
