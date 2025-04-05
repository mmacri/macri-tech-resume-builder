
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
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Education</h2>
        
        {educationItems.map((item, index) => (
          <div key={index} className={index < educationItems.length - 1 ? "mb-6" : ""}>
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                <div className="subheading mb-2">{item.organization}</div>
                <div>{item.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
