import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { scrollToSection } from '../../utils/helpers';
import { trackEvent } from '../../utils/analytics';
import { Menu, X, Sparkles, Send } from 'lucide-react';

interface NavbarProps {
  onOpenWizard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWizard }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: 'services' },
    { label: 'Projects', href: 'projects' },
    { label: 'Why Me', href: 'why-me' },
    { label: 'Process', href: 'process' },
    { label: 'Tech Stack', href: 'tech-stack' },
    { label: 'Pricing', href: 'pricing' },
    { label: 'Payment', href: 'payment' },
    { label: 'FAQ', href: 'faq' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setMobileMenuOpen(false);
    trackEvent({
      eventName: 'nav_click',
      category: 'Navigation',
      label: href
    });
  };

  const handleCtaClick = () => {
    onOpenWizard();
    setMobileMenuOpen(false);
    trackEvent({
      eventName: 'navbar_cta_click',
      category: 'Conversion',
      label: "Let's Work Together"
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090d16]/85 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-xl shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 p-0.5 shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white block leading-none">
                {SITE_CONFIG.personal.name}
              </span>
              <span className="text-[11px] font-medium text-sky-400 tracking-wider uppercase block mt-1">
                Web Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 glass-panel rounded-full px-5 py-2 border border-slate-800/80">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 rounded-full transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleCtaClick}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 rounded-full shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Let's Work Together</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#090d16]/95 backdrop-blur-xl border-b border-slate-800 py-6 px-6 shadow-2xl transition-all duration-300 z-50">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-2.5 text-base font-medium text-slate-200 hover:text-sky-400 hover:bg-slate-800/60 rounded-xl transition-all"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 mt-2 border-t border-slate-800/80">
              <button
                onClick={handleCtaClick}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-base font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl shadow-lg shadow-sky-500/20"
              >
                <Send className="w-5 h-5" />
                <span>Start a Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
