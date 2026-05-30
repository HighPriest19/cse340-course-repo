import express from 'express'
import 'dotenv/config'
import session from 'express-session'
import pgSession from 'connect-pg-simple'
import routes from './src/routes/index.js'
import pool from './src/database/index.js'
import { checkAuth } from './src/middleware/auth.js'

const app = express()
const port = process.env.PORT || 3000

// Session middleware setup
const PostgresqlStore = pgSession(session)

app.use(
  session({
    store: new PostgresqlStore({
      pool: pool,
      tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
  })
)

// Set view engine to EJS
app.set("view engine", "ejs")

// Serve static files (CSS/Images) from the public folder
app.use(express.static("public"))

// Serve images from the images folder
app.use("/images", express.static("images"))

// Parse form submissions
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Check authentication status for all requests
app.use(checkAuth)

// Use routes
app.use(routes)

/* ***********************
 * Error Handling
 *************************/

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Page Not Found',
    year: new Date().getFullYear()
  })
})

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('500', { 
    title: 'Server Error',
    year: new Date().getFullYear()
  })
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})
