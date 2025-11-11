import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: 'Scaling Global Partner Enablement at VMware',
      context: "VMware's partner ecosystem spanned system integrators, cloud providers, and resellers.",
      challenge: 'Inconsistent partner enablement and messaging limited sales readiness across regions.',
      action: 'Developed a unified enablement framework with self-service resources, co-branding guidelines, and outcome-based certifications.',
      outcome: 'Improved partner activation by 40%, reduced onboarding time, and increased co-sell pipeline globally.',
      tags: ['VMware', 'Enablement', 'Global Scale']
    },
    {
      title: 'Building Strategic Alliances for ServiceNow Growth',
      context: 'ServiceNow sought to expand its reach in the enterprise and public-sector markets through strategic alliances.',
      challenge: "Partners lacked a structured way to align with ServiceNow's value proposition and solution outcomes.",
      action: 'Designed a Partner Success and Engagement Framework that defined enablement stages, joint marketing, and co-delivery models.',
      outcome: 'Established consistent partner engagement worldwide and drove measurable revenue impact through aligned customer success outcomes.',
      tags: ['ServiceNow', 'Strategic Alliances', 'Framework']
    },
    {
      title: 'Co-Innovation with Technology Partners',
      context: 'Joint customer opportunities required integrated solutions with partner technologies.',
      challenge: 'Fragmented messaging and lack of shared roadmap visibility.',
      action: 'Created a joint innovation and integration model that paired product teams, co-marketing, and go-to-market initiatives.',
      outcome: 'Accelerated partner integrations, improved differentiation in competitive deals, and strengthened ecosystem value.',
      tags: ['Co-Innovation', 'Integration', 'GTM']
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          Examples of Partner Development in Action
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
