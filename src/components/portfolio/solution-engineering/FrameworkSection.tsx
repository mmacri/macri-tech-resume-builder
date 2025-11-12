import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Pencil, CheckCircle, Cog, TrendingUp } from 'lucide-react';

export const FrameworkSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover & Define",
      items: [
        "Identify business challenges, risks, and opportunities through structured discovery",
        "Establish measurable success metrics tied to leadership goals"
      ]
    },
    {
      icon: Pencil,
      title: "Architect & Design",
      items: [
        "Design reference architectures, integrations, and data models using secure, modular patterns",
        "Align across compliance, operations, and customer success teams"
      ]
    },
    {
      icon: CheckCircle,
      title: "Demonstrate & Validate",
      items: [
        "Deliver solution demos, proofs of concept, and executive storytelling",
        "Bridge business needs with technical delivery"
      ]
    },
    {
      icon: Cog,
      title: "Automate & Operationalize",
      items: [
        "Build automation and scalable workflows that reduce manual effort and risk",
        "Integrate with monitoring, analytics, and governance layers"
      ]
    },
    {
      icon: TrendingUp,
      title: "Enable & Expand",
      items: [
        "Document, train, and empower teams to sustain value",
        "Ensure solutions scale and evolve post-deployment"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-macri-primary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          My Framework for Scalable Solution Success
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="border-macri-primary/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-macri-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-macri-primary" />
                    </div>
                    <h3 className="font-saira text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                        <span className="mr-2 text-macri-primary">•</span>
                        <span>{item}</span>
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
