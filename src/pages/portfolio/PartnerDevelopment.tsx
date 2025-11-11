import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/portfolio/partner-development/HeroSection';
import { PhilosophySection } from '@/components/portfolio/partner-development/PhilosophySection';
import { FrameworkSection } from '@/components/portfolio/partner-development/FrameworkSection';
import { CaseStudiesSection } from '@/components/portfolio/partner-development/CaseStudiesSection';
import { EnablementSection } from '@/components/portfolio/partner-development/EnablementSection';
import { ToolsSection } from '@/components/portfolio/partner-development/ToolsSection';
import { MetricsSection } from '@/components/portfolio/partner-development/MetricsSection';
import { TestimonialsSection } from '@/components/portfolio/partner-development/TestimonialsSection';
import { FinalCTA } from '@/components/portfolio/partner-development/FinalCTA';

const PartnerDevelopment = () => {
  return (
    <>
      <Helmet>
        <title>Partner Development & Strategic Alliances - Mike Macri</title>
        <meta 
          name="description" 
          content="Building strategic alliances and partner ecosystems that drive growth and innovation. Expert partner development leadership with proven global ecosystem experience at VMware and ServiceNow." 
        />
        <meta 
          name="keywords" 
          content="Partner Development, Strategic Alliances, Ecosystem Growth, Channel Strategy, Go-to-Market Enablement, Partner Success, Business Development" 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeroSection />
        <PhilosophySection />
        <FrameworkSection />
        <CaseStudiesSection />
        <EnablementSection />
        <ToolsSection />
        <MetricsSection />
        <TestimonialsSection />
        <FinalCTA />
      </div>
    </>
  );
};

export default PartnerDevelopment;
