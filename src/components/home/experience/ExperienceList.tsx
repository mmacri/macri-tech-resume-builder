
import React, { useState, useEffect } from 'react';
import ExperienceItem from './ExperienceItem';
import { Accordion } from '@/components/ui/accordion';
import MobileExperienceItem from './MobileExperienceItem';
import { ExperienceItem as ExperienceItemType } from './types';

interface ExperienceListProps {
  items: ExperienceItemType[];
  isMobile: boolean;
}

export const ExperienceList: React.FC<ExperienceListProps> = ({ items, isMobile }) => {
  const [visibleItems, setVisibleItems] = useState<ExperienceItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sort experience items by display_order
  const sortedItems = [...items].sort((a, b) => 
    (a.display_order || 0) - (b.display_order || 0)
  );

  // Progressive loading for mobile devices
  useEffect(() => {
    if (sortedItems.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Display first item immediately for perceived performance
    setVisibleItems(sortedItems.slice(0, 1));
    
    // Then progressively load the remaining items
    const timer = setTimeout(() => {
      setVisibleItems(sortedItems);
      setIsLoading(false);
    }, isMobile ? 100 : 0); // Small delay on mobile, instant on desktop
    
    return () => clearTimeout(timer);
  }, [sortedItems, isMobile]);

  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full">
        {visibleItems.map((item, index) => (
          <MobileExperienceItem key={item.id || index} item={item} index={index} />
        ))}
        {isLoading && (
          <div className="py-4 px-2 text-sm text-gray-500 animate-pulse">
            Loading more experiences...
          </div>
        )}
      </Accordion>
    );
  }
  
  return (
    <>
      {visibleItems.map((item, index) => (
        <ExperienceItem key={item.id || index} item={item} index={index} />
      ))}
      {isLoading && sortedItems.length > 1 && (
        <div className="py-4 text-sm text-gray-500 animate-pulse">
          Loading more experiences...
        </div>
      )}
    </>
  );
};

export default ExperienceList;
