
import React from 'react';
import { MapPin } from 'lucide-react';

interface EducationSectionProps {
  items: any[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ items = [] }) => {
  // If no items, use default education data
  const educationItems = items.length > 0 ? items : [
    {
      title: "Xavier University - Williams College of Business",
      organization: "MBA",
      description: "Management of Information Systems",
      location: "Cincinnati, OH"
    },
    {
      title: "Xavier University",
      organization: "B.S.",
      description: "Industrial Organizational Psychology",
      location: "Cincinnati, OH"
    }
  ];

  return (
    <section className="resume-section" id="education">
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-macri-primary">Education</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {educationItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-2 text-macri-primary">{item.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-medium text-gray-700">{item.organization}</span>
                <span className="text-sm bg-macri-primary/10 text-macri-primary px-2 py-1 rounded-full">
                  {item.organization === "MBA" ? "Master's Degree" : "Bachelor's Degree"}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
