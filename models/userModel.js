//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import database connection pool
import pool from "../config/db.js";

// ---------------- CREATE USER ----------------

// Function to insert a new user into the database
export const createUser = async (firstName, lastName, email, password) => {
  // SQL query to insert a new user
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [firstName, lastName, email, password]
  );

  // Return the newly created user
  return result.rows[0];
};

// ---------------- FIND USER BY EMAIL ----------------

// Function to find a user by email (used for login)
export const findUserByEmail = async (email) => {
  // SQL query to find user
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  // Return user if found
  return result.rows[0];
};