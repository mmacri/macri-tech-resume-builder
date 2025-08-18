
import React, { memo } from 'react';
import { MapPin } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { ExperienceItem as ExperienceItemType } from './types';

interface ExperienceItemProps {
  item: ExperienceItemType;
  index: number;
}

// Memoize the component to prevent unnecessary re-renders
export const ExperienceItem: React.FC<ExperienceItemProps> = memo(({ item, index }) => {
  // Format date function
  const formatDateDisplay = (dateString: string | null | undefined) => {
    if (!dateString) return 'Present';
    return formatDate(dateString, { month: 'short', year: 'numeric' });
  };

  return (
    <div className="experience-item mb-8 last:mb-0">
      <div className="experience-header flex flex-col md:flex-row justify-between mb-2">
        <h3 className="experience-title text-2xl font-bold text-macri-primary">{item.title}</h3>
        <span className="experience-date text-lg font-medium text-gray-600">
          {formatDateDisplay(item.start_date)} - {formatDateDisplay(item.end_date)}
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="experience-company text-xl font-medium text-gray-700">{item.organization}</div>
        {item.location && (
          <div className="experience-location flex items-center gap-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            {item.location}
          </div>
        )}
      </div>
      
      {item.description && (
        <ul className="experience-description pl-5 list-disc space-y-1">
          {item.description.split('\n')
            .filter((point: string) => point.trim().length > 0)
            .map((point: string, i: number) => {
              // Remove the bullet character if it exists at the beginning of the point
              const cleanPoint = point.trim().replace(/^[•·-]?\s*/, '');
              console.log(`ExperienceItem: Bullet point ${i}: ${cleanPoint.substring(0, 50)}...`);
              return <li key={i} className="text-gray-700 mb-2">{cleanPoint}</li>;
            })}
        </ul>
      )}
    </div>
  );
});

ExperienceItem.displayName = 'ExperienceItem';

export default ExperienceItem;
