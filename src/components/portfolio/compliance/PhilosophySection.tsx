import React from 'react';
import { Eye, Zap, RefreshCw, Shield } from 'lucide-react';

export const PhilosophySection = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Make risk visible and traceable through data-driven dashboards.'
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Streamline evidence collection, audits, and control testing through automation.'
    },
    {
      icon: RefreshCw,
      title: 'Consistency',
      description: 'Standardize frameworks to reduce duplicate work across teams and regulations.'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Use governance to strengthen relationships with regulators, customers, and partners.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-8 text-center">
          Compliance as a Strategic Enabler — Not a Checkbox Exercise
        </h2>

        <div className="prose prose-lg max-w-4xl mx-auto text-foreground mb-12">
          <p className="text-lg leading-relaxed text-center">
            Most organizations treat compliance as a cost. I treat it as <strong>a performance metric for operational maturity</strong>.
          </p>
        </div>

        <p className="text-center text-lg text-muted-foreground mb-8">
          My philosophy is built on four pillars:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-lg bg-macri-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-macri-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-lg text-foreground max-w-4xl mx-auto">
          These pillars guide how I help organizations transform compliance programs into strategic capabilities that support growth and innovation.
        </p>
      </div>
    </section>
  );
};
