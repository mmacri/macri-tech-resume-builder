
import React from 'react';

const EducationSection: React.FC = () => {
  return (
    <section className="resume-section" id="education">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Education</h2>
        
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-1">Xavier University - Williams College of Business</h3>
              <div className="subheading mb-2">MBA</div>
              <div>Management of Information Systems</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-1">Xavier University</h3>
              <div className="subheading mb-2">B.S.</div>
              <div>Industrial Organizational Psychology</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
