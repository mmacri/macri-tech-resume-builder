import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

// Lightweight SEO head manager without external providers
export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Mike Macri | Technology & Customer Success Engineering Leader',
  description = 'Mike Macri is a Customer Success Engineering leader at GitLab, building technical teams, coverage models, and the operating systems that make post-sales technical work visible and defensible.',
  keywords = 'Mike Macri, GitLab, customer success engineering, technical customer success, DevSecOps, AI adoption, technical leadership, MBA',
  image = 'https://mikemacri.com/og-image.png',
  url = typeof window !== 'undefined' ? window.location.href : 'https://mikemacri.com',
  type = 'website',
  noIndex = false,
}) => {
  useEffect(() => {
    // Helper: set or create meta tag
    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
        document.head.appendChild(el);
      } else {
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
      }
    };

    // Title
    const fullTitle = title.includes('Mike Macri') || title.includes('Michael Macri') ? title : `${title} | Mike Macri`;
    document.title = fullTitle;

    // Basic Meta
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    setMeta('meta[name="author"]', { name: 'author', content: 'Mike Macri' });
    setMeta('meta[name="robots"]', { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' });

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Open Graph
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'Mike Macri — Technology and Customer Success Engineering Leader' });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Mike Macri Portfolio' });

    // Twitter
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:url"]', { name: 'twitter:url', content: url });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    setMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: 'Mike Macri — Technology and Customer Success Engineering Leader' });

    // JSON-LD Structured Data
    const scriptId = 'seo-json-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      (scriptEl as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    const personDescription = 'Technology and Customer Success Engineering leader currently serving as Senior Manager, Customer Success Engineering – AMER at GitLab, with experience across technical teams, customer programs, partner ecosystems, and enterprise transformation.';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://mikemacri.com/#website',
          url: 'https://mikemacri.com/',
          name: 'Mike Macri | Technology & Customer Success Engineering Leader',
          publisher: { '@id': 'https://mikemacri.com/#person' },
        },
        {
          '@type': 'Person',
          '@id': 'https://mikemacri.com/#person',
          name: 'Michael Macri',
          alternateName: 'Mike Macri',
          honorificSuffix: 'MBA',
          jobTitle: 'Senior Manager, Customer Success Engineering – AMER',
          description: personDescription,
          url: 'https://mikemacri.com/',
          image: 'https://mikemacri.com/lovable-uploads/fcc7d1bc-80d5-4dba-b7fa-5199edff35ec.png',
          sameAs: ['https://www.linkedin.com/in/mikemacri', 'https://github.com/mmacri'],
          worksFor: { '@type': 'Organization', name: 'GitLab', url: 'https://about.gitlab.com/' },
          alumniOf: { '@type': 'CollegeOrUniversity', name: 'Xavier University' },
          knowsAbout: ['Customer Success Engineering', 'Technical leadership', 'Technical Customer Success', 'DevSecOps', 'AI adoption', 'Solution Engineering', 'Partner ecosystems', 'Customer health'],
        },
        {
          '@type': type === 'profile' ? 'ProfilePage' : 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: fullTitle,
          description,
          isPartOf: { '@id': 'https://mikemacri.com/#website' },
          about: { '@id': 'https://mikemacri.com/#person' },
        },
      ],
    };
    (scriptEl as HTMLScriptElement).textContent = JSON.stringify(jsonLd);

    // Cleanup on unmount optional: keep tags for SPA navigation
    return () => {};
  }, [title, description, keywords, image, url, type, noIndex]);

  return null;
};

export default SEOHead;
