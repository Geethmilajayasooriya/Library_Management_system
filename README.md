# 📚 Library Management System (LMS)

A **full-stack Library Management System** built with **React** (frontend) and **Node.js/Express + MySQL** (backend).  
This project provides a clean and responsive interface to manage books, members, staff, and lending operations.

## ✨ Features

### Authentication
- ✅ **Sign Up & Login** with hashed passwords (bcrypt)
- ✅ Inline error messages and loading states
- ✅ Server automatically upgrades plaintext passwords to bcrypt

### Home Page
- 🏠 Overview after login
- Dynamic statistics fetched from the backend
- Feature cards highlighting different modules

### Consoles / Management
- 📚 **Books Console**: View, Add, Edit, Delete books  
- 👩‍💼 **Staff Console**: View, Add, Edit, Delete staff records  
- 👥 **Member Console**: View, Add, Edit, Delete library members  
- 📖 **Lending Console**: View, Add, Edit, Delete lending transactions  

### Contact
- 📬 Submit messages via contact page  
- Backend logs messages (can be wired to email or database)

## 🛠️ Tech Stack

**Frontend:** React, React Router DOM, React-Bootstrap, Bootstrap 5  
**Backend:** Node.js, Express, mysql2, bcrypt  
**Database:** MySQL  

---

## 🚀 Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register a new user |
| POST | `/users` | Login (returns user without password) |
| POST | `/contact` | Submit a contact message |
| GET/POST/PUT/DELETE | `/book` | Manage books |
| GET/POST/PUT/DELETE | `/member` | Manage members |
| GET/POST/PUT/DELETE | `/staff` | Manage staff |
| GET/POST/PUT/DELETE | `/lending` | Manage lending transactions |

---

## ⚡ Installation & Running

### Backend

cd backend
npm install
node server.js


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


