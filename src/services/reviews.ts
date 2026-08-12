import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Review } from '../types/database';

let localReviews: Review[] = [];

export const reviewsService = {
  /**
   * Fetch published reviews for public display
   */
  async getPublishedReviews(): Promise<{ data: Review[]; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        return { data: localReviews.filter((r) => r.is_published), error: null };
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err: any) {
      console.error('Error fetching published reviews:', err);
      return { data: localReviews.filter((r) => r.is_published), error: null };
    }
  },

  /**
   * Fetch all reviews for admin management
   */
  async getAllReviews(): Promise<{ data: Review[]; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        return { data: localReviews, error: null };
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err: any) {
      console.error('Error fetching all reviews:', err);
      return { data: localReviews, error: null };
    }
  },

  /**
   * Create a new review (Admin)
   */
  async createReview(input: Partial<Review>): Promise<{ data: Review | null; error: Error | null }> {
    try {
      const rating = Math.min(5, Math.max(1, input.rating || 5));

      if (!isSupabaseConfigured()) {
        const newReview: Review = {
          id: 'rev-' + Date.now(),
          client_name: input.client_name || 'Anonymous Client',
          business_name: input.business_name || null,
          role: input.role || null,
          testimonial: input.testimonial || '',
          rating,
          profile_image_url: input.profile_image_url || null,
          is_published: input.is_published ?? true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        localReviews.unshift(newReview);
        return { data: newReview, error: null };
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            client_name: input.client_name,
            business_name: input.business_name || null,
            role: input.role || null,
            testimonial: input.testimonial,
            rating,
            profile_image_url: input.profile_image_url || null,
            is_published: input.is_published ?? true,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err: any) {
      console.error('Error creating review:', err);
      return { data: null, error: err };
    }
  },

  /**
   * Update review (Admin)
   */
  async updateReview(id: string, updates: Partial<Review>): Promise<{ error: Error | null }> {
    try {
      if (updates.rating) {
        updates.rating = Math.min(5, Math.max(1, updates.rating));
      }

      if (!isSupabaseConfigured()) {
        localReviews = localReviews.map((r) => (r.id === id ? { ...r, ...updates, updated_at: new Date().toISOString() } : r));
        return { error: null };
      }

      const { error } = await supabase
        .from('reviews')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.error('Error updating review:', err);
      return { error: err };
    }
  },

  /**
   * Delete review (Admin)
   */
  async deleteReview(id: string): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        localReviews = localReviews.filter((r) => r.id !== id);
        return { error: null };
      }

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.error('Error deleting review:', err);
      return { error: err };
    }
  },
};
