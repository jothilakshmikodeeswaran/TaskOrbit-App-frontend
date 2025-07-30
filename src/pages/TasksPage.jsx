import { useEffect, useState } from "react";
import { backendClient } from "../clients/backendClient";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";

function TaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("high");
  const [project, setProject] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [comments, setComments] = useState("");
  const [editId, setEditId] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
    const storedProject = localStorage.getItem("selected-project");
  if (storedProject) {
    setProject(storedProject);
  }
  }, []);

  // const fetchTasks = async () => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem("social-app-token"));
  //     const res = await backendClient.get("/tasks", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setTasks(res.data);
  //   } catch (error) {
  //     console.error("Fetch tasks error:", error);
  //   }
  // };

  const fetchProjects = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("social-app-token"));
      const res = await backendClient.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (error) {
      console.error("Fetch projects error:", error);
    }
  };

  const fetchTasksByProject = async (projectId) => {
    try {
      const token = JSON.parse(localStorage.getItem("social-app-token"));
      const res = await backendClient.get(`/tasks/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Fetch tasks by project error:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("social-app-token"));
      const res = await backendClient.get("/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (error) {
      console.error("Fetch employees error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project) {
      alert("Please select a project before adding a task.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("social-app-token"));
    const data = {
      title,
      description,
      status,
      priority,
      project,
      assignee,
      deadline,
      comments,
    };

    try {
      if (editId) {
        await backendClient.put(`/tasks/${editId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await backendClient.post(`/tasks/${project}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      resetForm();
      fetchTasksByProject(project);
    } catch (error) {
      console.error(editId ? "Update error:" : "Add error:", error);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setAssignee(task.assignee);
    setDeadline(task.deadline);
    setComments(task.comments);
    setEditId(task._id);
  };

  const handleDelete = async (taskId) => {
    try {
      const token = JSON.parse(localStorage.getItem("social-app-token"));
      await backendClient.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("To Do");
    setPriority("high");
    setProject("");
    setAssignee("");
    setDeadline("");
    setComments("");
    setEditId(null);
  };
  return (
    <MainLayout>
      <main>
        <select
          value={project}
          onChange={(e) => {
            setProject(e.target.value);
            fetchTasksByProject(e.target.value);
          }}
          className="w-64 px-3 py-1.5 border border-indigo-300 
                rounded-md text-sm focus:outline-none 
                focus:ring-2 focus:ring-indigo-500 shadow-sm"
        >
          <option value="">Select Project</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>
              {proj.name}
            </option>
          ))}
        </select>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Add New Task</h2>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="jothi">jothi</option>
            {employees.map((e) => (
            <option key={e._id} value={e._id}>{e.name}</option>
          ))}
          </select>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="text"
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="submit"
            value={editId ? "UPDATE" : "ADD"}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          />
        </form>

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded"
        >
          ← Back to Dashboard
        </button>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
              <p>
                Project:{" "}
                {projects.find((p) => p._id === task.project)?.name || "N/A"}
              </p>
              <p>Assignee: {employees.find(e => e._id === task.assignee)?.name || "Unassigned"}</p>
              <p>Comments: {task.comments}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 px-3 py-1 text-white rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </MainLayout>
  );
}

export default TaskPage;
