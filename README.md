# StudySphere

StudySphere is a lightweight study session tracking application built to help users register for an account, sign in securely, and record their study activity in one place. The purpose of the project is to give students a simple way to document what they studied, how long they studied, and any notes they want to keep for later review. The application is designed with a clean Express and EJS architecture, server-side rendering, session-based authentication, and PostgreSQL data storage.

## Project Overview

The core idea behind StudySphere is straightforward: a user creates an account, logs in, opens a personal dashboard, and starts recording study sessions. Each session stores a subject, a duration in minutes, optional notes, and a timestamp. Once a session is saved, it appears on the dashboard so the user can review their study history and manage entries from one screen.

This project is a good example of a full-stack web application that connects several important concepts together:

- server-side rendering with **EJS**
- routing and middleware with **Express**
- password hashing with **bcrypt**
- login state management with **express-session**
- persistent data storage with **PostgreSQL**
- basic user and session CRUD workflows

## What the Application Does

StudySphere currently supports the following functionality:

### User account features
- User registration with first name, last name, email, and password
- Duplicate email protection through the database unique constraint
- Secure password hashing with bcrypt before storage
- User login with credential verification
- Session-based login persistence after successful authentication
- Logout to end the user session and return to the home page

### Study session features
- Display a personal dashboard after login
- Add a new study session with:
  - subject
  - duration in minutes
  - notes
- View saved study sessions associated with the logged-in user
- Delete an existing study session
- Sort sessions by most recent date first

### Interface features
- Landing page with navigation to login and registration
- Dedicated registration page
- Dedicated login page
- Dashboard view for authenticated users
- Shared stylesheet for consistent visual presentation

## Current Workflow

The user flow is designed to be simple and direct:

1. The user opens the StudySphere home page.
2. The user selects **Register** to create a new account.
3. After registration, the user is redirected to the **Login** page.
4. After logging in successfully, the user is redirected to **/sessions**, which loads the dashboard.
5. On the dashboard, the user can add study sessions and review previously saved sessions.
6. The user can remove a session if it is no longer needed.
7. The user can log out and return to the landing page.


## How the Application Is Organized

### `server.js`
This is the entry point for the application. It initializes Express, configures middleware, enables sessions, serves the `public` directory, sets EJS as the view engine, registers the route modules, and starts the server on port 3000.

### `config/db.js`
This file establishes the PostgreSQL connection pool and creates the required database tables if they do not already exist. The tables used by this application are:

- `users`
- `sessions`

### `controllers/`
The controllers contain the application logic.

- `authController.js` handles registration, login, dashboard rendering, and logout.
- `sessionController.js` handles loading the user’s sessions, adding new sessions, deleting sessions, and a placeholder for editing.

### `models/`
The model layer interacts with PostgreSQL directly.

- `userModel.js` creates users and looks them up by email.
- `sessionModel.js` gets sessions by user, creates sessions, deletes sessions, and includes an update function for future expansion.

### `routes/`
The routes map URLs to controller behavior.

- `authRoutes.js` manages `/register`, `/login`, `/dashboard`, and `/logout`
- `sessionRoutes.js` manages `/sessions`, `/sessions/add`, `/sessions/delete/:id`, and `/sessions/edit/:id`

### `views/`
The EJS files render the application pages in the browser.

- `index.ejs` is the home page
- `register.ejs` is the registration page
- `login.ejs` is the login page
- `dashboard.ejs` is the authenticated user dashboard

### `public/styles.css`
This file contains the styling for the user interface, including the color palette, body styling, layout container, and heading styles.

## Technology Stack

- **Node.js**
- **Express 5**
- **EJS**
- **PostgreSQL**
- **pg**
- **bcrypt**
- **express-session**
- **dotenv**
- **CSS**

## Installation and Setup

### Prerequisites
Before running the application locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm or pnpm
- PostgreSQL access

### Install dependencies
From the project root, install the required packages:

```bash
npm install
```

If you prefer pnpm:

```bash
pnpm install
```

### Start the server
Run the application from the project root:

```bash
node server.js
```

If the application starts successfully, the terminal should display a message similar to:

```text
Server running on port 3000
```

Then open your browser and go to:

```text
http://localhost:3000
```

## How to Register and Use the Program

### Register a new account
1. Open the home page.
2. Click **Register**.
3. Enter your first name, last name, email, and password.
4. Submit the form.
5. If registration succeeds, you will be redirected to the login page.

### Log in
1. Open the **Login** page.
2. Enter your registered email and password.
3. Submit the form.
4. If the credentials are valid, the application stores your user in the session and redirects you to your dashboard.

### Add a study session
1. After login, go to the dashboard.
2. In the **Add Study Session** form, enter:
   - the subject
   - the session duration in minutes
   - optional notes
3. Click **Add Session**.
4. The session is saved to the database and the dashboard reloads with the updated list.

### View your study sessions
Your saved sessions appear under **Your Study Sessions** on the dashboard. Sessions are loaded from the database for the currently logged-in user.

### Delete a study session
Each session includes a **Delete** link. Selecting it removes the session from the database and refreshes the dashboard.

### Log out
Click **Logout** on the dashboard to destroy the user session and return to the home page.

## Authentication and Security Notes

StudySphere includes several foundational security features:

- passwords are hashed with bcrypt before being stored
- login state is managed with server-side sessions
- users are redirected to login when they are not authenticated
- duplicate email addresses are prevented at the database level
- SQL queries use parameterized values to reduce SQL injection risk

## Known Limitations and Future Improvements

This version of StudySphere is functional, but there are several areas that can be improved in future development:

- stronger validation and user-friendly error messages
- route protection middleware applied consistently to all protected routes
- edit/update session functionality completed in the UI
- improved dashboard layout and component styling
- flash messages for success and error feedback
- environment-based database configuration instead of hardcoded values
- session secret moved fully into environment configuration
- improved mobile responsiveness and accessibility
- dashboard analytics such as total study time, session counts, and subject summaries

## Example Use Case

A student preparing for multiple classes can use StudySphere to keep track of study activity throughout the week. For example, they might log a 45-minute algebra session, a 60-minute history review, and a 30-minute writing practice session. Over time, the dashboard becomes a simple record of what they studied and how consistently they are working.

## Why This Project Matters

StudySphere demonstrates more than just a form and a database. It brings together authentication, database interaction, template rendering, session persistence, and project structure in a way that reflects a real full-stack learning project. It is useful both as a functioning academic tracker and as a portfolio example of practical web development.

## Suggested Next Features or ideas you can add to enhance your fork of my project

To continue expanding the application, the following features would add strong value:

- edit existing study sessions
- mark goals or priorities for the week
- search and filter sessions by subject
- chart total time studied by date or subject
- add profile settings
- support password reset and account management
- deploy with environment-based production configuration

