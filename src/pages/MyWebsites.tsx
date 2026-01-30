import React, { useState } from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, CheckCircle, BookOpen, Shield, GraduationCap, Users } from 'lucide-react';

// Import screenshots
import momentumEdgeScreenshot from '@/assets/momentum-edge-screenshot.png';
import homeFitScreenshot from '@/assets/homefit-recovery-screenshot.png';
import hoaCommunityScreenshot from '@/assets/hoa-community-screenshot.png';
import mec2SkillsScreenshot from '@/assets/mec2-skills-screenshot.png';
import cipAuditReadyScreenshot from '@/assets/cip-audit-ready-screenshot.png';
import audit101Screenshot from '@/assets/audit101-screenshot.png';
import gitlabCsmScreenshot from '@/assets/gitlab-csm-dashboard-screenshot.png';
import frameworkFusionScreenshot from '@/assets/framework-fusion-screenshot.png';

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
}

const MyWebsites: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Sites', icon: Globe },
    { id: 'IT Consulting', label: 'IT Consulting', icon: Globe },
    { id: 'training', label: 'Training', icon: GraduationCap },
    { id: 'Health & Wellness E-commerce', label: 'E-commerce', icon: Globe },
    { id: 'Community Platform', label: 'Community', icon: Globe },
    { id: 'Customer Success', label: 'Customer Success', icon: Users },
  ];

  const matchesCategory = (website: WebsiteProject) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'training') {
      return ['Compliance Training', 'Framework Training'].includes(website.category);
    }
    return website.category === activeCategory;
  };

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
      ]
    },
    {
      id: 'mec-grc',
      title: 'MEC GRC',
      description: 'Interactive portfolio showcasing comprehensive skillsets from Momentum Edge Consulting. Demonstrates expertise in compliance, governance, AI enablement, and technical advisory across regulated industries.',
      url: 'https://mmacri.github.io/mec2',
      image: mec2SkillsScreenshot,
      category: 'IT Consulting',
      status: 'live',
      technologies: ['React', 'TypeScript', 'GitHub Pages'],
      highlights: [
        'Interactive skills visualization',
        'Compliance and governance expertise',
        'AI governance frameworks',
        'Healthcare IT specialization',
        'Executive advisory capabilities'
      ]
    },
    {
      id: 'cip-audit-ready',
      title: 'CIP Audit Ready Training',
      description: 'Custom training platform designed to prepare utility professionals for NERC/CIP compliance audits. Provides structured learning paths, assessment tools, and practical guidance for achieving audit readiness.',
      url: 'https://mmacri.github.io/cip-audit-ready/',
      image: cipAuditReadyScreenshot,
      category: 'Compliance Training',
      status: 'live',
      technologies: ['React', 'Training Platform', 'GitHub Pages'],
      highlights: [
        'NERC/CIP audit preparation curriculum',
        'Interactive compliance assessments',
        'Evidence collection best practices',
        'Control documentation guidance',
        'Audit simulation exercises'
      ]
    },
    {
      id: 'audit101',
      title: 'Audit 101 - Common Controls Framework',
      description: 'Expanded training platform covering common controls across multiple compliance frameworks. A lighter-depth introduction to compliance training showing all areas that could be deeply trained upon with enablement paths and certifications for internal organizations.',
      url: 'https://mmacri.github.io/audit101/',
      image: audit101Screenshot,
      category: 'Framework Training',
      status: 'live',
      technologies: ['React', 'Training Platform', 'GitHub Pages'],
      highlights: [
        'Multi-framework common controls mapping',
        'Enablement paths for organizations',
        'Certification preparation guidance',
        'Cross-framework compliance training',
        'Internal team development resources'
      ]
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
      ]
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
      ]
    },
    {
      id: 'framework-fusion',
      title: 'Framework Fusion Engine',
      description: 'Centralized Compliance Framework Library serving as the authoritative source for control mapping across multiple regulatory frameworks. Features master framework management, correlation views, Q&A assessments, auditor assessments, and analytics for comprehensive compliance program management.',
      url: 'https://mmacri.github.io/framework-fusion-engine/',
      image: frameworkFusionScreenshot,
      category: 'Community Platform',
      status: 'live',
      technologies: ['React', 'TypeScript', 'Control Framework Management', 'GitHub Pages'],
      highlights: [
        'Centralized master framework with 46+ control records',
        'Cross-framework correlation mapping (CIP, NIST, ISO, etc.)',
        'Q&A and auditor assessment modules',
        'Advanced filtering by domain, frequency, and status',
        'Excel import/export for control management'
      ]
    },
    {
      id: 'gitlab-csm-dashboard',
      title: 'CSM Dashboard',
      description: 'Customer Success Manager dashboard prototype demonstrating enterprise account health tracking using GitLab\'s PROVE methodology. Features executive snapshots, platform adoption metrics, license utilization trends, and renewal planning tools aligned with GitLab customer success best practices.',
      url: 'https://mmacri.github.io/GitLAB-Health/',
      image: gitlabCsmScreenshot,
      category: 'Customer Success',
      status: 'live',
      technologies: ['React', 'TypeScript', 'GitHub Pages', 'Data Visualization'],
      highlights: [
        'PROVE health scoring methodology',
        'Platform adoption tracking across SCM, CI, DevSecOps, CD',
        'License utilization trend analysis and forecasting',
        'Renewal countdown with readiness checklists',
        'Multi-audience views (Executive, DevOps, CSM, Customer)'
      ]
    }
  ];

  const filteredWebsites = websites.filter(matchesCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Compliance Training':
        return <Shield className="w-4 h-4" />;
      case 'Framework Training':
        return <GraduationCap className="w-4 h-4" />;
      case 'Customer Success':
        return <Users className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <>
      <SEOHead
        title="My Websites - Mike Macri's Business Platforms"
        description="Explore Mike Macri's business websites including Momentum Edge Consulting for IT solutions, compliance training platforms, and HomeFit Recovery for fitness product reviews."
        keywords="Mike Macri websites, Momentum Edge Consulting, HomeFit Recovery, IT consulting, NERC/CIP training, compliance training, fitness recovery products"
        url="https://mikemacri.com/my-websites"
      />

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-saira font-bold text-4xl text-macri-primary mb-4">
              My Websites
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of platforms I've built demonstrating expertise in IT consulting, compliance training, customer success, and e-commerce.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center px-4 py-2 rounded-full font-medium transition-colors text-sm ${
                    activeCategory === cat.id
                      ? 'bg-macri-primary text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-macri-primary hover:text-macri-primary'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Websites Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredWebsites.map((website) => (
              <div 
                key={website.id}
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Screenshot */}
                <div className="relative">
                  <div className="bg-gray-100 px-3 py-1.5 flex items-center space-x-1.5 border-b border-gray-200">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                    <span className="ml-2 text-xs text-gray-500 truncate">{website.url}</span>
                  </div>
                  <img
                    src={website.image}
                    alt={`Screenshot of ${website.title}`}
                    className="w-full h-48 object-cover object-top"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryIcon(website.category)}
                      <span className="ml-1">{website.category}</span>
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>

                  <h3 className="font-saira font-bold text-xl text-macri-primary mb-2">
                    {website.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {website.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {website.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-macri-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {website.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full bg-macri-primary hover:bg-macri-primary-dark text-white"
                    asChild
                  >
                    <a href={website.url} target="_blank" rel="noopener noreferrer">
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

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-gray-600 mb-6">
            These platforms demonstrate my expertise in building solutions for IT consulting, compliance, customer success, and more.
          </p>
          <Button 
            className="bg-macri-primary hover:bg-macri-primary-dark text-white"
            asChild
          >
            <a href="/contact">
              Get In Touch
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default MyWebsites;
