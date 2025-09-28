import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

// Lightweight SEO head manager without external providers
export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Mike Macri - Professional Portfolio & Resume',
  description = 'Experienced business professional specializing in solution consulting, governance frameworks, and strategic technology implementations. View portfolio, resume, and professional achievements.',
  keywords = 'Mike Macri, business consultant, solution consulting, governance frameworks, technology implementation, portfolio, resume, MBA',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://mikemacri.com',
  type = 'website',
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
    const fullTitle = title.includes('Mike Macri') ? title : `${title} | Mike Macri`;
    document.title = fullTitle;

    // Basic Meta
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    setMeta('meta[name="author"]', { name: 'author', content: 'Mike Macri' });
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' });

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
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Mike Macri Portfolio' });

    // Twitter
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:url"]', { name: 'twitter:url', content: url });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    // JSON-LD Structured Data
    const scriptId = 'seo-json-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      (scriptEl as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mike Macri',
      jobTitle: 'Business Consultant & Solution Architect',
      description,
      url,
      image,
      sameAs: ['https://linkedin.com/in/mikemacri'],
      worksFor: { '@type': 'Organization', name: 'Independent Consultant' },
      knowsAbout: [
        'Solution Consulting',
        'Governance Frameworks',
        'Technology Implementation',
        'Business Strategy',
        'Risk Management',
      ],
    };
    (scriptEl as HTMLScriptElement).textContent = JSON.stringify(jsonLd);

    // Cleanup on unmount optional: keep tags for SPA navigation
    return () => {};
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEOHead;
