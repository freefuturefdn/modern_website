-- Create the website-images bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('website-images', 'website-images', true);

-- Ensure the bucket is public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'website-images';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to website-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload to website-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own uploads in website-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own uploads in website-images" ON storage.objects;

-- Create policy to allow public read access to website-images bucket
CREATE POLICY "Allow public read access to website-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'website-images');

-- Create policy to allow authenticated users to upload to website-images
CREATE POLICY "Allow authenticated users to upload to website-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-images');

-- Create policy to allow users to update their own uploads
CREATE POLICY "Allow users to update their own uploads in website-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'website-images' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'website-images' AND auth.uid() = owner);

-- Create policy to allow users to delete their own uploads
CREATE POLICY "Allow users to delete their own uploads in website-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'website-images' AND auth.uid() = owner); 