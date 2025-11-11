import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: 'Common Control Framework Implementation',
      context: 'Multiple compliance teams working in silos across NERC, SOC, and internal standards.',
      challenge: 'Duplication of controls, inconsistent reporting, and audit fatigue.',
      action: 'Led the design of a Common Control Framework within ServiceNow IRM. Consolidated redundant controls, mapped regulatory overlap, and implemented automated testing workflows.',
      outcome: 'Achieved 90% control reuse, reduced audit prep time by 50%, and improved reporting accuracy across GRC teams.',
      tags: ['ServiceNow IRM', 'Common Controls', 'NERC']
    },
    {
      title: 'Risk and Compliance Dashboard Modernization',
      context: 'Leadership lacked a real-time view of compliance health.',
      challenge: 'Fragmented data across tools prevented consolidated risk visualization.',
      action: 'Built a GRC dashboard that unified policies, risks, and compliance indicators into a single lens. Integrated data from QRadar, Tenable, and Tripwire.',
      outcome: 'Leadership gained real-time situational awareness, enabling faster decision-making and prioritization of risk mitigation actions.',
      tags: ['Dashboards', 'Risk Visualization', 'Integration']
    },
    {
      title: 'AI Governance and Policy Enablement',
      context: 'A global organization exploring AI solutions lacked a governance structure.',
      challenge: 'Regulatory uncertainty and lack of internal oversight on AI/ML model ethics and usage.',
      action: 'Designed an AI Policy and Governance Framework that established accountability, transparency, and risk categorization for AI systems.',
      outcome: 'Provided executive visibility into AI system risks, established ethical standards, and aligned innovation with compliance.',
      tags: ['AI Governance', 'Policy Framework', 'Ethics']
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          Examples of Compliance Leadership in Action
        </h2>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-card-hover transition-all">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-macri-primary mb-4">
                  {study.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Context</h4>
                  <p className="text-muted-foreground">{study.context}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                  <p className="text-muted-foreground">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Action</h4>
                  <p className="text-muted-foreground">{study.action}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Outcome</h4>
                  <p className="text-muted-foreground font-medium">{study.outcome}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
