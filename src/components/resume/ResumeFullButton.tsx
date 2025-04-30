
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

interface ResumeFullButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isGenerating: boolean;
}

const ResumeFullButton: React.FC<ResumeFullButtonProps> = ({ 
  onClick, 
  isLoading, 
  isGenerating 
}) => {
  return (
    <div className="flex justify-center mt-4 mb-8">
      <Button 
        onClick={onClick} 
        disabled={isGenerating || isLoading}
        variant="default"
        size="lg"
        className="bg-macri-primary hover:bg-macri-primary/90 text-white flex items-center gap-2 shadow-md transition-all duration-300 hover:shadow-lg px-6 py-6"
      >
        {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-6 w-6" />}
        {isGenerating ? 'Generating Resume...' : 'Download Resume'}
      </Button>
    </div>
  );
};

export default ResumeFullButton;
