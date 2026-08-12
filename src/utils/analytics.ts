/**
 * Event Tracking Utility for Portfolio Website
 * Safely dispatches custom events and integration hooks for GA4, Google Search Console, or Clarity
 */

export interface AnalyticsEvent {
  eventName: string;
  category: 'Conversion' | 'Navigation' | 'Interaction' | 'Engagement';
  label?: string;
  value?: number;
  params?: Record<string, any>;
}

export const trackEvent = ({ eventName, category, label, value, params }: AnalyticsEvent) => {
  // Console logging for debugging in dev
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event]: ${eventName}`, { category, label, value, params });
  }

  // Google Analytics (gtag) integration point
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }

  // Microsoft Clarity / Custom Web Events integration point
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('event', eventName);
  }
};
