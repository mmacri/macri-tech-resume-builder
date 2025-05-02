
import React, { ReactNode } from 'react';

interface ResumeSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ id, title, children }) => {
  return (
    <section className="resume-section" id={id}>
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-macri-primary">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default ResumeSection;
