//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import Express to create a router
import express from "express";

// Import controller functions for session logic
import {
  listSessions,
  addSession,
  removeSession,
  editSession
} from "../controllers/sessionController.js";

// Create router instance
const router = express.Router();

// Route to display all sessions
router.get("/", listSessions);

// Route to add a new session
router.post("/add", addSession);

// Route to delete a session using ID
router.get("/delete/:id", removeSession);

// Route to update a session
router.post("/edit/:id", editSession);

// Export router
export default router;