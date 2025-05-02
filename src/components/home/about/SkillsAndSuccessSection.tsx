
import React from 'react';
import { CheckCircle, Trophy, Target, Users, ArrowUpCircle, Lightbulb } from 'lucide-react';

interface SkillsAndSuccessSectionProps {
  skillsItems: string[];
  successItems: string[];
}

const SkillsAndSuccessSection: React.FC<SkillsAndSuccessSectionProps> = ({
  skillsItems,
  successItems
}) => {
  if (skillsItems.length === 0 && successItems.length === 0) {
    return null;
  }

  // Helper function to format the items with emphasis
  const formatItem = (item: string) => {
    // Split by colon to separate category from description
    const parts = item.split(':');
    
    if (parts.length > 1) {
      return (
        <>
          <span className="font-semibold text-macri-primary">{parts[0]}:</span>
          {parts[1]}
        </>
      );
    }
    
    return item;
  };

  // Icons for skills
  const skillIcons = [
    <Target className="h-5 w-5 text-macri-primary" />,
    <Users className="h-5 w-5 text-macri-primary" />,
    <ArrowUpCircle className="h-5 w-5 text-macri-primary" />,
    <Lightbulb className="h-5 w-5 text-macri-primary" />
  ];

  return (
    <div className="my-10">
      <div className="grid md:grid-cols-2 gap-6">
        {skillsItems.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 text-xl font-semibold mb-4 text-macri-primary">
              <CheckCircle className="h-5 w-5" />
              <h3>Key Skills</h3>
            </div>
            <ul className="space-y-4">
              {skillsItems.map((item, index) => (
                <li key={`skill-${index}`} className="flex gap-3 items-start">
                  <div className="mt-1 flex-shrink-0">
                    {skillIcons[index % skillIcons.length]}
                  </div>
                  <span className="text-gray-700">{formatItem(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {successItems.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 text-xl font-semibold mb-4 text-macri-primary">
              <Trophy className="h-5 w-5" />
              <h3>Notable Achievements</h3>
            </div>
            <ul className="space-y-4">
              {successItems.map((item, index) => (
                <li key={`success-${index}`} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 flex items-center justify-center rounded-full bg-macri-primary text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <span className="text-gray-700">{formatItem(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsAndSuccessSection;
