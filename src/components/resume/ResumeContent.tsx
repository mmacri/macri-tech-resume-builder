
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import DownloadResumeButton from '@/components/home/DownloadResumeButton';
import { extractResumeSection } from '@/utils/resume/extractUtils';
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
  resumeSections: any[];
}

/**
 * Main content component for the Resume page showing all resume sections
 * This uses database content
 */
const ResumeContent: React.FC<ResumeContentProps> = ({ resumeSections }) => {
  const isMobile = useIsMobile();
  
  const getSectionItems = (sectionName: string) => {
    return extractResumeSection(resumeSections, sectionName);
  };

  // Get the sections from database
  const aboutItems = getSectionItems('about');
  const experienceItems = getSectionItems('experience');
  const educationItems = getSectionItems('education');
  const skillsItems = getSectionItems('skills');
  const interestsItems = getSectionItems('interests');
  const awardsItems = getSectionItems('awards');

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
                <AboutSection items={aboutItems} />
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
        <AboutSection items={aboutItems} />
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
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" /> Print
            </Button>
            <DownloadResumeButton />
          </div>
        </div>
      </div>

      {/* Conditional rendering based on device size */}
      <div className="px-4 py-6 md:px-8 max-w-6xl mx-auto">
        {isMobile ? renderMobileView() : renderDesktopView()}
      </div>
      
      <section className="resume-section py-10" id="download">
        <div className="resume-section-content px-4 md:px-8 text-center max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-macri-primary">Download Resume</h2>
          <p className="mb-6 text-gray-700">Get a downloadable version of my resume with the most up-to-date information.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-macri-primary hover:bg-macri-primary/90 py-6 px-8 text-lg flex items-center gap-2 w-full sm:w-auto"
              onClick={() => window.open('/resume-download', '_blank')}
            >
              <Download className="h-5 w-5" />
              Download PDF
            </Button>
            <Button 
              variant="outline"
              className="py-6 px-8 text-lg flex items-center gap-2 w-full sm:w-auto"
              onClick={handlePrint}
            >
              <Printer className="h-5 w-5" />
              Print Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeContent;
