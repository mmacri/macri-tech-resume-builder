import React from 'react';

interface AboutSectionProps {
  data?: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Mike Macri, M.B.A.
          </h1>
          
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-4">Available in:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">Edmonds, WA</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">San Diego, CA</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">Chicago, IL</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">Denver, CO</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">Remote/Hybrid</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Driving <span className="text-orange-600">GTM</span> and{' '}
            <span className="text-orange-600">Solution Engineering</span>{' '}
            Excellence
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Building high-performing teams and scalable technical sales processes that deliver 
            enterprise cloud solutions and measurable business growth.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Professional Summary</h3>
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
        <div className="flex flex-wrap justify-center gap-4 mb-16">
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">$1B</div>
            <div className="text-gray-600">Revenue Managed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">21%</div>
            <div className="text-gray-600">YoY Growth</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">$900M</div>
            <div className="text-gray-600">Risk Mitigated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">83</div>
            <div className="text-gray-600">NPS Score</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;