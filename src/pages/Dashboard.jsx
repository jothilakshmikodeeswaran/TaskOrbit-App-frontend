import { useEffect, useState } from "react";
import { backendClient } from "../clients/backendClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const userRaw = localStorage.getItem("logged-in-user");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const isAdmin = user?.role === "admin";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await backendClient.get("/projects", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("social-app-token")
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

  useEffect(() => {
    const fetchEmploees = async () => {
      try {
        const res = await backendClient.get("/employees", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("social-app-token")
            )}`,
          },
        });

        setEmployees(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmploees();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <MainLayout />
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
                  <p>
                    Status:{" "}
                    <span className="font-medium">{project.status}</span>
                  </p>
                  <p>
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </p>
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
                  <p>
                    Status: <span className="font-medium">{task.status}</span>
                  </p>
                  <p>
                    <strong>Deadline:</strong>
                    {task.deadline && !isNaN(new Date(task.deadline))
                      ? new Date(task.deadline).toLocaleDateString()
                      : "No valid deadline"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* EMPLOYEE SECTION */}
        <section>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Employees</h2>
            {isAdmin && (
              <button
                onClick={() => navigate("/employees")}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                ➕ Add Employee
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((emp) => (
              <div
                key={emp._id}
                className="bg-white p-4 shadow rounded-lg flex 
                items-center gap-4 hover:scale-[1.01] transition-transform"
              >
                {emp.profilepic ? (
                  <img
                    src={emp.profilepic}
                    alt={emp.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full bg-gray-300 
                  flex items-center justify-center"
                  >
                    <span className="text-gray-600 font-bold text-lg">?</span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{emp.name}</h3>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        emp.status === "Online"
                          ? "text-green-600"
                          : emp.status === "Busy"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
