# 📚 Library Management System (LMS)

A simple and clean Library Management System built with React (frontend) and Node.js/Express + MySQL (backend). This repo includes both frontend and backend code; the frontend runs on http://localhost:3000 and the backend API runs on http://localhost:8080 by default.

---

## ✨ What’s new in this version

- Beautiful, responsive UI for auth and homepage (hero, stats, feature cards)
- Signup page with client-side validation and server-side registration endpoint
- Passwords are hashed with bcrypt on registration and verified on login
- Contact page and backend `/contact` endpoint (message logging; easy to wire to email/DB)
- Improved auth experience: inline errors, loading states, and accessible forms
- Soft, balanced color palette and consistent card surfaces
- Navbar brand updated to **LMS** and a clear site structure

---

## 🚀 Features

- Authentication: **Sign up** and **Log in** (passwords hashed)
- Pages: Home, Books, Members, Staff, Lending, Contact
- Home: Hero, dynamic stats (fetched from API), feature cards
- Backend API endpoints (examples):
  - POST `/users/register` — register a new user
  - POST `/users` — login (returns user without password)
  - POST `/contact` — submit a contact message
  - Standard CRUD endpoints for `/book`, `/member`, `/staff`, `/lending`

---

## 🛠️ Tech Stack

- Frontend: React, React Router DOM, React-Bootstrap, Bootstrap 5
- Backend: Node.js, Express, mysql2, bcrypt
- Database: MySQL

---

## Setup & Run (local)

1. Install and start the database (MySQL). Create a database named `Library`.

2. (Optional) Example SQL for the minimal `users` table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

3. Start backend

```bash
cd backend
npm install
npm start
```

By default the backend listens on port 8080 and uses credentials from `server.js` (edit there to match your MySQL user/password).

4. Start frontend

```bash
cd ..
npm install
npm start
```

Open http://localhost:3000 in your browser.

---

## Usage notes

- Sign up via the **Sign up** page to create accounts; passwords are stored hashed.
- Contact messages are currently logged by the backend; you can configure email or store messages in DB in `backend/server.js`.
- If an existing plaintext user logs in, the server upgrades the stored password to a secure bcrypt hash automatically.

---

## Development & Contribution

- Make changes in your branch, commit, and push to your fork/remote.
- Typical workflow:

```bash
git checkout -b feature/your-change
# make changes
git add .
git commit -m "feat: short description"
git push origin feature/your-change
```

---

## Changelog (high level)

- UI polish: improved homepage and auth pages, added feature cards and stats
- Security: password hashing and safer login flow
- New: Signup, Contact form + backend endpoint

---

If you want, I can commit these README changes into your repository and push them to your remote branch now. Reply "Yes, push" and I'll run the Git commands (I'll check for a configured remote first).


