import pool from './index.js'

async function ensureDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL,
      PRIMARY KEY ("sid")
    );

    CREATE INDEX IF NOT EXISTS "IDX_session_expire" on "session" ("expire");

    CREATE TABLE IF NOT EXISTS organizations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      organization_id INT NOT NULL REFERENCES organizations(id)
    );

    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS project_categories (
      project_id INT NOT NULL REFERENCES projects(id),
      category_id INT NOT NULL REFERENCES categories(id),
      PRIMARY KEY (project_id, category_id)
    );
  `)

  await pool.query(`
    INSERT INTO organizations (name, description) VALUES
      ('Habitat for Humanity', 'Building homes and communities'),
      ('Red Cross', 'Humanitarian assistance and disaster relief'),
      ('Local Food Bank', 'Fighting hunger in our community')
    ON CONFLICT (name) DO NOTHING;

    INSERT INTO categories (name) VALUES
      ('Environmental'),
      ('Educational'),
      ('Community Service'),
      ('Health and Wellness'),
      ('Disaster Relief')
    ON CONFLICT (name) DO NOTHING;
  `)

  await pool.query(`
    INSERT INTO projects (name, description, organization_id)
    SELECT project_name, project_description, o.id
    FROM (
      VALUES
        ('Park Clean-up', 'Help clean and maintain local parks', 'Habitat for Humanity'),
        ('Home Building', 'Assist in building homes for families in need', 'Habitat for Humanity'),
        ('Disaster Relief', 'Provide aid to disaster-affected communities', 'Red Cross'),
        ('Blood Drive', 'Organize and participate in blood donation drives', 'Red Cross'),
        ('Food Distribution', 'Help distribute food to families in need', 'Local Food Bank'),
        ('Community Garden', 'Develop and maintain community gardens', 'Local Food Bank')
    ) AS sample(project_name, project_description, organization_name)
    JOIN organizations o ON o.name = sample.organization_name
    WHERE NOT EXISTS (
      SELECT 1
      FROM projects p
      WHERE p.name = sample.project_name
        AND p.organization_id = o.id
    );
  `)

  await pool.query(`
    INSERT INTO project_categories (project_id, category_id)
    SELECT p.id, c.id
    FROM (
      VALUES
        ('Park Clean-up', 'Environmental'),
        ('Park Clean-up', 'Community Service'),
        ('Home Building', 'Community Service'),
        ('Disaster Relief', 'Disaster Relief'),
        ('Disaster Relief', 'Community Service'),
        ('Blood Drive', 'Health and Wellness'),
        ('Food Distribution', 'Community Service'),
        ('Community Garden', 'Environmental'),
        ('Community Garden', 'Community Service')
    ) AS links(project_name, category_name)
    JOIN projects p ON p.name = links.project_name
    JOIN categories c ON c.name = links.category_name
    ON CONFLICT DO NOTHING;
  `)
}

export { ensureDatabase }
