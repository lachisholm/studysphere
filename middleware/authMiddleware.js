//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// ---------------- AUTHENTICATION MIDDLEWARE ----------------

// Export a middleware function to protect routes
export const requireAuth = (req, res, next) => {

  // Check if a user session exists (meaning the user is logged in)
  if (!req.session.user) {

    // If no session exists, redirect the user to the login page
    return res.redirect("/login");
  }

  // If the user is logged in, allow the request to continue
  // next() passes control to the next middleware or route handler
  next();
};