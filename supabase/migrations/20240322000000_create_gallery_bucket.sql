-- Create a new bucket for gallery media
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Create policy to allow public read access to gallery bucket
CREATE POLICY "Allow public read access to gallery"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- Create policy to allow authenticated users to upload to gallery
CREATE POLICY "Allow authenticated users to upload to gallery"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery');

-- Create policy to allow users to update their own uploads
CREATE POLICY "Allow users to update their own uploads"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'gallery' AND auth.uid() = owner);

-- Create policy to allow users to delete their own uploads
CREATE POLICY "Allow users to delete their own uploads"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery' AND auth.uid() = owner); 