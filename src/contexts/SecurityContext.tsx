
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { generateCSPHeader } from '@/utils/security/sanitization';

interface SecurityContextType {
  reportSecurityEvent: (event: string, details?: any) => void;
  validateSession: () => boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Set security headers via meta tags
    const setSecurityHeaders = () => {
      // Content Security Policy
      let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (!cspMeta) {
        cspMeta = document.createElement('meta');
        cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
        document.head.appendChild(cspMeta);
      }
      cspMeta.setAttribute('content', generateCSPHeader());

      // X-Frame-Options
      let frameMeta = document.querySelector('meta[http-equiv="X-Frame-Options"]');
      if (!frameMeta) {
        frameMeta = document.createElement('meta');
        frameMeta.setAttribute('http-equiv', 'X-Frame-Options');
        frameMeta.setAttribute('content', 'DENY');
        document.head.appendChild(frameMeta);
      }

      // X-Content-Type-Options
      let contentTypeMeta = document.querySelector('meta[http-equiv="X-Content-Type-Options"]');
      if (!contentTypeMeta) {
        contentTypeMeta = document.createElement('meta');
        contentTypeMeta.setAttribute('http-equiv', 'X-Content-Type-Options');
        contentTypeMeta.setAttribute('content', 'nosniff');
        document.head.appendChild(contentTypeMeta);
      }

      // Referrer Policy
      let referrerMeta = document.querySelector('meta[name="referrer"]');
      if (!referrerMeta) {
        referrerMeta = document.createElement('meta');
        referrerMeta.setAttribute('name', 'referrer');
        referrerMeta.setAttribute('content', 'strict-origin-when-cross-origin');
        document.head.appendChild(referrerMeta);
      }
    };

    setSecurityHeaders();

    // Monitor for potential security threats
    const handleSecurityEvent = (event: Event) => {
      console.warn('Security event detected:', event.type);
      reportSecurityEvent(`DOM_${event.type.toUpperCase()}`, {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    };

    // Listen for potential XSS attempts
    window.addEventListener('error', handleSecurityEvent);
    
    return () => {
      window.removeEventListener('error', handleSecurityEvent);
    };
  }, []);

  const reportSecurityEvent = (event: string, details?: any) => {
    console.warn(`Security Event: ${event}`, details);
    
    // In a production environment, you would send this to your security monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to security monitoring service
      // fetch('/api/security-events', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ event, details, timestamp: new Date().toISOString() })
      // });
    }

    // Show user-friendly message for certain events
    if (event.includes('XSS') || event.includes('INJECTION')) {
      toast.error('Security threat detected and blocked');
    }
  };

  const validateSession = (): boolean => {
    // Check for session tampering or suspicious activity
    const sessionStart = sessionStorage.getItem('session_start');
    if (!sessionStart) {
      sessionStorage.setItem('session_start', Date.now().toString());
      return true;
    }

    const sessionAge = Date.now() - parseInt(sessionStart);
    const maxSessionAge = 8 * 60 * 60 * 1000; // 8 hours

    if (sessionAge > maxSessionAge) {
      reportSecurityEvent('SESSION_EXPIRED', { sessionAge });
      return false;
    }

    return true;
  };

  const value = {
    reportSecurityEvent,
    validateSession
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}
