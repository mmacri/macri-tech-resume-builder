
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Trophy } from 'lucide-react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';

interface AwardsSectionProps {
  items?: any[];
}

const AwardsSection: React.FC<AwardsSectionProps> = ({ items }) => {
  const { awardsData } = useResumeData();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : awardsData;
  
  // Map to title
  const awards = displayItems.map(item => item.title);

  return (
    <ResumeSection id="awards" title="Awards &amp; Certifications">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <ul className="space-y-3">
          {awards.map((award, index) => (
            <li key={index} className="flex gap-3 items-center">
              <span className="text-macri-warning text-xl flex-shrink-0">
                <Trophy className="h-5 w-5 text-amber-500" />
              </span>
              <span className="text-gray-700">{award}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Add a download resume button at the bottom */}
      <div className="mt-12 flex justify-center">
        <Button 
          asChild
          className="bg-macri-primary hover:bg-macri-primary/90 text-white px-8 py-6 rounded-md font-semibold text-lg flex items-center gap-2"
        >
          <a href="/resume">
            <Download className="h-5 w-5" />
            View Full Resume
          </a>
        </Button>
      </div>
    </ResumeSection>
  );
};

export default AwardsSection;
