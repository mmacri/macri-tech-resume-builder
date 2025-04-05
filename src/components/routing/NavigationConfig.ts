
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => Promise<void>;
  external?: boolean;
}

export const useNavigationItems = () => {
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

  return {
    getHomeNavItems,
    getPortfolioNavItems,
    getBlogNavItems
  };
};
