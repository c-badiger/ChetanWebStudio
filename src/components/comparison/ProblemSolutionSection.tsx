import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { XCircle, CheckCircle2, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { scrollToSection } from '../../utils/helpers';

export const ProblemSolutionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'solution' | 'problem'>('solution');

  return (
    <section className="py-24 relative bg-[#090d16]/95 border-y border-slate-800/80 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            Conversion Strategy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {SITE_CONFIG.problemSolution.heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {SITE_CONFIG.problemSolution.subheading}
          </p>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex md:hidden justify-center mb-8">
          <div className="p-1 rounded-xl glass-panel flex gap-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'problem'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400'
              }`}
            >
              Old Website Problems
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'solution'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400'
              }`}
            >
              My Modern Solution
            </button>
          </div>
        </div>

        {/* Grid Container for Before vs After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Column 1: The Problem (Outdated Website) */}
          <div
            className={`glass-panel rounded-3xl p-8 border border-rose-500/20 bg-slate-950/70 shadow-xl transition-all ${
              activeTab === 'problem' ? 'block' : 'hidden md:block opacity-75 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-500/20">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-300">Outdated Website Experience</h3>
                <p className="text-xs text-slate-400">Why visitors abandon traditional websites</p>
              </div>
            </div>

            <div className="space-y-4">
              {SITE_CONFIG.problemSolution.problems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 text-center">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                Result of Old Site:
              </span>
              <p className="text-xs text-slate-300">
                High bounce rate, lost ad budget, low brand trust, and zero inquiries.
              </p>
            </div>
          </div>

          {/* Column 2: The Solution (My Modern Web Platform) */}
          <div
            className={`glass-panel rounded-3xl p-8 border border-emerald-500/30 bg-slate-900/90 shadow-2xl relative overflow-hidden transition-all ${
              activeTab === 'solution' ? 'block' : 'hidden md:block'
            }`}
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-300">My Modern High-Converting Solution</h3>
                  <p className="text-xs text-slate-400">Engineered for client inquiries & growth</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                High ROI
              </span>
            </div>

            <div className="space-y-4">
              {SITE_CONFIG.problemSolution.solutions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-200">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                  The Outcome:
                </span>
                <p className="text-xs text-slate-300">
                  Higher conversion rates & consistent inquiries.
                </p>
              </div>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <span>Upgrade Your Site</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
