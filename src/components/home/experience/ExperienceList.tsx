
import React, { useState, useEffect, useCallback, memo } from 'react';
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
  const sortedItems = React.useMemo(() => 
    [...items].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)),
    [items]
  );
  
  console.log(`ExperienceList: Rendering ${sortedItems.length} experience items`);
  
  // Performance optimization for rendering
  const renderMobileList = useCallback(() => {
    return (
      <Accordion type="single" collapsible className="w-full">
        {sortedItems.map((item, index) => (
          <MobileExperienceItem key={item.id || `mobile-exp-${index}`} item={item} index={index} />
        ))}
      </Accordion>
    );
  }, [sortedItems]);

  const renderDesktopList = useCallback(() => {
    return (
      <>
        {sortedItems.map((item, index) => (
          <ExperienceItem key={item.id || `desktop-exp-${index}`} item={item} index={index} />
        ))}
      </>
    );
  }, [sortedItems]);
  
  return isMobile ? renderMobileList() : renderDesktopList();
};

export default memo(ExperienceList);
