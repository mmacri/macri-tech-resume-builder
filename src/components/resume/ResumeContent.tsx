
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

interface ResumeContentProps {
  resumeSections: any[];
}

/**
 * Main content component for the Resume page showing all resume sections
 * This uses database content
 */
const ResumeContent: React.FC<ResumeContentProps> = ({ resumeSections }) => {
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

      <AboutSection items={aboutItems} />
      <hr className="m-0 border-gray-200" />
      
      <section className="resume-section" id="experience">
        <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-macri-primary">Experience</h2>
          
          {experienceItems && experienceItems.length > 0 ? (
            experienceItems
              .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
              .map((item: any, index: number) => (
                <div key={item.id || index} className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h3 className="text-2xl font-semibold text-macri-primary">{item.title}</h3>
                    <p className="text-gray-600 font-medium text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - {item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h5 className="text-lg font-medium text-gray-700">{item.organization}</h5>
                    {item.location && (
                      <p className="text-gray-500 italic">{item.location}</p>
                    )}
                  </div>
                  {item.description && (
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {item.description.split('\n')
                        .filter((point: string) => point.trim().length > 0)
                        .map((point: string, i: number) => (
                          <li key={i} className="py-1">{point.trim()}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))
          ) : (
            <div className="p-6 border rounded-lg bg-gray-50">
              <p className="text-gray-600">Loading experience information...</p>
            </div>
          )}
        </div>
      </section>
      
      <hr className="m-0 border-gray-200" />
      <EducationSection items={educationItems} />
      <hr className="m-0 border-gray-200" />
      <SkillsSection items={skillsItems} />
      <hr className="m-0 border-gray-200" />
      <InterestsSection items={interestsItems} />
      <hr className="m-0 border-gray-200" />
      <AwardsSection items={awardsItems} />
      <hr className="m-0 border-gray-200" />
      
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
