import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '@/components/Layout';

const Home = lazy(() => import('@/pages/Home'));
const Leadership = lazy(() => import('@/pages/Leadership'));
const ExperienceImpact = lazy(() => import('@/pages/ExperienceImpact'));
const SelectedWork = lazy(() => import('@/pages/SelectedWork'));
const Resume = lazy(() => import('@/pages/Resume'));
const MyWebsites = lazy(() => import('@/pages/MyWebsites'));
const Contact = lazy(() => import('@/pages/Contact'));
const About = lazy(() => import('@/pages/About'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-20 text-center text-gray-600" role="status">Loading page…</div>}>
      <Routes>
        {/* Primary navigation routes */}
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<ExperienceImpact />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/selected-work" element={<SelectedWork />} />
        <Route path="/portfolio" element={<Navigate to="/selected-work" replace />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<MyWebsites />} />
        <Route path="/my-websites" element={<Navigate to="/projects" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        
        {/* Portfolio detail pages (linked from Experience & Selected Work) */}
        <Route path="/portfolio/customer-success" element={<Navigate to="/selected-work#customer-success-model" replace />} />
        <Route path="/portfolio/partner-development" element={<Navigate to="/selected-work#partner-cosell" replace />} />
        <Route path="/portfolio/compliance" element={<Navigate to="/selected-work#policy-hub" replace />} />
        <Route path="/portfolio/solution-engineering" element={<Navigate to="/selected-work" replace />} />
        <Route path="/portfolio/momentum-edge" element={<Navigate to="/projects#momentum-edge" replace />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
