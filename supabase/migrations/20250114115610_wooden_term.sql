/*
  # Update submissions table for anonymous submissions
  
  1. Changes
    - Make user_id column nullable
    - Remove foreign key constraint
    - Update RLS policies for anonymous submissions
*/

-- Make user_id nullable and remove foreign key constraint
ALTER TABLE submissions 
  ALTER COLUMN user_id DROP NOT NULL,
  DROP CONSTRAINT submissions_user_id_fkey;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view submissions" ON submissions;
DROP POLICY IF EXISTS "Users can create their own submissions" ON submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON submissions;
DROP POLICY IF EXISTS "Users can delete their own submissions" ON submissions;

-- Create new policies for anonymous access
CREATE POLICY "Anyone can view submissions"
  ON submissions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create submissions"
  ON submissions FOR INSERT
  WITH CHECK (true);