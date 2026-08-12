import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Project } from '../types/database';
import { SITE_CONFIG } from '../config/siteData';

// Map initial SITE_CONFIG projects to Project model format for fallback
const mockProjects: Project[] = SITE_CONFIG.projects.map((p) => ({
  id: p.id,
  title: p.title,
  slug: p.id,
  description: p.description,
  industry: p.industry,
  project_type: p.category,
  technologies: p.technologies || [],
  problem: p.caseStudy?.problem || p.objective,
  solution: p.caseStudy?.designApproach || '',
  features: p.caseStudy?.features || [],
  live_url: '',
  github_url: '',
  thumbnail_url: p.image,
  images: [p.image],
  is_featured: true,
  is_published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

let localProjects: Project[] = [...mockProjects];

export const projectsService = {
  /**
   * Fetch only published projects for public portfolio
   */
  async getPublishedProjects(): Promise<{ data: Project[]; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        return { data: localProjects.filter((p) => p.is_published), error: null };
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : localProjects, error: null };
    } catch (err: any) {
      console.error('Error fetching published projects:', err);
      return { data: localProjects, error: null };
    }
  },

  /**
   * Fetch all projects for admin management
   */
  async getAllProjects(): Promise<{ data: Project[]; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        return { data: localProjects, error: null };
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err: any) {
      console.error('Error fetching all projects:', err);
      return { data: localProjects, error: null };
    }
  },

  /**
   * Create a new project (Admin)
   */
  async createProject(projectData: Partial<Project>): Promise<{ data: Project | null; error: Error | null }> {
    try {
      const slug = projectData.slug || projectData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `project-${Date.now()}`;

      if (!isSupabaseConfigured()) {
        const newProj: Project = {
          id: 'proj-' + Date.now(),
          title: projectData.title || 'Untitled Project',
          slug,
          description: projectData.description || null,
          industry: projectData.industry || null,
          project_type: projectData.project_type || 'Business',
          technologies: projectData.technologies || [],
          problem: projectData.problem || null,
          solution: projectData.solution || null,
          features: projectData.features || [],
          live_url: projectData.live_url || null,
          github_url: projectData.github_url || null,
          thumbnail_url: projectData.thumbnail_url || null,
          images: projectData.images || [],
          is_featured: projectData.is_featured ?? false,
          is_published: projectData.is_published ?? true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        localProjects.unshift(newProj);
        return { data: newProj, error: null };
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title: projectData.title,
            slug,
            description: projectData.description || null,
            industry: projectData.industry || null,
            project_type: projectData.project_type || null,
            technologies: projectData.technologies || [],
            problem: projectData.problem || null,
            solution: projectData.solution || null,
            features: projectData.features || [],
            live_url: projectData.live_url || null,
            github_url: projectData.github_url || null,
            thumbnail_url: projectData.thumbnail_url || null,
            images: projectData.images || [],
            is_featured: projectData.is_featured ?? false,
            is_published: projectData.is_published ?? true,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err: any) {
      console.error('Error creating project:', err);
      return { data: null, error: err };
    }
  },

  /**
   * Update an existing project (Admin)
   */
  async updateProject(id: string, updates: Partial<Project>): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        localProjects = localProjects.map((p) => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p));
        return { error: null };
      }

      const { error } = await supabase
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.error('Error updating project:', err);
      return { error: err };
    }
  },

  /**
   * Delete a project (Admin)
   */
  async deleteProject(id: string): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        localProjects = localProjects.filter((p) => p.id !== id);
        return { error: null };
      }

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.error('Error deleting project:', err);
      return { error: err };
    }
  },
};
