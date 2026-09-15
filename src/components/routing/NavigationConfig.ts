
import React from 'react';

interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
}

export const useNavigationItems = () => {
  // Memoize navigation items to prevent recreation on every render
  const getHomeNavItems = React.useCallback((): NavItem[] => {
    return [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Skills & Methods", href: "#skills" },
      { label: "Interests", href: "#interests" },
      { label: "Awards & Certs", href: "#awards" },
      { label: "Selected Work", href: "/selected-work" },
      { label: "MEC", href: "/portfolio/momentum-edge" },
      { label: "Projects", href: "/projects" },
      { label: "Resume", href: "/resume" },
      { label: "Let's Connect", href: "/contact" },
    ];
  }, []);

  const getPortfolioNavItems = React.useCallback((): NavItem[] => {
    return [
      { label: "Index of Projects", href: "#index-of-projects" },
      { label: "MEC", href: "/portfolio/momentum-edge" },
      { label: "Projects", href: "/projects" },
      { label: "Overview", href: "/" },
      { label: "Resume", href: "/resume" },
      { label: "Let's Connect", href: "/contact" },
    ];
  }, []);

  const getBlogNavItems = React.useCallback((): NavItem[] => {
    return [
      { label: "Recent Posts", href: "#recent-posts" },
      { label: "Overview", href: "/" },
      { label: "Selected Work", href: "/selected-work" },
      { label: "Resume", href: "/resume" },
      { label: "Let's Connect", href: "/contact" },
    ];
  }, []);

  const getResumeNavItems = React.useCallback((): NavItem[] => {
    return [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Skills", href: "#skills" },
      { label: "Interests", href: "#interests" },
      { label: "Awards", href: "#awards" },
      { label: "Overview", href: "/" },
      { label: "Selected Work", href: "/selected-work" },
      { label: "Let's Connect", href: "/contact" },
    ];
  }, []);

  return {
    getHomeNavItems,
    getPortfolioNavItems,
    getBlogNavItems,
    getResumeNavItems
  };
};
