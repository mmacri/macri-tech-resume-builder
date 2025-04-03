
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthResponse } from '@supabase/supabase-js';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);

        // Check if user is admin
        if (session?.user) {
          // Use setTimeout to avoid Supabase SDK deadlock issues
          setTimeout(() => {
            checkIfAdmin(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check if user is admin
      if (session?.user) {
        checkIfAdmin(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfAdmin = async (userId: string) => {
    try {
      console.log("Checking admin status for user ID:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .maybeSingle(); // Using maybeSingle instead of single to avoid errors
        
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        
        // If the profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log("Profile not found, creating default profile");
          await createDefaultProfile(userId);
        }
      } else {
        console.log("Admin check result:", data);
        setIsAdmin(data?.is_admin || false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const createDefaultProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          is_admin: false,
          full_name: userData.user?.user_metadata?.full_name || '',
          username: userData.user?.email?.split('@')[0] || ''
        });
        
      if (insertError) {
        console.error('Error creating profile:', insertError);
      }
    } catch (error) {
      console.error('Error creating default profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);
      
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (response.error) {
        console.error("Sign in error details:", {
          message: response.error.message,
          status: response.error.status,
          name: response.error.name
        });
        
        // Improve error messages for better user experience
        let errorMessage = 'Error signing in';
        if (response.error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (response.error.message.includes('Email not confirmed')) {
          errorMessage = 'Please confirm your email before signing in';
        } else {
          errorMessage = response.error.message;
        }
        
        toast.error(errorMessage);
        throw response.error;
      }
      
      console.log("Sign in successful, data:", response.data);      
      toast.success('Signed in successfully');
      
      return response;
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign up with email:", email);
      
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      if (response.error) {
        console.error("Sign up error details:", {
          message: response.error.message,
          status: response.error.status,
          name: response.error.name
        });
        
        // Improved error handling with specific messages
        let errorMessage = 'Error signing up';
        if (response.error.message.includes('already registered')) {
          errorMessage = 'This email is already registered';
        } else {
          errorMessage = response.error.message;
        }
        
        toast.error(errorMessage);
        throw response.error;
      }
      
      console.log("Sign up successful, data:", response.data);
      
      // Create a profile for the new user
      if (response.data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: response.data.user.id,
            is_admin: false,
            full_name: response.data.user.user_metadata?.full_name || '',
            username: email.split('@')[0] || ''
          });
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
      
      toast.success('Signed up successfully! Please check your email for verification.');
      return response;
    } catch (error: any) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Attempting to sign out");
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      console.log("Sign out successful");
      toast.success('Signed out successfully');
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error(error.message || 'Error signing out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log("Attempting to reset password for email:", email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?tab=reset`,
      });
      
      if (error) {
        console.error("Password reset error details:", {
          message: error.message,
          status: error.status,
          name: error.name
        });
        throw error;
      }
      
      console.log("Password reset email sent successfully");
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(error.message || 'Error sending password reset email');
      throw error;
    }
  };

  const value = {
    session,
    user,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
