import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import type { ProjectItem } from '../../config/siteData';
import { CaseStudyModal } from './CaseStudyModal';
import { trackEvent } from '../../utils/analytics';
import { BookOpen, ArrowUpRight } from 'lucide-react';


interface PortfolioSectionProps {
  onOpenWizard: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenWizard }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Business', 'Landing Pages', 'UI/UX', 'Web Apps'];

  const filteredProjects = activeFilter === 'All'
    ? SITE_CONFIG.projects
    : SITE_CONFIG.projects.filter(p => p.category === activeFilter);

  const handleFilterClick = (cat: string) => {
    setActiveFilter(cat);
    trackEvent({
      eventName: 'portfolio_filter_click',
      category: 'Interaction',
      label: cat
    });
  };

  const handleOpenCaseStudy = (project: ProjectItem) => {
    setSelectedProject(project);
    trackEvent({
      eventName: 'open_case_study',
      category: 'Engagement',
      label: project.title
    });
  };

  return (
    <section id="projects" className="py-24 relative bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            High-Converting Projects & Case Studies
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Explore recent digital platforms, landing pages, and web applications built for business impact.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border border-sky-400'
                  : 'glass-panel text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800/90 flex flex-col justify-between group hover:border-sky-500/40"
            >
              {/* Project Image Header */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />
                
                {/* Category Badge Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white bg-slate-900/80 border border-slate-700 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block mb-1">
                    {project.industry}
                  </span>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Objective:
                    </span>
                    <p className="text-xs text-slate-300">
                      {project.objective}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-300 bg-slate-900 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenCaseStudy(project)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800/90 border border-slate-700/80 hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Case Study</span>
                  </button>

                  <button
                    onClick={() => handleOpenCaseStudy(project)}
                    className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:text-white bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 transition-all cursor-pointer"
                    title="Quick Details"
                  >
                    <ArrowUpRight className="w-4 h-4 text-sky-400" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenWizard={onOpenWizard}
      />
    </section>
  );
};
