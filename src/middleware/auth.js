/* ***********************
 * Authentication Middleware
 *************************/

// Require user to be logged in
export function requireLogin(req, res, next) {
  if (req.session && req.session.userId) {
    next()
  } else {
    res.redirect('/login?message=Please log in first')
  }
}

// Require user to be admin
export function requireRole(role) {
  return (req, res, next) => {
    if (req.session && req.session.userId && req.session.userRole === role) {
      next()
    } else {
      res.redirect('/dashboard?message=Access denied: admin-only page')
    }
  }
}

// Check if user is authenticated (for conditional rendering in views)
export function checkAuth(req, res, next) {
  res.locals.user = null
  res.locals.isAuthenticated = false

  if (req.session && req.session.userId) {
    res.locals.user = {
      id: req.session.userId,
      email: req.session.userEmail,
      name: req.session.userName,
      role: req.session.userRole
    }
    res.locals.isAuthenticated = true
  }

  next()
}
