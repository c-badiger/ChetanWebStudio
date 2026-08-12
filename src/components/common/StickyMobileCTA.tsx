import React from 'react';
import { Send } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface StickyMobileCTAProps {
  onOpenWizard: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onOpenWizard }) => {
  const handleClick = () => {
    onOpenWizard();
    trackEvent({
      eventName: 'sticky_mobile_cta_click',
      category: 'Conversion',
      label: 'Start a Project'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:hidden">
      <button
        onClick={handleClick}
        className="flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 shadow-2xl shadow-sky-500/50 border border-sky-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>Start a Project</span>
      </button>
    </div>
  );
};
