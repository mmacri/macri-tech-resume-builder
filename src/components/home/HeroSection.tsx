
import React from 'react';
import { ArrowRight, Award, Users, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-macri-primary/5 via-white to-macri-primary/10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Building high-performing teams and scalable technical sales motions 
                that deliver enterprise cloud solutions and drive partner-aligned growth.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
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
                <div className="text-2xl font-bold text-gray-900">44%</div>
                <div className="text-sm text-gray-600">Adoption Increase</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-macri-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">$900M</div>
                <div className="text-sm text-gray-600">Risk Protected</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
                alt="Professional workspace with code and technology"
                className="rounded-2xl shadow-2xl w-full h-auto max-w-lg mx-auto"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-macri-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-macri-primary/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
