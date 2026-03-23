//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import the Express framework to create our web server
import express from "express";

// Import express-session to manage user login sessions
import session from "express-session";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Import route files that handle authentication-related routes
import authRoutes from "./routes/authRoutes.js";

// Import route files that handle study session-related routes
import sessionRoutes from "./routes/sessionRoutes.js";

// Import custom error handling middleware
import errorHandler from "./middleware/errorMiddleware.js";

// Load environment variables from .env file into process.env
dotenv.config();

// Create an instance of an Express application
const app = express();

// Define the port number the server will run on
const PORT = 3000;

// ---------------- MIDDLEWARE SECTION ----------------

// Enable parsing of URL-encoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Enable parsing of JSON data (for APIs or advanced forms)
app.use(express.json());

// Configure session management
app.use(
  session({
    // Secret key used to sign the session ID cookie
    secret: "secretkey",

    // Prevents session from being saved if it hasn’t been modified
    resave: false,

    // Prevents saving empty sessions
    saveUninitialized: true,
  })
);

// Serve static files (CSS, images, JS) from the "public" folder
app.use(express.static("public"));

// Set EJS as the templating engine for rendering views
app.set("view engine", "ejs");

// ---------------- HOME ROUTE ----------------

// Define the root route (homepage)
// This MUST come before other routes so it is not overridden
app.get("/", (req, res) => {
  res.render("index");
});

// ---------------- ROUTES SECTION ----------------

// Use authentication routes (register, login, dashboard)
app.use("/", authRoutes);

// Use session routes (study session CRUD operations)
app.use("/sessions", sessionRoutes);

// ---------------- ERROR HANDLING ----------------

// Use custom error middleware for handling server errors
app.use(errorHandler);

// ---------------- SERVER START ----------------

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});