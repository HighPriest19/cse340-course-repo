-- Drop existing tables if they exist
DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create organizations table
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL
);

-- Create projects/service projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  organization_id INT NOT NULL REFERENCES organizations(id)
);

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Create junction table for many-to-many relationship
CREATE TABLE project_categories (
  project_id INT NOT NULL REFERENCES projects(id),
  category_id INT NOT NULL REFERENCES categories(id),
  PRIMARY KEY (project_id, category_id)
);

-- Insert sample organizations
INSERT INTO organizations (name, description) VALUES
  ('Habitat for Humanity', 'Building homes and communities'),
  ('Red Cross', 'Humanitarian assistance and disaster relief'),
  ('Local Food Bank', 'Fighting hunger in our community');

-- Insert sample projects
INSERT INTO projects (name, description, organization_id) VALUES
  ('Park Clean-up', 'Help clean and maintain local parks', 1),
  ('Home Building', 'Assist in building homes for families in need', 1),
  ('Disaster Relief', 'Provide aid to disaster-affected communities', 2),
  ('Blood Drive', 'Organize and participate in blood donation drives', 2),
  ('Food Distribution', 'Help distribute food to families in need', 3),
  ('Community Garden', 'Develop and maintain community gardens', 3);

-- Insert sample categories
INSERT INTO categories (name) VALUES
  ('Environmental'),
  ('Educational'),
  ('Community Service'),
  ('Health and Wellness'),
  ('Disaster Relief');

-- Link projects to categories (many-to-many)
INSERT INTO project_categories (project_id, category_id) VALUES
  (1, 1),  -- Park Clean-up: Environmental
  (1, 3),  -- Park Clean-up: Community Service
  (2, 3),  -- Home Building: Community Service
  (3, 5),  -- Disaster Relief: Disaster Relief
  (3, 3),  -- Disaster Relief: Community Service
  (4, 4),  -- Blood Drive: Health and Wellness
  (5, 3),  -- Food Distribution: Community Service
  (6, 1),  -- Community Garden: Environmental
  (6, 3);  -- Community Garden: Community Service