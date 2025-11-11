import React from 'react';
import { Building, Shield, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const CaseStudiesSection = () => {
  const caseStudies = [
    {
      icon: Building,
      title: 'Aligning an Enterprise Platform to Executive Outcomes',
      context: 'Global enterprise adopting a strategic SaaS platform across multiple business units.',
      sections: [
        {
          label: 'Challenge',
          text: 'Leadership struggled to see clear outcomes from the investment, and Customer Success activities weren\'t clearly tied to business metrics.'
        },
        {
          label: 'Action',
          text: 'I designed an engagement model and executive-level QBR structure that connected platform capabilities to specific risk, compliance, and operational outcomes. I worked with customer success and account teams to standardize success plans and storytelling.'
        },
        {
          label: 'Outcome',
          text: 'Executives gained a clear line of sight from platform usage to business value, improving renewal confidence and opening the door to multi-year expansion conversations.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Turning Complex Compliance into a Customer Success Advantage',
      context: 'A regulated organization needed to modernize operations while meeting strict compliance and cybersecurity requirements.',
      sections: [
        {
          label: 'Challenge',
          text: 'Customers often saw compliance as a cost center, and it was difficult to articulate how the platform helped them reduce risk and improve resilience.'
        },
        {
          label: 'Action',
          text: 'I helped build a compliance and risk mapping approach that tied platform features to regulatory requirements and operational controls. This framework was embedded into customer success conversations, success plans, and reporting.'
        },
        {
          label: 'Outcome',
          text: 'Customer stakeholders could clearly show regulators and internal leadership how the platform reduced risk and supported compliance, strengthening renewal positioning and enabling further adoption.'
        }
      ]
    },
    {
      icon: Users,
      title: 'Empowering Customer Success Teams with Engagement Playbooks',
      context: 'A customer success organization working with complex enterprise accounts needed more structure in how they engaged, measured health, and communicated value.',
      sections: [
        {
          label: 'Challenge',
          text: 'CSMs were doing good work, but it was inconsistent and hard to scale. Leadership wanted more predictability and clearer insight into account health and risk.'
        },
        {
          label: 'Action',
          text: 'I helped define a Customer Success engagement framework with playbooks for onboarding, adoption, QBRs, and risk management. I paired these with simple dashboards and trackers that made it easy for CSMs and leaders to see where to focus.'
        },
        {
          label: 'Outcome',
          text: 'CSMs had a more consistent way to run accounts, leadership had better visibility into risk and opportunity, and customers experienced a more intentional, outcomes-focused partnership.'
        }
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          Examples of Customer Success in Action
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <Card key={index} className="bg-card hover:shadow-card-hover transition-all duration-300 border-border">
                <CardHeader>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-macri-primary/10 flex-shrink-0">
                      <Icon className="w-6 h-6 text-macri-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-saira text-macri-dark leading-tight">
                    {study.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    {study.context}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {study.sections.map((section, idx) => (
                      <div key={idx}>
                        <Badge variant="outline" className="mb-2 font-semibold">
                          {section.label}
                        </Badge>
                        <p className="text-sm text-foreground leading-relaxed">
                          {section.text}
                        </p>
                      </div>
                    ))}
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
