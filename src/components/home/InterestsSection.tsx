
import React from 'react';

interface InterestsSectionProps {
  items: any[];
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ items = [] }) => {
  let paragraphs: string[] = [];
  
  if (items && items.length > 0) {
    // Convert each item to a paragraph string
    paragraphs = items.map(item => item.description || '').filter(Boolean);
  }
  
  // If no items or no valid paragraphs, use default content
  if (paragraphs.length === 0) {
    paragraphs = [
      "Outside of my professional work, I stay current with advancements in AI, automation, and cloud computing—exploring practical applications that solve complex problems.",
      "I also enjoy traveling between my homes in Washington, California, and Illinois, with outdoor activities like hiking and fishing to recharge.",
      "Indoors, I pursue photography, AI-powered content projects, and innovative investing in crypto and global stock markets."
    ];
  }

  return (
    <section className="resume-section" id="interests">
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-macri-primary">Interests</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index < paragraphs.length - 1 ? "mb-4 text-gray-700 leading-relaxed" : "text-gray-700 leading-relaxed"}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
