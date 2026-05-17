-- Drop existing table if it exists
DROP TABLE IF EXISTS categories CASCADE;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Insert sample categories
INSERT INTO categories (name) VALUES
  ('Environmental'),
  ('Educational'),
  ('Community Service'),
  ('Health and Wellness'),
  ('Disaster Relief');