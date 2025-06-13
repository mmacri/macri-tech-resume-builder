
import React from 'react';
import { ArrowRight, Award, Users, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Driving <span className="text-macri-primary">GTM</span> and 
                <br />
                <span className="text-macri-primary">Solution Engineering</span>
                <br />
                Excellence
              </h1>
              
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Building high-performing teams and scalable technical sales motions 
                  that deliver enterprise cloud solutions and drive partner-aligned growth.
                </p>
                
                {/* Professional Summary */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
                  <div className="text-lg text-gray-700 leading-relaxed space-y-4 text-left">
                    <p>
                      Accomplished GTM and Solution Engineering leader with expertise in building scalable technical sales organizations, 
                      developing comprehensive compliance frameworks, and driving enterprise cloud adoption strategies.
                    </p>
                    <p>
                      Proven track record of delivering 644% revenue growth through strategic partner enablement, implementing 
                      policy management systems serving 400+ enterprise policies, and leading cross-functional teams to achieve 
                      measurable business outcomes in complex technology environments.
                    </p>
                    <p>
                      Specialized in ServiceNow platform optimization, AI governance frameworks, and solution architecture with 
                      deep experience in security operations, compliance management, and customer success initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/portfolio" 
                className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              
              <a 
                href="#about" 
                className="border-2 border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">644%</div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">400+</div>
                <div className="text-sm text-gray-600">Policies Managed</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">21%</div>
                <div className="text-sm text-gray-600">Adoption Increase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
