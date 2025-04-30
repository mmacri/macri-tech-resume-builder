
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

interface ResumeInlineButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isGenerating: boolean;
}

const ResumeInlineButton: React.FC<ResumeInlineButtonProps> = ({ 
  onClick, 
  isLoading, 
  isGenerating 
}) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={isGenerating || isLoading}
      variant="default"
      size="default"
      className="bg-macri-primary hover:bg-macri-primary/90 text-white flex items-center gap-1 shadow-md transition-all duration-300 hover:shadow-lg"
    >
      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {isGenerating ? 'Generating...' : 'Download Resume'}
    </Button>
  );
};

export default ResumeInlineButton;
