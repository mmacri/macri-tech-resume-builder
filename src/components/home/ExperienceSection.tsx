
import React from 'react';

interface ExperienceItem {
  id?: string;
  title: string;
  organization: string;
  location: string;
  start_date: string;
  end_date?: string | null;
  description: string;
  display_order?: number;
}

interface ExperienceSectionProps {
  items: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items = [] }) => {
  return (
    <section className="resume-section" id="experience">
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-macri-primary">Experience</h2>
        
        {items.length > 0 ? (
          items
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map((item, index) => (
              <div key={item.id || index} className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                  <h3 className="text-2xl font-semibold text-macri-primary">{item.title}</h3>
                  <p className="text-gray-600 font-medium text-sm bg-gray-100 px-3 py-1 rounded-full">
                    {item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - {item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h5 className="text-lg font-medium text-gray-700">{item.organization}</h5>
                  {item.location && (
                    <p className="text-gray-500 italic">{item.location}</p>
                  )}
                </div>
                {item.description && (
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {item.description.split('\n')
                      .filter((point: string) => point.trim().length > 0)
                      .map((point: string, i: number) => (
                        <li key={i} className="py-1">{point.trim()}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))
        ) : (
          <div className="p-8 border rounded-lg bg-gray-50 text-center">
            <p className="text-gray-600">No experience information available.</p>
            <p className="text-sm text-gray-500 mt-2">Experience details will appear here when added.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
