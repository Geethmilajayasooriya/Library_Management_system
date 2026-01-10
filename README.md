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


3. Start backend

cd backend
node server.js

4. Start frontend

npm install
npm start



## Usage notes

- Sign up via the **Sign up** page to create accounts; passwords are stored hashed.
- Contact messages are currently logged by the backend; you can configure email or store messages in DB in `backend/server.js`.
- If an existing plaintext user logs in, the server upgrades the stored password to a secure bcrypt hash automatically.


