import bcrypt from 'bcryptjs'
import * as usersModel from '../models/users.js'

// Validation function
function validateRegistration(email, password, name) {
  const errors = []

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please provide a valid email address.')
  }

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long.')
  }

  if (!name || name.length < 2) {
    errors.push('Name must be at least 2 characters long.')
  }

  return errors
}

function validateLogin(email, password) {
  const errors = []

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please provide a valid email address.')
  }

  if (!password) {
    errors.push('Please provide a password.')
  }

  return errors
}

// Show registration view
export async function registerView(req, res) {
  res.render('auth/register', {
    title: 'Register',
    year: new Date().getFullYear(),
    email: '',
    name: '',
    errors: []
  })
}

// Handle registration
export async function register(req, res) {
  try {
    const { email, password, passwordConfirm, name } = req.body

    // Validation
    let errors = validateRegistration(email, password, name)

    // Check if passwords match
    if (password !== passwordConfirm) {
      errors.push('Passwords do not match.')
    }

    // Check if user already exists
    const existingUser = await usersModel.getUserByEmail(email)
    if (existingUser) {
      errors.push('Email already registered.')
    }

    // If errors, re-render form
    if (errors.length > 0) {
      return res.render('auth/register', {
        title: 'Register',
        year: new Date().getFullYear(),
        email,
        name,
        errors
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await usersModel.createUser(email, hashedPassword, name, 'user')

    // Redirect to login with success message
    res.redirect('/login?message=Registration successful! Please log in.')
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).render('500', {
      title: 'Server Error',
      year: new Date().getFullYear()
    })
  }
}

// Show login view
export async function loginView(req, res) {
  const message = req.query.message || ''

  res.render('auth/login', {
    title: 'Login',
    year: new Date().getFullYear(),
    email: '',
    errors: [],
    message
  })
}

// Handle login
export async function login(req, res) {
  try {
    const { email, password } = req.body

    // Validation
    const errors = validateLogin(email, password)

    if (errors.length > 0) {
      return res.render('auth/login', {
        title: 'Login',
        year: new Date().getFullYear(),
        email,
        errors,
        message: ''
      })
    }

    // Check if user exists
    const user = await usersModel.getUserByEmail(email)

    if (!user) {
      return res.render('auth/login', {
        title: 'Login',
        year: new Date().getFullYear(),
        email,
        errors: ['Email or password is incorrect.'],
        message: ''
      })
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.render('auth/login', {
        title: 'Login',
        year: new Date().getFullYear(),
        email,
        errors: ['Email or password is incorrect.'],
        message: ''
      })
    }

    // Store user info in session
    req.session.userId = user.id
    req.session.userEmail = user.email
    req.session.userName = user.name
    req.session.userRole = user.role

    // Redirect to dashboard
    res.redirect('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).render('500', {
      title: 'Server Error',
      year: new Date().getFullYear()
    })
  }
}

// Handle logout
export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err)
      return res.status(500).render('500', {
        title: 'Server Error',
        year: new Date().getFullYear()
      })
    }
    res.redirect('/?message=You have been logged out.')
  })
}
