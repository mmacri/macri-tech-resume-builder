import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const featuredProjects = [
    {
      title: 'Policy Hub Framework',
      description: 'Comprehensive governance and compliance platform streamlining organizational policies and procedures.',
      image: '/lovable-uploads/75ecce5a-4c43-44e1-9825-63545cfb5ab8.png',
      category: 'GRC Solutions',
      link: '/portfolio#1'
    },
    {
      title: 'Framework Fusion Engine',
      description: 'Community-driven cross-compliance framework mapping tool with AI-powered control mapping and gap analysis.',
      image: '/lovable-uploads/e001dd85-f8b8-4c6e-9d04-e8b316bbebcb.png',
      category: 'Business Solutions',
      link: '/portfolio#2'
    },
    {
      title: 'Customer Success Dashboard',
      description: 'Analytics dashboard that improved product adoption by 21% and increased NPS scores through better customer metrics tracking.',
      image: '/lovable-uploads/eb90f300-90d1-4c77-86ec-2814b17e1be4.png',
      category: 'Analytics Tools',
      link: '/portfolio#4'
    }
  ];

  return (
    <>
      <SEOHead
        title="Mike Macri - Professional Portfolio & Business Consultant"
        description="Welcome to Mike Macri's professional portfolio. Experienced business consultant specializing in solution consulting, governance frameworks, and strategic technology implementations."
        url="https://mikemacri.com"
      />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-macri-primary/10 via-white to-macri-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
            <h1 className="font-saira font-bold text-5xl lg:text-7xl text-macri-primary mb-6 leading-tight">
              Mike Macri
              <span className="block text-3xl lg:text-4xl text-gray-700 font-medium mt-2">
                M.B.A.
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed">
              Strategic Business Consultant & Solution Architect
            </p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Cross-functional leader bridging <strong>Solution Engineering</strong>, <strong>Customer Success</strong>, <strong>Partner Ecosystems</strong>, and <strong>Compliance & Risk Management</strong> to transform business challenges into measurable growth. At ServiceNow, delivered $900M in risk reduction through GRC solution advisory while shaping AI governance frameworks. At VMware, secured $100M+ in landmark deals through partner ecosystem development, achieving 83 NPS and 450% sales target attainment. Proven expertise in scaling teams, architecting enterprise solutions, and driving cross-domain initiatives that accelerate adoption and mitigate enterprise risk globally.
            </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-lg font-bold text-macri-primary mb-1">Solution</div>
                  <div className="text-xs font-medium text-gray-600">Advisory</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-lg font-bold text-macri-primary mb-1">Partner</div>
                  <div className="text-xs font-medium text-gray-600">Development</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-lg font-bold text-macri-primary mb-1">Compliance</div>
                  <div className="text-xs font-medium text-gray-600">& AI Ethics</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-lg font-bold text-macri-primary mb-1">Brand & KPI</div>
                  <div className="text-xs font-medium text-gray-600">Builder</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-4 text-lg"
                  asChild
                >
                  <a href="/portfolio">
                  View My Portfolio
                  <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8 py-4 text-lg"
                  asChild
                >
                  <a href="/resume">
                    <ExternalLink className="mr-2 w-5 h-5" />
                    View Resume
                  </a>
                </Button>
              </div>
            </div>

            {/* Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <img
                  src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                  alt="Mike Macri - Professional headshot"
                  className="w-96 h-96 rounded-full border-8 border-white shadow-2xl object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-macri-primary/20 to-transparent"></div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-macri-primary rounded-full animate-bounce"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-macri-primary/60 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-8">
              About Me
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Cross-functional leader excelling at the intersection of <strong>Solution Engineering</strong>, <strong>Customer Success</strong>, <strong>Partner Development</strong>, and <strong>Compliance & Risk Management</strong>. At ServiceNow, I bridge technical innovation with governance, delivering $900M in risk reduction through GRC solution advisory, PolicyHub creation, and AI/ML ethics frameworks while driving customer zero initiatives and product roadmap influence.
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  At VMware, I unified customer success strategies with partner ecosystem building, securing two $50M+ landmark deals through joint business planning while scaling advisory teams across the US West. Achieved 83 NPS (20 points above target), 450% sales attainment, and $440M in partner-influenced revenue by integrating technical solution delivery with strategic relationship management and compliance expertise that strengthens enterprise resilience.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg text-macri-primary mb-3">Available</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• Seattle, WA</div>
                    <div>• San Diego, CA</div>
                    <div>• Southern Michigan</div>
                    <div>• Chicago Metro Area</div>
                    <div>• Denver, CO</div>
                    <div>• Available Nationwide - Onsite or Remote</div>
                  </div>
                </div>

                <Button 
                  className="bg-macri-primary hover:bg-macri-primary-dark text-white"
                  asChild
                >
                  <a href="/about">
                    Learn More About Me
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="space-y-6">
                {/* Expertise Areas */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl text-macri-primary mb-4">Core Expertise</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <Star className="w-5 h-5 text-macri-primary mr-3" />
                      Solution Consulting & Strategy
                    </li>
                    <li className="flex items-center">
                      <Star className="w-5 h-5 text-macri-primary mr-3" />
                      Governance & Risk Management
                    </li>
                    <li className="flex items-center">
                      <Star className="w-5 h-5 text-macri-primary mr-3" />
                      Technology Implementation
                    </li>
                    <li className="flex items-center">
                      <Star className="w-5 h-5 text-macri-primary mr-3" />
                      Partner Ecosystem Development
                    </li>
                    <li className="flex items-center">
                      <Star className="w-5 h-5 text-macri-primary mr-3" />
                      Compliance Management & Policy Solutions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Focus Areas - Guide for Hiring Managers */}
      <section className="py-16 bg-gradient-to-br from-macri-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
              Explore My Professional Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deep into my specialized expertise across four key domains where I drive measurable business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Customer Success */}
            <a 
              href="/portfolio/customer-success"
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-macri-primary"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-macri-primary/10 rounded-lg group-hover:bg-macri-primary group-hover:text-white transition-colors">
                  <Users className="w-6 h-6 text-macri-primary group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-saira text-xl font-bold text-macri-primary mb-2 group-hover:text-macri-primary-dark">
                    Customer Success Leadership
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Strategic leadership in customer engagement, retention, and value delivery with proven NPS improvements and adoption metrics.
                  </p>
                  <span className="text-sm font-medium text-macri-primary group-hover:underline">
                    Explore Customer Success →
                  </span>
                </div>
              </div>
            </a>

            {/* Partner Development */}
            <a 
              href="/portfolio/partner-development"
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-macri-primary"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-macri-primary/10 rounded-lg group-hover:bg-macri-primary group-hover:text-white transition-colors">
                  <TrendingUp className="w-6 h-6 text-macri-primary group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-saira text-xl font-bold text-macri-primary mb-2 group-hover:text-macri-primary-dark">
                    Partner Development & Ecosystems
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Building and scaling strategic partner ecosystems that drive $440M+ in revenue and secure landmark deals.
                  </p>
                  <span className="text-sm font-medium text-macri-primary group-hover:underline">
                    Explore Partner Development →
                  </span>
                </div>
              </div>
            </a>

            {/* Compliance & Risk */}
            <a 
              href="/portfolio/compliance"
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-macri-primary"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-macri-primary/10 rounded-lg group-hover:bg-macri-primary group-hover:text-white transition-colors">
                  <Star className="w-6 h-6 text-macri-primary group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-saira text-xl font-bold text-macri-primary mb-2 group-hover:text-macri-primary-dark">
                    Compliance & Risk Leadership
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Transforming compliance into competitive advantage through ServiceNow GRC, AI governance, and $900M risk reduction.
                  </p>
                  <span className="text-sm font-medium text-macri-primary group-hover:underline">
                    Explore Compliance Leadership →
                  </span>
                </div>
              </div>
            </a>

            {/* Solution Engineering */}
            <a 
              href="/portfolio/solution-engineering"
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-macri-primary"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-macri-primary/10 rounded-lg group-hover:bg-macri-primary group-hover:text-white transition-colors">
                  <Star className="w-6 h-6 text-macri-primary group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-saira text-xl font-bold text-macri-primary mb-2 group-hover:text-macri-primary-dark">
                    Solution Engineering & Leadership
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Innovating at the intersection of technology and strategy with PolicyHub creation, common controls architecture, and team enablement.
                  </p>
                  <span className="text-sm font-medium text-macri-primary group-hover:underline">
                    Explore Solution Engineering →
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Resume & Portfolio CTAs */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <h3 className="font-saira text-2xl font-bold text-macri-primary mb-3">
                Learn More About My Experience
              </h3>
              <p className="text-gray-600">
                Explore my complete professional background and project portfolio
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
                  Browse Complete Portfolio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover some of my most impactful work, showcasing innovative solutions 
              that have driven measurable business results for clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-macri-primary mb-2">
                    {project.category}
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white"
                    asChild
                  >
                    <a href={project.link}>
                      View Details
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-3"
              asChild
            >
              <a href="/portfolio">
                View My Portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Resume CTA Section */}
      <section className="py-16 bg-macri-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-4xl mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's discuss how my expertise in solution consulting and strategic implementation 
            can help drive your business forward.
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
              <a href="/resume">
                <Users className="mr-2 w-5 h-5" />
                View Full Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
