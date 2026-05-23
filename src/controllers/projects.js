import * as projectsModel from '../models/projects.js'

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

export { listProjects, projectDetail }