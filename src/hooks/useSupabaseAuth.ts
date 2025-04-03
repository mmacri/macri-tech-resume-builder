
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthResponse } from '@supabase/supabase-js';
import { toast } from 'sonner';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Check if user is admin - use setTimeout to prevent potential deadlocks
        if (currentSession?.user) {
          setTimeout(() => {
            checkIfAdmin(currentSession.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Got existing session:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check if user is admin
      if (currentSession?.user) {
        checkIfAdmin(currentSession.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      } 
      
      setIsAdmin(data?.is_admin || false);
      
      // Create profile if it doesn't exist
      if (!data) {
        await createUserProfile(userId);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          { 
            id: userId,
            is_admin: false // Default to non-admin
          }
        ]);
        
      if (error) {
        console.error('Error creating user profile:', error);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  return {
    session,
    user,
    isAdmin,
    isLoading,
    setIsAdmin
  };
}
