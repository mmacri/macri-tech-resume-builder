
import React from 'react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';

interface InterestsSectionProps {
  items?: any[];
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ items }) => {
  const { interestsData } = useResumeData();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : interestsData;
  
  // Convert each item to a paragraph string
  const paragraphs = displayItems.map(item => item.description || '').filter(Boolean);

  return (
    <ResumeSection id="interests" title="Interests">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={index < paragraphs.length - 1 ? "mb-4 text-gray-700 leading-relaxed" : "text-gray-700 leading-relaxed"}>
            {paragraph}
          </p>
        ))}
      </div>
    </ResumeSection>
  );
};

export default InterestsSection;
