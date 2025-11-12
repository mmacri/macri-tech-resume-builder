import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Server, Users, Target } from 'lucide-react';

export const UseCasesSection = () => {
  const useCases = [
    {
      icon: Shield,
      title: "Implementing Common Controls in ServiceNow IRM",
      tags: ["ServiceNow", "GRC", "Architecture"],
      context: "Multiple compliance frameworks (NIST, SOC 2, PCI, SOX) managed separately caused duplication of control testing and audit fatigue.",
      challenge: "Redundant controls and manual evidence tracking made scaling impossible.",
      action: "Architected and deployed a Common Control Framework in ServiceNow IRM — enabling inheritance across policies, entities, and assessments.",
      outcome: "Achieved 45% share process identification, 50% faster audit cycles, and created a reusable blueprint now adopted by enterprise GRC programs globally."
    },
    {
      icon: FileText,
      title: "Building ServiceNow's New 'PolicyHub' Module",
      tags: ["ServiceNow", "Product Innovation", "Policy Management"],
      context: "Organizations lacked a central way to create, manage, and distribute policies within ServiceNow.",
      challenge: "Policy management was fragmented across Word docs, SharePoint, and manual review cycles.",
      action: "Designed and built a new module, PolicyHub, connecting policy creation, version control, attestation, and AI-based alignment to regulatory frameworks.",
      outcome: "PolicyHub became a ServiceNow go-to-market asset, accelerating compliance automation and expanding IRM capabilities. Presented the concept and prototype as part of product enablement and executive briefings."
    },
    {
      icon: Server,
      title: "VMware Remote SDDC Deployment at Scale",
      tags: ["VMware", "Infrastructure", "Automation"],
      context: "VMware's SDDC stack required onsite deployment at over 500 retail stores, consuming significant resources.",
      challenge: "Each site demanded physical setup, making scaling and updates impractical.",
      action: "Advocated for and designed a remote, scriptable SDDC deployment capability integrated into the VMware roadmap.",
      outcome: "Reduced deployment time from days to 10 minutes, eliminating onsite visits and creating a repeatable remote provisioning model used company-wide. This became a key differentiator for enterprise modernization and cost reduction."
    },
    {
      icon: Users,
      title: "Building and Leading High-Performance Solution Engineering Teams",
      tags: ["Leadership", "Team Development", "Enablement"],
      context: "Solution engineering organizations needed to scale rapidly while maintaining technical excellence and customer satisfaction across multiple regions.",
      challenge: "Inconsistent solution approaches, knowledge gaps, and varying demonstration quality across team members impacted deal cycles and customer confidence.",
      action: "Established team development frameworks including technical training programs, solution playbooks, and mentorship initiatives. Created standardized discovery methodologies and demo best practices that elevated the entire organization.",
      outcome: "Built cohesive, high-performing teams that consistently exceeded targets. Improved solution engineer effectiveness by 40%, reduced onboarding time by 50%, and established repeatable success patterns across customer engagements."
    },
    {
      icon: Target,
      title: "Leading Enterprise Customer Engagements from Discovery to Delivery",
      tags: ["Engagement Leadership", "Customer Success", "Enterprise Solutions"],
      context: "Complex enterprise deals required coordinated technical leadership across discovery, architecture design, proof of concept, and implementation phases.",
      challenge: "Multi-stakeholder environments with competing priorities, technical complexity, and tight timelines demanded strategic orchestration and executive alignment.",
      action: "Led end-to-end engagement delivery by conducting structured discovery sessions, designing tailored solution architectures, demonstrating value through executive storytelling, and coordinating cross-functional teams through implementation.",
      outcome: "Successfully delivered $50M+ in influenced revenue through strategic engagements. Achieved 95% customer satisfaction scores and established long-term trusted advisor relationships that led to expansion opportunities and reference accounts."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          Innovations that Transformed How Enterprises Operate
        </h2>

        <div className="space-y-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card key={index} className="border-macri-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-macri-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-macri-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-saira text-xl font-bold text-foreground mb-3">
                        {useCase.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {useCase.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="bg-macri-primary/10 text-macri-primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Context</h4>
                    <p className="text-muted-foreground">{useCase.context}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{useCase.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Action</h4>
                    <p className="text-muted-foreground">{useCase.action}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Outcome</h4>
                    <p className="text-muted-foreground font-medium">{useCase.outcome}</p>
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
