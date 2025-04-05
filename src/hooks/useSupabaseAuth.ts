
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
      
      // First, check if the user's email matches any of our known admin emails
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email?.toLowerCase();
      const isKnownAdmin = email === 'mike@mikemacri.com' || email === 'mike@gmail.com';
      
      if (isKnownAdmin) {
        console.log('User has a known admin email address, setting as admin');
        setIsAdmin(true);
        
        // Update the profile to be an admin
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, is_admin')
          .eq('id', userId)
          .maybeSingle();
          
        if (existingProfile) {
          if (!existingProfile.is_admin) {
            await supabase
              .from('profiles')
              .update({ is_admin: true })
              .eq('id', userId);
          }
        } else {
          // Create profile
          console.log('Creating admin profile for known admin email');
          await supabase
            .from('profiles')
            .insert({ 
              id: userId,
              full_name: 'Michael Macri',
              username: email,
              is_admin: true
            });
        }
        
        setIsLoading(false);
        return;
      }
      
      // Direct DB query without relying on complex policies
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .maybeSingle();
        
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else if (data) {
        console.log('Admin status from database:', data.is_admin);
        setIsAdmin(data.is_admin || false);
      } else {
        console.log('No profile found, creating new profile');
        await createUserProfile(userId, false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const createUserProfile = async (userId: string, makeAdmin: boolean = false) => {
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

  // Add a function to set admin status for a user
  const setAdminStatus = async (userId: string, adminStatus: boolean) => {
    try {
      console.log('Setting admin status for user ID:', userId, 'to:', adminStatus);
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: adminStatus })
        .eq('id', userId);
        
      if (error) {
        console.error('Error updating admin status:', error);
        return false;
      } else {
        console.log('Admin status updated successfully');
        if (user && user.id === userId) {
          setIsAdmin(adminStatus);
        }
        return true;
      }
    } catch (error) {
      console.error('Error updating admin status:', error);
      return false;
    }
  };

  return {
    session,
    user,
    isAdmin,
    isLoading,
    setAdminStatus
  };
}
