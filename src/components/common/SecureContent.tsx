
import React from 'react';
import { sanitizeHtml } from '@/utils/security/sanitization';

interface SecureContentProps {
  content: string;
  className?: string;
  allowHtml?: boolean;
}

/**
 * Component that safely displays user-generated content with XSS protection
 */
export const SecureContent: React.FC<SecureContentProps> = ({ 
  content, 
  className = '', 
  allowHtml = true 
}) => {
  if (!content) {
    return null;
  }

  if (allowHtml) {
    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content);
    
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    );
  } else {
    // Display as plain text
    return (
      <div className={className}>
        {content}
      </div>
    );
  }
};
