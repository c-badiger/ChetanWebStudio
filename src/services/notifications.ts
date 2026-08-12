import type { CreateInquiryInput } from '../types/database';

export const notificationService = {
  /**
   * Safe email notification dispatch trigger.
   * Structured so an email provider (such as Resend or Supabase Edge Function) can easily be connected.
   */
  async notifyNewInquiry(inquiry: CreateInquiryInput): Promise<void> {
    try {
      // Optional client-side webhook notification trigger if configured
      const webhookUrl = import.meta.env.VITE_INQUIRY_WEBHOOK_URL;
      if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim() !== '') {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'new_inquiry',
            data: inquiry,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      // Non-blocking log
      console.warn('Inquiry notification webhook notification skipped:', err);
    }
  },
};
