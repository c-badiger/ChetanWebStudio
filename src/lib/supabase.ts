import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim() !== '' &&
    !supabaseUrl.includes('your-project-ref') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim() !== '' &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
  );
};

// ---------------------------------------------------------------------------
// DIAGNOSTIC: Log Supabase configuration state on startup (safe – no key logged)
// ---------------------------------------------------------------------------
if (import.meta.env.DEV) {
  console.group('[Supabase] Client Init Diagnostics');
  console.log('URL configured:', supabaseUrl ? supabaseUrl : '(empty)');
  console.log('Anon key present:', !!supabaseAnonKey);
  console.log(
    'Anon key format:',
    supabaseAnonKey.startsWith('eyJ')
      ? '✅ JWT format (correct)'
      : supabaseAnonKey.startsWith('sb_publishable')
        ? '❌ Publishable key format — use the JWT anon key from Supabase Dashboard → Project Settings → API'
        : '⚠️  Unknown format'
  );
  console.log('isSupabaseConfigured:', isSupabaseConfigured());
  console.groupEnd();
}

// ---------------------------------------------------------------------------
// Primary Supabase client — used by admin dashboard (sessions persisted)
// ---------------------------------------------------------------------------
export const supabase = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder-project.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// ---------------------------------------------------------------------------
// No-op storage: physically cannot hold any session. Passed to supabaseAnon
// so the GoTrue client can never load a persisted admin JWT from localStorage,
// even across the async initialization window.
// ---------------------------------------------------------------------------
const _noopStorage = {
  getItem: (_key: string): string | null => null,
  setItem: (_key: string, _value: string): void => {},
  removeItem: (_key: string): void => {},
};

// ---------------------------------------------------------------------------
// Anonymous public client — used ONLY for public-facing INSERT operations.
// Two-layer protection against admin session leaking:
//   1. _noopStorage: getSession() always returns null (no localStorage read).
//   2. global.headers Authorization: forces the anon JWT on every request,
//      overriding any dynamic header the auth module might produce.
// ---------------------------------------------------------------------------
const _anonJwt = isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-anon-key';

export const supabaseAnon = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder-project.supabase.co',
  _anonJwt,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: _noopStorage,
    },
    global: {
      // Force every request from this client to carry the anon JWT.
      // This is the definitive guarantee that PostgREST sees `role: anon`.
      headers: {
        Authorization: `Bearer ${_anonJwt}`,
      },
    },
  }
);
