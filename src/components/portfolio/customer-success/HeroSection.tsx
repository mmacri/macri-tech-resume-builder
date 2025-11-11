import React from 'react';
import { TrendingUp, Target, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const HeroSection = () => {
  const metrics = [
    {
      icon: TrendingUp,
      title: 'Stronger Retention & Renewals',
      description: 'Programs focused on value realization, executive alignment, and risk visibility that protect renewals and create expansion paths.'
    },
    {
      icon: Target,
      title: 'Faster Time-to-Value',
      description: 'Onboarding and engagement structures that reduce time-to-value and make it easier for customers to reach meaningful outcomes quickly.'
    },
    {
      icon: Users,
      title: 'Trusted Executive Partnerships',
      description: 'QBRs, engagement trackers, and reporting that keep senior stakeholders aligned to outcomes, not just features.'
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-macri-primary-subtle via-background to-macri-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-saira text-4xl md:text-5xl lg:text-6xl font-bold text-macri-dark mb-4">
            Empowering Customer Success to Deliver Real Business Outcomes
          </h1>
          <h2 className="text-xl md:text-2xl text-macri-muted mb-6 max-w-4xl mx-auto font-medium">
            I help organizations turn Customer Success into a proactive, data-driven engine for retention, expansion, and advocacy — especially in complex, regulated, and enterprise environments.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-foreground leading-relaxed">
            I'm <strong className="text-macri-primary">Mike Macri</strong>, a customer-facing technologist and advisor with more than 25 years of experience working with global enterprises across SaaS, infrastructure, and governance, risk, and compliance. At companies like <strong>VMware</strong> and <strong>ServiceNow</strong>, I've partnered with executives, customer success teams, and technical leaders to reduce risk, drive adoption, and turn strategic platforms into measurable business value. My focus is on building engagement models, success frameworks, and tooling that make Customer Success teams more effective and customers more successful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-card hover:shadow-card-hover transition-all duration-300 border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-macri-primary/10">
                      <Icon className="w-8 h-8 text-macri-primary" />
                    </div>
                    <h3 className="font-saira text-xl font-bold text-macri-dark mb-3">
                      {metric.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
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
