//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import Express to create router
import express from "express";

// Import controller functions
import {
  register,
  login,
  dashboard,
  logout
} from "../controllers/authController.js";

// Create router
const router = express.Router();

// ---------------- REGISTER ROUTES ----------------

// Show register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle register form submission
router.post("/register", register);

// ---------------- LOGIN ROUTES ----------------

// Show login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle login form submission
router.post("/login", login);

// ---------------- DASHBOARD ----------------

router.get("/dashboard", dashboard);

// ---------------- LOGOUT ----------------

router.get("/logout", logout);

// Export router
export default router;