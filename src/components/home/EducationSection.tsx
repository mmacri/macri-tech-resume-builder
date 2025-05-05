
import React from 'react';
import { MapPin, GraduationCap, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ResumeSection from './ResumeSection';
import { useResumeData } from './DataProvider';

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
  
  // Use items prop if provided, otherwise use data from context
  const displayItems = items && items.length > 0 ? items : educationData;

  return (
    <ResumeSection id="education" title="Education">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </ResumeSection>
  );
};

export default EducationSection;
