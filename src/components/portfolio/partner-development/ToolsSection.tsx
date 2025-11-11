import React from 'react';
import { Badge } from '@/components/ui/badge';

export const ToolsSection = () => {
  const toolCategories = [
    {
      category: 'Partner & CRM Platforms',
      tools: ['Salesforce', 'PRM Systems', 'ServiceNow', 'HubSpot']
    },
    {
      category: 'Enablement & Marketing',
      tools: ['Seismic', 'Highspot', 'Enablement Playbooks', 'Partner Portals']
    },
    {
      category: 'Analytics & Reporting',
      tools: ['Tableau', 'Power BI', 'Excel Dashboards', 'Partner Health Metrics']
    },
    {
      category: 'Ecosystem Focus',
      tools: ['VMware', 'ServiceNow', 'Microsoft', 'AWS', 'GCP', 'Compliance SaaS']
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-4 text-center">
          Ecosystem Tools and Partner Platforms
        </h2>
        
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Partner Success is most powerful when it's data-driven and integrated into the broader business ecosystem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toolCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool, toolIndex) => (
                  <Badge key={toolIndex} variant="secondary" className="text-sm px-3 py-1">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
