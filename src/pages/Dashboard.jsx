import { useEffect, useState } from "react";
import { backendClient } from "../clients/backendClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Dashboard() {
  const [projects, setProjects] = useState([]);
 const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

 useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await backendClient.get("/projects", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("social-app-token"),
            )}`,
          },
        });

        setProjects(res.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, []);

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await backendClient.get("/tasks", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("social-app-token")
          )}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchTasks();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("social-app-token");
    localStorage.removeItem("user-info");
    navigate("/signin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">🏠 Dashboard</h2>

        <nav className="space-y-3">
          <Link to="/projects" className="block hover:underline">
            📁 Projects
          </Link>
          <Link to="/tasks" className="block hover:underline">
            ✅ Tasks
          </Link>
          <Link to="/users" className="block hover:underline">
            Users
          </Link>
          <Link to="/employee" className="block hover:underline">
            👥 Employees
          </Link>
        </nav>
        <p className="mt-10 text-sm">
          Welcome, <span className="font-medium">jothi</span> 👋
        </p>
        <button
          onClick={handleLogout}
          className="mt-100 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>
      <div className="flex-1 p-8 space-y-12">
  {/* PROJECT SECTION */}
  <section>
    <div className="mb-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Projects</h2>
      <button
        onClick={() => navigate("/projects")}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        ➕ Add Project
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link
          to={`/projects/${project._id}`}
          key={project._id}
          className="block hover:scale-[1.01] transition-transform"
        >
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p>Status: <span className="font-medium">{project.status}</span></p>
            <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>

  {/* TASK SECTION */}
  <section>
    <div className="mb-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Tasks</h2>
      <button
        onClick={() => navigate("/tasks")}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        ➕ Add Task
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <Link
          to={`/tasks/${task._id}`}
          key={task._id}
          className="block hover:scale-[1.01] transition-transform"
        >
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>Status: <span className="font-medium">{task.status}</span></p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
</div>
</div>
  );
}

export default Dashboard;
