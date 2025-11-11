import React from 'react';
import { Network, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const HeroSection = () => {
  const metrics = [
    {
      icon: TrendingUp,
      title: 'Global Ecosystem Growth',
      description: 'Drove double-digit revenue expansion through partner co-sell frameworks and enablement programs.'
    },
    {
      icon: Network,
      title: 'Strategic Alliances',
      description: 'Built and managed partner relationships across system integrators, MSPs, and technology alliances.'
    },
    {
      icon: Users,
      title: 'Enablement & GTM Impact',
      description: 'Delivered partner success frameworks that improved partner engagement and sales readiness.'
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-background via-background to-accent/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-saira text-4xl md:text-5xl lg:text-6xl font-bold text-macri-primary mb-6">
            Building Strategic Alliances that Deliver Growth and Lasting Value
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            I help technology companies design and scale global partner ecosystems — aligning business strategy, enablement, and joint go-to-market execution to create meaningful outcomes for customers and partners alike.
          </p>
          <div className="prose prose-lg max-w-4xl mx-auto text-foreground">
            <p>
              I'm <strong>Mike Macri</strong>, a Partner and Business Development leader with more than 25 years of experience helping technology companies like <strong>VMware</strong> and <strong>ServiceNow</strong> expand their reach through high-impact partner ecosystems. My focus is on creating programs that turn partnerships into performance — building the frameworks, enablement models, and shared success metrics that help alliances thrive.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-card border-border hover:shadow-card-hover transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-macri-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-macri-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {metric.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {metric.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
