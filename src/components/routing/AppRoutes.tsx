
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Page components
import Home from '@/pages/Home';
import About from '@/pages/About';
import Resume from '@/pages/Resume';
import Portfolio from '@/pages/Portfolio';
import CustomerSuccess from '@/pages/portfolio/CustomerSuccess';
import MyWebsites from '@/pages/MyWebsites';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Layout from '@/components/Layout';

export const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/customer-success" element={<CustomerSuccess />} />
        <Route path="/my-websites" element={<MyWebsites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
