import React from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import type { PricingPlan } from '../../config/siteData';
import { scrollToSection } from '../../utils/helpers';
import { trackEvent } from '../../utils/analytics';
import { CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';


interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const handlePlanCta = (plan: PricingPlan) => {
    onSelectPlan(plan.name);
    scrollToSection('contact');
    trackEvent({
      eventName: 'pricing_plan_click',
      category: 'Conversion',
      label: plan.name
    });
  };

  return (
    <section id="pricing" className="py-24 relative bg-[#090d16]/95 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simple, honest packages designed for every budget
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            No hidden fees, no ongoing contract lock-ins. Custom quotes tailored precisely to your project scope.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {SITE_CONFIG.pricing.map((plan) => (
            <div
              key={plan.id}
              className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative border transition-all duration-300 ${
                plan.popular
                  ? 'border-sky-500/60 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-sky-950/40 shadow-2xl shadow-sky-500/15 lg:-translate-y-2'
                  : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md shadow-sky-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Most Popular
                  </span>
                </div>
              )}

              <div>
                {/* Package Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-extrabold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 min-h-[36px]">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-800/80">
                  <div className="text-3xl font-black text-white">{plan.price}</div>
                  <span className="text-xs text-sky-400 font-medium block mt-1">
                    Customized based on exact requirements
                  </span>
                </div>

                {/* Specs Pill Summary */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Pages</div>
                    <div className="text-xs font-bold text-slate-200 mt-0.5">{plan.pages}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Timeline</div>
                    <div className="text-xs font-bold text-slate-200 mt-0.5">{plan.turnaround}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Revisions</div>
                    <div className="text-xs font-bold text-slate-200 mt-0.5">{plan.revisions}</div>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    What's Included:
                  </span>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded?.map((item, nIdx) => (
                    <div key={nIdx} className="flex items-start gap-2.5 text-xs text-slate-300 opacity-60">
                      <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package CTA */}
              <button
                onClick={() => handlePlanCta(plan)}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02]'
                    : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <span>Get a Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Note Footer */}
        <div className="text-center">
          <p className="text-xs text-slate-400">
            Need a specific custom solution or retainers?{' '}
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sky-400 underline font-semibold hover:text-sky-300"
            >
              Contact me for a custom breakdown.
            </button>
          </p>
        </div>

      </div>
    </section>
  );
};
