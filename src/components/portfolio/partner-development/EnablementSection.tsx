import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export const EnablementSection = () => {
  const initiatives = [
    'Built partner playbooks and enablement paths aligned to business outcomes.',
    'Designed joint value propositions that improved partner positioning and win rates.',
    'Created dashboards for visibility into partner performance, pipeline, and certifications.',
    'Facilitated executive sponsor programs that elevated relationships at the C-suite level.'
  ];

  return (
    <section className="py-16 md:py-20 bg-accent/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-8 text-center">
          Empowering Partner Teams for Sustainable Growth
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="prose prose-lg">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Strong ecosystems depend on empowered people. I've led and coached partner managers, technical alliance leads, and co-sell specialists to create programs that scale.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">Key initiatives:</h3>
            <ul className="space-y-3">
              {initiatives.map((initiative, index) => (
                <li key={index} className="flex items-start space-x-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-macri-primary flex-shrink-0 mt-1" />
                  <span>{initiative}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="border-l-4 border-macri-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Partner Scorecard</h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Pipeline Influence</span>
                      <span className="font-semibold text-macri-primary">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enablement Complete</span>
                      <span className="font-semibold text-macri-primary">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Executive Engagement</span>
                      <span className="font-semibold text-macri-primary">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Co-Sell Readiness</span>
                      <span className="font-semibold text-macri-primary">Active</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Example dashboard view showing partner health and engagement metrics
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
