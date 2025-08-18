
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigationItems } from './NavigationConfig';

// Page components
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import Blog from '@/pages/Blog';
import Resume from '@/pages/Resume';
import NotFound from '@/pages/NotFound';
import Contact from '@/pages/Contact';
import Layout from '@/components/Layout';

export const AppRoutes: React.FC = () => {
  const { getHomeNavItems, getPortfolioNavItems, getBlogNavItems, getResumeNavItems } = useNavigationItems();
  
  return (
    <Routes>
      <Route path="/" element={
        <Layout 
          navItems={getHomeNavItems()} 
          profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
          name="Mike Macri M.B.A."
        >
          <Home />
        </Layout>
      } />
      <Route path="/portfolio" element={
        <Layout 
          navItems={getPortfolioNavItems()} 
          profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
          name="Mike Macri M.B.A."
        >
          <Portfolio />
        </Layout>
      } />
      <Route path="/blog" element={
        <Layout 
          navItems={getBlogNavItems()} 
          profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
          name="Mike Macri M.B.A."
        >
          <Blog />
        </Layout>
      } />
      <Route path="/resume" element={
        <Layout 
          navItems={getResumeNavItems()} 
          profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
          name="Mike Macri M.B.A."
          highlightResume={true}
        >
          <Resume />
        </Layout>
      } />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
