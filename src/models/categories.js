import pool from '../database/index.js'

async function getAllCategories() {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id ASC')
    return result.rows
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export { getAllCategories }