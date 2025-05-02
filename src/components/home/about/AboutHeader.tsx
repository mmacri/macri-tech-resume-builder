
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
  // Format the intro text with consistent styling for better readability
  const formattedIntroText = () => {
    // Split the intro text into sentences
    const sentences = introText.split(/(?<=\.)(?:\s+)/);
    
    return (
      <div className="space-y-4 text-lg">
        {sentences.map((sentence, index) => (
          <p key={index} className="leading-relaxed">
            {sentence.trim().split(/\s+/).map((word, wordIndex) => {
              // Highlight keywords to improve readability
              const keywords = [
                "Solution Consulting", "Partner GTM", "high-performing", 
                "solution engineering", "customer success", "GSIs", "SIs", "ISVs",
                "value realization", "AI-driven frameworks", "impact"
              ];
              
              const isKeyword = keywords.some(keyword => 
                word.toLowerCase().includes(keyword.toLowerCase())
              );
              
              return (
                <span key={wordIndex} className={isKeyword ? "font-semibold text-macri-primary" : ""}>
                  {word}{' '}
                </span>
              );
            })}
          </p>
        ))}
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
