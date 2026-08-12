-- ====================================================================
-- CHETAN WEB STUDIO - SUPABASE DATABASE INITIAL SCHEMA & MIGRATION
-- ====================================================================

-- Enable pgcrypto extension for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- 1. TABLE: inquiries
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    business_name TEXT,
    website_url TEXT,
    project_type TEXT NOT NULL,
    budget_range TEXT,
    deadline TEXT,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for inquiries
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);

-- --------------------------------------------------------------------
-- 2. TABLE: reviews
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    business_name TEXT,
    role TEXT,
    testimonial TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    profile_image_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for reviews
CREATE INDEX IF NOT EXISTS idx_reviews_is_published ON public.reviews(is_published);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- --------------------------------------------------------------------
-- 3. TABLE: projects
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    industry TEXT,
    project_type TEXT,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    problem TEXT,
    solution TEXT,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    live_url TEXT,
    github_url TEXT,
    thumbnail_url TEXT,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for projects
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured);

-- --------------------------------------------------------------------
-- 4. TABLE: site_settings
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    name TEXT NOT NULL DEFAULT 'Chetan Badiger',
    email TEXT NOT NULL DEFAULT 'chetanwebstudio@example.com',
    whatsapp TEXT DEFAULT '+919380897891',
    linkedin TEXT DEFAULT 'https://linkedin.com/in/chetanwebstudio',
    github TEXT DEFAULT 'https://github.com/chetanwebstudio',
    upi_id TEXT DEFAULT 'chetanwebstudio@upi',
    upi_qr_url TEXT,
    location TEXT DEFAULT 'India',
    portfolio_url TEXT DEFAULT 'https://chetanwebstudio.com',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Seed default site settings row if absent
INSERT INTO public.site_settings (id, name, email, whatsapp, linkedin, github, upi_id, location)
VALUES ('default', 'Chetan Badiger', 'chetanwebstudio@example.com', '+919380897891', 'https://linkedin.com/in/chetanwebstudio', 'https://github.com/chetanwebstudio', 'chetanwebstudio@upi', 'India')
ON CONFLICT (id) DO NOTHING;

-- --------------------------------------------------------------------
-- AUTOMATIC updated_at TRIGGER FUNCTION
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- --------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR: inquiries
-- Anyone can submit a public inquiry
CREATE POLICY "Allow public insert for inquiries"
    ON public.inquiries FOR INSERT
    TO public
    WITH CHECK (true);

-- Authenticated admins can view, update, delete inquiries
CREATE POLICY "Allow admin full access to inquiries"
    ON public.inquiries FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- POLICIES FOR: reviews
-- Anyone can view published reviews
CREATE POLICY "Allow public select for published reviews"
    ON public.reviews FOR SELECT
    TO public
    USING (is_published = true);

-- Authenticated admins can manage all reviews
CREATE POLICY "Allow admin full access to reviews"
    ON public.reviews FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- POLICIES FOR: projects
-- Anyone can view published projects
CREATE POLICY "Allow public select for published projects"
    ON public.projects FOR SELECT
    TO public
    USING (is_published = true);

-- Authenticated admins can manage all projects
CREATE POLICY "Allow admin full access to projects"
    ON public.projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- POLICIES FOR: site_settings
-- Anyone can read site settings
CREATE POLICY "Allow public read for site settings"
    ON public.site_settings FOR SELECT
    TO public
    USING (true);

-- Authenticated admins can modify site settings
CREATE POLICY "Allow admin update for site settings"
    ON public.site_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- --------------------------------------------------------------------
-- 6. STORAGE BUCKETS SETUP
-- --------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('portfolio-images', 'portfolio-images', true),
    ('review-avatars', 'review-avatars', true),
    ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Read Access for Storage"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id IN ('portfolio-images', 'review-avatars', 'site-assets'));

CREATE POLICY "Admin Insert Storage Objects"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id IN ('portfolio-images', 'review-avatars', 'site-assets'));

CREATE POLICY "Admin Update Storage Objects"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id IN ('portfolio-images', 'review-avatars', 'site-assets'));

CREATE POLICY "Admin Delete Storage Objects"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id IN ('portfolio-images', 'review-avatars', 'site-assets'));
