import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Set view engine to EJS
app.set("view engine", "ejs")

// Serve static files (CSS/Images) from the public folder
app.use(express.static("public"))

/* ***********************
 * Routes
 *************************/

// Home Page
app.get("/", async (req, res) => {
  res.render("index", { title: "Home" })
})

// Organizations Page
app.get("/organizations", async (req, res) => {
  res.render("organizations", { title: "Organizations" })
})

// Service Projects Page
app.get("/projects", async (req, res) => {
  res.render("projects", { title: "Projects" })
})

// Categories Page (REQUIRED for Assignment)
app.get("/categories", async (req, res) => {
  res.render("categories", { title: "Categories" })
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})