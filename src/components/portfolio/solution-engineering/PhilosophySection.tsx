import React from 'react';
import { Target, Cpu, BookOpen } from 'lucide-react';

export const PhilosophySection = () => {
  const pillars = [
    {
      icon: Target,
      title: "Strategic Alignment",
      description: "Ensure solutions tie directly to business objectives and measurable outcomes."
    },
    {
      icon: Cpu,
      title: "Architectural Precision",
      description: "Design systems that scale, integrate, and evolve with the customer's environment."
    },
    {
      icon: BookOpen,
      title: "Outcome Storytelling",
      description: "Translate technical capability into executive clarity and customer confidence."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-8 text-center">
          Turning Complex Technology into Measurable Business Outcomes
        </h2>
        
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Solution Engineering is where innovation meets execution. I approach every engagement through three lenses:
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-macri-primary/10 rounded-full">
                    <Icon className="w-8 h-8 text-macri-primary" />
                  </div>
                </div>
                <h3 className="font-saira text-xl font-bold text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
