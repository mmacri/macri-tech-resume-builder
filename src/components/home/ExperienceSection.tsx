
import React from 'react';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { formatDate } from '@/utils/formatDate';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

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
  const isMobile = useIsMobile();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : experienceData;

  // Format date function
  const formatDateDisplay = (dateString: string | null | undefined) => {
    if (!dateString) return 'Present';
    return formatDate(dateString, { month: 'short', year: 'numeric' });
  };

  // Mobile view with accordion for each experience item
  const renderMobileExperience = () => {
    return (
      <Accordion type="single" collapsible className="w-full">
        {displayItems
          .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          .map((item, index) => (
            <AccordionItem key={item.id || index} value={`item-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="text-left">
                  <div className="font-bold text-macri-primary">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.organization}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="experience-item pt-2">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <span className="experience-date text-sm font-medium text-gray-600">
                      {formatDateDisplay(item.start_date)} - {formatDateDisplay(item.end_date)}
                    </span>
                    {item.location && (
                      <div className="experience-location text-sm text-gray-500">{item.location}</div>
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
          ))}
      </Accordion>
    );
  };

  // Desktop view with full content
  const renderDesktopExperience = () => {
    return (
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
    );
  };

  return (
    <ResumeSection id="experience" title="Experience">
      {displayItems.length > 0 ? (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          {isMobile ? renderMobileExperience() : renderDesktopExperience()}
        </div>
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
