
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
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-5 w-5" />}
        {isGenerating ? 'Generating...' : 'Download Resume'}
      </Button>
    </div>
  );
};

export default ResumeFullButton;
