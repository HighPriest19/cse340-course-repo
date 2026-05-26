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
router.get('/new-organization', organizationsController.newOrganizationView)
router.post('/new-organization', organizationsController.createOrganization)
router.get('/edit-organization/:id', organizationsController.editOrganizationView)
router.post('/edit-organization/:id', organizationsController.updateOrganization)

/* ***********************
 * Projects Routes
 *************************/
router.get('/projects', projectsController.listProjects)
router.get('/project/:id', projectsController.projectDetail)
router.get('/new-project', projectsController.newProjectView)
router.post('/new-project', projectsController.createProject)
router.get('/edit-project/:id', projectsController.editProjectView)
router.post('/edit-project/:id', projectsController.updateProject)

/* ***********************
 * Categories Routes
 *************************/
router.get('/categories', categoriesController.listCategories)
router.get('/category/:id', categoriesController.categoryDetail)

export default router