import React from 'react';
import { HeroSection } from '@/components/portfolio/solution-engineering/HeroSection';
import { PhilosophySection } from '@/components/portfolio/solution-engineering/PhilosophySection';
import { FrameworkSection } from '@/components/portfolio/solution-engineering/FrameworkSection';
import { UseCasesSection } from '@/components/portfolio/solution-engineering/UseCasesSection';
import { LeadershipSection } from '@/components/portfolio/solution-engineering/LeadershipSection';
import { ExpertiseSection } from '@/components/portfolio/solution-engineering/ExpertiseSection';
import { MetricsSection } from '@/components/portfolio/solution-engineering/MetricsSection';
import { TestimonialsSection } from '@/components/portfolio/solution-engineering/TestimonialsSection';
import { FinalCTA } from '@/components/portfolio/solution-engineering/FinalCTA';
import { SEOHead } from '@/components/layout/SEOHead';

const SolutionEngineering = () => {
  return (
    <>
      <SEOHead 
        title="Solution Engineering & Leadership | Mike Macri"
        description="Innovating at the intersection of technology, strategy, and customer outcomes. Leading solution engineering teams that design and deliver enterprise-scale solutions with measurable business impact."
        keywords="solution engineering leadership, ServiceNow IRM, PolicyHub, VMware SDDC, technical strategy, platform innovation, enterprise architecture"
      />
      <div className="min-h-screen bg-background">
        <HeroSection />
        <PhilosophySection />
        <FrameworkSection />
        <UseCasesSection />
        <LeadershipSection />
        <ExpertiseSection />
        <MetricsSection />
        <TestimonialsSection />
        <FinalCTA />
      </div>
    </>
  );
};

export default SolutionEngineering;
