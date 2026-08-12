import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { isValidEmail, sanitizeInput } from '../../utils/helpers';
import { trackEvent } from '../../utils/analytics';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles, MapPin, Clock } from 'lucide-react';


interface ContactSectionProps {
  selectedServiceTitle?: string;
  selectedPlanTitle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedServiceTitle,
  selectedPlanTitle
}) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    businessName: '',
    websiteUrl: '',
    projectType: selectedServiceTitle || selectedPlanTitle || 'Business website',
    budgetRange: '$1,000 - $2,500',
    deadline: 'Within 2-3 weeks',
    description: '',
    honeypot: '' // Anti-spam protection
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam Honeypot Check
    if (formState.honeypot) {
      return;
    }

    if (!formState.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!isValidEmail(formState.email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!formState.description.trim()) {
      setErrorMessage('Please share a few details about your project requirements.');
      return;
    }

    setLoading(true);

    trackEvent({
      eventName: 'contact_form_submit',
      category: 'Conversion',
      label: formState.projectType,
      params: { budget: formState.budgetRange }
    });

    // Simulate safe API dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleWhatsAppClick = () => {
    trackEvent({
      eventName: 'whatsapp_click',
      category: 'Conversion',
      label: 'Direct WhatsApp Contact'
    });
  };

  const handleEmailClick = () => {
    trackEvent({
      eventName: 'email_click',
      category: 'Conversion',
      label: 'Direct Email Contact'
    });
  };

  return (
    <section id="contact" className="py-24 relative bg-[#090d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            Start A Conversation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Send a project inquiry
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Tell me about your business goals and I'll get back to you with a free consultation and project proposal within 24 hours.
          </p>
        </div>

        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Social Options */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6 bg-slate-900/40">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                Direct Communication
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prefer direct messaging? Reach out through any of these verified channels:
              </p>

              <div className="space-y-4">
                {/* Email Option */}
                <a
                  href={`mailto:${SITE_CONFIG.personal.email}`}
                  onClick={handleEmailClick}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-slate-800 hover:border-sky-500/40 group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Official Email</span>
                    <span className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                      {SITE_CONFIG.personal.email}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Option */}
                <a
                  href={`https://wa.me/${SITE_CONFIG.personal.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(SITE_CONFIG.personal.name)},%20I'm%20interested%20in%20building%20a%20website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Direct Chat</span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {SITE_CONFIG.personal.whatsappFormatted}
                    </span>
                  </div>
                </a>

                {/* Location & Timezone */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    <span>{SITE_CONFIG.personal.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>24h Response</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex items-center justify-around">
              <a
                href={SITE_CONFIG.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-sky-400 transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-sky-400" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg> LinkedIn
              </a>
              <a
                href={SITE_CONFIG.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg> GitHub
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl bg-slate-900/60">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">Inquiry Sent Successfully!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-sky-300 font-semibold">{sanitizeInput(formState.name)}</span>. I have received your message and will review your project details immediately.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-extrabold text-white mb-2">Project Inquiry Form</h3>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Anti-Spam Honeypot */}
                  <input
                    type="text"
                    name="hp_contact_url"
                    value={formState.honeypot}
                    onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                        placeholder="john@business.com"
                      />
                    </div>
                  </div>

                  {/* Business Name & Website URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Business Name</label>
                      <input
                        type="text"
                        value={formState.businessName}
                        onChange={(e) => setFormState({ ...formState, businessName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                        placeholder="e.g. Apex Media"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Current Website URL (Optional)</label>
                      <input
                        type="url"
                        value={formState.websiteUrl}
                        onChange={(e) => setFormState({ ...formState, websiteUrl: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  {/* Project Type & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Project Type</label>
                      <select
                        value={formState.projectType}
                        onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-900 text-white"
                      >
                        <option value="Business website">Business Website</option>
                        <option value="Landing page">Landing Page</option>
                        <option value="Website design">Website Design</option>
                        <option value="Website development">Website Development</option>
                        <option value="UI/UX design">UI/UX Design</option>
                        <option value="Website redesign">Website Redesign</option>
                        <option value="Web application">Web Application</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Approximate Budget</label>
                      <select
                        value={formState.budgetRange}
                        onChange={(e) => setFormState({ ...formState, budgetRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-900 text-white"
                      >
                        <option value="< $1,000">&lt; $1,000 (Starter)</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500 (Standard)</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000 (Professional)</option>
                        <option value="> $5,000">&gt; $5,000 (Custom Scope)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Deadline */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Target Launch Deadline</label>
                    <input
                      type="text"
                      value={formState.deadline}
                      onChange={(e) => setFormState({ ...formState, deadline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                      placeholder="e.g. Within 2-3 weeks"
                    />
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Project Description & Requirements *</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full p-4 rounded-xl glass-input text-sm text-white placeholder-slate-500"
                      placeholder="Describe your business goals, target audience, preferred pages, or design preferences..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
