import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Target, Lightbulb, TrendingUp, Users, FileCheck, 
  ExternalLink, CheckCircle, ArrowRight, Briefcase, Award
} from 'lucide-react';
import mec2SkillsScreenshot from '@/assets/mec2-skills-screenshot.png';

const MomentumEdge = () => {
  const services = [
    {
      icon: Shield,
      title: 'Compliance & GRC',
      description: 'NERC/CIP, HIPAA, PCI, SOC 2, and AI governance frameworks tailored for regulated industries.',
      tags: ['NERC/CIP', 'HIPAA', 'PCI', 'SOC 2']
    },
    {
      icon: Target,
      title: 'Cyber Risk Management',
      description: 'Risk assessments, vulnerability management, and security roadmaps for critical infrastructure.',
      tags: ['Risk Assessment', 'Security Roadmaps', 'Controls']
    },
    {
      icon: Lightbulb,
      title: 'AI Governance & Enablement',
      description: 'Responsible AI implementation, governance frameworks, and AI-driven process optimization.',
      tags: ['AI Strategy', 'Governance', 'Automation']
    },
    {
      icon: FileCheck,
      title: 'Policy Design & Optimization',
      description: 'Controlled documentation, policy frameworks, and process improvement for audit readiness.',
      tags: ['Policy Design', 'Process Optimization', 'Documentation']
    },
    {
      icon: Users,
      title: 'Executive Advisory',
      description: 'Virtual CIO/CISO guidance, strategic roadmaps, and cross-functional leadership alignment.',
      tags: ['vCIO', 'vCISO', 'Strategic Planning']
    },
    {
      icon: Briefcase,
      title: 'ServiceNow GRC/IRM',
      description: 'Implementation, optimization, and automation of GRC workflows on the ServiceNow platform.',
      tags: ['ServiceNow', 'IRM', 'GRC Automation']
    }
  ];

  const clientTypes = [
    { name: 'Healthcare Practices', description: 'HIPAA compliance, EHR optimization, telehealth security' },
    { name: 'Utilities & Critical Infrastructure', description: 'NERC/CIP compliance, SCADA security, operational resilience' },
    { name: 'Municipal Organizations', description: 'IT governance, citizen services, cybersecurity modernization' },
    { name: 'Growing Enterprises', description: 'Scalable IT strategy, audit preparation, vendor management' }
  ];

  const caseStudies = [
    {
      title: 'Utility NERC/CIP Compliance Transformation',
      context: 'Regional utility facing upcoming NERC/CIP audit with gaps in documentation and evidence management.',
      challenge: 'Inconsistent controls, fragmented evidence collection, and lack of audit-ready documentation.',
      action: 'Delivered comprehensive gap assessment, implemented controlled documentation framework, and established continuous monitoring processes.',
      outcome: 'Achieved audit readiness 6 weeks ahead of schedule with zero critical findings.',
      tags: ['NERC/CIP', 'Utility', 'Audit Readiness']
    },
    {
      title: 'Healthcare IT Security Modernization',
      context: 'Multi-location medical practice expanding services with outdated security controls.',
      challenge: 'HIPAA compliance gaps, legacy systems, and insufficient incident response capabilities.',
      action: 'Designed security architecture, implemented risk management framework, and delivered staff training program.',
      outcome: 'Reduced compliance risk exposure by 70% and enabled secure telehealth expansion.',
      tags: ['Healthcare', 'HIPAA', 'Security']
    },
    {
      title: 'AI Governance Framework Implementation',
      context: 'Enterprise client deploying AI solutions across customer-facing operations.',
      challenge: 'No governance structure for AI decision-making, bias monitoring, or regulatory compliance.',
      action: 'Developed AI governance policy, implemented monitoring controls, and created stakeholder review processes.',
      outcome: 'Established compliant AI operations with transparent decision audit trails.',
      tags: ['AI Governance', 'Policy Design', 'Controls']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Momentum Edge Consulting Case Study - Mike Macri</title>
        <meta 
          name="description" 
          content="Momentum Edge Consulting delivers IT compliance, governance, and AI-driven solutions for healthcare, utilities, and regulated organizations. Principal Consultant Mike Macri." 
        />
        <meta 
          name="keywords" 
          content="IT Consulting, Compliance, NERC/CIP, HIPAA, GRC, AI Governance, ServiceNow, Virtual CIO, Healthcare IT" 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-macri-primary/10 via-background to-macri-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-macri-primary/10 text-macri-primary border-macri-primary/20">
                  Principal Consultant & Founder
                </Badge>
                <h1 className="font-saira font-bold text-4xl lg:text-5xl text-macri-primary mb-6">
                  Momentum Edge Consulting
                </h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  Delivering practical IT, compliance, governance, and AI-driven solutions for 
                  regulated organizations including healthcare practices, utilities, and municipal agencies.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  As Principal Consultant, I lead complex transformation, assessment, and compliance 
                  initiatives as a senior technologist and trusted advisor for clients across 
                  high-stakes operational environments.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-macri-primary hover:bg-macri-primary-dark text-white"
                    asChild
                  >
                    <a href="https://www.momentumedgeconsulting.com" target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/contact">
                      Start a Conversation <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
                  <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2 border-b border-gray-200">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <img
                    src={mec2SkillsScreenshot}
                    alt="Momentum Edge Consulting website"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-macri-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-saira font-bold text-3xl text-macri-primary mb-4">
                Service Offerings
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive consulting services designed for regulated industries and 
                organizations navigating complex compliance landscapes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-macri-primary/10 rounded-lg">
                        <service.icon className="w-6 h-6 text-macri-primary" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Client Types */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-saira font-bold text-3xl text-macri-primary mb-4">
                Industries Served
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Specialized expertise across regulated sectors requiring robust governance and compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientTypes.map((client, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-macri-section-alt rounded-lg">
                  <CheckCircle className="w-6 h-6 text-macri-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{client.name}</h3>
                    <p className="text-muted-foreground">{client.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 bg-macri-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-saira font-bold text-3xl text-macri-primary mb-4">
                Examples of Impact
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Real-world engagements demonstrating measurable results for clients.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {caseStudies.map((study, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {study.tags.map((tag) => (
                        <Badge key={tag} className="bg-macri-primary/10 text-macri-primary border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-macri-primary mb-1">Context</p>
                      <p className="text-sm text-muted-foreground">{study.context}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-macri-primary mb-1">Challenge</p>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-macri-primary mb-1">Action</p>
                      <p className="text-sm text-muted-foreground">{study.action}</p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-macri-primary mb-1">Outcome</p>
                      <p className="text-sm font-semibold text-foreground">{study.outcome}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Areas of Focus */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-saira font-bold text-3xl text-macri-primary mb-4">
                Areas of Focus
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Compliance & Controls', 'Cyber Risk', 'Business Development',
                'Utility & Critical Infrastructure Advisory', 'Healthcare IT',
                'Audit Readiness', 'Policy Design', 'Process Optimization',
                'AI Governance', 'ServiceNow GRC/IRM', 'Strategic Roadmaps',
                'Executive Advisory', 'Partnership Development'
              ].map((area) => (
                <Badge key={area} variant="outline" className="px-4 py-2 text-sm border-macri-primary/30 text-foreground">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Training Resources Section */}
        <section className="py-16 bg-macri-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-saira font-bold text-3xl text-macri-primary mb-4">
                Training & Enablement Platforms
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Custom-built training platforms to help organizations build internal compliance capabilities and audit readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-macri-primary/10 rounded-lg">
                      <Shield className="w-6 h-6 text-macri-primary" />
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">Live Platform</Badge>
                  </div>
                  <CardTitle className="text-xl">CIP Audit Ready Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    A complete training program for power utilities preparing for NERC CIP audits. 
                    Learn the standards, build your evidence system, and practice before auditors arrive.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-macri-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Role-based learning paths tailored to CIP responsibilities</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-macri-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Evidence collection and documentation best practices</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-macri-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Interactive audit simulation exercises</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-macri-primary hover:bg-macri-primary-dark text-white" asChild>
                    <a href="https://mmacri.github.io/cip-audit-ready/" target="_blank" rel="noopener noreferrer">
                      Explore CIP Training <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-macri-primary/10 rounded-lg">
                      <Award className="w-6 h-6 text-macri-primary" />
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">Live Platform</Badge>
                  </div>
                  <CardTitle className="text-xl">Audit 101 - Common Controls Framework</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Master compliance frameworks and audit readiness with structured, role-specific learning paths. 
                    Choose your framework or role, follow 7 proven steps, and build real-world expertise.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-macri-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Multi-framework common controls mapping (NERC CIP, ISO 27001, etc.)</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-macri-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Enablement paths and certification preparation</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-macri-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Progress tracking with badges and completion certificates</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-macri-primary hover:bg-macri-primary-dark text-white" asChild>
                    <a href="https://mmacri.github.io/audit101/" target="_blank" rel="noopener noreferrer">
                      Explore Audit 101 <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white" asChild>
                <a href="/projects">
                  View All Platforms <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-macri-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-saira font-bold text-3xl mb-6">
              Ready to Transform Your Compliance Posture?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how Momentum Edge Consulting can help your organization 
              achieve compliance confidence and operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-macri-primary hover:bg-gray-100"
                asChild
              >
                <a href="https://www.momentumedgeconsulting.com" target="_blank" rel="noopener noreferrer">
                  Visit Momentum Edge <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="/contact">
                  Contact Me <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MomentumEdge;
