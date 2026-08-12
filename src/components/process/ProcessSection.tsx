import React from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface ProcessSectionProps {
  onOpenWizard: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenWizard }) => {
  const handleCta = () => {
    onOpenWizard();
    trackEvent({
      eventName: 'process_cta_click',
      category: 'Conversion',
      label: 'Start Your Project'
    });
  };

  return (
    <section id="process" className="py-24 relative bg-[#090d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Clear 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How we bring your website project to life
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A structured, stress-free workflow designed to deliver high-converting web experiences on time.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SITE_CONFIG.workProcess.map((step, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 relative flex flex-col justify-between border border-slate-800/80 group hover:border-emerald-500/40 bg-slate-900/40"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-gradient-accent">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                    0{idx + 1}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Deliverables:
                </span>
                {step.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Process Section CTA */}
        <div className="text-center">
          <button
            onClick={handleCta}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Send className="w-5 h-5" />
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
