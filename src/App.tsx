import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";

const queryClient = new QueryClient();

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => Promise<void>;
  external?: boolean;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="p-8 flex justify-center">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/auth?redirectTo=/admin-dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, isLoading } = useAuth();
  
  if (isLoading) return <div className="p-8 flex justify-center">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/auth?redirectTo=/admin-dashboard" replace />;
  }
  
  if (!isAdmin) {
    toast.error("You don't have permission to access the admin area");
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, isAdmin, signOut } = useAuth();
  
  const getHomeNavItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Skills & Methods", href: "#skills" },
      { label: "Interests", href: "#interests" },
      { label: "Awards & Certs", href: "#awards" },
      { label: "Project Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Admin Dashboard", href: "/admin-dashboard" }, // Always include Admin Dashboard
    ];
    
    if (user) {
      return [
        ...baseItems,
        { label: "Logout", onClick: signOut, href: "#" },
      ];
    } else {
      return [
        ...baseItems,
        { label: "Login", href: "/auth" },
      ];
    }
  };

  const getPortfolioNavItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      { label: "Index of Projects", href: "#index-of-projects" },
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Admin Dashboard", href: "/admin-dashboard" }, // Always include Admin Dashboard
    ];
    
    if (user) {
      return [
        ...baseItems,
        { label: "Logout", onClick: signOut, href: "#" },
      ];
    } else {
      return [
        ...baseItems,
        { label: "Login", href: "/auth" },
      ];
    }
  };

  const getBlogNavItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      { label: "Recent Posts", href: "#recent-posts" },
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Admin Dashboard", href: "/admin-dashboard" }, // Always include Admin Dashboard
    ];
    
    if (user) {
      if (isAdmin) {
        return [
          ...baseItems,
          { label: "Create Post", href: "#create-post" },
          { label: "Logout", onClick: signOut, href: "#" },
        ];
      } else {
        return [
          ...baseItems,
          { label: "Logout", onClick: signOut, href: "#" },
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

const App = () => {
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
