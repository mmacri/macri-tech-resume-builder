
import { supabase } from '@/integrations/supabase/client';
import { AuthResponse } from '@supabase/supabase-js';
import { toast } from 'sonner';

export function useAuthMethods() {
  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('Signing in with:', email);
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (response.error) {
        toast.error(response.error.message || 'Error signing in');
        console.error('Sign in error:', response.error);
        throw response.error;
      }
      
      console.log('Sign in successful:', response.data.user?.email);
      toast.success('Signed in successfully');
      return response;
    } catch (error: any) {
      console.error('Sign in catch error:', error);
      toast.error(error.message || 'Error signing in');
      throw error;
    }
  };

  const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('Signing up with:', email);
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      if (response.error) {
        toast.error(response.error.message || 'Error signing up');
        console.error('Sign up error:', response.error);
        throw response.error;
      }
      
      toast.success('Signed up successfully! Please check your email for verification.');
      return response;
    } catch (error: any) {
      console.error('Sign up catch error:', error);
      toast.error(error.message || 'Error signing up');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out');
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message || 'Error signing out');
        console.error('Sign out error:', error);
        throw error;
      }
      toast.success('Signed out successfully');
    } catch (error: any) {
      console.error('Sign out catch error:', error);
      toast.error(error.message || 'Error signing out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('Resetting password for:', email);
      // Use the current window origin instead of hardcoded localhost
      const redirectUrl = `${window.location.origin}/auth?reset=true`;
      console.log('Using redirect URL:', redirectUrl);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        toast.error(error.message || 'Error resetting password');
        console.error('Reset password error:', error);
        throw error;
      }
      
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      console.error('Reset password catch error:', error);
      toast.error(error.message || 'Error resetting password');
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword
  };
}
