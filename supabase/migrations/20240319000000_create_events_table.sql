-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT,
    registration_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    category VARCHAR(50) NOT NULL,
    resources JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES auth.users(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_is_featured ON events(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
    ON events
    FOR SELECT
    TO public
    USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert"
    ON events
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Create policy to allow users to update their own items
CREATE POLICY "Allow users to update their own items"
    ON events
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

-- Create policy to allow users to delete their own items
CREATE POLICY "Allow users to delete their own items"
    ON events
    FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by);

-- Insert sample data
INSERT INTO events (
    title,
    description,
    location,
    start_date,
    end_date,
    image_url,
    registration_url,
    is_featured,
    max_attendees,
    category,
    status,
    resources
) VALUES
(
    'Economic Freedom Summit 2024',
    'Join us for our annual summit featuring speakers from around the world discussing economic liberty. This three-day event will include keynote speeches, panel discussions, workshops, and networking opportunities.',
    'Lagos, Nigeria',
    '2024-05-15 09:00:00+00',
    '2024-05-17 17:00:00+00',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070',
    '/events/register/1',
    true,
    500,
    'Conference',
    'upcoming',
    '[
        {"title": "Summit Presentations", "type": "slides", "url": "#"},
        {"title": "Event Photos", "type": "photos", "url": "#"},
        {"title": "Summary Report", "type": "report", "url": "#"}
    ]'
),
(
    'Youth Leadership Workshop',
    'A hands-on workshop teaching advocacy skills to young Nigerians passionate about freedom. Participants will learn effective communication, community organizing, and policy analysis techniques.',
    'Abuja, Nigeria',
    '2024-04-10 10:00:00+00',
    '2024-04-10 16:00:00+00',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
    '/events/register/2',
    false,
    100,
    'Workshop',
    'upcoming',
    '[
        {"title": "Workshop Materials", "type": "slides", "url": "#"},
        {"title": "Event Photos", "type": "photos", "url": "#"}
    ]'
),
(
    'Economic Freedom Summit 2023',
    'Our annual summit featuring speakers from around the world discussing economic liberty and policy reform.',
    'Lagos, Nigeria',
    '2023-05-15 09:00:00+00',
    '2023-05-17 17:00:00+00',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070',
    NULL,
    false,
    500,
    'Conference',
    'completed',
    '[
        {"title": "Summit Presentations", "type": "slides", "url": "#"},
        {"title": "Event Photos", "type": "photos", "url": "#"},
        {"title": "Summary Report", "type": "report", "url": "#"}
    ]'
),
(
    'Youth Leadership Workshop 2023',
    'A hands-on workshop teaching advocacy skills to young Nigerians passionate about freedom.',
    'Abuja, Nigeria',
    '2023-04-10 10:00:00+00',
    '2023-04-10 16:00:00+00',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
    NULL,
    false,
    100,
    'Workshop',
    'completed',
    '[
        {"title": "Workshop Materials", "type": "slides", "url": "#"},
        {"title": "Event Photos", "type": "photos", "url": "#"}
    ]'
),
(
    'New Year Policy Forum 2025',
    'Start the new year with a deep dive into policy reforms and economic freedom. This forum brings together policymakers, economists, and activists to discuss and shape Nigeria''s economic future.',
    'Lagos, Nigeria',
    '2025-01-15 09:00:00+00',
    '2025-01-16 17:00:00+00',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
    '/events/register/5',
    true,
    300,
    'Forum',
    'upcoming',
    '[
        {"title": "Policy Brief", "type": "document", "url": "#"},
        {"title": "Forum Materials", "type": "slides", "url": "#"}
    ]'
),
(
    'Digital Advocacy Bootcamp',
    'A comprehensive bootcamp focused on leveraging digital tools for effective advocacy. Learn social media strategy, content creation, and online community building in the digital age.',
    'Port Harcourt, Nigeria',
    '2025-06-05 09:00:00+00',
    '2025-06-07 17:00:00+00',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070',
    '/events/register/6',
    false,
    150,
    'Bootcamp',
    'upcoming',
    '[
        {"title": "Digital Tools Guide", "type": "document", "url": "#"},
        {"title": "Workshop Materials", "type": "slides", "url": "#"},
        {"title": "Resource Pack", "type": "package", "url": "#"}
    ]'
),
(
    'Economic Freedom Summit 2025',
    'Our flagship annual summit returns with an expanded program featuring international speakers, interactive workshops, and networking opportunities. Join us for three days of learning, discussion, and action.',
    'Abuja, Nigeria',
    '2025-06-20 09:00:00+00',
    '2025-06-22 17:00:00+00',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070',
    '/events/register/7',
    true,
    600,
    'Conference',
    'upcoming',
    '[
        {"title": "Summit Agenda", "type": "document", "url": "#"},
        {"title": "Speaker Profiles", "type": "document", "url": "#"},
        {"title": "Workshop Materials", "type": "slides", "url": "#"}
    ]'
); 