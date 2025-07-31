A full-stack project management dashboard for startups and teams — built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- 📊 **Dashboard Overview** with stats: active projects, tasks in progress, completed
- 📁 **Projects Module** with status tracking and progress bars
- ✅ **Tasks Module** with priority, due date, and status (To-do, In Progress, Done)
- 👥 **Employees Directory** with role, status, and availability
- ℹ️ **Company Pages**: About, Services, and Contact
- 🔗 Fully integrated REST API
- 🎨 Responsive and modern UI using Tailwind CSS

---

## 📂 Project Structure

project-management-app/
├── frontend/ # React + Tailwind
├── backend/ # Node.js + Express + MongoDB
├── README.md
├── .env (global optional)

yaml
Copy
Edit

---

## 💻 Frontend (React + Vite + Tailwind)

### 📁 Structure

- `pages/` – Dashboard, Projects, Tasks, Employees, About, Services, Contact
- `components/` – Sidebar, Cards, Forms
- `services/` – Axios-based API utilities
- `data/` – Mock sample data

### 📦 Setup

```bash
cd frontend
npm install
npm run dev
📄 Frontend .env
bash
Copy
Edit
VITE_API_URL=http://localhost:5000/api
🔧 Backend (Node.js + Express)
📁 Structure
models/ – Mongoose schemas for Project, Task, Employee

controllers/ – CRUD logic

routes/ – RESTful APIs

server.js – Entry point

📦 Setup
bash
Copy
Edit
cd backend
npm install
npm run dev
📄 Backend .env
ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/project-management
JWT_SECRET=yourSuperSecretKey
🛠 API Endpoints
Resource	Endpoint	Method	Description
Projects	/api/projects	GET	Fetch all projects
/api/projects	POST	Create new project
Tasks	/api/tasks	GET	Fetch all tasks
Employees	/api/employees	GET	Fetch all employees