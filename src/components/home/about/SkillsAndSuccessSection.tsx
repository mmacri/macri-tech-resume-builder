
import React from 'react';
import { CheckCircle, Trophy } from 'lucide-react';

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

  return (
    <div className="my-10">
      <div className="grid md:grid-cols-2 gap-6">
        {skillsItems.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 text-xl font-semibold mb-4 text-macri-primary">
              <CheckCircle className="h-5 w-5" />
              <h3>Key Skills</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              {skillsItems.map((item, index) => (
                <li key={`skill-${index}`} className="text-gray-700">{item}</li>
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
            <ul className="list-disc pl-5 space-y-2">
              {successItems.map((item, index) => (
                <li key={`success-${index}`} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsAndSuccessSection;
