export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'rejected';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  business_name?: string | null;
  website_url?: string | null;
  project_type: string;
  budget_range?: string | null;
  deadline?: string | null;
  description: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  client_name: string;
  business_name?: string | null;
  role?: string | null;
  testimonial: string;
  rating: number; // 1 to 5
  profile_image_url?: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectCaseStudy {
  overview?: string;
  clientType?: string;
  problem?: string;
  goals?: string[];
  designApproach?: string;
  devApproach?: string;
  features?: string[];
  takeaways?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  industry?: string | null;
  project_type?: string | null;
  technologies: string[];
  problem?: string | null;
  solution?: string | null;
  features: string[];
  live_url?: string | null;
  github_url?: string | null;
  thumbnail_url?: string | null;
  images: string[];
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  upi_id: string;
  upi_qr_url?: string | null;
  location: string;
  portfolio_url?: string | null;
  updated_at?: string;
}

export interface CreateInquiryInput {
  name: string;
  email: string;
  business_name?: string;
  website_url?: string;
  project_type: string;
  budget_range?: string;
  deadline?: string;
  description: string;
}
