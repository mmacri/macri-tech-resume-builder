import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Blocks, Zap } from 'lucide-react';

export const HeroSection = () => {
  const metrics = [
    {
      icon: Lightbulb,
      title: "Global Platform Innovation",
      description: "Led creation of new ServiceNow IRM capabilities, including Common Controls and PolicyHub — now foundational to GRC deployments."
    },
    {
      icon: Blocks,
      title: "Enterprise Scale Engineering",
      description: "Advocated and implemented VMware's SDDC remote deployment model, replacing 500+ onsite builds with automated 10-minute rollouts."
    },
    {
      icon: Zap,
      title: "Cross-Domain Impact",
      description: "Unified solution architecture, compliance automation, and customer outcomes across technology, risk, and operations teams."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-macri-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-saira text-4xl md:text-5xl lg:text-6xl font-bold text-macri-primary mb-6">
            Engineering Innovation That Scales from Architecture to Adoption
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            I lead solution engineering teams that design, build, and deliver enterprise-scale solutions — aligning technical excellence with strategic business impact.
          </p>
          
          <div className="prose prose-lg max-w-4xl mx-auto text-foreground/90">
            <p className="text-lg leading-relaxed">
              I'm <strong>Mike Macri</strong>, a senior Solution Engineer and technology strategist with over 25 years of experience leading innovation across ServiceNow, VMware, and enterprise IT ecosystems.
            </p>
            <p className="text-lg leading-relaxed">
              My work combines deep architectural skill with strategic storytelling — connecting platforms, governance frameworks, and automation to accelerate transformation and deliver measurable outcomes.
            </p>
            <p className="text-lg leading-relaxed">
              I've architected new market offerings, streamlined compliance automation, and helped global organizations deploy infrastructure at scale.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-macri-primary/20 hover:border-macri-primary/40 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-macri-primary/10 rounded-lg">
                      <Icon className="w-8 h-8 text-macri-primary" />
                    </div>
                  </div>
                  <h3 className="font-saira text-xl font-bold text-macri-primary mb-3">
                    {metric.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
