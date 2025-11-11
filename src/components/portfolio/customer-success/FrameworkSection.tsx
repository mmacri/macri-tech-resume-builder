import React from 'react';
import { Rocket, Activity, Award, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const FrameworkSection = () => {
  const steps = [
    {
      number: 1,
      icon: Rocket,
      title: 'Onboarding & Setup',
      points: [
        'Align on business outcomes, success metrics, and stakeholder roles.',
        'Define a joint success plan that connects platform capabilities to specific business objectives.',
        'Establish baselines for usage, risk, and value metrics.'
      ]
    },
    {
      number: 2,
      icon: Activity,
      title: 'Adoption & Engagement',
      points: [
        'Use health scoring, usage analytics, and stakeholder mapping to ensure the right people are enabled.',
        'Run structured touchpoints with clear agendas that connect back to the success plan.',
        'Proactively identify adoption gaps and friction points and assign owners to resolve them.'
      ]
    },
    {
      number: 3,
      icon: Award,
      title: 'Value Realization & Executive Storytelling',
      points: [
        'Translate technical progress into language that resonates with business and risk leaders.',
        'Use recurring executive reviews to highlight outcomes, risk reduction, and financial impact.',
        'Tie platform capabilities to strategic initiatives, such as compliance, resilience, AI governance, or cost optimization.'
      ]
    },
    {
      number: 4,
      icon: Sparkles,
      title: 'Advocacy & Expansion',
      points: [
        'Identify and grow champions inside the customer\'s organization.',
        'Turn proven value into references, case studies, and expansion opportunities.',
        'Help Customer Success and account teams plan the next wave of outcomes, not just the next renewal date.'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-macri-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-4">
            A Framework for Retention, Expansion, and Advocacy
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            This is the lifecycle I use to design and run customer success programs, especially in enterprise and regulated environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.number} className="bg-card hover:shadow-card-hover transition-all duration-300 border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-macri-primary text-white font-bold text-sm">
                      {step.number}
                    </div>
                    <Icon className="w-6 h-6 text-macri-primary" />
                  </div>
                  <CardTitle className="text-xl font-saira text-macri-dark">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {step.points.map((point, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-macri-primary mt-2 mr-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
