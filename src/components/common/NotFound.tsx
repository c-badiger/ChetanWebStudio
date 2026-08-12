import React from 'react';
import { Home, ArrowRight, AlertCircle } from 'lucide-react';
import { scrollToSection } from '../../utils/helpers';

interface NotFoundProps {
  onGoHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090d16] px-4 py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md mx-auto text-center space-y-6 relative z-10 glass-panel rounded-3xl p-10 border border-slate-800 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-gradient-accent">404</span>
          <h1 className="text-2xl font-bold text-white">Looks like this page went offline.</h1>
          <p className="text-xs text-slate-400">The link you followed might be broken or the page has been moved.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onGoHome}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Back Home</span>
          </button>
          
          <button
            onClick={() => {
              onGoHome();
              setTimeout(() => scrollToSection('projects'), 100);
            }}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
