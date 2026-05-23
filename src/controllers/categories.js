import * as categoriesModel from '../models/categories.js'

async function listCategories(req, res, next) {
  try {
    const categories = await categoriesModel.getAllCategories()
    res.render('categories', { 
      title: 'Categories', 
      categories: categories,
      year: new Date().getFullYear()
    })
  } catch (error) {
    next(error)
  }
}

async function categoryDetail(req, res, next) {
  try {
    const { id } = req.params
    const category = await categoriesModel.getCategoryById(id)
    
    if (!category) {
      return res.status(404).render('404', { title: 'Not Found', year: new Date().getFullYear() })
    }
    
    const projects = await categoriesModel.getProjectsByCategoryId(id)
    
    res.render('category-detail', { 
      title: category.name, 
      category: category,
      projects: projects,
      year: new Date().getFullYear()
    })
  } catch (error) {
    next(error)
  }
}

export { listCategories, categoryDetail }