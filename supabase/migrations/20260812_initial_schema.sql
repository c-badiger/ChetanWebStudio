-- ====================================================================
-- CHETAN WEB STUDIO - SUPABASE DATABASE INITIAL SCHEMA & MIGRATION
-- ====================================================================

-- Enable pgcrypto extension for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- 0. TABLE: admin_users
--    Stores the auth.uid() of every user granted admin privileges.
--    Only a user whose UUID appears in this table can pass is_admin().
--    Populate this after creating your admin user in Supabase Auth.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- RLS for admin_users:
-- - Authenticated users can only read their own row (to self-check).
-- - No one can insert/update/delete via client API; manage via Supabase dashboard only.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can read own row" ON public.admin_users;
CREATE POLICY "Admin users can read own row"
    ON public.admin_users FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

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
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    whatsapp TEXT DEFAULT '',
    linkedin TEXT DEFAULT '',
    github TEXT DEFAULT '',
    upi_id TEXT DEFAULT '',
    upi_qr_url TEXT,
    location TEXT DEFAULT '',
    portfolio_url TEXT DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Seed default site settings row if absent (without hardcoded placeholders)
INSERT INTO public.site_settings (id, name, email, whatsapp, linkedin, github, upi_id, location, portfolio_url)
VALUES ('default', '', '', '', '', '', '', '', '')
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

DROP TRIGGER IF EXISTS update_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- --------------------------------------------------------------------
-- 5. SECURE ADMIN AUTHORIZATION HELPER FUNCTION
--
--    Checks whether the currently authenticated user's UUID exists in
--    the admin_users table. Returns FALSE for unauthenticated callers
--    and for any authenticated user not explicitly listed as an admin.
--
--    SECURITY DEFINER allows the function to query admin_users even
--    when the calling role cannot otherwise read that table directly.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    -- Reject unauthenticated or anonymous callers immediately
    IF auth.role() <> 'authenticated' OR auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Perform a lookup: only returns TRUE if this exact user_id is in admin_users
    RETURN EXISTS (
        SELECT 1
        FROM public.admin_users
        WHERE user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- --------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- ---- inquiries ----
-- Anyone (anonymous public) may submit an inquiry.
DROP POLICY IF EXISTS "Allow public insert for inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert for inquiries"
    ON public.inquiries FOR INSERT
    TO public
    WITH CHECK (true);

-- Only the admin may read, update, or delete inquiries.
DROP POLICY IF EXISTS "Allow admin full access to inquiries" ON public.inquiries;
CREATE POLICY "Allow admin full access to inquiries"
    ON public.inquiries FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ---- reviews ----
-- Anyone may read published reviews.
DROP POLICY IF EXISTS "Allow public select for published reviews" ON public.reviews;
CREATE POLICY "Allow public select for published reviews"
    ON public.reviews FOR SELECT
    TO public
    USING (is_published = true);

-- Only the admin may create, update, or delete reviews (including unpublished).
DROP POLICY IF EXISTS "Allow admin full access to reviews" ON public.reviews;
CREATE POLICY "Allow admin full access to reviews"
    ON public.reviews FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ---- projects ----
-- Anyone may read published projects.
DROP POLICY IF EXISTS "Allow public select for published projects" ON public.projects;
CREATE POLICY "Allow public select for published projects"
    ON public.projects FOR SELECT
    TO public
    USING (is_published = true);

-- Only the admin may create, update, or delete projects (including unpublished).
DROP POLICY IF EXISTS "Allow admin full access to projects" ON public.projects;
CREATE POLICY "Allow admin full access to projects"
    ON public.projects FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ---- site_settings ----
-- Anyone may read site settings (e.g. UPI ID for payment section).
DROP POLICY IF EXISTS "Allow public read for site settings" ON public.site_settings;
CREATE POLICY "Allow public read for site settings"
    ON public.site_settings FOR SELECT
    TO public
    USING (true);

-- Only the admin may update site settings.
DROP POLICY IF EXISTS "Allow admin update for site settings" ON public.site_settings;
CREATE POLICY "Allow admin update for site settings"
    ON public.site_settings FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------
-- 7. STORAGE BUCKETS SETUP & SECURITY POLICIES
-- --------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES
    ('portfolio-images', 'portfolio-images', true),
    ('review-avatars',   'review-avatars',   true),
    ('site-assets',      'site-assets',      true)
ON CONFLICT (id) DO NOTHING;

-- Public may read files from all buckets (thumbnails, avatars, etc.)
DROP POLICY IF EXISTS "Public Read Access for Storage" ON storage.objects;
CREATE POLICY "Public Read Access for Storage"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id IN ('portfolio-images', 'review-avatars', 'site-assets'));

-- Only the admin may upload files
DROP POLICY IF EXISTS "Admin Insert Storage Objects" ON storage.objects;
CREATE POLICY "Admin Insert Storage Objects"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id IN ('portfolio-images', 'review-avatars', 'site-assets')
        AND public.is_admin()
    );

-- Only the admin may overwrite files
DROP POLICY IF EXISTS "Admin Update Storage Objects" ON storage.objects;
CREATE POLICY "Admin Update Storage Objects"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id IN ('portfolio-images', 'review-avatars', 'site-assets')
        AND public.is_admin()
    );

-- Only the admin may delete files
DROP POLICY IF EXISTS "Admin Delete Storage Objects" ON storage.objects;
CREATE POLICY "Admin Delete Storage Objects"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id IN ('portfolio-images', 'review-avatars', 'site-assets')
        AND public.is_admin()
    );

-- ====================================================================
-- POST-MIGRATION STEPS (run manually in Supabase Dashboard):
--
-- 1. Create your admin user in Authentication -> Users -> Invite user
-- 2. Copy the UUID from the Users list
-- 3. Run in SQL Editor:
--       INSERT INTO public.admin_users (user_id)
--       VALUES ('<paste-your-uuid-here>');
-- 4. That user is now the sole admin. All RLS checks will enforce this.
-- ====================================================================
