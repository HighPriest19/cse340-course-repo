import express from 'express'
import dotenv from 'dotenv'
import { getAllCategories } from './src/models/categories.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Set view engine to EJS
app.set("view engine", "ejs")

// Serve static files (CSS/Images) from the public folder
app.use(express.static("public"))

// Serve images from the images folder
app.use("/images", express.static("images"))

/* ***********************
 * Routes
 *************************/

// Home Page
app.get("/", async (req, res) => {
  res.render("index", { title: "Home", year: new Date().getFullYear() })
})

// Organizations Page
app.get("/organizations", async (req, res) => {
  const organizations = [
    { name: "Habitat for Humanity", description: "Building homes and communities", image: "/images/organization1.jpeg" },
    { name: "Red Cross", description: "Humanitarian assistance and disaster relief", image: "/images/organization2.jpeg" },
    { name: "Local Food Bank", description: "Fighting hunger in our community", image: "/images/organization3.jpeg" }
  ]
  res.render("organizations", { title: "Organizations", organizations: organizations, year: new Date().getFullYear() })
})

// Service Projects Page
app.get("/projects", async (req, res) => {
  res.render("projects", { title: "Projects", year: new Date().getFullYear() })
})

// Categories Page (REQUIRED for Assignment)
app.get("/categories", async (req, res) => {
  const categories = await getAllCategories()
  res.render("categories", { title: "Categories", categories: categories, year: new Date().getFullYear() })
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})