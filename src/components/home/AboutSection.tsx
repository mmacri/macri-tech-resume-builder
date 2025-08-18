import React from 'react';
import { aboutData } from '@/data/aboutData';

interface AboutSectionProps {
  data?: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <img
              src="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
              alt="Mike Macri M.B.A. profile"
              className="w-48 h-48 rounded-full object-cover border-8 border-white shadow-2xl mx-auto"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-macri-primary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              M.B.A.
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-macri-primary leading-tight">
            Mike Macri
          </h1>
          <h2 className="text-2xl lg:text-3xl text-gray-600 font-medium mb-6 max-w-4xl mx-auto leading-relaxed">
            {aboutData.title}
          </h2>
          <div className="flex items-center justify-center text-lg text-gray-500 mb-8">
            <span className="mr-2">📍</span>
            <span>{aboutData.location}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Professional Summary - Now takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-macri-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Professional Summary</h3>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-gray-800 border-l-4 border-macri-primary pl-4">
                  Driving Solutions and Unlocking Business Value with a proven track record of building 
                  high-performing Solution Engineering and Customer Success teams in the enterprise cloud ecosystem.
                </p>
                <p>
                  Expert in coaching Solution Consultants, developing scalable technical sales strategies, 
                  and delivering measurable growth with SIs, MSPs, and ISVs.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
                <a 
                  href="/portfolio" 
                  className="bg-macri-primary hover:bg-macri-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View Portfolio
                </a>
                <a 
                  href="#experience" 
                  className="border-2 border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Experience
                </a>
                <a 
                  href="/contact" 
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Key Metrics Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 sticky top-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-macri-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Key Metrics</h3>
              </div>
              
              <div className="space-y-6">
                <div className="text-center p-4 bg-gradient-to-br from-macri-primary/5 to-macri-primary/10 rounded-xl">
                  <div className="text-4xl font-bold text-macri-primary mb-2">25+</div>
                  <div className="text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-macri-primary/5 to-macri-primary/10 rounded-xl">
                  <div className="text-4xl font-bold text-macri-primary mb-2">$1B</div>
                  <div className="text-gray-600 font-medium">Revenue Managed</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-macri-primary/5 to-macri-primary/10 rounded-xl">
                  <div className="text-4xl font-bold text-macri-primary mb-2">21%</div>
                  <div className="text-gray-600 font-medium">YoY Growth</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-macri-primary/5 to-macri-primary/10 rounded-xl">
                  <div className="text-4xl font-bold text-macri-primary mb-2">$900M</div>
                  <div className="text-gray-600 font-medium">Risk Mitigated</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-macri-primary/5 to-macri-primary/10 rounded-xl">
                  <div className="text-4xl font-bold text-macri-primary mb-2">83</div>
                  <div className="text-gray-600 font-medium">NPS Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;