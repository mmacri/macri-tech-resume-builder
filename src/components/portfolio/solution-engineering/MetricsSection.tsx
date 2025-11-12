import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Package, Shield, DollarSign } from 'lucide-react';

export const MetricsSection = () => {
  const metrics = [
    {
      icon: Server,
      title: "500+ Remote Deployments Automated",
      description: "Replaced manual SDDC builds with scalable remote provisioning"
    },
    {
      icon: Package,
      title: "New Product Innovation: PolicyHub",
      description: "Created and launched a net-new ServiceNow IRM module"
    },
    {
      icon: Shield,
      title: "45% Share Process Identification",
      description: "Engineered a common control architecture standardizing compliance automation"
    },
    {
      icon: DollarSign,
      title: "$50M+ Influenced Revenue",
      description: "Demonstrated solution value that directly impacted sales and renewals"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-macri-primary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          Performance and Measurable Impact
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-macri-primary/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-macri-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-macri-primary" />
                    </div>
                  </div>
                  <h3 className="font-saira text-lg font-bold text-foreground mb-2">
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
