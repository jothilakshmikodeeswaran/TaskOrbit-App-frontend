import { useEffect, useState } from "react";
import { backendClient } from "../clients/backendClient";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import axios from "axios";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    sex: "",
    status: "",
    profilepic: "",
    joinedAt: "",
    bio: "",
  });

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("social-app-token"));

  const fetchEmployees = async () => {
    try {
      const res = await backendClient.get("/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      sex: "",
      status: "",
      profilepic: "",
      joinedAt: "",
      bio: "",
    });
    setSelectedFile(null);
    setUploadStatus("");
    setEditId(null);
    
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const data = new FormData();
    data.append("profilepic", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/employees/upload-profilepic",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        profilepic: response.data.imageUrl,
      }));
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadStatus(
        error.response?.status === 401
          ? "Unauthorized. Check your token."
          : "Upload failed. Try again."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.email.includes("@")) {
      alert("Valid email is required");
      return;
    }

    try {
      const apiCall = editId
        ? backendClient.put(`/employees/${editId}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : backendClient.post("/employees", formData, {
            headers: { Authorization: `Bearer ${token}` },
          });

      await apiCall;
      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await backendClient.delete(`/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (emp) => {
    setFormData({ ...emp, joinedAt: emp.joinedAt?.split("T")[0] || "" });
    setEditId(emp._id);
    setUploadStatus("");
  };

  return (
    <MainLayout>
      <main>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">
            {editId ? "Edit Employee" : "Add Employee"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="" disabled hidden>
              Enter Role
            </option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Vice-President">Vice President</option>
            <option value="PrincipalDeveloper">Principal Developer</option>
            <option value="SeniorDeveloper">Senior Developer</option>
            <option value="JuniorDeveloper">Junior Developer</option>
            <option value="QAEngineer">QA Engineer</option>
            <option value="UI/UX-Designer">UI/UX Designer</option>
            <option value="Support">Support</option>
            <option value="HR">HR</option>
            <option value="BusinessAnalyst">Business Analyst</option>
          </select>

          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="" disabled hidden>
              Enter sex
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="" disabled hidden>
              Enter status
            </option>
            <option value="Online">Online</option>
            <option value="Leave">Leave</option>
            <option value="Busy">Busy</option>
          </select>

          <input
            type="date"
            name="joinedAt"
            value={formData.joinedAt}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            name="bio"
            placeholder="Short bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input type="file" onChange={handleFileChange} />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
          <p className="text-sm italic">{uploadStatus}</p>
          <input
            type="submit"
            value={editId ? "UPDATE" : "ADD"}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          />
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-4 bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded"
          >
            ← Back to Dashboard
          </button>
        </form>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {employees.map((emp) => (
            <div key={emp._id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">{emp.name}</h3>
              <p>Email: {emp.email}</p>
              <p>Role: {emp.role}</p>
              <p>Sex: {emp.sex}</p>
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
              <p>Joined: {new Date(emp.joinedAt).toLocaleDateString()}</p>
              <p className="mt-1 italic text-gray-600">{emp.bio}</p>
              <img
                src={emp.profilepic ? emp.profilepic : "/images/jk.jpg"}
                alt="Profile"
                className="w-20 h-20 mt-2 rounded-full object-cover"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(emp)}
                  className="bg-blue-500 px-3 py-1 rounded text-white"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
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

export default EmployeePage;
