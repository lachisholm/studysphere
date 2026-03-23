//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import bcrypt to securely hash and compare passwords
import bcrypt from "bcrypt";

// Import user model functions to interact with the database
import { createUser, findUserByEmail } from "../models/userModel.js";

// ---------------- REGISTER USER ----------------

// Export a function to handle user registration
export const register = async (req, res) => {

  // Extract form data from the request body
  const { firstName, lastName, email, password } = req.body;

  try {
    // Hash the user's password with bcrypt for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await createUser(firstName, lastName, email, hashedPassword);

    // Redirect to login page
    res.redirect("/login");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
};

// ---------------- LOGIN USER ----------------

// Export a function to handle user login
export const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Store user in session
    req.session.user = user;

    // Redirect to dashboard
    res.redirect("/dashboard");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};

// ---------------- DASHBOARD ----------------

// Export a function to render dashboard page
export const dashboard = (req, res) => {

  // Redirect if not logged in
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Render dashboard with user + empty sessions
  res.render("dashboard", {
    user: req.session.user,
    sessions: []
  });
};

// ---------------- LOGOUT ----------------

// Export a function to log the user out
export const logout = (req, res) => {

  // Destroy session
  req.session.destroy(() => {
    res.redirect("/");
  });
};