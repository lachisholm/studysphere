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
    // The number 10 represents the salt rounds (complexity)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the model function to create a new user in the database
    await createUser(firstName, lastName, email, hashedPassword);

    // Redirect user to login page after successful registration
    res.redirect("/login");

  } catch (error) {

    // Log error to console for debugging
    console.error(error);

    // Send error response to user
    res.status(500).send("Error registering user");
  }
};

// ---------------- LOGIN USER ----------------

// Export a function to handle user login
export const login = async (req, res) => {

  // Extract login credentials from request body
  const { email, password } = req.body;

  try {
    // Find user in database by email
    const user = await findUserByEmail(email);

    // If no user is found, return error message
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return error
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Store user information in session to keep them logged in
    req.session.user = user;

    // Redirect to dashboard after successful login
    res.redirect("/dashboard");

  } catch (error) {

    // Log error for debugging
    console.error(error);

    // Return server error
    res.status(500).send("Error logging in");
  }
};

// ---------------- DASHBOARD ----------------

// Export a function to render dashboard page
export const dashboard = (req, res) => {

  // Check if user is logged in (session exists)
  if (!req.session.user) {

    // If not logged in, redirect to login page
    return res.redirect("/login");
  }

  // Render dashboard view and pass user data
  res.render("dashboard", {
    user: req.session.user
  });
};

// ---------------- LOGOUT ----------------

// Export a function to log the user out
export const logout = (req, res) => {

  // Destroy the session to log the user out
  req.session.destroy(() => {

    // Redirect user to home page after logout
    res.redirect("/");
  });
};