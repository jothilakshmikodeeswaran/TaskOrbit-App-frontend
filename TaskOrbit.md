# 🌟 Task Orbit | Full-Stack MERN Project Management Tool

**Collaborate. Organize. Accomplish.**  
Task Orbit is a robust project management web application tailored for individuals and small teams, built from the ground up using the MERN stack. It features user authentication,authorization, project/task/employee CRUD, real-time collaboration (stretch goal),responsive UI.

•	Modular backend with secure, ownership-based access
•	Reusable React frontend components with clear UX
•	Clean deployment pipeline on Render and Netlify
•	Public access to uploaded files (via temp/ folder)


## 🔧 Tech Stack

| Layer         | Technology                               
|-------------- |-------------------------------------------
| Frontend      | React, Tailwind CSS, React Router, Context API 
| Backend       | Node.js, Express.js                      
| Database      | MongoDB Atlas                            
| Auth & Security | JWT, bcrypt                            
| Deployment    | Render & Netlify (Backend: Web Service, Frontend: Static Site) 
    

## Backend Highlights:

•	Modular routing (routes/controllers/middleware)
•	Auth with JWT + bcrypt password hashing
•	Secure access control per user
•	Static serving via express.static()

## JWT stands for JSON Web Token, and it’s a compact, secure way to transmit information between a client (like your React frontend) and a server (your Express backend) — especially for authentication and authorization.

## 🔒 bcrypt
bcrypt is a password hashing algorithm designed to be slow and secure—making brute-force attacks impractical.

## 🔧 How It Works

When a user registers, bcrypt hashes their password with a salt (random string).

The hash is stored in the database—not the plain password.

During login, bcrypt compares the entered password with the stored hash.
---

## 🚀 Live Demo

