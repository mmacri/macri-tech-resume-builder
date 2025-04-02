
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Navigation items for the sidebar
const homeNavItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills & Methods", href: "#skills" },
  { label: "Interests", href: "#interests" },
  { label: "Awards & Certs", href: "#awards" },
  { label: "Project Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
];

const portfolioNavItems = [
  { label: "Index of Projects", href: "#index-of-projects" },
  { label: "Sentiment Analyzer", href: "#sentiment-analyzer" },
  { label: "Financial Dashboard", href: "#financial-dashboard" },
  { label: "AI/ML Policies", href: "#ai-ml-policies" },
  { label: "Policy Registrar", href: "#policy-registrar" },
  { label: "Customer Engagement Deliverables", href: "#customer-engagement-deliverables" },
  { label: "Portfolio Website", href: "#portfolio-website" },
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

const blogNavItems = [
  { label: "Recent Posts", href: "#recent-posts" },
  { label: "Create Post", href: "#create-post" },
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
];

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
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout 
                navItems={homeNavItems} 
                profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                name="Mike Macri"
              >
                <Home />
              </Layout>
            } />
            <Route path="/portfolio" element={
              <Layout 
                navItems={portfolioNavItems} 
                profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                name="Mike Macri"
              >
                <Portfolio />
              </Layout>
            } />
            <Route path="/blog" element={
              <Layout 
                navItems={blogNavItems} 
                profileImage="/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png"
                name="Mike Macri"
              >
                <Blog />
              </Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
