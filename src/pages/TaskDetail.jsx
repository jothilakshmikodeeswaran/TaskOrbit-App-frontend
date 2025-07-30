import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { backendClient } from "../clients/backendClient";
import MainLayout from "../components/MainLayout";

function TaskDetail() {
  const { taskId } = useParams(); // Read taskId from URL
  const navigate = useNavigate();
  const [task, setTask] = useState(null); // Single task object

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("social-app-token"));
        const res = await backendClient.get(`/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(res.data); // Set single task object
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 mt-8 shadow rounded">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-6">Task Details</h1>

        {!task ? (
          <p className="text-center mt-8">Task not found.</p>
        ) : (
          <div className="mb-4 p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default TaskDetail;