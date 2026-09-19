
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
// Removed DownloadResumeButton
// Simplified resume content - no database needed
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface ResumeContentProps {
  resumeSections: unknown[];
}

/**
 * Main content component for the Resume page showing all resume sections
 * This uses database content
 */
const ResumeContent: React.FC<ResumeContentProps> = ({ resumeSections }) => {
  const isMobile = useIsMobile();
  
  // Since we're using static data, these will be empty arrays
  // The individual components will use their static data instead
  const experienceItems: never[] = [];
  const educationItems: never[] = [];
  const skillsItems: never[] = [];
  const interestsItems: never[] = [];
  const awardsItems: never[] = [];

  const handlePrint = () => {
    window.print();
  };

  // Mobile view with accordion sections
  const renderMobileView = () => {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="about" id="about">
            <AccordionTrigger className="text-xl font-bold text-macri-primary">About</AccordionTrigger>
            <AccordionContent>
              <div className="pt-3 pb-6">
                <AboutSection />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="experience" id="experience">
            <AccordionTrigger className="text-xl font-bold text-macri-primary">Experience</AccordionTrigger>
            <AccordionContent>
              <div className="pt-3 pb-6">
                <ExperienceSection items={experienceItems} />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="education" id="education">
            <AccordionTrigger className="text-xl font-bold text-macri-primary">Education</AccordionTrigger>
            <AccordionContent>
              <div className="pt-3 pb-6">
                <EducationSection items={educationItems} />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="skills" id="skills">
            <AccordionTrigger className="text-xl font-bold text-macri-primary">Skills</AccordionTrigger>
            <AccordionContent>
              <div className="pt-3 pb-6">
                <SkillsSection items={skillsItems} />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="interests" id="interests">
            <AccordionTrigger className="text-xl font-bold text-macri-primary">Interests</AccordionTrigger>
            <AccordionContent>
              <div className="pt-3 pb-6">
                <InterestsSection items={interestsItems} />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="awards" id="awards">
            <AccordionTrigger className="text-xl font-bold text-macri-primary">Awards</AccordionTrigger>
            <AccordionContent>
              <div className="pt-3 pb-6">
                <AwardsSection items={awardsItems} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  // Desktop view with all sections expanded
  const renderDesktopView = () => {
    return (
      <>
        <AboutSection />
        
        <hr className="m-0 border-gray-200" />
        <ExperienceSection items={experienceItems} />
        
        <hr className="m-0 border-gray-200" />
        <EducationSection items={educationItems} />
        <hr className="m-0 border-gray-200" />
        <SkillsSection items={skillsItems} />
        <hr className="m-0 border-gray-200" />
        <InterestsSection items={interestsItems} />
        <hr className="m-0 border-gray-200" />
        <AwardsSection items={awardsItems} />
      </>
    );
  };

  return (
    <div className="bg-gray-50 resume-page">
      <div className="p-4 sticky top-0 z-10 bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-macri-primary">Resume</h1>
          <div className="flex gap-3">
            <a 
              href="https://www.linkedin.com/in/mikemacri" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on device size */}
      <div className="px-4 py-6 md:px-8 max-w-6xl mx-auto">
        {isMobile ? renderMobileView() : renderDesktopView()}
      </div>
      
      {/* Connect Section */}
      <section className="resume-section py-10" id="connect">
        <div className="resume-section-content px-4 md:px-8 text-center max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-macri-primary">Let's Connect</h2>
          <p className="mb-6 text-gray-700">Connect with me on LinkedIn.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://www.linkedin.com/in/mikemacri" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md font-semibold text-lg flex items-center gap-3 w-full sm:w-auto transition-colors"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeContent;
