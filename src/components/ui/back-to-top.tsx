
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  // Handle scroll event to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) { // Reduced threshold for mobile
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
    
    // After scrolling to top, briefly show a message on mobile
    if (isMobile) {
      setIsExpanded(true);
      setTimeout(() => setIsExpanded(false), 2000);
    }
  };

  return (
    <div className="back-to-top-container">
      <Collapsible open={isExpanded}>
        <CollapsibleContent className={`
          fixed bottom-20 inset-x-0 z-50 flex justify-center transition-all duration-300 
          ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}>
          <div className="bg-slate-800 text-white px-4 py-2 rounded-full text-sm">
            Back at the top!
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button
        className={`fixed z-50 rounded-full p-3 shadow-lg transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${isMobile 
          ? "bottom-6 right-6 bg-macri-primary/90 hover:bg-macri-primary"
          : "bottom-8 right-8 bg-macri-primary hover:bg-macri-primary/90"
        }`}
        onClick={scrollToTop}
        aria-label="Back to top"
        size="icon"
      >
        <ChevronUp className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
      </Button>
    </div>
  );
};

export default BackToTop;
