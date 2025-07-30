import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Sidebar() {

   const { currentUser, logout } = useUser();
  //const navigate = useNavigate();


  // const handleLogout = () => {
  //   localStorage.removeItem("social-app-token");
  //   localStorage.removeItem("user-info");
    
  //   navigate("/");
  // };

  return (

   <>
   <aside className="w-64 bg-indigo-700 text-white p-6 space-y-4 min-h-screen"> 
{currentUser ? (
  <>
      <nav className="space-y-3">
        <Link to="/dashboard" className="block hover:underline">🏠 Dashboard</Link>
        <Link to="/projects" className="block hover:underline">📁 Projects</Link>
        <Link to="/tasks" className="block hover:underline">✅ Tasks</Link>
        <Link to="/employees" className="block hover:underline">👥 Employee Profile</Link>        
      </nav>
      <p className="mt-10 text-sm">Welcome, <span className="font-medium"></span>{currentUser.username} 👋</p>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button></>
) : (
      <nav>
         <Link to="/register" className="block hover:underline">Register</Link>
         <Link to="/signin" className="block hover:underline">Signin</Link>
      </nav>
)}
    </aside>


</>
  );

}

export default Sidebar;