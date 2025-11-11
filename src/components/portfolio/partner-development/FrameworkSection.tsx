import React from 'react';
import { Target, BookOpen, Handshake, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FrameworkSection = () => {
  const steps = [
    {
      icon: Target,
      title: 'Strategy & Alignment',
      items: [
        'Define the partner value proposition and desired business outcomes.',
        'Align internal stakeholders: sales, marketing, product, and customer success.',
        'Prioritize partner types (GSI, ISV, VAR, MSP) based on growth potential.'
      ]
    },
    {
      icon: BookOpen,
      title: 'Enablement & Engagement',
      items: [
        'Develop scalable onboarding, training, and certification programs.',
        'Provide go-to-market resources, success playbooks, and co-branding guidance.',
        'Establish executive sponsor alignment for key strategic accounts.'
      ]
    },
    {
      icon: Handshake,
      title: 'Joint Execution & Co-Sell',
      items: [
        'Drive pipeline generation through joint field programs and account mapping.',
        'Build governance for deal registration, influence, and partner incentives.',
        'Use data dashboards to measure partner performance and customer outcomes.'
      ]
    },
    {
      icon: BarChart3,
      title: 'Growth & Optimization',
      items: [
        'Continuously evaluate partner performance, health, and profitability.',
        'Evolve programs to include co-innovation, integration, and customer advocacy.',
        'Turn top partners into champions for the broader ecosystem.'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-accent/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-4 text-center">
          A Proven Framework for Building High-Impact Partner Ecosystems
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-card border-border hover:shadow-card-hover transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-macri-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-macri-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Step {index + 1} – {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="leading-relaxed">
                        {item}
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
