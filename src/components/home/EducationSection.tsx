
import React from 'react';
import { MapPin, GraduationCap, X, Link } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface EducationItem {
  id?: string;
  title: string;
  organization: string;
  description: string;
  location?: string;
  display_order?: number;
}

interface EducationSectionProps {
  items?: EducationItem[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ items }) => {
  const { educationData } = useResumeData();
  const isMobile = useIsMobile();
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : educationData;

  // Render education items as accordion on mobile
  const renderMobileEducation = () => {
    return (
      <Accordion type="single" collapsible className="w-full">
        {displayItems
          .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          .map((item, index) => (
            <AccordionItem key={item.id || index} value={`item-${index}`} id={`education-item-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="text-left">
                  <div className="font-bold text-macri-primary text-lg">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.organization}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-sm bg-macri-primary/10 text-macri-primary px-2 py-1 rounded-full">
                      {item.organization === "MBA" ? "Master's Degree" : item.organization === "B.S." ? "Bachelor's Degree" : "Degree"}
                    </span>
                  </div>
                  <div className="text-gray-600 mb-2 text-sm">{item.description}</div>
                  
                  {item.location && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  
                  {/* Add internal link to experience section */}
                  <a 
                    href="#experience" 
                    className="text-macri-primary flex items-center gap-1 mt-4 text-sm font-medium hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('experience');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <Link className="h-4 w-4" />
                    See related experience
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    );
  };
  
  // Render education items as cards on desktop
  const renderDesktopEducation = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayItems
          .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          .map((item, index) => (
            <Card key={item.id || index} className="bg-white shadow-card hover:shadow-card-hover transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex mt-1 bg-macri-primary/10 rounded-full p-2 text-macri-primary">
                    {/* Use X logo for Xavier University */}
                    {item.title.toLowerCase().includes('xavier') ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <GraduationCap className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-macri-primary">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-lg font-medium text-gray-700">{item.organization}</span>
                      <span className="text-sm bg-macri-primary/10 text-macri-primary px-2 py-1 rounded-full">
                        {item.organization === "MBA" ? "Master's Degree" : item.organization === "B.S." ? "Bachelor's Degree" : "Degree"}
                      </span>
                    </div>
                    <div className="text-gray-600 mb-2">{item.description}</div>
                    
                    {item.location && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    
                    {/* Add internal link to experience section */}
                    <a 
                      href="#experience" 
                      className="text-macri-primary flex items-center gap-1 mt-4 text-sm font-medium hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('experience');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <Link className="h-4 w-4" />
                      See related experience
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  };

  return (
    <ResumeSection id="education" title="Education">
      {displayItems.length > 0 ? (
        isMobile ? (
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            {renderMobileEducation()}
          </div>
        ) : (
          renderDesktopEducation()
        )
      ) : (
        <div className="p-8 border rounded-lg bg-macri-secondary text-center">
          <p className="text-gray-600">No education information available.</p>
          <p className="text-sm text-gray-500 mt-2">Education details will appear here when added.</p>
        </div>
      )}
    </ResumeSection>
  );
};

export default EducationSection;
