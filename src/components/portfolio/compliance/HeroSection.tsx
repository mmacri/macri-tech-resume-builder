import React from 'react';
import { Shield, BarChart3, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const HeroSection = () => {
  const metrics = [
    {
      icon: CheckCircle2,
      title: '90%+ Control Reuse Rate',
      description: 'Built common control frameworks that unified compliance across multiple regulatory regimes.'
    },
    {
      icon: BarChart3,
      title: 'Integrated GRC Platform Enablement',
      description: 'Delivered ServiceNow-based GRC dashboards that connected risk, policy, and audit data into one system of record.'
    },
    {
      icon: Shield,
      title: 'Risk Reduction at Scale',
      description: 'Helped large enterprises reduce audit fatigue, eliminate redundancy, and quantify compliance ROI.'
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-background via-background to-accent/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-saira text-4xl md:text-5xl lg:text-6xl font-bold text-macri-primary mb-6">
            Transforming Compliance into a Competitive Advantage
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            I help organizations strengthen trust, reduce risk, and streamline governance by connecting compliance frameworks, technology, and human accountability.
          </p>
          <div className="prose prose-lg max-w-4xl mx-auto text-foreground">
            <p>
              I'm <strong>Mike Macri</strong>, a Governance, Risk, and Compliance (GRC) leader with over 25 years of experience building technology-driven compliance programs across enterprise, public-sector, and regulated industries.
            </p>
            <p>
              I've led initiatives for organizations using <strong>ServiceNow IRM</strong>, <strong>VMware infrastructure</strong>, and <strong>AI governance frameworks</strong> — turning regulatory complexity into structured, automated processes that drive operational excellence.
            </p>
            <p>
              My work focuses on designing common control frameworks, assurance mapping, and compliance automation to make organizations safer, smarter, and more resilient.
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
