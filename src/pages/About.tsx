import React from 'react';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, MapPin, Calendar, Building } from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About Mike Macri - Professional Background & Experience"
        description="Learn about Mike Macri's professional journey, expertise in solution consulting, governance frameworks, and strategic technology implementations. Discover his career achievements and professional philosophy."
        keywords="Mike Macri about, professional background, solution consulting expertise, business consultant biography, career achievements"
        url="https://mikemacri.com/about"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-saira font-bold text-5xl lg:text-6xl text-macri-primary mb-6">
              About Mike Macri
            </h1>
            
            <div className="space-y-6 text-lg text-gray-700 mb-8">
              <p>
                <strong>Experienced Strategic Solution Engineering Leader</strong> with a proven record of aligning technical solutions to business priorities, accelerating adoption, and mitigating enterprise risk. At ServiceNow, delivered $900M in risk reduction through customer zero solution advisory and technical governance initiatives.
              </p>
              
              <p>
                At VMware, grew advisory teams across the US West and delivered partner joint business planning that secured two $50M+ landmark deals. Recognized for driving brand growth with an NPS of 83 (20 points above company target of 63) and 100% deal attach rate, scaling partner ecosystems to go-to-market jointly and resolving complex global compliance challenges that strengthened enterprise resilience.
              </p>

            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="text-2xl font-bold text-macri-primary mb-1">$900M+</div>
                <div className="text-xs font-medium text-gray-600">Risk Reduction Delivered</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="text-2xl font-bold text-macri-primary mb-1">450%</div>
                <div className="text-xs font-medium text-gray-600">Sales Target Achievement</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="text-2xl font-bold text-macri-primary mb-1">83</div>
                <div className="text-xs font-medium text-gray-600">Net Promoter Score</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="text-2xl font-bold text-macri-primary mb-1">$100M+</div>
                <div className="text-xs font-medium text-gray-600">Landmark Deals Secured</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-3"
                asChild
              >
                <a href="/resume">
                  View Full Resume
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8 py-3"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="mr-2 w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
              Professional Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A career built on strategic thinking, innovative solutions, and measurable results
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-6 bottom-6 w-0.5 bg-macri-primary/30"></div>
            
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="relative flex flex-col md:flex-row md:items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-macri-primary rounded-full text-white font-bold text-sm">
                    1
                  </div>
                  <div className="ml-4 md:w-80 md:text-right md:pr-8">
                    <h3 className="font-semibold text-xl text-macri-primary">Technical Foundation & Early Leadership</h3>
                    <p className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      2008-2014
                    </p>
                  </div>
                </div>
                <div className="md:w-96 md:pl-8">
                  <p className="text-gray-700">
                    Built technical expertise developing online payroll systems using mainframe and web technologies while 
                    founding and successfully merging my own consulting firm. Transitioned into enterprise technology as 
                    Staff Technical Account Manager at VMware, creating engagement deliverables that aligned customer 
                    metrics with operational efficiency, achieving 100% services attach rate on all deals.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex flex-col md:flex-row md:items-center">
                <div className="flex items-center mb-4 md:mb-0 md:flex-row-reverse">
                  <div className="flex items-center justify-center w-8 h-8 bg-macri-primary rounded-full text-white font-bold text-sm">
                    2
                  </div>
                  <div className="ml-4 md:mr-4 md:w-80 md:text-left md:pl-8">
                    <h3 className="font-semibold text-xl text-macri-primary">Solution Consulting Excellence & Team Building</h3>
                    <p className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      2014-2019
                    </p>
                  </div>
                </div>
                <div className="md:w-96 md:pr-8">
                  <p className="text-gray-700">
                    Advanced to Sr Manager leading Customer Success, TAMs, and Product Specialists across the US West Coast. 
                    Built engagement frameworks that improved NPS by 30 points (20 above company standard) while growing and 
                    mentoring 3 teams. Later led Partner Solutions Engineering, driving $440M through multi-tiered routes with 
                    CDW, increasing pipeline capture by 20% and solution adoption by 20%.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative flex flex-col md:flex-row md:items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-macri-primary rounded-full text-white font-bold text-sm">
                    3
                  </div>
                  <div className="ml-4 md:w-80 md:text-right md:pr-8">
                    <h3 className="font-semibold text-xl text-macri-primary">Strategic Executive Leadership</h3>
                    <p className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      2019-Present
                    </p>
                  </div>
                </div>
                <div className="md:w-96 md:pl-8">
                  <p className="text-gray-700">
                    Elevated to Partner Business & Technical Alliance Director, designing joint business plans that secured 
                    two record-setting $50M+ deals while exceeding sales targets by 450%. As Sr Manager of Solution 
                    Advisory for Legal Ethics & Compliance at ServiceNow, I bridged departmental solutions across 
                    ServiceNow orgs, sales, customers and legal, delivering $900M in risk reduction through 
                    cross-functional initiatives, shaping product roadmaps, and establishing AI/ML governance frameworks 
                    as SME for inaugural AI risk policies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-saira font-bold text-4xl text-macri-primary mb-6">
              Core Values & Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-macri-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-macri-primary" />
              </div>
              <h3 className="font-semibold text-xl text-macri-primary mb-4">Strategic Excellence</h3>
              <p className="text-gray-700">
                Delivering innovative solutions that align with business objectives and drive measurable growth.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-macri-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="w-8 h-8 text-macri-primary" />
              </div>
              <h3 className="font-semibold text-xl text-macri-primary mb-4">Collaborative Partnership</h3>
              <p className="text-gray-700">
                Building strong relationships and fostering collaboration to achieve shared success.
              </p>
            </div>

            {/* Value 3 */}
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
            Let's discuss how we can work together to achieve your business objectives and drive growth.
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