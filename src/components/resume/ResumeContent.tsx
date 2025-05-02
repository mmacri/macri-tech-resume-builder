
import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import InterestsSection from '@/components/home/InterestsSection';
import AwardsSection from '@/components/home/AwardsSection';
import DownloadResumeButton from '@/components/home/DownloadResumeButton';
import { extractResumeSection } from '@/utils/resume/extractUtils';

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

  return (
    <>
      <AboutSection items={aboutItems} />
      <hr className="m-0" />
      {/* Override ExperienceSection's default behavior to use database items */}
      <section className="resume-section" id="experience">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Experience</h2>
          
          {experienceItems && experienceItems.length > 0 ? (
            experienceItems.map((item, index) => (
              <div key={item.id || index} className="card mb-8">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-macri-primary text-sm">
                      {item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - {item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                    <h5 className="text-base font-normal text-gray-600">{item.organization}</h5>
                    {item.location && (
                      <p className="text-sm text-gray-500">{item.location}</p>
                    )}
                  </div>
                  {item.description && (
                    <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                      {item.description.split('\n')
                        .filter((point: string) => point.trim().length > 0)
                        .map((point: string, i: number) => (
                          <li key={i}>{point.trim()}</li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 border rounded-lg bg-gray-50">
              <p className="text-gray-600">Loading experience information...</p>
            </div>
          )}
        </div>
      </section>
      <hr className="m-0" />
      <EducationSection items={educationItems} />
      <hr className="m-0" />
      <SkillsSection items={skillsItems} />
      <hr className="m-0" />
      <InterestsSection items={interestsItems} />
      <hr className="m-0" />
      <AwardsSection items={awardsItems} />
      <hr className="m-0" />
      {/* Fixed the duplicate className attribute */}
      <section className="resume-section py-10" id="download">
        <div className="resume-section-content px-4 md:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Download Resume</h2>
          <p className="mb-4">Get a downloadable version of my resume with the most up-to-date information.</p>
          <DownloadResumeButton />
        </div>
      </section>
    </>
  );
};

export default ResumeContent;
