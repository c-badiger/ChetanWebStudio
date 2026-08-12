import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Local fallback auth state when Supabase env vars are unconfigured
  const [mockAuthenticated, setMockAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('chetan_admin_mock_session') === 'true';
  });

  useEffect(() => {
    let mounted = true;

    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get current active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loginWithMock = (email: string) => {
    localStorage.setItem('chetan_admin_mock_session', 'true');
    setMockAuthenticated(true);
    setUser({ id: 'mock-admin-id', email } as User);
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('chetan_admin_mock_session');
    setMockAuthenticated(false);
    setUser(null);
    setSession(null);
  };

  const isAuthenticated = isSupabaseConfigured() ? !!user : mockAuthenticated;

  return {
    user,
    session,
    loading,
    isAuthenticated,
    loginWithMock,
    logout,
  };
}
