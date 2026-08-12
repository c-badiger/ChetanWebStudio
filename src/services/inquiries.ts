import { supabase, isSupabaseConfigured } from '../lib/supabase';
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

      const { data, error } = await supabase
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
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
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
