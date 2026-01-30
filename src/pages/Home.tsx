import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, FileText, Users, TrendingUp, Shield, Briefcase } from 'lucide-react';

const Home: React.FC = () => {
  const credibilityLogos = [
    { name: 'VMware', years: '2011-2021' },
    { name: 'ServiceNow', years: '2021-2025' },
    { name: 'Public Sector & Regulated Enterprises', years: '' },
    { name: 'Partner Ecosystems (GSI, Channel, ISV)', years: '' },
  ];

  const keyAchievements = [
    { metric: '20%', label: 'Renewal Growth', description: 'Adoption & value realization at scale' },
    { metric: '250%', label: 'Pipeline Growth', description: 'Repeatable enablement frameworks' },
    { metric: '83', label: 'NPS Score', description: '20 points above target' },
    { metric: '$900M', label: 'Risk Reduction', description: 'Governance & DevSecOps outcomes' },
  ];

  return (
    <>
      <SEOHead
        title="Mike Macri - Customer Success Engineering & Solution Engineering Leader"
        description="Cross-functional leader spanning Customer Success Engineering, Solution Engineering, partner ecosystems, and risk-driven platforms. Driving adoption, renewal growth, and measurable customer value at scale."
        url="https://mikemacri.com"
      />

      {/* Hero Section - Above the Fold */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content - 8 columns */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              {/* Executive Headline */}
              <h1 className="font-saira font-bold text-4xl lg:text-5xl xl:text-6xl text-macri-primary mb-4 leading-tight">
                Customer Success Engineering & Solution Engineering Leader
              </h1>
              
              {/* Differentiating Statement */}
              <p className="text-lg text-macri-primary/80 mb-4 font-medium italic max-w-3xl">
                I specialize in roles where product, security, partner ecosystems, and customer outcomes collide—and where organizations struggle to turn complexity into clear, defensible decisions.
              </p>
              
              {/* Value Thesis */}
              <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl">
                I build <strong>repeatable frameworks</strong> that remove adoption barriers, translate DevSecOps and governance capabilities into <strong>business outcomes</strong>, and align technical success with <strong>commercial impact</strong>.
              </p>

              {/* Credibility Strip */}
              <div className="flex flex-wrap gap-3 mb-8">
                {credibilityLogos.map((logo, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-medium text-gray-700"
                  >
                    <span className="text-macri-primary font-semibold">{logo.name}</span>
                    {logo.years && <span className="text-gray-500 ml-2">({logo.years})</span>}
                  </div>
                ))}
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-4 text-lg"
                  asChild
                >
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 w-5 h-5" />
                    Download Resume
                  </a>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8 py-4 text-lg"
                  asChild
                >
                  <a href="/experience">
                    View Experience
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Profile Image - 4 columns */}
            <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <img
                  src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                  alt="Mike Macri - Professional headshot"
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-8 border-white shadow-2xl object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-macri-primary/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements Strip */}
      <section className="py-12 bg-macri-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {keyAchievements.map((achievement, index) => (
              <div key={index}>
                <div className="text-4xl lg:text-5xl font-bold mb-2">{achievement.metric}</div>
                <div className="text-white font-medium mb-1">{achievement.label}</div>
                <div className="text-white/70 text-sm">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I'm Known For Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-saira font-bold text-2xl text-macri-primary mb-6 text-center">
            What I'm Known For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-2 h-2 rounded-full bg-macri-primary mt-2 flex-shrink-0" />
              <p className="text-gray-700">Brought in when platforms are <strong>powerful but under-adopted</strong></p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-2 h-2 rounded-full bg-macri-primary mt-2 flex-shrink-0" />
              <p className="text-gray-700">Build <strong>repeatable frameworks</strong>, not hero solutions</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-2 h-2 rounded-full bg-macri-primary mt-2 flex-shrink-0" />
              <p className="text-gray-700">Translate technical, regulatory, and operational complexity into <strong>executive clarity</strong></p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-2 h-2 rounded-full bg-macri-primary mt-2 flex-shrink-0" />
              <p className="text-gray-700">Focus on <strong>decisions enabled</strong>, not artifacts produced</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-saira font-bold text-3xl text-macri-primary mb-6">
              Cross-Functional Leadership at Scale
            </h2>
            
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Led distributed technical teams and scalable enablement programs across VMware and ServiceNow, driving adoption, renewal growth, and measurable customer value at scale. Strong track record building repeatable frameworks that align technical success with commercial impact through close partnership with Sales, Renewals, Product, and Engineering.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Users className="w-6 h-6 text-macri-primary mr-3" />
                  <h3 className="font-semibold text-lg text-gray-900 m-0">Customer Success Engineering</h3>
                </div>
                <p className="text-gray-700 m-0 text-base">
                  Led technical success motions across pooled book of business, delivering high-signal guidance that improved customer outcomes.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Briefcase className="w-6 h-6 text-macri-primary mr-3" />
                  <h3 className="font-semibold text-lg text-gray-900 m-0">Solution Engineering</h3>
                </div>
                <p className="text-gray-700 m-0 text-base">
                  Built standardized onboarding playbooks, maturity checkpoints, and KPI frameworks that removed adoption barriers.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-6 h-6 text-macri-primary mr-3" />
                  <h3 className="font-semibold text-lg text-gray-900 m-0">Partner Ecosystems</h3>
                </div>
                <p className="text-gray-700 m-0 text-base">
                  GSI and strategic partner motions enabling $50M+ deals and $440M in routed pipeline.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Shield className="w-6 h-6 text-macri-primary mr-3" />
                  <h3 className="font-semibold text-lg text-gray-900 m-0">Risk & DevSecOps</h3>
                </div>
                <p className="text-gray-700 m-0 text-base">
                  Delivered cloud-native, security, and compliance advisory strengthening platform trust and governance adoption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-saira font-bold text-3xl text-macri-primary mb-4">
            Explore My Work
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            See detailed case studies and measurable outcomes across Customer Success Engineering, Solution Engineering, Partner Development, and Risk & Governance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8"
              asChild
            >
              <a href="/experience">
                View Experience & Impact
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8"
              asChild
            >
              <a href="/selected-work">
                <FileText className="mr-2 w-5 h-5" />
                Selected Work
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
