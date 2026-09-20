
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from '@/components/layout/SEOHead';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100">
      <SEOHead title="Page Not Found | Mike Macri" description="The requested page could not be found." url={`https://mikemacri.com${location.pathname}`} noIndex />
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold mb-4 text-macri-primary">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <Link to="/" className="inline-flex min-h-11 items-center rounded-md bg-macri-primary px-5 py-3 font-semibold text-white hover:bg-macri-primary-dark">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
