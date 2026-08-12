import React from 'react';
import type { ProjectItem } from '../../config/siteData';
import { X, CheckCircle2, Target, Code, Layers, Sparkles, ExternalLink } from 'lucide-react';


interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenWizard: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onOpenWizard }) => {
  if (!project || !project.caseStudy) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md">
          <div>
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
              Case Study Showcase
            </span>
            <h2 className="text-lg font-extrabold text-white">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-all focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Main Visual Image Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 sm:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-slate-900/80 border border-slate-700 backdrop-blur-md">
                Industry: {project.industry}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-300 bg-sky-500/20 border border-sky-500/30 backdrop-blur-md">
                Client: {caseStudy.clientType}
              </span>
            </div>
          </div>

          {/* Overview & Quick Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                Project Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {caseStudy.overview}
              </p>
            </div>
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-200 bg-slate-800/80 border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Problem & Strategic Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                The Client Problem
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Strategic Objectives
              </h4>
              <div className="space-y-2">
                {caseStudy.goals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Design & Development Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
              <h4 className="text-base font-bold text-sky-300 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Design Approach
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {caseStudy.designApproach}
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
              <h4 className="text-base font-bold text-indigo-300 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Development Approach
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {caseStudy.devApproach}
              </p>
            </div>
          </div>

          {/* Key Deliverables & Takeaway */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-purple-950/40 border border-sky-800/40 space-y-3">
            <h4 className="text-sm font-bold text-sky-200">Key Outcomes & Takeaway</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {caseStudy.takeaways}
            </p>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Need a similar website designed for your business?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenWizard();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
            >
              <span>Build Similar Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
