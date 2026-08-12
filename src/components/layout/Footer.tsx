import React from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { scrollToSection } from '../../utils/helpers';
import { Sparkles, Mail, MessageSquare } from 'lucide-react';


interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenWizard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenWizard }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06080f] text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 p-0.5 shadow-lg shadow-sky-500/20">
                <div className="w-full h-full bg-[#06080f] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                {SITE_CONFIG.personal.name}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {SITE_CONFIG.personal.profession}. Designing and building modern, high-converting websites for startups and personal brands.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a
                href={SITE_CONFIG.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.personal.email}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.personal.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                aria-label="WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-sky-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-sky-400 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('projects')} className="hover:text-sky-400 transition-colors">
                  Portfolio Projects
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('why-me')} className="hover:text-sky-400 transition-colors">
                  Why Work With Me
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('process')} className="hover:text-sky-400 transition-colors">
                  Work Process
                </button>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block">
              Services
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-sky-400 transition-colors">
                  Website Design
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-sky-400 transition-colors">
                  Website Development
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-sky-400 transition-colors">
                  Landing Pages
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-sky-400 transition-colors">
                  UI/UX Design
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-sky-400 transition-colors">
                  Website Redesign
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Action */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block">
              Get Started
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ready for a custom website quote?
            </p>
            <button
              onClick={onOpenWizard}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all shadow-md shadow-sky-500/20 cursor-pointer"
            >
              <span>Start a Project</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-300 text-center sm:text-left">
            © {currentYear} {SITE_CONFIG.personal.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-slate-300">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
