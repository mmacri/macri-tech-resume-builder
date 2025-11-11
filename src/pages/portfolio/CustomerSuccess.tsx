import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/portfolio/customer-success/HeroSection';
import { PhilosophySection } from '@/components/portfolio/customer-success/PhilosophySection';
import { FrameworkSection } from '@/components/portfolio/customer-success/FrameworkSection';
import { CaseStudiesSection } from '@/components/portfolio/customer-success/CaseStudiesSection';
import { TeamEmpowermentSection } from '@/components/portfolio/customer-success/TeamEmpowermentSection';
import { ToolsSection } from '@/components/portfolio/customer-success/ToolsSection';
import { EngagementTrackerSection } from '@/components/portfolio/customer-success/EngagementTrackerSection';
import { TestimonialsSection } from '@/components/portfolio/customer-success/TestimonialsSection';
import { FinalCTA } from '@/components/portfolio/customer-success/FinalCTA';

const CustomerSuccess = () => {
  return (
    <>
      <Helmet>
        <title>Customer Success & Retention - Mike Macri</title>
        <meta 
          name="description" 
          content="Empowering Customer Success teams to deliver real business outcomes. Strategic customer success leadership focused on retention, expansion, and advocacy in enterprise environments." 
        />
        <meta 
          name="keywords" 
          content="Customer Success, Customer Retention, Customer Outcomes, SaaS, Enterprise Customer Success, CSM, Customer Success Management" 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeroSection />
        <PhilosophySection />
        <FrameworkSection />
        <CaseStudiesSection />
        <TeamEmpowermentSection />
        <ToolsSection />
        <EngagementTrackerSection />
        <TestimonialsSection />
        <FinalCTA />
      </div>
    </>
  );
};

export default CustomerSuccess;
