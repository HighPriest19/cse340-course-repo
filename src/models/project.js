import pool from '../database/index.js'

// Get all projects
async function getAllProjects() {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, o.name as organization_name, o.id as organization_id
      FROM projects p
      JOIN organizations o ON p.organization_id = o.id
      ORDER BY p.id ASC
    `)
    return result.rows
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Get a single project by ID
async function getProjectById(id) {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, o.name as organization_name, o.id as organization_id
      FROM projects p
      JOIN organizations o ON p.organization_id = o.id
      WHERE p.id = $1
    `, [id])
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

// Get categories for a project
async function getCategoriesByProjectId(projectId) {
  try {
    const result = await pool.query(`
      SELECT c.id, c.name
      FROM categories c
      JOIN project_categories pc ON c.id = pc.category_id
      WHERE pc.project_id = $1
      ORDER BY c.name ASC
    `, [projectId])
    return result.rows
  } catch (error) {
    console.error('Error fetching categories for project:', error)
    return []
  }
}

// Add new project
async function addProject(name, description, organizationId) {
  try {
    const result = await pool.query(
      'INSERT INTO projects (name, description, organization_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, organizationId]
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error adding project:', error)
    return null
  }
}

// Update project
async function updateProject(id, name, description, organizationId) {
  try {
    const result = await pool.query(
      'UPDATE projects SET name = $1, description = $2, organization_id = $3 WHERE id = $4 RETURNING *',
      [name, description, organizationId, id]
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error updating project:', error)
    return null
  }
}

export { 
  getAllProjects, 
  getProjectById, 
  getCategoriesByProjectId,
  addProject,
  updateProject
}