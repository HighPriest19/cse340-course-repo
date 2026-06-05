import * as categoriesModel from '../models/categories.js'

function validateCategory(name) {
  const errors = []
  if (!name || name.trim().length < 3) {
    errors.push('Category name must be at least 3 characters')
  }
  if (name && name.length > 100) {
    errors.push('Category name cannot exceed 100 characters')
  }
  return errors
}

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

async function newCategoryView(req, res, next) {
  try {
    res.render('new-category', {
      title: 'New Category',
      year: new Date().getFullYear(),
      errors: [],
      name: ''
    })
  } catch (error) {
    next(error)
  }
}

async function createCategory(req, res, next) {
  try {
    const { name } = req.body
    const errors = validateCategory(name)

    if (errors.length > 0) {
      return res.render('new-category', {
        title: 'New Category',
        year: new Date().getFullYear(),
        errors: errors,
        name: name
      })
    }

    const result = await categoriesModel.addCategory(name)
    if (result) {
      res.redirect('/categories')
    } else {
      res.render('new-category', {
        title: 'New Category',
        year: new Date().getFullYear(),
        errors: ['Failed to create category. Please try again.'],
        name: name
      })
    }
  } catch (error) {
    next(error)
  }
}

async function editCategoryView(req, res, next) {
  try {
    const { id } = req.params
    const category = await categoriesModel.getCategoryById(id)

    if (!category) {
      return res.status(404).render('404', { title: 'Not Found', year: new Date().getFullYear() })
    }

    res.render('edit-category', {
      title: `Edit ${category.name}`,
      category: category,
      year: new Date().getFullYear(),
      errors: []
    })
  } catch (error) {
    next(error)
  }
}

async function updateCategory(req, res, next) {
  try {
    const { id } = req.params
    const { name } = req.body
    const errors = validateCategory(name)

    if (errors.length > 0) {
      return res.render('edit-category', {
        title: 'Edit Category',
        category: { id, name },
        year: new Date().getFullYear(),
        errors: errors
      })
    }

    const result = await categoriesModel.updateCategory(id, name)
    if (result) {
      res.redirect(`/category/${id}`)
    } else {
      res.render('edit-category', {
        title: 'Edit Category',
        category: { id, name },
        year: new Date().getFullYear(),
        errors: ['Failed to update category. Please try again.']
      })
    }
  } catch (error) {
    next(error)
  }
}

export { listCategories, categoryDetail, newCategoryView, createCategory, editCategoryView, updateCategory }