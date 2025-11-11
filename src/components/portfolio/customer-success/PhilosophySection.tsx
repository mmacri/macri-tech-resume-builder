import React from 'react';
import { Building2, LineChart, Shield } from 'lucide-react';

export const PhilosophySection = () => {
  const principles = [
    {
      icon: LineChart,
      text: 'Aligning with executive-level metrics, not just usage numbers.'
    },
    {
      icon: Building2,
      text: 'Building repeatable engagement models that Customer Success teams can actually run.'
    },
    {
      icon: Shield,
      text: 'Giving leadership a clear line of sight from platform capabilities to risk reduction, revenue impact, and business outcomes.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-8 text-center">
          Customer Success as a Strategic Outcomes Engine
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-foreground leading-relaxed mb-8">
            My approach to Customer Success goes beyond tickets and renewals. I treat CS as a <strong className="text-macri-primary">bridge between product, sales, and the customer's business strategy</strong>. That means:
          </p>

          <div className="space-y-4 mb-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 rounded-lg bg-macri-primary/10">
                      <Icon className="w-5 h-5 text-macri-primary" />
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed flex-1">
                    {principle.text}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-lg text-foreground leading-relaxed">
            My background in <strong className="text-macri-primary">governance, risk, and compliance, AI policy, and enterprise platforms</strong> means I'm comfortable in environments where the stakes are high, the technology is complex, and the customer's success must be clearly provable.
          </p>
        </div>
      </div>
    </section>
  );
};
