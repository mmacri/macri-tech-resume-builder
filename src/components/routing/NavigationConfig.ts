
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => Promise<void>;
  external?: boolean;
}

export const useNavigationItems = () => {
  const { user, isAdmin, signOut } = useAuth();
  
  // Memoize admin check to prevent recalculation on every render
  const effectiveIsAdmin = React.useMemo(() => {
    const isKnownAdmin = user?.email === 'mike@mikemacri.com' || user?.email === 'mike@gmail.com';
    return isAdmin || isKnownAdmin;
  }, [isAdmin, user?.email]);
  
  // Memoize navigation items to prevent recreation on every render
  const getHomeNavItems = React.useCallback((): NavItem[] => {
    const baseItems: NavItem[] = [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Skills & Methods", href: "#skills" },
      { label: "Interests", href: "#interests" },
      { label: "Awards & Certs", href: "#awards" },
      { label: "Project Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ];
    
    // Always add admin dashboard link for admin users at the end
    const authItems: NavItem[] = [];
    
    if (user && effectiveIsAdmin) {
      authItems.push({ label: "Admin Dashboard", href: "/admin-dashboard" });
    }
    
    // Always add login/logout at the end
    if (user) {
      authItems.push({ label: "Logout", onClick: signOut, href: "#" });
    } else {
      authItems.push({ label: "Login", href: "/auth" });
    }
    
    return [...baseItems, ...authItems];
  }, [user, effectiveIsAdmin, signOut]);

  const getPortfolioNavItems = React.useCallback((): NavItem[] => {
    const baseItems: NavItem[] = [
      { label: "Index of Projects", href: "#index-of-projects" },
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ];
    
    // Always add admin dashboard link for admin users at the end
    const authItems: NavItem[] = [];
    
    if (user && effectiveIsAdmin) {
      authItems.push({ label: "Admin Dashboard", href: "/admin-dashboard" });
    }
    
    // Always add login/logout at the end
    if (user) {
      authItems.push({ label: "Logout", onClick: signOut, href: "#" });
    } else {
      authItems.push({ label: "Login", href: "/auth" });
    }
    
    return [...baseItems, ...authItems];
  }, [user, effectiveIsAdmin, signOut]);

  const getBlogNavItems = React.useCallback((): NavItem[] => {
    const baseItems: NavItem[] = [
      { label: "Recent Posts", href: "#recent-posts" },
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ];
    
    // Always add admin dashboard link for admin users at the end
    const authItems: NavItem[] = [];
    
    if (user && effectiveIsAdmin) {
      authItems.push({ label: "Admin Dashboard", href: "/admin-dashboard" });
      
      // Only add Create Post for admins
      authItems.push({ label: "Create Post", href: "#create-post" });
    }
    
    // Always add login/logout at the end
    if (user) {
      authItems.push({ label: "Logout", onClick: signOut, href: "#" });
    } else {
      authItems.push({ label: "Login", href: "/auth" });
    }
    
    return [...baseItems, ...authItems];
  }, [user, effectiveIsAdmin, signOut]);

  const getResumeNavItems = React.useCallback((): NavItem[] => {
    const baseItems: NavItem[] = [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Skills", href: "#skills" },
      { label: "Interests", href: "#interests" },
      { label: "Awards", href: "#awards" },
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ];
    
    // Always add admin dashboard link for admin users at the end
    const authItems: NavItem[] = [];
    
    if (user && effectiveIsAdmin) {
      authItems.push({ label: "Admin Dashboard", href: "/admin-dashboard" });
    }
    
    // Always add login/logout at the end
    if (user) {
      authItems.push({ label: "Logout", onClick: signOut, href: "#" });
    } else {
      authItems.push({ label: "Login", href: "/auth" });
    }
    
    return [...baseItems, ...authItems];
  }, [user, effectiveIsAdmin, signOut]);

  return {
    getHomeNavItems,
    getPortfolioNavItems,
    getBlogNavItems,
    getResumeNavItems
  };
};
