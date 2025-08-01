-- Create INSERT policy for creators table to allow authenticated users to create their own records
CREATE POLICY "Users can insert their own creator record" 
ON public.creators
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid()::text = id::text);