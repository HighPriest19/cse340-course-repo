import pool from '../database/index.js'

// Get all organizations
async function getAllOrganizations() {
  try {
    const result = await pool.query('SELECT * FROM organizations ORDER BY name ASC')
    return result.rows
  } catch (error) {
    console.error('Error fetching organizations:', error)
    return []
  }
}

// Get a single organization by ID
async function getOrganizationById(id) {
  try {
    const result = await pool.query('SELECT * FROM organizations WHERE id = $1', [id])
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching organization:', error)
    return null
  }
}

// Get all projects for an organization
async function getProjectsByOrganizationId(orgId) {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE organization_id = $1 ORDER BY name ASC',
      [orgId]
    )
    return result.rows
  } catch (error) {
    console.error('Error fetching projects by organization:', error)
    return []
  }
}

// Add new organization
async function addOrganization(name, description) {
  try {
    const result = await pool.query(
      'INSERT INTO organizations (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error adding organization:', error)
    return null
  }
}

// Update organization
async function updateOrganization(id, name, description) {
  try {
    const result = await pool.query(
      'UPDATE organizations SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error updating organization:', error)
    return null
  }
}

export { 
  getAllOrganizations, 
  getOrganizationById, 
  getProjectsByOrganizationId,
  addOrganization,
  updateOrganization
}