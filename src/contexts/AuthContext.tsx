
import React, { createContext, useContext, ReactNode } from 'react';
import { Session, User, AuthResponse } from '@supabase/supabase-js';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useAuthMethods } from '@/hooks/useAuthMethods';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setAdminStatus: (userId: string, adminStatus: boolean) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { session, user, isAdmin, isLoading, setAdminStatus } = useSupabaseAuth();
  const { signIn, signUp, signOut, resetPassword } = useAuthMethods();

  const value = {
    session,
    user,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    setAdminStatus,
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
