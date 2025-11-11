import React from 'react';
import { Target, Layers, Bot, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FrameworkSection = () => {
  const steps = [
    {
      icon: Target,
      title: 'Assess & Align',
      items: [
        'Evaluate current compliance maturity and business impact.',
        'Identify overlapping frameworks (e.g., NERC, SOC 2, ISO, PCI, AI governance).',
        'Align leadership objectives with compliance requirements.'
      ]
    },
    {
      icon: Layers,
      title: 'Simplify & Standardize',
      items: [
        'Build a unified control library to eliminate duplication.',
        'Use common controls and inheritance models to streamline audits.',
        'Centralize documentation and reporting within ServiceNow GRC.'
      ]
    },
    {
      icon: Bot,
      title: 'Automate & Monitor',
      items: [
        'Implement technology workflows for evidence, policy lifecycle, and risk alerts.',
        'Use dashboards and analytics for real-time visibility.',
        'Integrate third-party tools (Tenable, QRadar, SolarWinds, Tripwire, etc.) for automated risk signals.'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Govern & Evolve',
      items: [
        'Establish clear ownership and review processes.',
        'Measure control effectiveness, risk exposure, and compliance ROI.',
        'Continuously refine frameworks as regulations and AI ethics evolve.'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-accent/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          The Framework for Operationalized Compliance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
