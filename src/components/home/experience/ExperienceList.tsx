
import React, { useState, useEffect, useCallback } from 'react';
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

  // Performance optimized loading logic with batch size
  useEffect(() => {
    if (sortedItems.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Display first item immediately for perceived performance
    setVisibleItems(sortedItems.slice(0, 1));
    
    // Mobile needs more aggressive performance optimization
    const batchSize = isMobile ? 2 : 5; // Smaller batches on mobile
    const loadDelay = isMobile ? 50 : 10; // Smaller delay on desktop
    
    // Use requestAnimationFrame for smoother loading
    const loadMore = () => {
      requestAnimationFrame(() => {
        // Always show at least one item immediately
        if (visibleItems.length >= sortedItems.length) {
          setIsLoading(false);
          return;
        }
        
        const nextBatch = sortedItems.slice(
          0, 
          Math.min(visibleItems.length + batchSize, sortedItems.length)
        );
        
        setVisibleItems(nextBatch);
        
        if (nextBatch.length < sortedItems.length) {
          setTimeout(loadMore, loadDelay);
        } else {
          setIsLoading(false);
        }
      });
    };
    
    // Start loading more items after a short delay
    const timer = setTimeout(loadMore, 100);
    
    return () => clearTimeout(timer);
  }, [sortedItems, isMobile]);

  // Performance optimization for rendering
  const renderMobileList = useCallback(() => {
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
  }, [visibleItems, isLoading]);

  const renderDesktopList = useCallback(() => {
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
  }, [visibleItems, isLoading, sortedItems]);
  
  return isMobile ? renderMobileList() : renderDesktopList();
};

export default React.memo(ExperienceList);
