
import React, { memo } from 'react';
import { MapPin } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { ExperienceItem as ExperienceItemType } from './types';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

interface MobileExperienceItemProps {
  item: ExperienceItemType;
  index: number;
}

// Memoize the component to prevent unnecessary re-renders
export const MobileExperienceItem: React.FC<MobileExperienceItemProps> = memo(({ item, index }) => {
  // Format date function
  const formatDateDisplay = (dateString: string | null | undefined) => {
    if (!dateString) return 'Present';
    return formatDate(dateString, { month: 'short', year: 'numeric' });
  };

  return (
    <AccordionItem 
      key={item.id || index} 
      value={`item-${index}`} 
      id={`experience-item-${index}`}
      className="border-b border-gray-200 last:border-0"
    >
      <AccordionTrigger 
        className="hover:no-underline py-4 px-2 group flex items-center justify-between w-full"
        aria-label={`Toggle ${item.title} details`}
      >
        <div className="text-left flex-1">
          <div className="font-bold text-macri-primary text-lg group-hover:text-macri-primary/80 transition-colors">
            {item.title}
          </div>
          <div className="text-sm text-gray-600">{item.organization}</div>
        </div>
      </AccordionTrigger>
      
      <AccordionContent>
        <div className="experience-item pt-2 pb-4 px-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <span className="experience-date text-sm font-medium text-gray-600">
              {formatDateDisplay(item.start_date)} - {formatDateDisplay(item.end_date)}
            </span>
            {item.location && (
              <div className="experience-location text-sm text-gray-500 flex items-center gap-1 mt-1 md:mt-0">
                <MapPin className="h-3 w-3" />
                {item.location}
              </div>
            )}
          </div>
          
          {item.description && (
            <ul className="experience-description text-sm pl-5 list-disc space-y-1">
              {item.description.split('\n')
                .filter((point: string) => point.trim().length > 0)
                .map((point: string, i: number) => {
                  // Remove the bullet character if it exists at the beginning of the point
                  const cleanPoint = point.trim().replace(/^[•·]?\s*/, '');
                  return <li key={i}>{cleanPoint}</li>;
                })}
            </ul>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
});

MobileExperienceItem.displayName = 'MobileExperienceItem';

export default MobileExperienceItem;
