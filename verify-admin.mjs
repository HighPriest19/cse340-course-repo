import pg from 'pg'

const pool = new pg.Pool({
  connectionString: 'postgresql://neondb_owner:npg_G4f0SipWetqF@ep-rough-tree-aqbvzbv5-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
})

const res = await pool.query('SELECT id, email, role FROM users WHERE email = $1', ['admin@example.com'])
console.log(JSON.stringify(res.rows, null, 2))
await pool.end()
