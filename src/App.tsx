
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isAdmin, signOut } = useAuth();
  
  // Navigation items for the sidebar
  const getHomeNavItems = () => {
    const baseItems = [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Skills & Methods", href: "#skills" },
      { label: "Interests", href: "#interests" },
      { label: "Awards & Certs", href: "#awards" },
      { label: "Project Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
    ];
    
    if (user) {
      return [
        ...baseItems,
        ...(isAdmin ? [{ label: "Admin Dashboard", href: "/admin" }] : []),
        { label: "Logout", onClick: signOut },
      ];
    } else {
      return [
        ...baseItems,
        { label: "Login", href: "/auth" },
      ];
    }
  };

  const getPortfolioNavItems = () => {
    const baseItems = [
      { label: "Index of Projects", href: "#index-of-projects" },
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
    ];
    
    if (user) {
      return [
        ...baseItems,
        ...(isAdmin ? [{ label: "Admin Dashboard", href: "/admin" }] : []),
        { label: "Logout", onClick: signOut },
      ];
    } else {
      return [
        ...baseItems,
        { label: "Login", href: "/auth" },
      ];
    }
  };

  const getBlogNavItems = () => {
    const baseItems = [
      { label: "Recent Posts", href: "#recent-posts" },
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
    ];
    
    if (user) {
      if (isAdmin) {
        return [
          ...baseItems,
          { label: "Create Post", href: "#create-post" },
          { label: "Admin Dashboard", href: "/admin" },
          { label: "Logout", onClick: signOut },
        ];
      } else {
        return [
          ...baseItems,
          { label: "Logout", onClick: signOut },
        ];
      }
    } else {
      return [
        ...baseItems,
        { label: "Login", href: "/auth" },
      ];
    }
  };

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Add FontAwesome script to document
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://use.fontawesome.com/releases/v6.3.0/js/all.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