- **Frontend**: [Live Static Site](https://taskorbitbims.netlify.app/)  
- **Backend**: [Live API Service](https://taskorbit-app-backend.onrender.com)
- **GitHub Repo** backend : https://github.com/jothilakshmikodeeswaran/TaskOrbit-App-backend
- **GitHub Repo** Frontend :https://github.com/jothilakshmikodeeswaran/TaskOrbit-App-frontend
---

## 🧭 Features & User Stories

### ✅ User Management

- parameters (
    ## username,
    ## email,
    ## password,
    ## role, )
- User Register, login, logout securely
- JWT-based authentication
- Session persistence with Context API

### 📁 Dashboard

- Dashboard to view all personal projects based on Only owners can manage their projects
- Dashboard to view all Task based on Only owners can manage their projects
- Dashboard to view all Employee
- Add project button
-add task button
- add employee

### 📁 Project Management

- parameters (
    ## name,
    ## description,
    ## user -ref,
    ## project-ref, 
    ## status, 
    ## deadline,
    ## progress,
   )
- Create, read, update, delete, view projects
- Authorization: Only owners can manage their projects


### 📌 Task Management

- parameters (
    ## title,
    ## description,
    ## status,
    ## project-ref, 
    ## assignee, 
    ## deadline,
    ## priority,
    ## comments )
- Add tasks to projects with status labels: `To Do`, `In Progress`, `Done`
- Update and delete and view tasks
- Nested routing under projects (`/api/projects/:projectId`)

### 📁 Employee Management

- parameters (
    ## name,
    ## email,
    ## role,
    ## sex, 
    ## status, 
    ## profilepic,
    ## joinedAt,
    ## bio
    ## user ref )
- parameters (name, description, user, status, progress, deadline)
- Create, read, update, delete, view Employee
- Authorization: Only Admin users can Add Employee

### 🧑‍🤝‍🧑 Collaboration *(Stretch Goal)*
- Invite other users to collaborate on a project
- Collaborators can view and update tasks

---

## 📂 Backend Folder Structure

backend/
├── controllers/           # Logic handlers for routes
│   ├── userController.js
│   ├── projectController.js
│   └── taskController.js├
│   ├── employeeController.js
│
│
├── models/                # Mongoose models for DB collections
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│   ├── Employee.js
│
├── routes/                # Express route definitions (modular routing)
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│   └── employeeRoutes.js
│
├── middleware/            # Reusable middleware for users, error, validation, upload
│   ├── upload.js
│
├── utils/                 # Helper functions (e.g., token generation)
│   └── auth.js
│
├── config/                # DB connection and environment setup
│   └── connection.js
    └── cloudinary.js

│
-temp  - saving uploaded pic
│
├── .env                   # Environment variables (in .gitignore)
├── .gitignore             # Ignore sensitive/config files
├── package.json           # Backend dependencies
├── server.js              # Entry point for Express app
└── README.md              # API documentation & backend instructions


---

## 🛠️ Installation & Setup


cd backend
npm init -y
update server.js file with 
"dev": "nodemon server.js"
"main": "server.js",
"type": "module",

npm install 

npm i express mongoose dotenv cors  bcrypt jsonwebtoken
mkdir routes config utils models etc
touch .env .gitignore
openssl rand -hex 32
save it jwt secret token(key)

## Add to .env:

MONGODB_URL = mongodb+srv://jothi123:jothi123@perscholas.zzd3a3b.mongodb.net/bims?retryWrites=true&w=majority&appName=perScholas

# Choose a long, random string for your JWT secret
JWT_SECRET=ed7847cd86fae53a0e4ab032c006f0b056981ba8483998b7d95b74bcb394c1b9

CLOUDINARY_CLOUD_NAME = djhu4t2ip

CLOUDINARY_API_KEY = 452989588391894

CLOUDINARY_API_SECRET = Ol_CsbyOU7rC7kSDjOE

## Run server:
npm run dev

## 📡 API Reference

## 🔐 User Routes

| Method       |  Endpoint                | Description    
|--------------|--------------------------|--------------
| POST         |   /api/users/register    | register	Create account 
| POST         |   /api/users/login       | Login with credentials


## 🔐 project Routes

| Method       |  Endpoint                | Description    
|--------------|--------------------------|--------------
| POST         |   /api/projects/          | register project
| GET          |   /api/projects/          | get all projects
| GET          |   /api/projects/:id        | get project by id
|  PUT          |   /api/projects/:id       | update projects by id
| DELETE        |   /api/projects/:id       | DELETE projects by id


## 🔐 Task Routes

| Method       |  Endpoint                | Description    
|--------------|--------------------------|--------------
| POST         |   /api/projects/:projectid| register tasks by project id
| GET          |   /api/tasks/             | get all tasks
| GET          |   /api/projects/:projectid | get task by project id
|  PUT          |   /api/tasks/:taskid     | update task by task id
| DELETE        |   /api/tasks/:taskid      | DELETE task  by task id


## 🔐 Employee Routes

| Method       |  Endpoint                | Description    
|--------------|--------------------------|--------------
| POST         |   /api/employees/          | register employee
| GET          |   /api/employees/          | get all employee
| GET          |   /api/employees/:id        | get employee by id
|  PUT          |   /api/employees/:id       | update employee by id
| DELETE        |   /api/employees/:id       | DELETE employee by id
UPload          | /api/upload/upload-profilepic| upload profile pic

## Testing with Postman

Import this API manually in Postman or create a new collection.

# Register a new user:

POST /api/users/register with raw -> JSON body:

{
  "username": "jothi",
  "email": "jothi@test.com",
  "password": "jothi123"
}

## Login:

POST /api/users/login → Save the returned token
Set Authorization: Bearer (token) for protected routes
Test project and task endpoints as needed

Test Project Routes
## Authorization: Bearer (token)

## Create Project:

POST /api/projects
{
  "name": "Test Project",
  "description": "Task Orbit | Full-Stack MERN Project Management Tool"
}

## Get All Projects:GET /api/projects
## Update Project:PUT /api/projects/:id
## Delete Project:DELETE /api/projects/:id

## Frontend Setup (/frontend)

# 🌐 Task Orbit Frontend | React + Tailwind CSS

Welcome to the **frontend** of task orbit — a responsive, SPA-based project management tool designed for individuals and small teams. Built using React, Context API, Tailwind CSS, and connected to a secure Express.js backend API.



## 🧰 Tech Stack

| Purpose           | Tech                         |
|-------------------|------------------------------|
| UI Framework      | React                        |
| Styling           | Tailwind CSS                 |
| Routing           | react-router-dom             |
| State Management  | useState + Context API       |
| HTTP Client       | fetch (or axios optional)    |
| Deployment        | Render Static Site           |

---
## 🔧 Installation & Local Setup

## npm create vite@latest
 --select "React"
---select javascript sw
--name project: frontend
cd frontend
then

 ## npm i axios react-router-dom

 then clean up the App.jsx to prep for the frontend files:now you have two terminals side by side to run the front and back end parts of the application

npm install tailwindcss @tailwindcss/vite

## vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

# index.css add @import "tailwindcss";

## 📁 Folder Structure

frontend/
├── public/                            # Static assets, favicon, index.html
│   └── vite.png
│   └── logo.svg
│
├── src/
│   ├── assets/                        # Images, logos, icons
│   │   └── react.svg
│
│   ├── components/                    # Reusable UI components
│   │   ├── MainLayout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│
│   ├── context/                       # Global state management
│   │   └── UserContext.jsx
│    |
│   ├── hooks/                         # Custom hooks
│   │   
    ├── images/                         # logo update
│   │   ├── jk.jpg
│   │   └── logo.png
│    |____clients
         |____backendClients.js   # axios to communicate with backend routes API calls (fetch/axios)
│   ├── pages/                         # Route-level views
│   │   ├── EmployeePage.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── ProjectDetail.jsx
│   │   ├── SignINpage.jsx
│   │   ├── TaskPage.jsx
│   │   └── Project.jsx
│   │   ├── Home.jsx
│   │   └── TasksDetail.jsx
│
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # Entry file for ReactDOM
│   ├── App.css                    # controls global styles for the React App component
│   └── index.css                      # Tailwind base styles
│
├── .env                               # VITE_API_URL and other env vars
├── .gitignore                         # Ignore node_modules, .env, etc.
├── .env.production                 # VITE_API_URL and other env vars from backend(VITE_BACKEND_URL=https://taskorbit-app-backend.onrender.com)
├── index.html                  # HTML entry point of your frontend app/Loads your React app at the root <div id="root">
├── vite.config.js                     # Vite configuration
├── package.json                       # Project metadata and dependencies
└── README.md                          # Frontend documentation


## A sidebar is a vertical section of content that appears alongside the main content on a webpage, app, or even in printed media. It’s like the helpful sidekick that doesn’t steal the spotlight but makes everything smoother.

### 1️⃣ Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Backend API should be running at your defined `VITE_API_URL`

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/pro-tasker-frontend
cd pro-tasker-frontend

Install Dependencies

Configure Environment
Create .env file:

VITE_BACKEND_URL=http://localhost:3000/api
This connects your frontend to the backend API. Update it for production!

Start the App

## npm run dev

Your app will run at http://localhost:5173 by default (Vite's dev server).

🛠️ Features Overview

🔐 Auth Flow: Registration, Login, Logout

🧑‍💼 Dashboard: View projects

📁 Project View: Tasks list, creation, and updates

🧪 Error + Loading states: Handled with toasts / UI feedback

📱 Responsive: Works beautifully on desktop and mobile


Deploying Backend to Render (Express.js API)

✅ Backend Structure
Make sure your backend has:

backend/
├── src/            # Routes, Controllers
├── .env            # DB_URI, JWT_SECRET
├── app.js          # Main Express app
├── server.js       # Entry point
├── package.json

⚙️ Steps:
Push Backend to GitHub Clean up and commit your backend repo.

Go to Render

Click “Create Web Service”

Connect your GitHub repo
 -search for your backend-social repository*make sure your region is nearest to you (Ohio(US East) or West coast, etc
*make sure your Build Command is : npm install
*make sure your Start Command is: node server.js* Select Free for instance Typescroll down and put in
*Environment Variables:
name of Variable: MONGO_URI
value: the string from the your backend's .env file specific for your project: mongodb+srv://yourusernamehere:yourpasswordhere@cluster0.sasklml.mongodb.net/

Fill settings:
https://your-backend.onrender.com/api

🌐 Deploying Frontend to Netlify (React + Vite)

✅ Prerequisites:
React project created with Vite

Backend already deployed to Render (e.g. https://your-backend.onrender.com/api)

Steps:
Create .env for Frontend Add your backend API base URL:

VITE_API_URL=https://your-backend.onrender.com/api

Push Frontend to GitHub Make sure your code is committed and pushed.

Go to Netlify

Click “Add new site” → “Import from Git”

Select your frontend repo

In “Build Settings”:

Add your environment variable: VITE_API_URL //prod_URL

Deploy 🎉 Netlify will build and host your site at https://your-frontend.netlify.app or a custom domain.

## 🌐 Cross-Origin Setup

Add CORS middleware to backend to enable Netlify access:


Why CORS Exists

Browsers follow the Same-Origin Policy, which means:

A web page can only make requests to the same domain it came from.

This prevents malicious sites from accessing sensitive data on other domains.

But sometimes, you do want to share resources across domains—like calling an API hosted on another server. That’s where CORS comes in
