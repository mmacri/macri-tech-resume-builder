
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
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
          checkIfAdmin(session.user.id);
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
        .single();
        
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        
        // If the profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log("Profile not found, creating default profile");
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              is_admin: false,
              full_name: user?.user_metadata?.full_name || '',
              username: user?.email?.split('@')[0] || ''
            });
            
          if (insertError) {
            console.error('Error creating profile:', insertError);
          }
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

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error details:", {
          message: error.message,
          status: error.status,
          name: error.name
        });
        throw error;
      }
      
      console.log("Sign in successful, data:", data);
      
      // Ensure profile exists
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.log("Profile not found, creating default profile");
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              is_admin: false,
              full_name: data.user.user_metadata?.full_name || '',
              username: data.user.email?.split('@')[0] || ''
            });
            
          if (insertError) {
            console.error('Error creating profile:', insertError);
          }
        } else {
          console.log("Profile found:", profileData);
          // Update isAdmin state based on profile
          setIsAdmin(profileData?.is_admin || false);
        }
      }
      
      toast.success('Signed in successfully');
    } catch (error: any) {
      console.error("Sign in error:", error);
      const errorMessage = error.message || 'Error signing in';
      console.error("Detailed error information:", {
        message: errorMessage,
        code: error.code,
        status: error.status,
        name: error?.name,
      });
      toast.error(errorMessage);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign up with email:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Sign up error details:", {
          message: error.message,
          status: error.status,
          name: error.name
        });
        throw error;
      }
      
      console.log("Sign up successful, data:", data);
      toast.success('Signed up successfully! Please check your email for verification.');
    } catch (error: any) {
      console.error("Sign up error:", error);
      const errorMessage = error.message || 'Error signing up';
      console.error("Detailed error information:", {
        message: errorMessage,
        code: error.code,
        status: error.status,
        name: error?.name,
      });
      toast.error(errorMessage);
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
      const errorMessage = error.message || 'Error sending password reset email';
      console.error("Detailed error information:", {
        message: errorMessage,
        code: error.code,
        status: error.status,
        name: error?.name,
      });
      toast.error(errorMessage);
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
