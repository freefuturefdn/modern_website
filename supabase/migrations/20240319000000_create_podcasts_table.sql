-- Create podcasts table
CREATE TABLE IF NOT EXISTS podcasts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    episode_number INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('FREEDOM', 'LEADERSHIP', 'ADVOCACY', 'GLOBAL')),
    image_url TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    duration VARCHAR(10) NOT NULL,
    host VARCHAR(100) NOT NULL,
    guests TEXT[] NOT NULL DEFAULT '{}',
    published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    featured BOOLEAN NOT NULL DEFAULT false,
    listen_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on episode_number for faster sorting
CREATE INDEX IF NOT EXISTS idx_podcasts_episode_number ON podcasts(episode_number);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_podcasts_category ON podcasts(category);

-- Create index on published_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_podcasts_published_at ON podcasts(published_at);

-- Create index on featured for faster filtering
CREATE INDEX IF NOT EXISTS idx_podcasts_featured ON podcasts(featured);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_podcasts_updated_at
    BEFORE UPDATE ON podcasts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
    ON podcasts
    FOR SELECT
    TO public
    USING (true);

-- Create policy to allow authenticated users to update listen_count
CREATE POLICY "Allow authenticated users to update listen_count"
    ON podcasts
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert"
    ON podcasts
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated users to delete"
    ON podcasts
    FOR DELETE
    TO authenticated
    USING (true); 