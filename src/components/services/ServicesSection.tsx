import React from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import type { ServiceItem } from '../../config/siteData';
import { scrollToSection } from '../../utils/helpers';
import { trackEvent } from '../../utils/analytics';
import { Layout, Code, Target, Briefcase, PenTool, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';



interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Layout': return <Layout className="w-6 h-6 text-sky-400" />;
      case 'Code': return <Code className="w-6 h-6 text-indigo-400" />;
      case 'Target': return <Target className="w-6 h-6 text-rose-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-400" />;
      case 'Figma': return <PenTool className="w-6 h-6 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-emerald-400" />;
      default: return <Layout className="w-6 h-6 text-sky-400" />;
    }
  };

  const handleServiceCta = (service: ServiceItem) => {
    onSelectService(service.title);
    scrollToSection('contact');
    trackEvent({
      eventName: 'service_cta_click',
      category: 'Conversion',
      label: service.title
    });
  };

  return (
    <section id="services" className="py-24 relative bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Specialized Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Services tailored to scale your digital presence
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            From single conversion landing pages to full multi-page business platforms, every project is custom crafted for maximum ROI.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_CONFIG.services.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between relative group border border-slate-800/80 hover:border-sky-500/40 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300"
            >
              <div>
                {/* Header & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Benefits Checklist */}
                <div className="space-y-2.5 mb-8 border-t border-slate-800/80 pt-5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Key Deliverables:
                  </span>
                  {service.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action CTA */}
              <button
                onClick={() => handleServiceCta(service)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-slate-800/80 border border-slate-700/60 hover:bg-sky-500 hover:border-sky-400 transition-all group-hover:shadow-lg group-hover:shadow-sky-500/20 cursor-pointer"
              >
                <span>{service.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
