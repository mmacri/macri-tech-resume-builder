
import React from 'react';
import { format, parse } from 'date-fns';

interface ExperienceSectionProps {
  items: any[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items = [] }) => {
  // If no items, use default experience items
  const experienceItems = items.length > 0 ? items : [
    {
      title: "Sr Manager, InfoSec Solution & Automation Engineering",
      organization: "ServiceNow.com: Legal, Ethics & Compliance Program",
      location: null,
      start_date: "2021-12-01",
      end_date: null,
      description: "Created PolicyHub – a self-service portal centralizing 400+ policies – to enable fast, secure access to critical compliance documentation and reduce training dependency.\nEnhanced product features in GRC, Policy & Compliance, Strategic Portfolio Manager, and risk management by aligning cross-functional processes.\nCollaborated with executives to resolve production vulnerabilities, mitigating $900M in annual revenue risk.\nStreamlined workflows and implemented common controls to reduce redundant operations and boost data transparency."
    },
    // Add more default items if needed
  ];

  // Function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    try {
      const date = parse(dateString, 'yyyy-MM-dd', new Date());
      return format(date, 'MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Function to format date range
  const formatDateRange = (startDate: string | null, endDate: string | null) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <section className="resume-section" id="experience">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Experience</h2>

        {experienceItems.map((item, index) => (
          <div key={index} className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-macri-primary text-sm">
                  {formatDateRange(item.start_date, item.end_date)}
                </p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">{item.organization}</h5>
              {item.description && (
                <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                  {item.description.split('\n').map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
