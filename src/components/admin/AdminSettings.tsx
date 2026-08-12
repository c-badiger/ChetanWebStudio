import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/settings';
import { storageService } from '../../services/storage';
import type { SiteSettings } from '../../types/database';
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Mail,
  Globe,
  Upload,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadingQr, setUploadingQr] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await settingsService.getSettings();
    setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    const { error } = await settingsService.updateSettings(settings);
    setSaving(false);

    if (error) {
      setErrorMessage('Failed to update business settings.');
    } else {
      setSuccessMessage('Business information and UPI details updated successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    setUploadingQr(true);
    const { publicUrl } = await storageService.uploadImage(file, 'site-assets');
    setUploadingQr(false);

    if (publicUrl) {
      setSettings({ ...settings, upi_qr_url: publicUrl });
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-16 text-center text-slate-400 text-xs font-semibold">
        Loading business settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-sky-400" />
          Business Settings & Contact Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure public contact channels, social profile links, and UPI payment details displayed on the website.
        </p>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Personal & Business Contact Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/40 space-y-4">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-sky-400" />
            General Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Public Email Address</label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">WhatsApp / Phone Number</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="+91 93808 97891"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Location / Base</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                placeholder="India"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Profiles Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/40 space-y-4">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            Social Profiles & Portfolio URL
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={settings.linkedin}
                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={settings.github}
                onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* UPI Payment Configuration Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/40 space-y-4">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-emerald-400" />
            UPI Payment Configuration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">UPI ID *</label>
              <input
                type="text"
                required
                value={settings.upi_id}
                onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
                placeholder="chetanwebstudio@upi"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Displayed to clients for direct UPI payments (GPay, PhonePe, Paytm, BHIM).
              </span>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">UPI QR Code Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={settings.upi_qr_url || ''}
                  onChange={(e) => setSettings({ ...settings, upi_qr_url: e.target.value })}
                  placeholder="QR code image URL..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
                <label className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-sky-400" />
                  <span>{uploadingQr ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleQrUpload}
                    disabled={uploadingQr}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Save Action */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:opacity-95 transition-all flex items-center gap-2 shadow-xl shadow-sky-500/25 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save All Settings'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
