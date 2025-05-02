
import React from 'react';

interface ExperienceItem {
  id?: string;
  title: string;
  organization: string;
  location: string;
  start_date: string;
  end_date?: string;
  description: string;
  display_order?: number;
}

interface ExperienceSectionProps {
  items: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items = [] }) => {
  return (
    <section className="resume-section" id="experience">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Experience</h2>
        
        {items.length > 0 ? (
          items.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).map((item, index) => (
            <div key={item.id || index} className="card mb-8">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-macri-primary text-sm">
                    {item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - {item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                  <h5 className="text-base font-normal text-gray-600">{item.organization}</h5>
                  {item.location && (
                    <p className="text-sm text-gray-500">{item.location}</p>
                  )}
                </div>
                {item.description && (
                  <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                    {item.description.split('\n')
                      .filter((point: string) => point.trim().length > 0)
                      .map((point: string, i: number) => (
                        <li key={i}>{point.trim()}</li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 border rounded-lg bg-gray-50">
            <p className="text-gray-600">No experience information available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
