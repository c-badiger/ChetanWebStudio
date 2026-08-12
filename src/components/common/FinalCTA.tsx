import React from 'react';
import { trackEvent } from '../../utils/analytics';
import { ArrowRight, Send, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenWizard: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenWizard }) => {
  const handleClick = () => {
    onOpenWizard();
    trackEvent({
      eventName: 'final_cta_click',
      category: 'Conversion',
      label: 'Start a Project'
    });
  };

  return (
    <section className="py-24 relative bg-[#090d16] border-t border-slate-800 overflow-hidden">
      {/* Radiant Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-10 sm:p-16 border border-slate-700/80 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-sky-950/40 text-center shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Let's Build Something Extraordinary
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to build a better website?
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tell me about your project and let's turn your idea into a professional online experience that converts visitors into customers.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleClick}
              className="inline-flex items-center justify-center gap-3 px-9 py-4 text-base font-extrabold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 rounded-2xl shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
