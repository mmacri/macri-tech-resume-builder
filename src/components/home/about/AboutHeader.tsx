
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
  // Format intro text to match the requested layout with paragraphs and bullet points
  const renderFormattedIntro = () => {
    // Static structure since this is a specific format request
    return (
      <div className="about-intro text-lg">
        <p className="mb-6">
          Solution Consulting and Partner GTM Leader with a proven track record of building <span className="font-semibold italic">high-performing Solution Engineering</span> and Customer Success teams in the enterprise cloud ecosystem.
        </p>
        
        <p className="mb-6">
          Skilled in coaching <span className="font-semibold">Solution Consultants</span>, developing <span className="italic">scalable technical sales motions</span>, and delivering partner-aligned growth with GSIs, SIs, and ISVs.
        </p>
        
        <div className="mb-6">
          <p className="font-semibold mb-2">Expertise in:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Building <span className="font-semibold">customer value realization</span> strategies</li>
            <li>Integrating <span className="font-semibold">AI-driven</span> frameworks</li>
            <li>Aligning with <span className="font-semibold">Sales, Marketing</span>, and Services to <span className="italic">drive outcomes</span></li>
          </ul>
        </div>
        
        <div>
          <p className="font-semibold mb-2">Known for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Creating impact</li>
            <li>Guiding <span className="font-semibold">complex deals</span> to closure</li>
            <li>Fostering cross-functional collaboration in <span className="italic">matrixed environments</span></li>
          </ul>
        </div>
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
      
      {renderFormattedIntro()}
    </>
  );
};

export default AboutHeader;
