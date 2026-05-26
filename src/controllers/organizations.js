import * as organizationsModel from '../models/organizations.js'

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
    
    res.render('organization-details', { 
      title: organization.name, 
      organization: organization,
      projects: projects,
      year: new Date().getFullYear()
    })
  } catch (error) {
    next(error)
  }
}

export { listOrganizations, organizationDetail }
