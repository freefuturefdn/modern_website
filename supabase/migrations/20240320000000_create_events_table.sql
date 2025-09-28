-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES auth.users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived', 'cancelled')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
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

-- Create policy to allow public read access for published items
CREATE POLICY "Allow public read access for published items"
    ON events
    FOR SELECT
    TO public
    USING (status = 'published');

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
    start_date,
    end_date,
    location,
    image_url,
    created_at,
    status
) VALUES
(
    'Economic Freedom Summit 2024',
    'Join us for our annual summit featuring speakers from around the world discussing economic liberty and its impact on society.',
    '2024-05-15 09:00:00+00',
    '2024-05-17 17:00:00+00',
    'Lagos, Nigeria',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070',
    '2024-03-21',
    'published'
),
(
    'Youth Leadership Workshop',
    'A hands-on workshop teaching advocacy skills to young Nigerians passionate about freedom and individual rights.',
    '2024-04-10 10:00:00+00',
    '2024-04-10 16:00:00+00',
    'Abuja, Nigeria',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
    '2024-03-20',
    'published'
); 