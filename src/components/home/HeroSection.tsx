import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, TrendingUp, MapPin, Shield, Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
  // Name and locations data
  const name = "Mike Macri, M.B.A.";
  const locations = ["Edmonds, WA", "San Diego, CA", "Chicago, IL", "Denver, CO", "Remote/Hybrid"];

  return (
    <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-left">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Name */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight font-saira uppercase tracking-wider">
                <span className="text-macri-primary">{name}</span>
              </h1>

              {/* Locations */}
              <div className="mb-6">
                <div className="p-4 bg-gradient-to-r from-macri-primary/5 to-macri-primary/10 rounded-lg border border-macri-primary/20">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-macri-primary mt-1 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {locations.map((location, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-macri-primary text-white shadow-sm hover:bg-macri-primary/90 transition-colors"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-saira">
                Driving <span className="text-macri-primary">GTM</span> and 
                <br />
                <span className="text-macri-primary">Solution Engineering</span>
                <br />
                Excellence
              </h2>
              
              <div className="max-w-4xl space-y-6">
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Building high-performing teams and scalable technical sales processes 
                  that deliver enterprise cloud solutions and measurable business growth.
                </p>
                
                {/* Professional Summary */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-saira">Professional Summary</h3>
                  <div className="text-lg text-gray-700 leading-relaxed">
                    <p>
                      Solution Consulting and Partner GTM Leader with a proven track record of building high-performing Solution Engineering and Customer Success teams in the enterprise cloud ecosystem.
                    </p>
                    <br />
                    <p>
                      Expert in coaching Solution Consultants, developing scalable technical sales strategies, and delivering measurable growth with SIs, MSPs, and ISVs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/portfolio" 
                className="bg-macri-primary hover:bg-macri-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View My Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <a 
                href="#experience" 
                className="border-2 border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center"
              >
                View My Experience
              </a>

              <a 
                href="/contact" 
                className="bg-macri-secondary hover:bg-macri-secondary-dark text-macri-dark px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center border border-gray-300"
              >
                Contact Me
              </a>

              <a 
                href="/resume" 
                className="bg-white hover:bg-gray-50 text-macri-dark px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center border border-gray-300 shadow-sm"
              >
                Download Résumé
              </a>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-8 border-t border-gray-200 max-w-5xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">$1B</div>
                <div className="text-sm text-gray-600">Revenue Managed</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">21%</div>
                <div className="text-sm text-gray-600">YoY Growth</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">$900M</div>
                <div className="text-sm text-gray-600">Risk Mitigated</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">83</div>
                <div className="text-sm text-gray-600">NPS Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
