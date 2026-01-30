import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page components
import Home from '@/pages/Home';
import ExperienceImpact from '@/pages/ExperienceImpact';
import SelectedWork from '@/pages/SelectedWork';
import Resume from '@/pages/Resume';
import MyWebsites from '@/pages/MyWebsites';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Layout from '@/components/Layout';

// Portfolio detail pages (accessible via Selected Work)
import CustomerSuccess from '@/pages/portfolio/CustomerSuccess';
import PartnerDevelopment from '@/pages/portfolio/PartnerDevelopment';
import Compliance from '@/pages/portfolio/Compliance';
import SolutionEngineering from '@/pages/portfolio/SolutionEngineering';
import MomentumEdge from '@/pages/portfolio/MomentumEdge';

export const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {/* Primary navigation routes */}
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<ExperienceImpact />} />
        <Route path="/selected-work" element={<SelectedWork />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/my-websites" element={<MyWebsites />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Portfolio detail pages (linked from Experience & Selected Work) */}
        <Route path="/portfolio/customer-success" element={<CustomerSuccess />} />
        <Route path="/portfolio/partner-development" element={<PartnerDevelopment />} />
        <Route path="/portfolio/compliance" element={<Compliance />} />
        <Route path="/portfolio/solution-engineering" element={<SolutionEngineering />} />
        <Route path="/portfolio/momentum-edge" element={<MomentumEdge />} />
        
        {/* Redirects for old routes */}
        <Route path="/about" element={<Navigate to="/experience" replace />} />
        <Route path="/portfolio" element={<Navigate to="/selected-work" replace />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
