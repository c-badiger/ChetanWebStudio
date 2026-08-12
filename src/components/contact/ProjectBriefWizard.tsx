import React, { useState } from 'react';
import { sanitizeInput, isValidEmail } from '../../utils/helpers';
import { trackEvent } from '../../utils/analytics';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Send, Sparkles, AlertCircle } from 'lucide-react';


interface ProjectBriefWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ProjectBriefWizard: React.FC<ProjectBriefWizardProps> = ({
  isOpen,
  onClose,
  initialService = ''
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    projectType: initialService || 'Business website',
    budget: '$1,000 - $2,500',
    timeline: 'Within 2-3 weeks',
    description: '',
    name: '',
    email: '',
    whatsapp: '',
    honeypot: '' // Anti-spam field
  });

  const projectTypes = [
    'Business website',
    'Landing page',
    'Portfolio website',
    'E-commerce storefront',
    'Web application (SaaS)',
    'Website redesign',
    'Other / Custom scope'
  ];

  const budgetOptions = [
    '< $1,000 (Starter)',
    '$1,000 - $2,500 (Standard)',
    '$2,500 - $5,000 (Professional)',
    '> $5,000 (Custom Enterprise)'
  ];

  const timelineOptions = [
    'ASAP (Under 1 week)',
    'Within 2-3 weeks',
    'Within 1 month',
    'Flexible / Planning ahead'
  ];

  const handleNext = () => {
    setErrorMessage('');
    if (step === 4 && !formData.description.trim()) {
      setErrorMessage('Please provide a brief description of your project goals.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrorMessage('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam honeypot check
    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    trackEvent({
      eventName: 'submit_project_brief_wizard',
      category: 'Conversion',
      label: formData.projectType,
      params: { budget: formData.budget }
    });

    // Simulate safe API dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        
        {/* Wizard Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <span className="text-sm font-extrabold text-white">Project Qualification Brief</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (5 Steps) */}
        {!submitted && (
          <div className="py-4 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round((step / 5) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Wizard Body Content */}
        <div className="py-6">
          
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Project Brief Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-sky-300 font-semibold">{sanitizeInput(formData.name)}</span>. I have received your project requirements and will review them shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-2xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all cursor-pointer shadow-lg shadow-sky-500/25"
                >
                  Close & Return to Site
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Error Message Toast */}
              {errorMessage && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Website Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">What type of website do you need?</h3>
                  <p className="text-xs text-slate-400">Select the primary category that best fits your business goals.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`p-4 rounded-2xl text-xs font-bold text-left transition-all border ${
                          formData.projectType === type
                            ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-lg shadow-sky-500/10'
                            : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Budget */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">What is your approximate budget?</h3>
                  <p className="text-xs text-slate-400">This helps tailor the feature scope to maximize your investment.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: opt })}
                        className={`p-4 rounded-2xl text-xs font-bold text-left transition-all border ${
                          formData.budget === opt
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400 shadow-lg shadow-indigo-500/10'
                            : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Launch Timeline */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">When do you want to launch?</h3>
                  <p className="text-xs text-slate-400">Select your preferred estimated target delivery date.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {timelineOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeline: opt })}
                        className={`p-4 rounded-2xl text-xs font-bold text-left transition-all border ${
                          formData.timeline === opt
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-lg shadow-emerald-500/10'
                            : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Project Details */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Tell me about your project</h3>
                  <p className="text-xs text-slate-400">Mention key features, target audience, or any existing website links.</p>
                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-4 rounded-2xl glass-input text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g. We are an agency launching a new service line. We need a fast modern website with contact form integration and dark aesthetic..."
                  />
                </div>
              )}

              {/* Step 5: Contact Info */}
              {step === 5 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Where should I send your proposal?</h3>
                  <p className="text-xs text-slate-400">Provide your contact details so I can get back to you within 24 hours.</p>

                  {/* Honeypot field for anti-spam */}
                  <input
                    type="text"
                    name="website_url_hp"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                        placeholder="Alex Johnson"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                        placeholder="alex@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp / Phone (Optional)</label>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>

        {/* Wizard Footer Navigation */}
        {!submitted && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:scale-[1.02] transition-all flex items-center gap-2 shadow-xl shadow-sky-500/25 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting Brief...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Project Brief</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
