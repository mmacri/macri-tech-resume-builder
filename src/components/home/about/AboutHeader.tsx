
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
  // Format the intro text with better styling to highlight key points
  const formattedIntroText = () => {
    return (
      <div className="space-y-4 text-lg">
        <p>
          <span className="font-semibold text-macri-primary">Solution Consulting and Partner GTM leader</span> with a proven track record of building 
          <span className="font-semibold text-macri-primary"> high-performing solution engineering</span> and 
          <span className="font-semibold text-macri-primary"> customer success teams</span> in the enterprise cloud ecosystem.
        </p>
        
        <p>
          Skilled in <span className="font-semibold bg-macri-primary/10 px-1.5 py-0.5 rounded">coaching Solution Consultants</span>, 
          <span className="font-semibold bg-macri-primary/10 px-1.5 py-0.5 rounded"> developing scalable technical sales motions</span>, and 
          <span className="font-semibold bg-macri-primary/10 px-1.5 py-0.5 rounded"> delivering partner-aligned growth</span> with GSIs, SIs, and ISVs.
        </p>
        
        <p>
          Expertise in <span className="italic font-medium text-macri-primary">building customer value realization strategies</span>, 
          <span className="italic font-medium text-macri-primary"> integrating AI-driven frameworks</span>, and
          <span className="italic font-medium text-macri-primary"> aligning with sales, marketing, and services teams</span> to drive outcomes.
        </p>
        
        <p>
          Known for <span className="font-semibold underline decoration-macri-primary/30 underline-offset-2">creating impact</span>, 
          <span className="font-semibold underline decoration-macri-primary/30 underline-offset-2"> guiding complex deals to closure</span>, and 
          <span className="font-semibold underline decoration-macri-primary/30 underline-offset-2"> fostering cross-functional collaboration</span> in matrixed environments.
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
