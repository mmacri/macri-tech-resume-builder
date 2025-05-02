
import React from 'react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { formatDate } from '@/utils/formatDate';

interface ExperienceItem {
  id?: string;
  title: string;
  organization: string;
  location: string;
  start_date: string;
  end_date?: string | null;
  description: string;
  display_order?: number;
}

interface ExperienceSectionProps {
  items?: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items }) => {
  const { experienceData } = useResumeData();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : experienceData;

  // Format date function
  const formatDateDisplay = (dateString: string | null | undefined) => {
    if (!dateString) return 'Present';
    return formatDate(dateString, { month: 'short', year: 'numeric' });
  };

  return (
    <ResumeSection id="experience" title="Experience">
      {displayItems.length > 0 ? (
        displayItems
          .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          .map((item, index) => (
            <div key={item.id || index} className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">{item.title}</h3>
                <span className="experience-date">
                  {formatDateDisplay(item.start_date)} - {formatDateDisplay(item.end_date)}
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="experience-company">{item.organization}</div>
                {item.location && (
                  <div className="experience-location">{item.location}</div>
                )}
              </div>
              
              {item.description && (
                <ul className="experience-description">
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
          ))
      ) : (
        <div className="p-8 border rounded-lg bg-macri-secondary text-center">
          <p className="text-gray-600">No experience information available.</p>
          <p className="text-sm text-gray-500 mt-2">Experience details will appear here when added.</p>
        </div>
      )}
    </ResumeSection>
  );
};

export default ExperienceSection;
