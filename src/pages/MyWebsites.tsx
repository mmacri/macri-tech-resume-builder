import React, { useState } from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { ExternalLink, Globe, TrendingUp, Users, BarChart3, Award, CheckCircle } from 'lucide-react';
import momentumEdgeScreenshot from '@/assets/momentum-edge-screenshot.png';
import homeFitScreenshot from '@/assets/homefit-recovery-screenshot.png';
import hoaCommunityScreenshot from '@/assets/hoa-community-screenshot.png';

interface WebsiteProject {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  category: string;
  status: 'live' | 'maintenance';
  technologies: string[];
  highlights: string[];
  metrics: {
    description: string;
    focus: string;
  };
}

const MyWebsites: React.FC = () => {
  const [activeWebsite, setActiveWebsite] = useState<string>('momentum-edge');

  const websites: WebsiteProject[] = [
    {
      id: 'momentum-edge',
      title: 'Momentum Edge Consulting',
      description: 'Strategic IT Solutions & AI Innovation platform providing Fortune 500-level technology leadership without the full-time cost. Specializes in CIO advisory, healthcare IT solutions, cybersecurity compliance, and AI governance with 20+ years of experience.',
      url: 'https://www.momentumedgeconsulting.com',
      image: momentumEdgeScreenshot,
      category: 'IT Consulting',
      status: 'live',
      technologies: ['React', 'TypeScript', 'Modern Web Technologies'],
      highlights: [
        'CIO-level guidance without executive salary',
        'HIPAA-compliant solutions for medical practices',
        'Responsible AI implementation and governance',
        'No long-term contracts, 100% vendor neutral',
        '20+ years healthcare IT experience'
      ],
      metrics: {
        description: 'Enterprise expertise with startup agility',
        focus: 'Virtual CIO Strategy & Healthcare IT'
      }
    },
    {
      id: 'homefit-recovery',
      title: 'HomeFit Recovery',
      description: 'Review-backed products and expert analysis platform using AI-powered analysis of thousands of customer reviews and price data. Helps users find the best fitness recovery products including massage guns, foam rollers, and wellness equipment.',
      url: 'https://www.homefitrecovery.com',
      image: homeFitScreenshot,
      category: 'Health & Wellness E-commerce',
      status: 'live',
      technologies: ['E-commerce Platform', 'AI Review Analysis', 'Content Management'],
      highlights: [
        'AI-powered analysis of customer reviews',
        'Price tracking and deal alerts',
        'Expert product curation',
        'Trusted by 10,000+ recovery enthusiasts',
        'Comprehensive product categories'
      ],
      metrics: {
        description: 'Trusted by thousands of users with verified reviews',
        focus: 'Recovery Products & Expert Analysis'
      }
    },
    {
      id: 'hoa-community',
      title: 'HOA Community Forums',
      description: 'Community engagement platform connecting HOA residents through private forums, community reviews, and transparent communication. Enables neighbors to share experiences, discuss community matters, and build stronger residential communities.',
      url: 'https://mmacri.github.io/hoa-spotlight',
      image: hoaCommunityScreenshot,
      category: 'Community Platform',
      status: 'live',
      technologies: ['React', 'Community Management', 'Forum System'],
      highlights: [
        'Private community forums and discussions',
        'Authentic resident reviews and experiences',
        'Featured community showcases',
        'Transparent communication tools',
        'Neighborhood connection platform'
      ],
      metrics: {
        description: 'Connecting residents for stronger communities',
        focus: 'HOA Community Engagement'
      }
    }
  ];

  const activeWebsiteData = websites.find(w => w.id === activeWebsite) || websites[0];

  return (
    <>
      <SEOHead
        title="My Websites - Mike Macri's Business Platforms"
        description="Explore Mike Macri's business websites including Momentum Edge Consulting for IT solutions and HomeFit Recovery for fitness product reviews and recommendations."
        keywords="Mike Macri websites, Momentum Edge Consulting, HomeFit Recovery, IT consulting, fitness recovery products"
        url="https://mikemacri.com/my-websites"
      />

      {/* Website Navigation */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="font-saira font-bold text-3xl text-macri-primary mb-4 md:mb-0">
              My Business Websites
            </h1>
            
            {/* Website Tabs */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              {websites.map((website) => (
                <button
                  key={website.id}
                  onClick={() => setActiveWebsite(website.id)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    activeWebsite === website.id
                      ? 'bg-macri-primary text-white'
                      : 'text-gray-600 hover:text-macri-primary hover:bg-white'
                  }`}
                >
                  {website.title.split(' ')[0]} {website.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Website */}
      <section className="py-16 bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Website Preview */}
            <div className="order-2 lg:order-1">
              <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2 border-b border-gray-200">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 text-xs text-gray-600 bg-white px-2 py-1 rounded">
                    {activeWebsiteData.url}
                  </div>
                </div>
                <img
                  src={activeWebsiteData.image}
                  alt={`Screenshot of ${activeWebsiteData.title}`}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Website Details */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-macri-primary/10 text-macri-primary text-sm font-medium rounded-full mr-3">
                  {activeWebsiteData.category}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeWebsiteData.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {activeWebsiteData.status === 'live' ? 'Live' : 'Maintenance'}
                </span>
              </div>

              <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
                {activeWebsiteData.title}
              </h2>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {activeWebsiteData.description}
              </p>

              {/* Key Highlights */}
              <div className="mb-6">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {activeWebsiteData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-macri-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="font-semibold text-sm text-gray-600 mb-2">TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-2">
                  {activeWebsiteData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-3 text-lg"
                asChild
              >
                <a
                  href={activeWebsiteData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Visit {activeWebsiteData.title.split(' ')[0]}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Websites Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
              Website Portfolio Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three distinct platforms showcasing my expertise in technology consulting, 
              e-commerce innovation, and community engagement solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((website) => (
              <div 
                key={website.id} 
                className={`bg-white rounded-lg shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  website.id === activeWebsite ? 'border-macri-primary' : 'border-gray-200 hover:border-macri-primary/50'
                }`}
                onClick={() => setActiveWebsite(website.id)}
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={website.image}
                    alt={`Screenshot of ${website.title}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-xl text-macri-primary">
                      {website.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      website.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {website.status === 'live' ? 'Live' : 'Maintenance'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{website.category}</p>
                  
                  <div className="bg-macri-primary/5 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-macri-primary">
                      {website.metrics.focus}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {website.metrics.description}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-macri-primary hover:bg-macri-primary-dark text-white"
                    asChild
                  >
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
            Interested in Similar Solutions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you need strategic IT consulting, e-commerce platform development, 
            community engagement solutions, or want to explore partnership opportunities, I'd love to discuss your project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-3"
              asChild
            >
              <a href="/contact">
                Start a Conversation
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
            
            <Button 
              variant="outline"
              className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8 py-3"
              asChild
            >
              <a href="/portfolio">
                View My Portfolio
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyWebsites;