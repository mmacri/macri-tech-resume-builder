import React from 'react';
import { LayoutDashboard, BookOpen, MessageSquare, Network } from 'lucide-react';

export const TeamEmpowermentSection = () => {
  const empowermentAreas = [
    {
      icon: LayoutDashboard,
      text: 'Designing engagement trackers and dashboards that show account health, upcoming milestones, and risks in a way that\'s easy to act on.'
    },
    {
      icon: BookOpen,
      text: 'Creating repeatable playbooks for onboarding, adoption, QBRs, and renewal preparation that CSMs can adapt for their accounts.'
    },
    {
      icon: MessageSquare,
      text: 'Coaching teams on how to move conversations from features to business outcomes and risk/reward trade-offs.'
    },
    {
      icon: Network,
      text: 'Partnering with sales, product, and leadership to keep Customer Success aligned to go-to-market strategy and customer expectations.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-macri-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          Empowering Customer Success Teams to Do Their Best Work
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              I don't just design frameworks — I help teams <strong className="text-macri-primary">use</strong> them. A big part of my work is giving Customer Success managers, technical account managers, and account teams the clarity and tools they need to be effective.
            </p>
            
            <p className="text-lg text-foreground leading-relaxed mb-8">
              Ways I've supported teams include:
            </p>

            <div className="space-y-4">
              {empowermentAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-macri-primary" />
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {area.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-lg p-6 shadow-card">
            <div className="bg-macri-primary/5 rounded-lg p-6 border border-macri-primary/20">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <h3 className="font-saira text-xl font-bold text-macri-dark">Engagement Tracker</h3>
                <span className="text-xs text-muted-foreground">Live View</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-background rounded p-3 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Account Health</span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-macri-success/10 text-macri-success">
                      Green
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-macri-success" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="bg-background rounded p-3 border border-border">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Upcoming Milestones</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">Executive QBR</span>
                      <span className="text-muted-foreground">14 days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">Renewal Date</span>
                      <span className="text-muted-foreground">90 days</span>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded p-3 border border-border">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Key Stakeholders</div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-macri-primary/20 border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-semibold text-macri-primary">U{i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
