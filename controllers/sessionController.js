//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import session model functions to interact with the database
import {
  getSessionsByUser,
  createSession,
  deleteSession,
  updateSession
} from "../models/sessionModel.js";

// ---------------- GET ALL SESSIONS ----------------

// Export a function to display all sessions for the logged-in user
export const listSessions = async (req, res) => {

  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    // Get the logged-in user's ID from the session
    const userId = req.session.user.id;

    // Retrieve all sessions for that user from the database
    const sessions = await getSessionsByUser(userId);

    // Render the dashboard view and pass sessions + user info
    res.render("dashboard", {
      user: req.session.user,
      sessions: sessions
    });

  } catch (error) {

    // Log error for debugging
    console.error(error);

    // Return server error
    res.status(500).send("Error retrieving sessions");
  }
};

// ---------------- CREATE SESSION ----------------

// Export a function to handle adding a new study session
export const addSession = async (req, res) => {

  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Extract form data from request body
  const { subject, duration, notes } = req.body;

  try {
    // Get user ID from session
    const userId = req.session.user.id;

    // Call model function to insert new session into database
    await createSession(userId, subject, duration, notes);

    // Redirect back to dashboard after adding session
    res.redirect("/dashboard");

  } catch (error) {

    // Log error
    console.error(error);

    // Return error response
    res.status(500).send("Error creating session");
  }
};

// ---------------- DELETE SESSION ----------------

// Export a function to delete a study session
export const removeSession = async (req, res) => {

  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    // Get session ID from route parameters
    const sessionId = req.params.id;

    // Call model function to delete session
    await deleteSession(sessionId);

    // Redirect back to dashboard
    res.redirect("/dashboard");

  } catch (error) {

    // Log error
    console.error(error);

    // Return error response
    res.status(500).send("Error deleting session");
  }
};

// ---------------- UPDATE SESSION ----------------

// Export a function to update an existing session
export const editSession = async (req, res) => {

  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Extract updated data from form
  const { subject, duration, notes } = req.body;

  try {
    // Get session ID from route parameters
    const sessionId = req.params.id;

    // Call model function to update session
    await updateSession(sessionId, subject, duration, notes);

    // Redirect back to dashboard
    res.redirect("/dashboard");

  } catch (error) {

    // Log error
    console.error(error);

    // Return error response
    res.status(500).send("Error updating session");
  }
};