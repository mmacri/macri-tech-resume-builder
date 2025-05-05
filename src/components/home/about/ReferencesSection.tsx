
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
    <div className="my-10 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-macri-primary">References</h3>
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
                  aria-label="View LinkedIn references"
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
      
      <div className="grid md:grid-cols-2 gap-6">
        {references.map((reference, index) => (
          <blockquote 
            key={`ref-${index}`} 
            className="relative pl-6 pr-4 py-4 bg-gray-50 rounded-lg border-l-4 border-macri-primary italic"
          >
            <Quote className="absolute top-4 left-2 h-5 w-5 text-macri-primary opacity-50" />
            <p className="text-gray-700">
              {reference}
            </p>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default ReferencesSection;
