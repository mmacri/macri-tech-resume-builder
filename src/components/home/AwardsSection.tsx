
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Trophy } from 'lucide-react';

interface AwardsSectionProps {
  items: any[];
}

const AwardsSection: React.FC<AwardsSectionProps> = ({ items = [] }) => {
  // If items provided, map to title, otherwise use default awards data
  const awards = items.length > 0 
    ? items.map(item => item.title)
    : [
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
      <div className="resume-section-content px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-macri-primary">Awards &amp; Certifications</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <ul className="space-y-3">
            {awards.map((award, index) => (
              <li key={index} className="flex gap-3 items-center">
                <span className="text-macri-warning text-xl flex-shrink-0">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </span>
                <span className="text-gray-700">{award}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Add a download resume button at the bottom */}
        <div className="mt-12 flex justify-center">
          <Button 
            asChild
            className="bg-macri-primary hover:bg-macri-primary/90 text-white px-8 py-6 rounded-md font-semibold text-lg flex items-center gap-2"
          >
            <a href="/resume">
              <Download className="h-5 w-5" />
              View Full Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
