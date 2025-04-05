
import React from 'react';

const AwardsSection: React.FC = () => {
  return (
    <section className="resume-section" id="awards">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Awards &amp; Certifications</h2>
        <ul className="fa-ul space-y-3">
          <li className="flex gap-2">
            <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
            AI Security and Governance Certification - Securiti (2024)
          </li>
          <li className="flex gap-2">
            <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
            VMware Certified Professional
          </li>
          <li className="flex gap-2">
            <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
            GSI Americas Regions Technical Alliance Manager of the Quarter - FY21Q4
          </li>
          <li className="flex gap-2">
            <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
            GSI Americas Regions Technical Alliance Manager of the Quarter - FY21Q3
          </li>
          <li className="flex gap-2">
            <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
            GSI Partners - Rockstar of the Half Award - FY21H2
          </li>
          <li className="flex gap-2">
            <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
            Partner Solutions Engineer of the Quarter - FY19Q4
          </li>
          <li className="flex gap-2">
            <span className="w-5 text-center"><i className="fas fa-trophy text-macri-warning"></i></span>
            VMware Americas VP Award of Service Excellence
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AwardsSection;
