
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { authRateLimiter } from '@/utils/security/rateLimiting';
import { sanitizeEmail, validateInput } from '@/utils/security/sanitization';

export function useAuthMethods() {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    // Input validation and sanitization
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      toast.error('Please enter a valid email address');
      return { data: null, error: { message: 'Invalid email format' } };
    }

    const passwordValidation = validateInput(password, 128);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message || 'Invalid password');
      return { data: null, error: { message: passwordValidation.message } };
    }

    // Rate limiting
    const rateLimitKey = `signin_${sanitizedEmail}`;
    if (authRateLimiter.isRateLimited(rateLimitKey)) {
      const remaining = authRateLimiter.getRemainingAttempts(rateLimitKey);
      toast.error(`Too many login attempts. Please try again later. Remaining: ${remaining}`);
      return { data: null, error: { message: 'Rate limit exceeded' } };
    }

    setIsLoading(true);

    try {
      console.log('Attempting secure sign in for:', sanitizedEmail);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: password // Don't log the actual password
      });

      if (error) {
        console.error('Sign in error:', error.message);
        toast.error(`Sign in failed: ${error.message}`);
        return { data: null, error };
      }

      if (data.user) {
        // Reset rate limit on successful login
        authRateLimiter.reset(rateLimitKey);
        console.log('Sign in successful for user:', data.user.id);
        toast.success('Signed in successfully');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      toast.error('An unexpected error occurred during sign in');
      return { data: null, error: { message: 'Unexpected error' } };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    // Input validation and sanitization
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      toast.error('Please enter a valid email address');
      return { data: null, error: { message: 'Invalid email format' } };
    }

    const passwordValidation = validateInput(password, 128);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message || 'Invalid password');
      return { data: null, error: { message: passwordValidation.message } };
    }

    // Additional password strength validation
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return { data: null, error: { message: 'Password too short' } };
    }

    // Rate limiting
    const rateLimitKey = `signup_${sanitizedEmail}`;
    if (authRateLimiter.isRateLimited(rateLimitKey)) {
      toast.error('Too many signup attempts. Please try again later.');
      return { data: null, error: { message: 'Rate limit exceeded' } };
    }

    setIsLoading(true);

    try {
      console.log('Attempting secure sign up for:', sanitizedEmail);
      
      const { data, error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password: password,
        options: {
          data: {
            signup_timestamp: new Date().toISOString(),
            signup_ip: 'client-side' // In production, get this from server
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error.message);
        toast.error(`Sign up failed: ${error.message}`);
        return { data: null, error };
      }

      console.log('Sign up successful for user:', data.user?.id);
      toast.success('Account created successfully! Please check your email for verification.');
      
      return { data, error: null };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast.error('An unexpected error occurred during sign up');
      return { data: null, error: { message: 'Unexpected error' } };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    
    try {
      console.log('Performing secure sign out');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error.message);
        toast.error(`Sign out failed: ${error.message}`);
      } else {
        // Clear any sensitive data from localStorage/sessionStorage
        sessionStorage.clear();
        
        console.log('Sign out successful');
        toast.success('Signed out successfully');
      }
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      toast.error('An unexpected error occurred during sign out');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    // Input validation and sanitization
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Rate limiting
    const rateLimitKey = `reset_${sanitizedEmail}`;
    if (authRateLimiter.isRateLimited(rateLimitKey)) {
      toast.error('Too many password reset attempts. Please try again later.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting secure password reset for:', sanitizedEmail);
      
      const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
        redirectTo: `${window.location.origin}/auth?mode=reset`
      });

      if (error) {
        console.error('Password reset error:', error.message);
        toast.error(`Password reset failed: ${error.message}`);
      } else {
        console.log('Password reset email sent to:', sanitizedEmail);
        toast.success('Password reset email sent! Please check your inbox.');
      }
    } catch (error) {
      console.error('Unexpected password reset error:', error);
      toast.error('An unexpected error occurred during password reset');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    isLoading
  };
}
