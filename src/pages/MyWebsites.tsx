import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { ExternalLink, Globe, Star, Users, TrendingUp } from 'lucide-react';

interface WebsiteProject {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  category: string;
  status: 'live' | 'development' | 'maintenance';
  technologies: string[];
  metrics?: {
    users?: string;
    revenue?: string;
    growth?: string;
  };
}

const MyWebsites: React.FC = () => {
  const websites: WebsiteProject[] = [
    {
      id: 'momentum-edge',
      title: 'Momentum Edge Consulting',
      description: 'Professional consulting services platform offering strategic business solutions, technology implementations, and organizational optimization.',
      url: 'https://momentumedgeconsulting.com',
      image: '/lovable-uploads/0b2077d6-0d8a-4913-9ba7-1001cb320d19.png',
      category: 'Business Consulting',
      status: 'live',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      metrics: {
        users: '500+',
        revenue: '$250K+',
        growth: '35%'
      }
    },
    {
      id: 'homefit-recovery',
      title: 'HomeFit Recovery',
      description: 'Comprehensive health and wellness platform specializing in at-home fitness solutions and recovery programs for optimal health.',
      url: 'https://homefitrecovery.com',
      image: '/lovable-uploads/1734d6e1-fc92-4f70-949c-192bdebc6d72.png',
      category: 'Health & Wellness',
      status: 'live',
      technologies: ['React', 'Node.js', 'MongoDB'],
      metrics: {
        users: '1,200+',
        revenue: '$150K+',
        growth: '50%'
      }
    },
    {
      id: 'ai-solutions-hub',
      title: 'AI Solutions Hub',
      description: 'Cutting-edge AI consulting and implementation services helping businesses leverage artificial intelligence for competitive advantage.',
      url: 'https://aisolutionshub.com',
      image: '/lovable-uploads/75ecce5a-4c43-44e1-9825-63545cfb5ab8.png',
      category: 'AI & Technology',
      status: 'development',
      technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
      metrics: {
        users: 'Beta',
        revenue: 'TBD',
        growth: 'New'
      }
    },
    {
      id: 'governance-pro',
      title: 'Governance Pro Platform',
      description: 'Enterprise governance, risk, and compliance platform designed to streamline organizational processes and ensure regulatory adherence.',
      url: 'https://governancepro.net',
      image: '/lovable-uploads/7dcb7d3e-8e11-47e0-b772-143e31823901.png',
      category: 'GRC Solutions',
      status: 'live',
      technologies: ['Vue.js', 'Laravel', 'PostgreSQL'],
      metrics: {
        users: '800+',
        revenue: '$400K+',
        growth: '25%'
      }
    },
    {
      id: 'partner-ecosystem',
      title: 'Partner Ecosystem Manager',
      description: 'Comprehensive partner management platform facilitating collaboration, tracking performance, and optimizing partnership outcomes.',
      url: 'https://partnerecosystem.io',
      image: '/lovable-uploads/85b0b79e-240c-4fdc-9841-cd0d889d496b.png',
      category: 'Partner Management',
      status: 'maintenance',
      technologies: ['Angular', 'Spring Boot', 'MySQL'],
      metrics: {
        users: '300+',
        revenue: '$180K+',
        growth: '15%'
      }
    },
    {
      id: 'digital-insights',
      title: 'Digital Insights Analytics',
      description: 'Advanced analytics platform providing actionable business insights through data visualization and predictive modeling.',
      url: 'https://digitalinsights.pro',
      image: '/lovable-uploads/a6fd2e82-34d4-4f60-90fc-4f5236a13aaf.png',
      category: 'Analytics',
      status: 'live',
      technologies: ['D3.js', 'Python', 'Tableau', 'AWS'],
      metrics: {
        users: '600+',
        revenue: '$320K+',
        growth: '40%'
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      live: 'bg-green-100 text-green-800',
      development: 'bg-yellow-100 text-yellow-800',
      maintenance: 'bg-blue-100 text-blue-800'
    };
    return badges[status as keyof typeof badges] || badges.live;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <Star className="w-4 h-4" />;
      case 'development':
        return <TrendingUp className="w-4 h-4" />;
      case 'maintenance':
        return <Users className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <>
      <SEOHead
        title="My Websites & Projects - Mike Macri's Digital Portfolio"
        description="Explore Mike Macri's collection of websites and digital projects including business consulting platforms, health & wellness sites, AI solutions, and governance tools."
        keywords="Mike Macri websites, digital projects, business platforms, consulting websites, AI solutions, governance tools, web development portfolio"
        url="https://mikemacri.com/my-websites"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-macri-primary/10 via-white to-macri-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-saira font-bold text-5xl lg:text-6xl text-macri-primary mb-6">
              My Websites & Projects
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A collection of websites and digital platforms I've built and manage, showcasing 
              diverse industries and innovative solutions that drive real business value.
            </p>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-macri-primary mb-2">6</div>
                <div className="text-sm font-medium text-gray-600">Active Websites</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-macri-primary mb-2">3,400+</div>
                <div className="text-sm font-medium text-gray-600">Total Users</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-macri-primary mb-2">$1.3M+</div>
                <div className="text-sm font-medium text-gray-600">Revenue Generated</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-macri-primary mb-2">32%</div>
                <div className="text-sm font-medium text-gray-600">Avg Growth Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Websites Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((website) => (
              <div key={website.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Website Image */}
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={website.image}
                    alt={`Screenshot of ${website.title}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-macri-primary mb-1 line-clamp-2">
                        {website.title}
                      </h3>
                      <div className="text-sm text-gray-500 mb-2">
                        {website.category}
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(website.status)}`}>
                      {getStatusIcon(website.status)}
                      <span className="ml-1 capitalize">{website.status}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {website.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {website.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-macri-primary/10 text-macri-primary text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  {website.metrics && (
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-sm font-semibold text-macri-primary">
                          {website.metrics.users}
                        </div>
                        <div className="text-xs text-gray-500">Users</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-sm font-semibold text-macri-primary">
                          {website.metrics.revenue}
                        </div>
                        <div className="text-xs text-gray-500">Revenue</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-sm font-semibold text-macri-primary">
                          {website.metrics.growth}
                        </div>
                        <div className="text-xs text-gray-500">Growth</div>
                      </div>
                    </div>
                  )}

                  {/* Visit Button */}
                  <Button
                    className="w-full bg-macri-primary hover:bg-macri-primary-dark text-white"
                    asChild
                  >
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
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
            Interested in Working Together?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you need a new website, want to optimize an existing platform, 
            or explore partnership opportunities, I'd love to discuss your project.
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