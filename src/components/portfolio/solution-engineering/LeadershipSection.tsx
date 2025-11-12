import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Lightbulb, GitBranch } from 'lucide-react';

export const LeadershipSection = () => {
  const highlights = [
    {
      icon: BookOpen,
      text: "Developed playbooks for discovery, demos, and executive storytelling used across regional SE teams"
    },
    {
      icon: Users,
      text: "Created training frameworks to upskill engineers on compliance, cloud, and automation solutions"
    },
    {
      icon: GitBranch,
      text: "Guided product alignment between ServiceNow IRM and VMware multi-cloud infrastructure initiatives"
    },
    {
      icon: Lightbulb,
      text: "Fostered innovation sessions where engineers co-created prototypes that influenced product roadmaps"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-macri-primary/5 to-accent/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-8 text-center">
          Leading Teams that Inspire Confidence and Deliver Results
        </h2>
        
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          As a Solution Engineering leader, my focus is on clarity, mentorship, and alignment. I've built teams that blend technical mastery with business empathy — driving collaboration across pre-sales, product, and customer success.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="border-macri-primary/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-macri-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-macri-primary" />
                  </div>
                  <p className="text-muted-foreground">{highlight.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
