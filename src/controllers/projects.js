import * as projectsModel from '../models/projects.js'
import * as organizationsModel from '../models/organizations.js'

// Validation function
function validateProject(name, description, organizationId) {
  const errors = []
  if (!name || name.trim().length < 3) {
    errors.push('Project name must be at least 3 characters')
  }
  if (name && name.length > 100) {
    errors.push('Project name cannot exceed 100 characters')
  }
  if (!description || description.trim().length < 3) {
    errors.push('Description must be at least 3 characters')
  }
  if (description && description.length > 500) {
    errors.push('Description cannot exceed 500 characters')
  }
  if (!organizationId) {
    errors.push('Please select an organization')
  }
  return errors
}

async function listProjects(req, res, next) {
  try {
    const projects = await projectsModel.getAllProjects()
    res.render('projects', { 
      title: 'Projects', 
      projects: projects,
      year: new Date().getFullYear()
    })
  } catch (error) {
    next(error)
  }
}

async function projectDetail(req, res, next) {
  try {
    const { id } = req.params
    const project = await projectsModel.getProjectById(id)
    
    if (!project) {
      return res.status(404).render('404', { title: 'Not Found', year: new Date().getFullYear() })
    }
    
    const categories = await projectsModel.getCategoriesByProjectId(id)
    
    res.render('project-detail', { 
      title: project.name, 
      project: project,
      categories: categories,
      year: new Date().getFullYear()
    })
  } catch (error) {
    next(error)
  }
}

// Show new project form
async function newProjectView(req, res, next) {
  try {
    const organizations = await organizationsModel.getAllOrganizations()
    res.render('new-project', {
      title: 'New Project',
      organizations: organizations,
      year: new Date().getFullYear(),
      errors: []
    })
  } catch (error) {
    next(error)
  }
}

// Create new project
async function createProject(req, res, next) {
  try {
    const { name, description, organization_id } = req.body
    const errors = validateProject(name, description, organization_id)
    
    if (errors.length > 0) {
      const organizations = await organizationsModel.getAllOrganizations()
      return res.render('new-project', {
        title: 'New Project',
        organizations: organizations,
        year: new Date().getFullYear(),
        errors: errors,
        name: name,
        description: description,
        organization_id: organization_id
      })
    }
    
    const result = await projectsModel.addProject(name, description, organization_id)
    if (result) {
      res.redirect('/projects')
    } else {
      const organizations = await organizationsModel.getAllOrganizations()
      res.render('new-project', {
        title: 'New Project',
        organizations: organizations,
        year: new Date().getFullYear(),
        errors: ['Failed to create project. Please try again.'],
        name: name,
        description: description,
        organization_id: organization_id
      })
    }
  } catch (error) {
    next(error)
  }
}

// Show edit project form
async function editProjectView(req, res, next) {
  try {
    const { id } = req.params
    const project = await projectsModel.getProjectById(id)
    
    if (!project) {
      return res.status(404).render('404', { title: 'Not Found', year: new Date().getFullYear() })
    }
    
    const organizations = await organizationsModel.getAllOrganizations()
    
    res.render('edit-project', {
      title: `Edit ${project.name}`,
      project: project,
      organizations: organizations,
      year: new Date().getFullYear(),
      errors: []
    })
  } catch (error) {
    next(error)
  }
}

// Update project
async function updateProject(req, res, next) {
  try {
    const { id } = req.params
    const { name, description, organization_id } = req.body
    const errors = validateProject(name, description, organization_id)
    
    if (errors.length > 0) {
      const organizations = await organizationsModel.getAllOrganizations()
      return res.render('edit-project', {
        title: `Edit Project`,
        project: { id, name, description, organization_id },
        organizations: organizations,
        year: new Date().getFullYear(),
        errors: errors
      })
    }
    
    const result = await projectsModel.updateProject(id, name, description, organization_id)
    if (result) {
      res.redirect(`/project/${id}`)
    } else {
      const organizations = await organizationsModel.getAllOrganizations()
      res.render('edit-project', {
        title: `Edit Project`,
        project: { id, name, description, organization_id },
        organizations: organizations,
        year: new Date().getFullYear(),
        errors: ['Failed to update project. Please try again.']
      })
    }
  } catch (error) {
    next(error)
  }
}

export { 
  listProjects, 
  projectDetail,
  newProjectView,
  createProject,
  editProjectView,
  updateProject
}