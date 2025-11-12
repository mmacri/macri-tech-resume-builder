import React from 'react';
import { Badge } from '@/components/ui/badge';

export const ExpertiseSection = () => {
  const expertise = {
    platforms: ["ServiceNow", "VMware", "Microsoft Azure", "AWS", "GCP"],
    domains: ["GRC", "ITOM", "IRM", "Cloud Infrastructure", "AI Governance"],
    tools: ["Python", "PowerShell", "Docker", "GitHub", "Power BI", "Excel Analytics", "Visio", "Figma"],
    competencies: ["Solution Architecture", "Pre-Sales Enablement", "Automation Design", "Executive Storytelling", "Technical Coaching"]
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          From Platform Depth to Architectural Breadth
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-saira text-xl font-bold text-foreground mb-4">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {expertise.platforms.map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-macri-primary/10 text-macri-primary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-saira text-xl font-bold text-foreground mb-4">Domains</h3>
            <div className="flex flex-wrap gap-2">
              {expertise.domains.map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-macri-primary/10 text-macri-primary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-saira text-xl font-bold text-foreground mb-4">Languages & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {expertise.tools.map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-macri-primary/10 text-macri-primary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-saira text-xl font-bold text-foreground mb-4">Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {expertise.competencies.map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-macri-primary/10 text-macri-primary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
