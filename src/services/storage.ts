import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type StorageBucket = 'portfolio-images' | 'review-avatars' | 'site-assets';

export const storageService = {
  /**
   * Upload an image file to a designated Supabase Storage bucket
   */
  async uploadImage(
    file: File,
    bucket: StorageBucket = 'portfolio-images'
  ): Promise<{ publicUrl: string | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        // Fallback object URL for client preview when unconfigured
        const objectUrl = URL.createObjectURL(file);
        return { publicUrl: objectUrl, error: null };
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

      return { publicUrl: data.publicUrl, error: null };
    } catch (err: any) {
      console.error('Storage upload error:', err);
      return { publicUrl: null, error: err };
    }
  },

  /**
   * Delete image from storage by full URL
   */
  async deleteImage(url: string, bucket: StorageBucket = 'portfolio-images'): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) return { error: null };

      const parts = url.split('/');
      const fileName = parts[parts.length - 1];

      if (!fileName) return { error: null };

      const { error } = await supabase.storage.from(bucket).remove([fileName]);
      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.error('Storage delete error:', err);
      return { error: err };
    }
  },
};
