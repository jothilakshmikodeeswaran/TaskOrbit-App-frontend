import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { backendClient } from "../clients/backendClient";
import MainLayout from "../components/MainLayout";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchSingleProject = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("social-app-token"));
        const res = await backendClient.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data);
      } catch (err) {
        console.error("Detail fetch error:", err);
      }
    };

    if (id) fetchSingleProject();
  }, [id]);

  if (!project) return <p className="text-center mt-8">Loading project details...</p>;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 mt-8 shadow rounded">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
        <p className="mb-2"><strong>Description:</strong> {project.description}</p>
        <p className="mb-2"><strong>Status:</strong> {project.status}</p>
        <p className="mb-2"><strong>Progress:</strong> {project.progress}%</p>
        <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
      </div>
    </MainLayout>
  );
}

export default ProjectDetail