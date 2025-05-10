
import React from 'react';
import { parseAboutData } from '@/utils/resume/extractResumeSectionsForPDF';
import { initialAboutData } from '@/utils/resume/aboutData';
import DownloadResume from '@/components/resume/DownloadResume';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { useIsMobile } from '@/hooks/use-mobile';

// Import refactored components
import AboutHeader from './about/AboutHeader';
import AboutSidebar from './about/AboutSidebar';
import SkillsAndSuccessSection from './about/SkillsAndSuccessSection';
import ReferencesSection from './about/ReferencesSection';

interface AboutSectionProps {
  items?: any[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ items = [] }) => {
  // Get the first item or use default fallback data
  const aboutItem = items.length > 0 ? items[0] : null;
  const isMobile = useIsMobile();
  
  // Parse the description if it exists (it should be a JSON string with all the about data)
  const aboutData = aboutItem ? parseAboutData(aboutItem.description) : null;
  
  // Use parsed data or fall back to defaults
  const name = aboutData?.full_name || initialAboutData.full_name;
  const headline = aboutData?.headline || initialAboutData.headline;
  const introText = aboutData?.intro_text || initialAboutData.intro_text;
  const locations = aboutData?.locations || initialAboutData.locations;
  const skillsItems = aboutData?.skills_items || initialAboutData.skills_items;
  const successItems = aboutData?.success_items || initialAboutData.success_items;
  const references = aboutData?.references || initialAboutData.references;
  
  // Website links
  const linkedinUrl = "https://www.linkedin.com/in/mikemacri/";
  const githubUrl = "https://github.com/mikemacri";
  const websiteUrl = "https://mikemacri.com";
  const emailUrl = "mailto:contact@mikemacri.com";

  return (
    <ResumeSection id="about" title="">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="lg:w-2/3">
          <AboutHeader
            name={name}
            headline={headline}
            locations={locations}
            introText={introText}
            linkedinUrl={linkedinUrl}
            githubUrl={githubUrl}
            websiteUrl={websiteUrl}
            emailUrl={emailUrl}
          />
        </div>
        
        <AboutSidebar
          linkedinUrl={linkedinUrl}
          githubUrl={githubUrl}
          websiteUrl={websiteUrl}
          emailUrl={emailUrl}
        />
      </div>
      
      <SkillsAndSuccessSection 
        skillsItems={skillsItems}
        successItems={successItems}
      />
      
      <ReferencesSection references={references} />
      
      {/* Only show the mobile download button if on mobile */}
      {isMobile && (
        <div className="mt-6">
          <DownloadResume inlineButton={false} />
        </div>
      )}
    </ResumeSection>
  );
};

export default AboutSection;
