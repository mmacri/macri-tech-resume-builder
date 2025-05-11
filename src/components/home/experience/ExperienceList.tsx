
import React from 'react';
import ExperienceItem from './ExperienceItem';
import { Accordion } from '@/components/ui/accordion';
import MobileExperienceItem from './MobileExperienceItem';
import { ExperienceItem as ExperienceItemType } from './types';

interface ExperienceListProps {
  items: ExperienceItemType[];
  isMobile: boolean;
}

export const ExperienceList: React.FC<ExperienceListProps> = ({ items, isMobile }) => {
  // Sort experience items by display_order
  const sortedItems = [...items].sort((a, b) => 
    (a.display_order || 0) - (b.display_order || 0)
  );

  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full">
        {sortedItems.map((item, index) => (
          <MobileExperienceItem key={item.id || index} item={item} index={index} />
        ))}
      </Accordion>
    );
  }
  
  return (
    <>
      {sortedItems.map((item, index) => (
        <ExperienceItem key={item.id || index} item={item} index={index} />
      ))}
    </>
  );
};

export default ExperienceList;
