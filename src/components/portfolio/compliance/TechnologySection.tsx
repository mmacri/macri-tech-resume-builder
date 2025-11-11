import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export const TechnologySection = () => {
  const capabilities = [
    'Custom dashboards for risk domains, control ownership, and compliance coverage.',
    'Policy lifecycle automation with version control and audit traceability.',
    'Real-time mapping between risks, controls, and frameworks for assurance visibility.',
    'Evidence collection and workflow automation integrated with external systems.'
  ];

  return (
    <section className="py-16 md:py-20 bg-accent/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-8 text-center">
          Technology-Enabled Compliance through ServiceNow IRM
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="prose prose-lg">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              I specialize in leveraging <strong>ServiceNow Integrated Risk Management (IRM)</strong> and <strong>Policy and Compliance</strong> modules to operationalize compliance and reporting.
            </p>
            
            <p className="text-lg text-foreground mb-4">This includes:</p>
            <ul className="space-y-3">
              {capabilities.map((capability, index) => (
                <li key={index} className="flex items-start space-x-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-macri-primary flex-shrink-0 mt-1" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="border-l-4 border-macri-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-4">GRC System Architecture</h4>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="font-medium">Policy Management</span>
                      <span className="text-macri-primary">Active</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="font-medium">Risk Register</span>
                      <span className="text-macri-primary">Integrated</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="font-medium">Control Library</span>
                      <span className="text-macri-primary">Unified</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="font-medium">Audit Workflows</span>
                      <span className="text-macri-primary">Automated</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium">External Tools</span>
                      <span className="text-macri-primary">Connected</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Example ServiceNow IRM system showing integrated compliance components
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
