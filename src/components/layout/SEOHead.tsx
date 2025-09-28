import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Mike Macri - Professional Portfolio & Resume",
  description = "Experienced business professional specializing in solution consulting, governance frameworks, and strategic technology implementations. View portfolio, resume, and professional achievements.",
  keywords = "Mike Macri, business consultant, solution consulting, governance frameworks, technology implementation, portfolio, resume, MBA",
  image = "/og-image.jpg",
  url = "https://mikemacri.com",
  type = "website"
}) => {
  const fullTitle = title.includes("Mike Macri") ? title : `${title} | Mike Macri`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mike Macri" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Mike Macri Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />
      
      {/* Structured Data for Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mike Macri",
          "jobTitle": "Business Consultant & Solution Architect",
          "description": description,
          "url": url,
          "image": image,
          "sameAs": [
            "https://linkedin.com/in/mikemacri"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Independent Consultant"
          },
          "knowsAbout": [
            "Solution Consulting",
            "Governance Frameworks", 
            "Technology Implementation",
            "Business Strategy",
            "Risk Management"
          ]
        })}
      </script>
    </Helmet>
  );
};