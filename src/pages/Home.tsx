import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, Star, Users, TrendingUp, Shield, Briefcase } from 'lucide-react';

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

  const expertiseAreas = [
    { icon: Users, label: 'Customer Success', description: '83 NPS, 21% adoption increase' },
    { icon: TrendingUp, label: 'Partner Development', description: '$440M partner-influenced revenue' },
    { icon: Shield, label: 'Compliance & Risk', description: '$900M risk reduction' },
    { icon: Briefcase, label: 'Solution Engineering', description: 'PolicyHub creation, AI governance' },
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
                Cross-functional leader bridging <strong>Solution Engineering</strong>, <strong>Customer Success</strong>, <strong>Partner Ecosystems</strong>, and <strong>Compliance & Risk Management</strong> to transform business challenges into measurable growth. Proven expertise in scaling teams, architecting enterprise solutions, and driving cross-domain initiatives that accelerate adoption and mitigate enterprise risk globally.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-xl font-bold text-macri-primary mb-1">$900M+</div>
                  <div className="text-xs font-medium text-gray-600">Risk Reduction</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-xl font-bold text-macri-primary mb-1">450%</div>
                  <div className="text-xs font-medium text-gray-600">Sales Target</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-xl font-bold text-macri-primary mb-1">83 NPS</div>
                  <div className="text-xs font-medium text-gray-600">Customer Score</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="text-xl font-bold text-macri-primary mb-1">$100M+</div>
                  <div className="text-xs font-medium text-gray-600">Deals Secured</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-4 text-lg"
                  asChild
                >
                  <a href="/about">
                    Learn More About Me
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
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-macri-primary rounded-full animate-bounce"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-macri-primary/60 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas - Quick Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-4">
              Areas of Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four specialized domains where I drive measurable business impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-macri-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <area.icon className="w-6 h-6 text-macri-primary" />
                </div>
                <h3 className="font-semibold text-lg text-macri-primary mb-2">{area.label}</h3>
                <p className="text-sm text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline"
              className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white"
              asChild
            >
              <a href="/about">
                Explore My Professional Focus Areas
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
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
              Innovative solutions that have driven measurable business results
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
                View Full Portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-macri-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-4xl mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's discuss how my expertise can help drive your business forward.
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
