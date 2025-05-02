
import React from 'react';
import { MapPin } from 'lucide-react';

interface AboutHeaderProps {
  name: string;
  headline: string;
  locations: string[];
  introText: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  emailUrl: string;
}

const AboutHeader: React.FC<AboutHeaderProps> = ({
  name,
  headline,
  locations,
  introText
}) => {
  // Simplified intro text with just paragraphs
  const renderFormattedIntro = () => {
    return (
      <div className="about-intro text-lg">
        <p className="mb-6">
          Solution Consulting and Partner GTM Leader with a proven track record of building <span className="font-semibold italic">high-performing Solution Engineering</span> and Customer Success teams in the enterprise cloud ecosystem.
        </p>
        
        <p className="mb-6">
          Skilled in coaching <span className="font-semibold">Solution Consultants</span>, developing <span className="italic">scalable technical sales motions</span>, and delivering partner-aligned growth with GSIs, SIs, and ISVs.
        </p>
      </div>
    );
  };

  return (
    <>
      <h1 className="text-macri-primary text-5xl md:text-6xl mb-1 font-bold">
        {name}
      </h1>
      <div className="mb-6">
        <h2 className="text-2xl text-gray-700">{headline}</h2>
        {locations.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
            <MapPin className="h-4 w-4 text-macri-primary" />
            <span className="location-list">
              {locations.join(' · ')}
            </span>
          </div>
        )}
      </div>
      
      {renderFormattedIntro()}
    </>
  );
};

export default AboutHeader;
