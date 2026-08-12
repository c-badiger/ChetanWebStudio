import React from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { Palette, Smartphone, Zap, ShieldCheck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Palette': return <Palette className="w-6 h-6 text-sky-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-indigo-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-purple-400" />;
      default: return <Zap className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <section id="why-me" className="py-20 relative bg-[#090d16]/90 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            Why Choose Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why businesses choose to work with me
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            I don't just write code — I build custom, high-converting digital experiences engineered to grow your business.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SITE_CONFIG.trustPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-sky-500/40"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {getIcon(pillar.icon)}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistical Performance Metrics Grid */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-800/90 bg-slate-950/60 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            {SITE_CONFIG.statistics.map((stat, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-6 md:pt-0' : ''} space-y-1`}>
                <div className="text-3xl sm:text-4xl font-black text-gradient-accent tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-white">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
