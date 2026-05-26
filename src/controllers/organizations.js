import * as organizationsModel from '../models/organizations.js'

// Validation function
function validateOrganization(name, description) {
  const errors = []
  if (!name || name.trim().length < 3) {
    errors.push('Organization name must be at least 3 characters')
  }
  if (name && name.length > 100) {
    errors.push('Organization name cannot exceed 100 characters')
  }
  if (!description || description.trim().length < 3) {
    errors.push('Description must be at least 3 characters')
  }
  if (description && description.length > 500) {
    errors.push('Description cannot exceed 500 characters')
  }
  return errors
}

async function listOrganizations(req, res, next) {
  try {
    const organizations = await organizationsModel.getAllOrganizations()
    res.render('organizations', { 
      title: 'Organizations', 
      organizations: organizations,
      year: new Date().getFullYear()
    })
  } catch (error) {
    next(error)
  }
}

async function organizationDetail(req, res, next) {
  try {
    const { id } = req.params
    const organization = await organizationsModel.getOrganizationById(id)
    
    if (!organization) {
      return res.status(404).render('404', { title: 'Not Found', year: new Date().getFullYear() })
    }
    
    const projects = await organizationsModel.getProjectsByOrganizationId(id)
    
    res.render('organization-detail', { 
      title: organization.name, 
      organization: organization,
      projects: projects,
      year: new Date().getFullYear()
    })
  } catch (error) {
    next(error)
  }
}

// Show new organization form
async function newOrganizationView(req, res, next) {
  try {
    res.render('new-organization', {
      title: 'New Organization',
      year: new Date().getFullYear(),
      errors: []
    })
  } catch (error) {
    next(error)
  }
}

// Create new organization
async function createOrganization(req, res, next) {
  try {
    const { name, description } = req.body
    const errors = validateOrganization(name, description)
    
    if (errors.length > 0) {
      return res.render('new-organization', {
        title: 'New Organization',
        year: new Date().getFullYear(),
        errors: errors,
        name: name,
        description: description
      })
    }
    
    const result = await organizationsModel.addOrganization(name, description)
    if (result) {
      res.redirect('/organizations')
    } else {
      res.render('new-organization', {
        title: 'New Organization',
        year: new Date().getFullYear(),
        errors: ['Failed to create organization. Please try again.'],
        name: name,
        description: description
      })
    }
  } catch (error) {
    next(error)
  }
}

// Show edit organization form
async function editOrganizationView(req, res, next) {
  try {
    const { id } = req.params
    const organization = await organizationsModel.getOrganizationById(id)
    
    if (!organization) {
      return res.status(404).render('404', { title: 'Not Found', year: new Date().getFullYear() })
    }
    
    res.render('edit-organization', {
      title: `Edit ${organization.name}`,
      organization: organization,
      year: new Date().getFullYear(),
      errors: []
    })
  } catch (error) {
    next(error)
  }
}

// Update organization
async function updateOrganization(req, res, next) {
  try {
    const { id } = req.params
    const { name, description } = req.body
    const errors = validateOrganization(name, description)
    
    if (errors.length > 0) {
      const organization = await organizationsModel.getOrganizationById(id)
      return res.render('edit-organization', {
        title: `Edit ${organization.name}`,
        organization: { id, name, description },
        year: new Date().getFullYear(),
        errors: errors
      })
    }
    
    const result = await organizationsModel.updateOrganization(id, name, description)
    if (result) {
      res.redirect(`/organization/${id}`)
    } else {
      const organization = await organizationsModel.getOrganizationById(id)
      res.render('edit-organization', {
        title: `Edit ${organization.name}`,
        organization: { id, name, description },
        year: new Date().getFullYear(),
        errors: ['Failed to update organization. Please try again.']
      })
    }
  } catch (error) {
    next(error)
  }
}

export { 
  listOrganizations, 
  organizationDetail,
  newOrganizationView,
  createOrganization,
  editOrganizationView,
  updateOrganization
}