import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { Code2, Palette, FileJson, FileCode, Atom, Layers, Wand2, Server, Cpu, Database, PenTool, GitBranch } from 'lucide-react';


export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'UI/UX & Tools'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-orange-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-sky-400" />;
      case 'FileJson': return <FileJson className="w-5 h-5 text-amber-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-blue-400" />;
      case 'Atom': return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-white" />;
      case 'Wand2': return <Wand2 className="w-5 h-5 text-teal-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-gray-300" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-500" />;
      case 'Figma': return <PenTool className="w-5 h-5 text-purple-400" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-rose-400" />;
      default: return <Code2 className="w-5 h-5 text-sky-400" />;
    }
  };

  const filteredTech = activeCategory === 'All'
    ? SITE_CONFIG.techStack
    : SITE_CONFIG.techStack.filter(t => t.category === activeCategory);

  return (
    <section id="tech-stack" className="py-24 relative bg-[#090d16]/90 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            Technical Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Modern Web Technologies & Tools
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Battle-tested frameworks and production tools engineered for high performance and scalability.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400'
                  : 'glass-panel text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredTech.map((tech, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col items-center justify-center text-center space-y-3 group hover:border-purple-500/40 bg-slate-900/40"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                {getIcon(tech.icon)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
