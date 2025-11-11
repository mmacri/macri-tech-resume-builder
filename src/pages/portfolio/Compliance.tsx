import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/portfolio/compliance/HeroSection';
import { PhilosophySection } from '@/components/portfolio/compliance/PhilosophySection';
import { FrameworkSection } from '@/components/portfolio/compliance/FrameworkSection';
import { CaseStudiesSection } from '@/components/portfolio/compliance/CaseStudiesSection';
import { TechnologySection } from '@/components/portfolio/compliance/TechnologySection';
import { ExpertiseSection } from '@/components/portfolio/compliance/ExpertiseSection';
import { LeadershipSection } from '@/components/portfolio/compliance/LeadershipSection';
import { MetricsSection } from '@/components/portfolio/compliance/MetricsSection';
import { TestimonialsSection } from '@/components/portfolio/compliance/TestimonialsSection';
import { FinalCTA } from '@/components/portfolio/compliance/FinalCTA';

const Compliance = () => {
  return (
    <>
      <Helmet>
        <title>Compliance & Risk Leadership - Mike Macri</title>
        <meta 
          name="description" 
          content="Transforming compliance into a competitive advantage. Strategic GRC leadership focused on ServiceNow IRM, AI governance, risk management, and policy automation to drive business confidence and growth." 
        />
        <meta 
          name="keywords" 
          content="Compliance Management, GRC Automation, ServiceNow IRM, Common Controls, AI Governance, Risk Management, Policy Automation, NERC CIP, ISO 27001" 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeroSection />
        <PhilosophySection />
        <FrameworkSection />
        <CaseStudiesSection />
        <TechnologySection />
        <ExpertiseSection />
        <LeadershipSection />
        <MetricsSection />
        <TestimonialsSection />
        <FinalCTA />
      </div>
    </>
  );
};

export default Compliance;
