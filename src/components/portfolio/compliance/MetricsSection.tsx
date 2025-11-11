import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Clock, Eye, CheckCircle2 } from 'lucide-react';

export const MetricsSection = () => {
  const metrics = [
    {
      icon: Target,
      title: 'Control Optimization',
      description: '90%+ reduction in redundant controls through reuse and mapping.'
    },
    {
      icon: Clock,
      title: 'Audit Readiness',
      description: '50% faster audit preparation time with automation.'
    },
    {
      icon: Eye,
      title: 'Risk Visibility',
      description: 'Real-time dashboards improved executive decision-making accuracy.'
    },
    {
      icon: CheckCircle2,
      title: 'Framework Coverage',
      description: '100% traceability across all active frameworks and risk domains.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          Quantifying Compliance Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-card border-border hover:shadow-card-hover transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-macri-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-macri-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {metric.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
