import express from 'express'
import * as organizationsController from '../controllers/organizations.js'
import * as projectsController from '../controllers/projects.js'
import * as categoriesController from '../controllers/categories.js'

const router = express.Router()

/* ***********************
 * Home Route
 *************************/
router.get('/', (req, res) => {
  res.render('index', { title: 'Home', year: new Date().getFullYear() })
})

/* ***********************
 * Organizations Routes
 *************************/
router.get('/organizations', organizationsController.listOrganizations)
router.get('/organization/:id', organizationsController.organizationDetail)

/* ***********************
 * Projects Routes
 *************************/
router.get('/projects', projectsController.listProjects)
router.get('/project/:id', projectsController.projectDetail)

/* ***********************
 * Categories Routes
 *************************/
router.get('/categories', categoriesController.listCategories)
router.get('/category/:id', categoriesController.categoryDetail)

export default router