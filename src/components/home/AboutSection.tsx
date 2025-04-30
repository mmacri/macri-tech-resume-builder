
import React from 'react';
import DownloadResumeButton from './DownloadResumeButton';

interface AboutSectionProps {
  items: any[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ items = [] }) => {
  const aboutData = items.length > 0 ? items[0] : {
    title: 'Mike Macri',
    subtitle: 'Information Security & Business Development Professional',
    description: 'Dedicated technology executive who combines technical expertise with business acumen to drive partner alliances, optimize global operations, and deliver comprehensive solutions to complex challenges.'
  };

  return (
    <section className="resume-section" id="about">
      <div className="resume-section-content px-4 md:px-8">
        <h1 className="text-macri-primary text-6xl mb-0">
          {aboutData.title}
        </h1>
        <div className="subheading mb-5">
          {aboutData.subtitle}
        </div>
        <p className="lead mb-5">
          {aboutData.description}
        </p>
        
        {/* Add Download Resume Button for easy access */}
        <DownloadResumeButton />
      </div>
    </section>
  );
};

export default AboutSection;
