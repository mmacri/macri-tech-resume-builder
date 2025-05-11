
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
  const [visibleItems, setVisibleItems] = useState<ExperienceItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sort experience items by display_order - memoized to prevent recomputation
  const sortedItems = React.useMemo(() => 
    [...items].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)),
    [items]
  );

  // Improve loading performance - load all items immediately
  useEffect(() => {
    if (sortedItems.length === 0) {
      setIsLoading(false);
      return;
    }

    // Immediately show first 2 items for perceived performance
    setVisibleItems(sortedItems.slice(0, 2));
    
    // Use requestAnimationFrame to load remaining items in the next frame
    requestAnimationFrame(() => {
      // Load all remaining items immediately
      setVisibleItems(sortedItems);
      setIsLoading(false);
    });
  }, [sortedItems]);

  // Performance optimization for rendering
  const renderMobileList = useCallback(() => {
    return (
      <Accordion type="single" collapsible className="w-full">
        {visibleItems.map((item, index) => (
          <MobileExperienceItem key={item.id || index} item={item} index={index} />
        ))}
        {isLoading && visibleItems.length < sortedItems.length && (
          <div className="py-3 px-2 text-sm text-gray-500 animate-pulse">
            Loading more experiences...
          </div>
        )}
      </Accordion>
    );
  }, [visibleItems, isLoading, sortedItems.length]);

  const renderDesktopList = useCallback(() => {
    return (
      <>
        {visibleItems.map((item, index) => (
          <ExperienceItem key={item.id || index} item={item} index={index} />
        ))}
        {isLoading && visibleItems.length < sortedItems.length && (
          <div className="py-3 text-sm text-gray-500 animate-pulse">
            Loading more experiences...
          </div>
        )}
      </>
    );
  }, [visibleItems, isLoading, sortedItems.length]);
  
  return isMobile ? renderMobileList() : renderDesktopList();
};

export default memo(ExperienceList);
