-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    video_url TEXT,
    type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
    event_id BIGINT REFERENCES events(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES auth.users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gallery_type ON gallery(type);
CREATE INDEX IF NOT EXISTS idx_gallery_event_id ON gallery(event_id);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at);
CREATE INDEX IF NOT EXISTS idx_gallery_status ON gallery(status);
CREATE INDEX IF NOT EXISTS idx_gallery_created_by ON gallery(created_by);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_gallery_updated_at
    BEFORE UPDATE ON gallery
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for published items
CREATE POLICY "Allow public read access for published items"
    ON gallery
    FOR SELECT
    TO public
    USING (status = 'published');

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert"
    ON gallery
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Create policy to allow users to update their own items
CREATE POLICY "Allow users to update their own items"
    ON gallery
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

-- Create policy to allow users to delete their own items
CREATE POLICY "Allow users to delete their own items"
    ON gallery
    FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by);

-- Insert sample data
INSERT INTO gallery (
    title,
    description,
    image_url,
    type,
    event_id,
    created_at,
    status
) VALUES
(
    'Economic Freedom Summit 2024',
    'Highlights from our annual summit featuring speakers from around the world discussing economic liberty.',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070',
    'image',
    1,
    '2024-03-21',
    'published'
),
(
    'Youth Leadership Workshop in Abuja',
    'A hands-on workshop teaching advocacy skills to young Nigerians passionate about freedom.',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
    'image',
    2,
    '2024-03-20',
    'published'
),
(
    'Interview with Kelechi Nwannunu',
    'Our founder discusses the importance of empowering Nigerian youth with knowledge about freedom and individual rights.',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069',
    'video',
    NULL,
    '2024-03-19',
    'published'
); 