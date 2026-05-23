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

export { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId }