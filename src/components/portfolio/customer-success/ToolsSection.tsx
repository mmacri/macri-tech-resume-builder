import React from 'react';
import { Badge } from '@/components/ui/badge';

export const ToolsSection = () => {
  const toolCategories = [
    {
      title: 'Customer Success & CRM',
      tools: ['Salesforce', 'Customer Success Platforms', 'Executive QBR Decks', 'Health Scoring']
    },
    {
      title: 'Platforms & Ecosystems',
      tools: ['ServiceNow', 'VMware', 'Cloud Infrastructure', 'Hybrid Infrastructure', 'AI/ML Workflows']
    },
    {
      title: 'Data & Reporting',
      tools: ['Executive Dashboards', 'Excel Models', 'Power BI Reporting', 'Outcome Tracking', 'Risk Tracking']
    },
    {
      title: 'Governance & Compliance',
      tools: ['Risk Frameworks', 'Control Frameworks', 'Regulatory Alignment', 'AI Governance', 'Security Programs', 'Resilience Programs']
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-4 text-center">
          Tools, Data, and Platforms I Work With
        </h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
          Customer Success is most powerful when it's <strong className="text-macri-primary">data-driven</strong> and integrated into the broader customer and technology ecosystem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toolCategories.map((category, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all">
              <h3 className="font-saira text-xl font-bold text-macri-dark mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool, toolIndex) => (
                  <Badge 
                    key={toolIndex} 
                    variant="outline"
                    className="text-sm bg-macri-primary/5 hover:bg-macri-primary/10 border-macri-primary/20 text-foreground"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            I operate at the intersection of <strong className="text-macri-primary">Customer Success, technology, and governance</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};
