
import React from 'react';

interface AwardsSectionProps {
  items: any[];
}

const AwardsSection: React.FC<AwardsSectionProps> = ({ items = [] }) => {
  // If no items, use default awards data
  const awards = items.length > 0 ? items.map(item => item.title) : [
    "AI Security and Governance Certification - Securiti (2024)",
    "VMware Certified Professional",
    "GSI Americas Regions Technical Alliance Manager of the Quarter - FY21Q4",
    "GSI Americas Regions Technical Alliance Manager of the Quarter - FY21Q3",
    "GSI Partners - Rockstar of the Half Award - FY21H2",
    "Partner Solutions Engineer of the Quarter - FY19Q4",
    "VMware Americas VP Award of Service Excellence"
  ];

  return (
    <section className="resume-section" id="awards">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Awards &amp; Certifications</h2>
        <ul className="fa-ul space-y-3">
          {awards.map((award, index) => (
            <li key={index} className="flex gap-2">
              <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
              {award}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AwardsSection;
