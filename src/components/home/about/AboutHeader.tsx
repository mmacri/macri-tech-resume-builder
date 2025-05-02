
import React from 'react';
import { MapPin, Briefcase, Handshake, Rocket, Lightbulb } from 'lucide-react';

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
  // Split the intro text to highlight key phrases
  const formattedIntroText = () => {
    return (
      <>
        <span className="font-semibold text-macri-primary">Strategic partner development leader</span> with a proven track record of building 
        <span className="font-semibold text-macri-primary"> embedded managed services</span> and 
        <span className="font-semibold text-macri-primary"> partner-led offerings</span> across global GSIs, ISVs, and cloud marketplaces. 
        <br className="hidden md:block" /><br className="hidden sm:block" />
        Expert in <span className="underline decoration-macri-primary decoration-2">solution monetization</span>, 
        <span className="underline decoration-macri-primary decoration-2"> consultative selling to C-levels</span>, and 
        <span className="underline decoration-macri-primary decoration-2"> cross-functional GTM execution</span>. 
        <br className="hidden md:block" /><br className="hidden sm:block" />
        Known for <span className="italic">aligning executive vision</span> with <span className="italic">partner IP re-platforming</span> and 
        <span className="italic"> joint revenue growth</span> in multi-cloud and SaaS ecosystems.
      </>
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
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin className="h-4 w-4 text-macri-primary" />
            {locations.join(' · ')}
          </div>
        )}
      </div>
      
      <p className="lead mb-7 text-lg">
        {formattedIntroText()}
      </p>
    </>
  );
};

export default AboutHeader;
