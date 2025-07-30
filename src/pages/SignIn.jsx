import { useState } from "react";
import { backendClient } from "../clients/backendClient";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
function SignINPage() {
  const navigate = useNavigate();
const { setCurrentUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await backendClient.post("/users/login", formData);
      console.log(res.data);
      localStorage.setItem("social-app-token", JSON.stringify(res.data.token));
      setCurrentUser(res.data.user)
      navigate("/dashboard"); // navigate
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-4 text-sm">
          Sign in to continue managing your tasks like a pro.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="submit"
            value="Login"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-all duration-200 font-semibold tracking-wide"
          />
        </form>
      </div>
    </main>
  );
}

export default SignINPage;
