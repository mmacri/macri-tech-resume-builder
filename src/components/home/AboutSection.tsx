import React from 'react';
import { aboutData } from '@/data/aboutData';

interface AboutSectionProps {
  data?: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="resume-section-content px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
          {/* Profile Picture and Name Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:flex-col lg:items-center lg:min-w-fit mb-8 lg:mb-0">
            <div className="flex-shrink-0">
              <img
                src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                alt="Mike Macri profile"
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-macri-primary/20 shadow-lg"
              />
            </div>
            <div className="text-center sm:text-left lg:text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-macri-primary">Mike Macri</h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-medium">{aboutData.title}</p>
              <p className="text-lg text-gray-500 mt-1">{aboutData.location}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-8">

            {/* Professional Summary */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Professional Summary</h3>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Solution Consulting and Partner GTM Leader with a proven track record of building 
                  high-performing Solution Engineering and Customer Success teams in the enterprise cloud ecosystem.
                </p>
                <p>
                  Expert in coaching Solution Consultants, developing scalable technical sales strategies, 
                  and delivering measurable growth with SIs, MSPs, and ISVs.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="/portfolio" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View My Portfolio
              </a>
              <a 
                href="#experience" 
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View My Experience
              </a>
              <a 
                href="/contact" 
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Me
              </a>
              <a 
                href="/resume" 
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Download Résumé
              </a>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">$1B</div>
                <div className="text-gray-600 text-sm">Revenue Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">21%</div>
                <div className="text-gray-600 text-sm">YoY Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">$900M</div>
                <div className="text-gray-600 text-sm">Risk Mitigated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">83</div>
                <div className="text-gray-600 text-sm">NPS Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;