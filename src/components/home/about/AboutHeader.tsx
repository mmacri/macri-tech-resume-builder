
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
  // Format the intro text with better styling
  const formattedIntroText = () => {
    return (
      <div className="space-y-3 text-lg">
        <p>
          <span className="font-semibold text-macri-primary">Strategic partner development leader</span> with a proven track record of building 
          <span className="font-semibold text-macri-primary"> embedded managed services</span> and 
          <span className="font-semibold text-macri-primary"> partner-led offerings</span> across global GSIs, ISVs, and cloud marketplaces.
        </p>
        
        <p>
          Expert in <span className="font-semibold bg-macri-primary/10 px-1.5 py-0.5 rounded">solution monetization</span>, 
          <span className="font-semibold bg-macri-primary/10 px-1.5 py-0.5 rounded"> consultative selling to C-levels</span>, and 
          <span className="font-semibold bg-macri-primary/10 px-1.5 py-0.5 rounded"> cross-functional GTM execution</span>.
        </p>
        
        <p>
          Known for <span className="italic font-medium text-macri-primary">aligning executive vision</span> with <span className="italic font-medium text-macri-primary">strategic value creations</span> and 
          <span className="italic font-medium text-macri-primary"> joint revenue growth</span> in multi-cloud, <span className="italic font-medium text-macri-primary">Anything as a Services (XaaS)</span> ecosystems.
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
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin className="h-4 w-4 text-macri-primary" />
            {locations.join(' · ')}
          </div>
        )}
      </div>
      
      {formattedIntroText()}
    </>
  );
};

export default AboutHeader;
