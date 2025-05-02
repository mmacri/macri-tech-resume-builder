
import React, { ReactNode } from 'react';

interface ResumeSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ id, title, children }) => {
  return (
    <section 
      className="resume-section py-12 md:py-16 border-b border-gray-200" 
      id={id}
    >
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        {title && (
          <h2 className="section-title text-4xl font-bold mb-8 text-macri-primary">{title}</h2>
        )}
        <div className="resume-section-body">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
