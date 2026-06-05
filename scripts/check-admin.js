import 'dotenv/config'
import pool from '../src/database/index.js'

async function main() {
  try {
    const result = await pool.query("SELECT id, email, name, role FROM users WHERE email = 'admin@example.com'")
    console.log(JSON.stringify(result.rows, null, 2))
  } catch (error) {
    console.error(error)
  } finally {
    await pool.end()
  }
}

main()
