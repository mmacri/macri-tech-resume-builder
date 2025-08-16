
import React from 'react';
import { Quote, Linkedin } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';

interface ReferencesSectionProps {
  references: string[];
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({ references }) => {
  if (references.length === 0) {
    return null;
  }

  return (
    <div className="my-12 bg-gradient-to-br from-white to-macri-primary/5 p-8 rounded-xl border border-macri-primary/20 shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-macri-primary">What Colleagues Say</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 border-macri-primary text-macri-primary hover:bg-macri-primary hover:text-white"
                asChild
              >
                <a 
                  href="https://www.linkedin.com/in/mikemacri/details/recommendations/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="View References"
                >
                  <Linkedin className="h-4 w-4" /> 
                  <span className="hidden sm:inline">View References</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View my recommendations on LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {references.map((reference, index) => (
          <blockquote 
            key={`ref-${index}`} 
            className="relative pl-8 pr-6 py-6 bg-white rounded-xl border-l-4 border-macri-primary italic shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <Quote className="absolute top-6 left-3 h-6 w-6 text-macri-primary opacity-30" />
            <p className="text-gray-700 text-lg leading-relaxed">
              {reference}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm font-medium text-macri-primary">
                LinkedIn Recommendation
              </div>
            </div>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default ReferencesSection;
