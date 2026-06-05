import express from 'express'
import * as organizationsController from '../controllers/organizations.js'
import * as projectsController from '../controllers/projects.js'
import * as categoriesController from '../controllers/categories.js'
import * as authController from '../controllers/auth.js'
import * as usersController from '../controllers/users.js'
import { requireLogin, requireRole } from '../middleware/auth.js'

const router = express.Router()

/* ***********************
 * Home Route
 *************************/
router.get('/', (req, res) => {
  res.render('index', { title: 'Home', year: new Date().getFullYear() })
})

/* ***********************
 * Authentication Routes
 *************************/
router.get('/register', authController.registerView)
router.post('/register', authController.register)
router.get('/login', authController.loginView)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

/* ***********************
 * Dashboard Route
 *************************/
router.get('/dashboard', requireLogin, usersController.dashboard)

/* ***********************
 * Users Routes (Admin Only)
 *************************/
router.get('/users', requireLogin, requireRole('admin'), usersController.usersList)

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
router.get('/project/:id/volunteer', requireLogin, projectsController.volunteerForProject)
router.get('/project/:id/unvolunteer', requireLogin, projectsController.removeVolunteerFromProject)
router.get('/new-project', projectsController.newProjectView)
router.post('/new-project', projectsController.createProject)
router.get('/edit-project/:id', projectsController.editProjectView)
router.post('/edit-project/:id', projectsController.updateProject)

/* ***********************
 * Categories Routes
 *************************/
router.get('/categories', categoriesController.listCategories)
router.get('/category/:id', categoriesController.categoryDetail)
router.get('/new-category', categoriesController.newCategoryView)
router.post('/new-category', categoriesController.createCategory)
router.get('/edit-category/:id', categoriesController.editCategoryView)
router.post('/edit-category/:id', categoriesController.updateCategory)

export default router