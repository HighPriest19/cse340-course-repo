import * as usersModel from '../models/users.js'

// List all users (admin only)
export async function usersList(req, res) {
  try {
    const users = await usersModel.getAllUsers()

    res.render('users', {
      title: 'Registered Users',
      year: new Date().getFullYear(),
      users
    })
  } catch (error) {
    console.error('Error listing users:', error)
    res.status(500).render('500', {
      title: 'Server Error',
      year: new Date().getFullYear()
    })
  }
}

// Dashboard view
export async function dashboard(req, res) {
  try {
    res.render('dashboard', {
      title: 'Dashboard',
      year: new Date().getFullYear(),
      user: res.locals.user
    })
  } catch (error) {
    console.error('Error loading dashboard:', error)
    res.status(500).render('500', {
      title: 'Server Error',
      year: new Date().getFullYear()
    })
  }
}
