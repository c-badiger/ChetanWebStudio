import { supabase, supabaseAnon, isSupabaseConfigured } from '../lib/supabase';
import type { Inquiry, CreateInquiryInput, InquiryStatus } from '../types/database';

// In-memory fallback array for local testing when Supabase is unconfigured
let mockInquiries: Inquiry[] = [];

export const inquiriesService = {
  /**
   * Submit a new inquiry (Public access)
   */
  async createInquiry(input: CreateInquiryInput): Promise<{ data: Inquiry | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        const newInquiry: Inquiry = {
          id: 'mock-inquiry-' + Date.now(),
          name: input.name,
          email: input.email,
          business_name: input.business_name || null,
          website_url: input.website_url || null,
          project_type: input.project_type,
          budget_range: input.budget_range || null,
          deadline: input.deadline || null,
          description: input.description,
          status: 'new',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        mockInquiries.unshift(newInquiry);
        return { data: newInquiry, error: null };
      }

      // -----------------------------------------------------------------------
      // DIAGNOSTIC: Inspect current auth state before INSERT.
      // This will reveal if an admin JWT is leaking into this public request.
      // -----------------------------------------------------------------------
      if (import.meta.env.DEV) {
        const { data: sessionData } = await supabase.auth.getSession();
        const activeSession = sessionData?.session;
        console.group('[inquiries.createInquiry] Auth Diagnostics');
        console.log('Active session (primary client):', activeSession ? 'YES — session present' : 'No session');
        if (activeSession) {
          console.log('User ID:', activeSession.user?.id ?? 'n/a');
          console.log('User email:', activeSession.user?.email ?? 'n/a');
          console.log(
            'JWT role claim:',
            (() => {
              try {
                const payload = JSON.parse(atob(activeSession.access_token.split('.')[1]));
                return payload.role ?? 'not set';
              } catch {
                return '(could not decode JWT)';
              }
            })()
          );
          console.warn(
            '⚠️  Admin session detected on primary client. ' +
            'The INSERT will use supabaseAnon (no session) to ensure `anon` role is used.'
          );
        }
        console.log('Using supabaseAnon client for INSERT (persistSession: false)');
        console.groupEnd();
      }

      // Use the anonymous client (no persisted JWT) so PostgREST always
      // evaluates this INSERT under the `anon` role, satisfying the
      // "Allow anonymous insert for inquiries" RLS policy.
      //
      // NOTE: No .select() here — we use Prefer: return=minimal so PostgREST
      // runs a bare INSERT with no RETURNING clause. This avoids triggering a
      // SELECT policy check (which anon doesn't have) and is sufficient because
      // ContactSection.tsx only checks `error`, not the returned row.
      const { error } = await supabaseAnon
        .from('inquiries')
        .insert([
          {
            name: input.name,
            email: input.email,
            business_name: input.business_name || null,
            website_url: input.website_url || null,
            project_type: input.project_type,
            budget_range: input.budget_range || null,
            deadline: input.deadline || null,
            description: input.description,
            status: 'new',
          },
        ]);

      if (error) {
        // DIAGNOSTIC: Log the full Supabase error object for visibility
        if (import.meta.env.DEV) {
          console.error('[inquiries.createInquiry] INSERT error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          });
        }
        throw error;
      }
      return { data: null, error: null };
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      return { data: null, error: err };
    }
  },

  /**
   * Fetch all inquiries (Admin access)
   */
  async getAllInquiries(): Promise<{ data: Inquiry[]; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        return { data: mockInquiries, error: null };
      }

      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err: any) {
      console.error('Error fetching inquiries:', err);
      return { data: [], error: err };
    }
  },

  /**
   * Update inquiry status (Admin access)
   */
  async updateStatus(id: string, status: InquiryStatus): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        mockInquiries = mockInquiries.map((item) =>
          item.id === id ? { ...item, status, updated_at: new Date().toISOString() } : item
        );
        return { error: null };
      }

      const { error } = await supabase
        .from('inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.error('Error updating inquiry status:', err);
      return { error: err };
    }
  },

  /**
   * Delete inquiry (Admin access)
   */
  async deleteInquiry(id: string): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        mockInquiries = mockInquiries.filter((item) => item.id !== id);
        return { error: null };
      }

      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.error('Error deleting inquiry:', err);
      return { error: err };
    }
  },
};
