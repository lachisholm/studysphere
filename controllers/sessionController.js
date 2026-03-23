//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import session model functions
import {
  getSessionsByUser,
  createSession,
  deleteSession
} from "../models/sessionModel.js";

// ---------------- LIST SESSIONS ----------------

// Load dashboard with real sessions
export const listSessions = async (req, res) => {

  const user = req.session.user;

  // If not logged in, redirect
  if (!user) {
    return res.redirect("/login");
  }

  // Get sessions from database
  const sessions = await getSessionsByUser(user.id);

  // Render dashboard with real data
  res.render("dashboard", {
    user,
    sessions
  });
};

// ---------------- ADD SESSION ----------------

export const addSession = async (req, res) => {

  const user = req.session.user;

  if (!user) {
    return res.redirect("/login");
  }

  const { subject, duration, notes } = req.body;

  // Save session to database
  await createSession(user.id, subject, duration, notes);

  // 🔥 IMPORTANT: reload sessions page
  res.redirect("/sessions");
};

// ---------------- DELETE SESSION ----------------

export const removeSession = async (req, res) => {

  const { id } = req.params;

  await deleteSession(id);

  // 🔥 IMPORTANT: reload sessions page
  res.redirect("/sessions");
};

// ---------------- EDIT SESSION (optional) ----------------

export const editSession = async (req, res) => {
  res.send("Edit not implemented yet");
};