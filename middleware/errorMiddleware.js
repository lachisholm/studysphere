//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// ---------------- GLOBAL ERROR HANDLER ----------------

// Export a middleware function to handle errors
// This function has FOUR parameters (err, req, res, next)
// Express recognizes it as an error handler because of this
const errorHandler = (err, req, res, next) => {

  // Log the full error stack to the console for debugging
  console.error(err.stack);

  // Send a 500 Internal Server Error response to the client
  res.status(500).send("Something went wrong!");
};

// Export the error handler so it can be used in server.js
export default errorHandler;