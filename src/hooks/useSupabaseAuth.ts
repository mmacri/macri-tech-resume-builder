
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener');
    
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
          setIsLoading(false);
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
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfAdmin = async (userId: string) => {
    try {
      console.log('Checking admin status for user ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else if (data) {
        console.log('Admin status from database:', data.is_admin);
        setIsAdmin(data.is_admin || false);
      } else {
        console.log('No profile found, creating new profile');
        await createUserProfile(userId, false); // Changed default to false
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const createUserProfile = async (userId: string, makeAdmin: boolean = false) => { // Changed default to false
    try {
      console.log('Creating user profile, admin status:', makeAdmin);
      const { error } = await supabase
        .from('profiles')
        .insert([
          { 
            id: userId,
            is_admin: makeAdmin
          }
        ]);
        
      if (error) {
        console.error('Error creating user profile:', error);
      } else {
        console.log('User profile created successfully');
        // Update state after creating the profile
        setIsAdmin(makeAdmin);
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
