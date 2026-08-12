import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { SiteSettings } from '../types/database';
import { SITE_CONFIG } from '../config/siteData';

const defaultSettings: SiteSettings = {
  id: 'default',
  name: SITE_CONFIG.personal.name,
  email: SITE_CONFIG.personal.email,
  whatsapp: SITE_CONFIG.personal.whatsapp,
  linkedin: SITE_CONFIG.personal.linkedin,
  github: SITE_CONFIG.personal.github,
  upi_id: SITE_CONFIG.personal.upiId,
  upi_qr_url: null,
  location: SITE_CONFIG.personal.location,
  portfolio_url: 'https://chetanwebstudio.com',
};

let localSettings: SiteSettings = { ...defaultSettings };

export const settingsService = {
  async getSettings(): Promise<{ data: SiteSettings; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        return { data: localSettings, error: null };
      }

      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (error) throw error;
      if (!data) return { data: defaultSettings, error: null };
      
      const merged: SiteSettings = {
        id: 'default',
        name: data.name || defaultSettings.name,
        email: data.email || defaultSettings.email,
        whatsapp: data.whatsapp || defaultSettings.whatsapp,
        linkedin: data.linkedin || defaultSettings.linkedin,
        github: data.github || defaultSettings.github,
        upi_id: data.upi_id || defaultSettings.upi_id,
        upi_qr_url: data.upi_qr_url || null,
        location: data.location || defaultSettings.location,
        portfolio_url: data.portfolio_url || defaultSettings.portfolio_url,
      };

      return { data: merged, error: null };
    } catch (err: any) {
      console.error('Error fetching site settings:', err);
      return { data: localSettings, error: null };
    }
  },

  async updateSettings(updates: Partial<SiteSettings>): Promise<{ data: SiteSettings | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        localSettings = { ...localSettings, ...updates, updated_at: new Date().toISOString() };
        return { data: localSettings, error: null };
      }

      const { data, error } = await supabase
        .from('site_settings')
        .upsert([{ id: 'default', ...updates, updated_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err: any) {
      console.error('Error updating site settings:', err);
      return { data: null, error: err };
    }
  },
};
