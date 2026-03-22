//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import the database connection pool so we can run SQL queries
import pool from "../config/db.js";

// ---------------- GET ALL SESSIONS FOR A USER ----------------

// Export a function to retrieve all study sessions for a specific user
export const getSessionsByUser = async (userId) => {

  // Run a SQL SELECT query to get all sessions tied to a user_id
  // ORDER BY date DESC ensures newest sessions appear first
  const result = await pool.query(
    "SELECT * FROM sessions WHERE user_id = $1 ORDER BY date DESC",
    
    // Pass the userId safely as a parameter
    [userId]
  );

  // Map through all rows and convert snake_case to camelCase
  return result.rows.map(session => ({
    id: session.id,
    userId: session.user_id,
    subject: session.subject,
    duration: session.duration,
    notes: session.notes,
    date: session.date
  }));
};

// ---------------- CREATE NEW SESSION ----------------

// Export a function to insert a new study session into the database
export const createSession = async (userId, subject, duration, notes) => {

  // Insert new session data into the sessions table
  const result = await pool.query(
    "INSERT INTO sessions (user_id, subject, duration, notes) VALUES ($1, $2, $3, $4) RETURNING *",
    
    // Pass values safely using prepared query placeholders
    [userId, subject, duration, notes]
  );

  // Extract the newly created session
  const session = result.rows[0];

  // Convert snake_case to camelCase before returning
  return {
    id: session.id,
    userId: session.user_id,
    subject: session.subject,
    duration: session.duration,
    notes: session.notes,
    date: session.date
  };
};

// ---------------- DELETE SESSION ----------------

// Export a function to delete a session by ID
export const deleteSession = async (sessionId) => {

  // Execute DELETE query to remove session
  await pool.query(
    "DELETE FROM sessions WHERE id = $1",
    
    // Pass sessionId safely
    [sessionId]
  );
};

// ---------------- UPDATE SESSION ----------------

// Export a function to update an existing study session
export const updateSession = async (sessionId, subject, duration, notes) => {

  // Execute UPDATE query with new values
  const result = await pool.query(
    "UPDATE sessions SET subject = $1, duration = $2, notes = $3 WHERE id = $4 RETURNING *",
    
    // Pass updated values safely
    [subject, duration, notes, sessionId]
  );

  // Extract updated session
  const session = result.rows[0];

  // Convert snake_case to camelCase
  return {
    id: session.id,
    userId: session.user_id,
    subject: session.subject,
    duration: session.duration,
    notes: session.notes,
    date: session.date
  };
};