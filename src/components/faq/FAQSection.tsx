import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { trackEvent } from '../../utils/analytics';
import { ChevronDown, Search } from 'lucide-react';


export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (id: string) => {
    const nextState = openId === id ? null : id;
    setOpenId(nextState);
    if (nextState) {
      trackEvent({
        eventName: 'toggle_faq',
        category: 'Interaction',
        label: id
      });
    }
  };

  const filteredFaqs = SITE_CONFIG.faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 relative bg-[#090d16]/90 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Everything you need to know about working with me, timelines, pricing, and launch deliverables.
          </p>
        </div>

        {/* Live Search Filter Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. hosting, SEO, timeline, payment)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-sm text-white placeholder-slate-400"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-sky-500/40 bg-slate-900/80 shadow-lg shadow-sky-500/5'
                      : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-base font-bold text-white pr-4">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-xl bg-slate-800 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-sky-400 bg-sky-500/10' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-slate-800/60 text-sm text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-400 text-sm">
              No questions found matching "{searchQuery}". Try a different keyword.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
