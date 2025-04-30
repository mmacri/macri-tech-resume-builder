
import React from 'react';
import DownloadResumeButton from './DownloadResumeButton';
import { parseAboutData } from '@/utils/resume/extractResumeSectionsForPDF';

interface AboutSectionProps {
  items: any[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ items = [] }) => {
  // Get the first item or use default fallback data
  const aboutItem = items.length > 0 ? items[0] : null;
  
  // Parse the description if it exists (it should be a JSON string with all the about data)
  const aboutData = aboutItem ? parseAboutData(aboutItem.description) : null;
  
  // Fallback data if database data is not available
  const defaultData = {
    full_name: 'Mike Macri',
    headline: 'Information Security & Business Development Professional',
    intro_text: 'Dedicated technology executive who combines technical expertise with business acumen to drive partner alliances, optimize global operations, and deliver comprehensive solutions to complex challenges.',
    locations: ['Edmonds, WA', 'San Diego, CA', 'Remote'],
    skills_items: [],
    success_items: [],
    references: []
  };

  // Use parsed data or fall back to defaults
  const name = aboutData?.full_name || defaultData.full_name;
  const headline = aboutData?.headline || defaultData.headline;
  const introText = aboutData?.intro_text || defaultData.intro_text;
  const locations = aboutData?.locations || defaultData.locations;
  const skillsItems = aboutData?.skills_items || defaultData.skills_items;
  const successItems = aboutData?.success_items || defaultData.success_items;
  const references = aboutData?.references || defaultData.references;

  return (
    <section className="resume-section" id="about">
      <div className="resume-section-content px-4 md:px-8">
        <h1 className="text-macri-primary text-6xl mb-0">
          {name}
        </h1>
        <div className="subheading mb-5">
          {headline}
          {locations.length > 0 && (
            <div className="text-sm mt-2">
              {locations.join(' · ')}
            </div>
          )}
        </div>
        <p className="lead mb-5">
          {introText}
        </p>
        
        {/* Skilled At Section */}
        {skillsItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-3">Skilled At</h3>
            <ul className="list-disc pl-5 text-sm space-y-2">
              {skillsItems.map((item, index) => (
                <li key={`skill-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Proven Experience Section */}
        {successItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-3">Proven Experience</h3>
            <ul className="list-disc pl-5 text-sm space-y-2">
              {successItems.map((item, index) => (
                <li key={`success-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* References Section */}
        {references.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-3">References</h3>
            <div className="space-y-4">
              {references.map((reference, index) => (
                <blockquote key={`ref-${index}`} className="border-l-4 border-macri-primary pl-4 italic text-gray-600">
                  "{reference}"
                </blockquote>
              ))}
            </div>
          </div>
        )}
        
        {/* Add Download Resume Button for easy access */}
        <DownloadResumeButton />
      </div>
    </section>
  );
};

export default AboutSection;
