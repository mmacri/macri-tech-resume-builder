
import React from 'react';
import { MapPin } from 'lucide-react';
import AboutSocialIcons from './AboutSocialIcons';

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
  introText,
  linkedinUrl,
  githubUrl,
  websiteUrl,
  emailUrl
}) => {
  return (
    <>
      <h1 className="text-macri-primary text-5xl md:text-6xl mb-0 font-bold">
        {name}
      </h1>
      <div className="subheading mb-5">
        <h2 className="text-2xl text-gray-700">{headline}</h2>
        {locations.length > 0 && (
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin className="h-4 w-4 text-macri-primary" />
            {locations.join(' · ')}
          </div>
        )}
      </div>
      
      <AboutSocialIcons 
        linkedinUrl={linkedinUrl}
        githubUrl={githubUrl}
        websiteUrl={websiteUrl}
        emailUrl={emailUrl}
      />
      
      <p className="lead mb-5 text-lg">
        {introText}
      </p>
    </>
  );
};

export default AboutHeader;
