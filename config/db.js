//Reviewer - Leave all my comments in file until I am finished - I need them to be in the file for reference as I work on the project. I will remove them when I am done.

// Import PostgreSQL package
import pkg from "pg";
const { Pool } = pkg;

// Create pool using EXPLICIT config (NOT connectionString)
const pool = new Pool({
  host: "dpg-d70nm9k9c44c73b49hag-a.oregon-postgres.render.com",
  port: 5432,
  user: "studysphere_db_46qp_user",
  password: "qKSnaCtNHIkZyM2NAwdfXBR593wVia7O",
  database: "studysphere_db_46qp",

  // REQUIRED for Render
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create tables automatically
pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  password TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  subject TEXT,
  duration INTEGER,
  notes TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`)
.then(() => console.log("Tables created or already exist"))
.catch(err => console.error("Error creating tables:", err));

// Export pool
export default pool;