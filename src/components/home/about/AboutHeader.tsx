
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
          Solution Advisory and value identification Leader with a proven track record of building <span className="font-semibold italic">high-performing Solution Engineering</span> and Customer Success teams in the enterprise cloud ecosystem.
        </p>
        
        <p className="mb-6">
          Skilled in coaching <span className="font-semibold">Solution Consultants</span>, developing <span className="italic">scalable technical sales solutions</span>, and delivering partner-aligned growth with <span className="font-semibold">SIs</span>, <span className="font-semibold">MSPs</span>, and <span className="font-semibold">ISVs</span>.
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
          <div className="mt-4 p-4 bg-gradient-to-r from-macri-primary/5 to-macri-primary/10 rounded-lg border border-macri-primary/20">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-macri-primary mt-1 flex-shrink-0" />
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Available in:</span>
                <div className="flex flex-wrap gap-3">
                  {locations.map((location, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-macri-primary to-macri-primary/80 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-macri-primary/20"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {renderFormattedIntro()}
    </>
  );
};

export default AboutHeader;
