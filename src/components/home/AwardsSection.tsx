
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Award, Medal } from 'lucide-react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { useIsMobile } from '@/hooks/use-mobile';

interface AwardItem {
  id?: string;
  title: string;
  display_order?: number;
}

interface AwardsSectionProps {
  items?: AwardItem[];
}

/**
 * Component to display awards and certifications
 */
const AwardsSection: React.FC<AwardsSectionProps> = ({ items }) => {
  const { awardsData } = useResumeData();
  const isMobile = useIsMobile();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : awardsData;
  
  // Ensure we always have awards to display
  const awards = displayItems && displayItems.length > 0 
    ? displayItems.map(item => ({
        title: item.title,
        id: item.id || `award-${Math.random().toString(36).substring(2, 9)}`
      }))
    : generateDefaultAwards();

  return (
    <ResumeSection id="awards" title="Awards &amp; Certifications">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <ul className="space-y-3">
          {awards.map((award, index) => (
            <li key={award.id} className="flex gap-3 items-center">
              <span className="text-macri-warning text-xl flex-shrink-0">
                {renderAwardIcon(index)}
              </span>
              <span className="text-gray-700">{award.title}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Only show the download button in desktop view */}
      {!isMobile && (
        <div className="mt-12 flex justify-center">
          <Button 
            asChild
            className="bg-macri-primary hover:bg-macri-primary/90 text-white px-8 py-6 rounded-md font-semibold text-lg flex items-center gap-2"
          >
            <a href="/resume">
              <Download className="h-5 w-5" />
              Download My Resume
            </a>
          </Button>
        </div>
      )}
    </ResumeSection>
  );
};

/**
 * Helper function to determine which icon to use based on index
 */
const renderAwardIcon = (index: number) => {
  // First two items use Award icon
  if (index < 2) {
    return <Award className="h-5 w-5 text-amber-500" />;
  }
  // For the rest, use Medal icon
  return <Medal className="h-5 w-5 text-amber-500" />;
};

/**
 * Helper function to generate default awards when no data is available
 */
const generateDefaultAwards = (): AwardItem[] => {
  return [
    { title: "Award 1", id: "default-award-0" },
    { title: "Award 2", id: "default-award-1" },
    { title: "Certificate 3", id: "default-award-2" }
  ];
};

export default AwardsSection;
