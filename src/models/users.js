import pool from '../database/index.js'

export async function getAllUsers() {
  try {
    const result = await pool.query(
      `SELECT id, email, name, role, created_at
       FROM users
       ORDER BY name ASC`
    )
    return result.rows
  } catch (error) {
    console.error('Error getting all users:', error)
    throw error
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await pool.query(
      `SELECT id, email, password, name, role
       FROM users
       WHERE email = $1`,
      [email]
    )
    return result.rows.length ? result.rows[0] : null
  } catch (error) {
    console.error('Error getting user by email:', error)
    throw error
  }
}

export async function createUser(email, hashedPassword, name, role = 'user') {
  try {
    const result = await pool.query(
      `INSERT INTO users (email, password, name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, role`,
      [email, hashedPassword, name, role]
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function getUserById(id) {
  try {
    const result = await pool.query(
      `SELECT id, email, name, role
       FROM users
       WHERE id = $1`,
      [id]
    )
    return result.rows.length ? result.rows[0] : null
  } catch (error) {
    console.error('Error getting user by id:', error)
    throw error
  }
}
