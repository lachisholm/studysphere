//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import Express to create a router
import express from "express";

// Import controller functions for handling session logic
import {
  listSessions,
  addSession,
  removeSession,
  editSession
} from "../controllers/sessionController.js";

// Create a new router instance
const router = express.Router();

// ---------------- GET ALL SESSIONS ----------------

// Route to display all study sessions for the logged-in user
// When user visits /sessions, this function runs
router.get("/", listSessions);

// ---------------- ADD SESSION ----------------

// Route to handle form submission for adding a new session
// This uses POST because we are creating data
router.post("/add", addSession);

// ---------------- DELETE SESSION ----------------

// Route to delete a session using a dynamic route parameter (:id)
// Example URL: /sessions/delete/5
router.get("/delete/:id", removeSession);

// ---------------- UPDATE SESSION ----------------

// Route to update a session using a dynamic route parameter (:id)
// Example URL: /sessions/edit/5
router.post("/edit/:id", editSession);

// Export the router so it can be used in server.js
export default router;