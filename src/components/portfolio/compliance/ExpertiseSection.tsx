import React from 'react';
import { Badge } from '@/components/ui/badge';

export const ExpertiseSection = () => {
  const frameworks = [
    {
      category: 'Cybersecurity & Infrastructure',
      items: ['NERC CIP', 'NIST CSF', 'ISO 27001', 'SOC 2']
    },
    {
      category: 'Privacy & Ethics',
      items: ['GDPR', 'AI Governance', 'Data Protection']
    },
    {
      category: 'Financial & Operational',
      items: ['SOX', 'PCI DSS', 'Internal Control Standards']
    },
    {
      category: 'Technology Platforms',
      items: ['ServiceNow GRC', 'VMware', 'Tenable', 'QRadar', 'SolarWinds', 'Tripwire']
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-4 text-center">
          Frameworks and Regulations I Work With
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {frameworks.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIndex) => (
                  <Badge key={itemIndex} variant="secondary" className="text-sm px-3 py-1">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <blockquote className="text-center text-lg text-muted-foreground italic max-w-3xl mx-auto border-l-4 border-macri-primary pl-6">
          Bridging the gap between compliance requirements and technical implementation is where my experience delivers the most value.
        </blockquote>
      </div>
    </section>
  );
};
