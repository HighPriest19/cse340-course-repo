import 'dotenv/config'
import bcrypt from 'bcryptjs'
import pool from '../src/database/index.js'

async function main() {
  try {
    const email = 'admin@example.com'
    const password = 'cse340!'
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `INSERT INTO users (email, password, name, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, name = EXCLUDED.name, role = EXCLUDED.role
       RETURNING id, email, role`,
      [email, hashedPassword, 'Admin User', 'admin']
    )
    console.log('Admin user created or updated:', result.rows[0])
  } catch (error) {
    console.error(error)
  } finally {
    await pool.end()
  }
}

main()
