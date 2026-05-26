import express from 'express'
import 'dotenv/config'
import routes from './src/routes/index.js'

const app = express()
const port = process.env.PORT || 3000

// Set view engine to EJS
app.set("view engine", "ejs")

// Serve static files (CSS/Images) from the public folder
app.use(express.static("public"))

// Serve images from the images folder
app.use("/images", express.static("images"))

// Parse form submissions
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
