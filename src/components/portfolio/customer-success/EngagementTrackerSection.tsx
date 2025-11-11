import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EngagementTrackerSection = () => {
  const features = [
    {
      icon: CheckCircle2,
      text: 'Tracks business outcomes, success metrics, and key stakeholders.'
    },
    {
      icon: Users,
      text: 'Aligns Customer Success, sales, and product around the same engagement plan.'
    },
    {
      icon: Calendar,
      text: 'Makes QBR preparation faster and more focused on impact.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-macri-section-alt">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-6 text-center">
          See How I Structure Customer Engagements
        </h2>

        <div className="bg-card border border-border rounded-lg p-8 shadow-card">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-macri-primary/10 flex-shrink-0">
              <FileText className="w-8 h-8 text-macri-primary" />
            </div>
            <div>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                I've designed an <strong className="text-macri-primary">Engagement Tracker</strong> concept that helps Customer Success and account teams keep a clean, shared view of customer objectives, milestones, risks, and executive communication. It's built to plug into real-world workflows and tools, not to sit on a shelf.
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border">
                  <Icon className="w-5 h-5 text-macri-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-macri-primary-subtle rounded-lg p-6 border-l-4 border-macri-primary">
            <p className="text-lg font-semibold text-macri-dark mb-4">
              Interested in how this could work for your team?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg"
                className="bg-macri-primary hover:bg-macri-primary-dark text-white"
              >
                <Link to="/contact">
                  Let's Talk Customer Success
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-macri-primary text-macri-primary hover:bg-macri-primary/10"
              >
                <Link to="/portfolio">
                  View More of My Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
