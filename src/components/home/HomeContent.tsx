
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ReferencesSection from '@/components/home/about/ReferencesSection';
// Removed about data dependency

/**
 * Main content component for the Home page showing all resume sections
 * Uses static content for all sections by default, but can also load dynamic data
 */
const HomeContent: React.FC = () => {

  return (
    <>
      {/* Static data - no loading needed */}
      
      {/* Hero Section - Always visible */}
      <HeroSection />
      
      {/* References Section */}
      <section className="py-16 bg-macri-section-alt">
          <div className="px-4 md:px-8 max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6">What People Say</h2>
              <p className="text-xl text-gray-600">References and testimonials available upon request.</p>
            </div>
          </div>
      </section>
      
        <div className="resume-container">
          {/* Critical sections (load first) */}
          <section className="py-16 bg-white">
            <div className="px-4 md:px-8 max-w-6xl mx-auto">
              <ExperienceSection items={[]} />
            </div>
          </section>
          
          {/* Less critical sections (can be loaded later) */}
          <section className="py-16 bg-macri-section-alt">
            <div className="px-4 md:px-8 max-w-6xl mx-auto">
              <EducationSection items={[]} />
            </div>
          </section>
          
          <section className="py-16 bg-white">
            <div className="px-4 md:px-8 max-w-6xl mx-auto">
              <ProjectsSection items={[]} />
            </div>
          </section>
          
          <section className="py-16 bg-macri-section-alt">
            <div className="px-4 md:px-8 max-w-6xl mx-auto">
              <SkillsSection items={[]} />
            </div>
          </section>
          
          <section className="py-16 bg-white">
            <div className="px-4 md:px-8 max-w-6xl mx-auto">
              <InterestsSection items={[]} />
            </div>
          </section>
          
          <section className="py-16 bg-macri-section-alt">
            <div className="px-4 md:px-8 max-w-6xl mx-auto">
              <AwardsSection items={[]} />
            </div>
          </section>
        </div>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-macri-primary to-macri-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl mb-8 opacity-90">
            Interested in discussing how I can help drive your technical sales and solution engineering success?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-macri-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg"
            >
              Send Email
            </a>
            
            <a 
              href="https://www.linkedin.com/in/mikemacri/" 
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-macri-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center"
            >
              Connect on LinkedIn
            </a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm opacity-75">
              Available for remote, hybrid, or on-site opportunities across North America
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeContent;
