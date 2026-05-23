import pool from '../database/index.js'

// Get all categories
async function getAllCategories() {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id ASC')
    return result.rows
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Get a single category by ID
async function getCategoryById(id) {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id])
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

// Get all projects for a category
async function getProjectsByCategoryId(categoryId) {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, o.name as organization_name, o.id as organization_id
      FROM projects p
      JOIN organizations o ON p.organization_id = o.id
      JOIN project_categories pc ON p.id = pc.project_id
      WHERE pc.category_id = $1
      ORDER BY p.name ASC
    `, [categoryId])
    return result.rows
  } catch (error) {
    console.error('Error fetching projects by category:', error)
    return []
  }
}

export { getAllCategories, getCategoryById, getProjectsByCategoryId }