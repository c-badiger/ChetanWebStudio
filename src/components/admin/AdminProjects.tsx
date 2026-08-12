import React, { useState, useEffect } from 'react';
import { projectsService } from '../../services/projects';
import { storageService } from '../../services/storage';
import type { Project } from '../../types/database';
import {
  FolderKanban,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Upload,
  X,
  Sparkles,
} from 'lucide-react';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await projectsService.getAllProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProject({
      title: '',
      slug: '',
      description: '',
      industry: '',
      project_type: 'Business',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      problem: '',
      solution: '',
      features: [],
      live_url: '',
      github_url: '',
      thumbnail_url: '',
      images: [],
      is_featured: false,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleTogglePublished = async (project: Project) => {
    const updatedStatus = !project.is_published;
    await projectsService.updateProject(project.id, { is_published: updatedStatus });
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, is_published: updatedStatus } : p))
    );
  };

  const handleToggleFeatured = async (project: Project) => {
    const updatedStatus = !project.is_featured;
    await projectsService.updateProject(project.id, { is_featured: updatedStatus });
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, is_featured: updatedStatus } : p))
    );
  };

  const handleDelete = async (id: string) => {
    await projectsService.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const { publicUrl } = await storageService.uploadImage(file, 'portfolio-images');
    setUploadingImage(false);

    if (publicUrl && editingProject) {
      setEditingProject({
        ...editingProject,
        thumbnail_url: publicUrl,
        images: [publicUrl],
      });
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    if (editingProject.id) {
      // Update
      await projectsService.updateProject(editingProject.id, editingProject);
    } else {
      // Create
      await projectsService.createProject(editingProject);
    }

    setIsModalOpen(false);
    setEditingProject(null);
    fetchProjects();
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-sky-400" />
            Portfolio Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add, edit, publish, or feature client projects displayed in the public portfolio section.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all cursor-pointer shadow-lg shadow-sky-500/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid Container */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-xs font-semibold">
          Loading portfolio projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3 bg-slate-900/20">
          <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No projects created yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click "Add New Project" to add your first portfolio case study.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl border border-slate-800/90 overflow-hidden flex flex-col justify-between group bg-slate-900/40 hover:border-sky-500/40 transition-all"
            >
              {/* Thumbnail / Header */}
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                {project.thumbnail_url ? (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold text-xs">
                    No Thumbnail Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />

                {/* Status Pills */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                      project.is_published
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-900/80 text-slate-400 border-slate-700'
                    }`}
                  >
                    {project.is_published ? 'Published' : 'Draft'}
                  </span>
                  {project.is_featured && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300" /> Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                    {project.project_type || 'Project'} • {project.industry || 'General'}
                  </span>
                  <h3 className="text-base font-extrabold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {project.description || 'No description available.'}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 pt-3">
                    {project.technologies?.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-300 bg-slate-950 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Toolbar */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePublished(project)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        project.is_published
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                          : 'text-slate-400 bg-slate-900 border-slate-800'
                      }`}
                      title={project.is_published ? 'Unpublish project' : 'Publish project'}
                    >
                      {project.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleToggleFeatured(project)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        project.is_featured
                          ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                          : 'text-slate-400 bg-slate-900 border-slate-800'
                      }`}
                      title={project.is_featured ? 'Remove featured' : 'Mark as featured'}
                    >
                      <Star className={`w-3.5 h-3.5 ${project.is_featured ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(project)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 transition-all cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 hover:border-rose-500/30 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal Drawer */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#090d16] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                {editingProject.id ? 'Edit Project' : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="e.g. Nexus Analytics Platform"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Industry</label>
                  <input
                    type="text"
                    value={editingProject.industry || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                    placeholder="e.g. SaaS & AI Technology"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Project Category</label>
                  <select
                    value={editingProject.project_type || 'Business'}
                    onChange={(e) => setEditingProject({ ...editingProject, project_type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-slate-800"
                  >
                    <option value="Business">Business</option>
                    <option value="Landing Pages">Landing Pages</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Web Apps">Web Apps</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={editingProject.technologies?.join(', ') || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    placeholder="React, TypeScript, Tailwind CSS"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Overview of the digital platform or website..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Client Problem / Challenge</label>
                  <textarea
                    rows={2}
                    value={editingProject.problem || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                    placeholder="Key problem faced by client..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Solution & Design Approach</label>
                  <textarea
                    rows={2}
                    value={editingProject.solution || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    placeholder="How the project solved the issue..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              {/* Image Upload / URL Input */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="font-semibold text-slate-300 block">Thumbnail Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.thumbnail_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail_url: e.target.value })}
                    placeholder="Image URL or upload file..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                  <label className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-sky-400" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-3 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_published ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked })}
                    className="rounded border-slate-800 text-sky-500 focus:ring-sky-500"
                  />
                  <span className="font-bold text-slate-300">Published Publicly</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured ?? false}
                    onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                    className="rounded border-slate-800 text-sky-500 focus:ring-sky-500"
                  />
                  <span className="font-bold text-slate-300">Highlight as Featured</span>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20"
                >
                  Save Project
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-sm w-full bg-[#090d16] border border-slate-800 rounded-3xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">Delete Project?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this portfolio project from the database?
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
