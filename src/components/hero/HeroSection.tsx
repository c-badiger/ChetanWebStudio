import React from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { scrollToSection } from '../../utils/helpers';
import { trackEvent } from '../../utils/analytics';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Smartphone, CheckCircle, Code, Star } from 'lucide-react';

interface HeroSectionProps {
  onOpenWizard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWizard }) => {
  const handlePrimaryCta = () => {
    onOpenWizard();
    trackEvent({
      eventName: 'hero_primary_cta',
      category: 'Conversion',
      label: 'Start a Project'
    });
  };

  const handleSecondaryCta = () => {
    scrollToSection('projects');
    trackEvent({
      eventName: 'hero_secondary_cta',
      category: 'Navigation',
      label: 'View My Work'
    });
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#090d16]">
      {/* Background Decorative Gradients & Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Availability Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-slate-700/60 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-slate-200 tracking-wide">
                {SITE_CONFIG.personal.availability}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Websites That Turn Visitors Into{' '}
              <span className="text-gradient-accent underline decoration-sky-500/40 underline-offset-8">
                Customers.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {SITE_CONFIG.personal.subheadline}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handlePrimaryCta}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 rounded-2xl shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleSecondaryCta}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-200 glass-panel border border-slate-700/80 hover:bg-slate-800/60 rounded-2xl hover:text-white transition-all cursor-pointer"
              >
                <span>View My Work</span>
              </button>
            </div>

            {/* Quick Micro Social Proof Features */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">100% Custom Code</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">Sub-Second Load</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">Mobile Optimized</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Mockup / Floating Interactive Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/30 to-purple-500/30 blur-xl opacity-70 animate-pulse-glow" />

              {/* Browser Mockup Window */}
              <div className="relative rounded-2xl glass-panel border border-slate-700/70 overflow-hidden shadow-2xl bg-[#0f172a]/90">
                
                {/* Browser Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-1 bg-slate-950/60 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    https://your-business-website.com
                  </div>
                  <div className="text-slate-500">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                  </div>
                </div>

                {/* Live Preview Card Content */}
                <div className="p-5 space-y-4">
                  {/* Mock Hero Inside Preview */}
                  <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-950/40 p-4 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-sky-400 uppercase tracking-wider text-[10px]">Client Preview</span>
                      <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Live & Ready
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">High-Converting Digital Platform</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      Engineered for high conversion rates, ultra fast performance, and mobile accessibility.
                    </p>
                  </div>

                  {/* Floating Metric Badges inside Mockup */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">99 / 100</div>
                        <div className="text-[10px] text-slate-400">PageSpeed Score</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                        <Code className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">0.4 sec</div>
                        <div className="text-[10px] text-slate-400">First Paint Time</div>
                      </div>
                    </div>
                  </div>

                  {/* Mini Code Snippet Accent */}
                  <div className="rounded-xl bg-slate-950 p-3 font-mono text-[11px] text-slate-300 border border-slate-800/90 leading-relaxed">
                    <div className="text-slate-500">// Modern React + Tailwind Architecture</div>
                    <div><span className="text-purple-400">const</span> <span className="text-sky-300">result</span> = <span className="text-amber-300">await</span> <span className="text-emerald-400">buildWebsite</span>(&#123;</div>
                    <div className="pl-4 text-slate-300">strategy: <span className="text-emerald-300">'conversion-focused'</span>,</div>
                    <div className="pl-4 text-slate-300">speed: <span className="text-emerald-300">'ultra-fast'</span></div>
                    <div>&#125;);</div>
                  </div>

                </div>

              </div>

              {/* Floating Accent Card Overlay 1 */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl bg-[#0f172a]/95 animate-float">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Client Focus</div>
                  <div className="text-[11px] text-slate-400">Guaranteed Quality</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
