
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigationItems } from './NavigationConfig';
import { AdminRoute, ProtectedRoute } from './ProtectedRoutes';

// Page components
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import Blog from '@/pages/Blog';
import Auth from '@/pages/Auth';
import Admin from '@/pages/Admin';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';
import Layout from '@/components/Layout';

export const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const { getHomeNavItems, getPortfolioNavItems, getBlogNavItems } = useNavigationItems();
  
  return (
    <Routes>
      <Route path="/" element={
        <Layout 
          navItems={getHomeNavItems()} 
          profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
          name="Mike Macri"
        >
          <Home />
        </Layout>
      } />
      <Route path="/portfolio" element={
        <Layout 
          navItems={getPortfolioNavItems()} 
          profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
          name="Mike Macri"
        >
          <Portfolio />
        </Layout>
      } />
      <Route path="/blog" element={
        <Layout 
          navItems={getBlogNavItems()} 
          profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
          name="Mike Macri"
        >
          <Blog />
        </Layout>
      } />
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/reset" element={<Auth />} />
      <Route path="/admin-dashboard" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="/admin" element={
        <AdminRoute>
          <Admin />
        </AdminRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
