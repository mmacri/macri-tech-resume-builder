
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Handle scroll event to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Only show on desktop
  if (isMobile) return null;

  return (
    <Button
      className={`fixed bottom-8 right-8 z-50 bg-macri-primary hover:bg-macri-primary/90 rounded-full p-3 shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
};

export default BackToTop;
