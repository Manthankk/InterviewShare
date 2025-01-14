/*
  # Create submissions table for interview experiences

  1. New Tables
    - `submissions`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `name` (text)
      - `country` (text)
      - `company` (text)
      - `questions` (array of text)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on submissions table
    - Add policies for:
      - Users can read all submissions
      - Users can only create/update/delete their own submissions
*/

CREATE TABLE submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  name text NOT NULL,
  country text NOT NULL,
  company text NOT NULL,
  questions text[] NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view submissions"
  ON submissions
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own submissions"
  ON submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
  ON submissions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own submissions"
  ON submissions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();