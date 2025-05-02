
import React from 'react';

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
    },
    {
      title: "Xavier University",
      organization: "B.S.",
      description: "Industrial Organizational Psychology",
    }
  ];

  return (
    <section className="resume-section" id="education">
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-macri-primary">Education</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {educationItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-2 text-macri-primary">{item.title}</h3>
              <div className="text-lg font-medium text-gray-700 mb-2">{item.organization}</div>
              <div className="text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
