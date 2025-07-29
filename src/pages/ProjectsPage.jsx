import { useEffect, useState } from "react";
import { backendClient } from "../clients/backendClient";
import { useNavigate } from "react-router-dom";

function ProjectPage() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To-Do");
  const [progress, setProgress] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('social-app-token'));
      const res = await backendClient.get('/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("social-app-token"));
    try {
      if (editId) {
        // UPDATE flow
        await backendClient.put(`/projects/${editId}`, {
          name, description, status, progress, deadline
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // CREATE flow
        await backendClient.post("/projects", {
          name, description, status, progress, deadline
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      resetForm();
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error(editId ? "Update error:" : "Add error:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("To-Do");
    setProgress(0);
    setDeadline("");
    setEditId(null); // Reset edit mode
  };

  const handleDelete = async (projectId) => {
    try {
      const token = JSON.parse(localStorage.getItem('social-app-token'));
      await backendClient.delete(`/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects((prev) => prev.filter((proj) => proj._id !== projectId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (proj) => {
    setName(proj.name);
    setDescription(proj.description);
    setStatus(proj.status);
    setProgress(proj.progress);
    setDeadline(proj.deadline);
    setEditId(proj._id); // Capture this for updating
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-center">Add New Project</h2>

        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
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
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="number"
          placeholder="Progress (%)"
          value={progress}
          min={0}
          max={100}
          onChange={(e) => setProgress(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
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
      <section className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj._id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{proj.name}</h3>
            <p>{proj.description}</p>
            <p>Status: {proj.status}</p>
            <p>Progress: {proj.progress}%</p>
            <p>Deadline: {new Date(proj.deadline).toLocaleDateString()}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(proj)} className="bg-yellow-400 px-3 py-1 rounded">✏️ Edit</button>
              <button onClick={() => handleDelete(proj._id)} className="bg-red-500 px-3 py-1 text-white rounded">🗑️ Delete</button>
            </div>
          </div>
        ))}
      </section>
    </main>

  );
}

export default ProjectPage;