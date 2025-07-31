import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <main className="min-h-screen flex items-center 
    justify-center bg-gradient-to-tr from-indigo-500 
    via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/90 
      backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to TaskOrbit </h1>
        <p className="text-lg text-center text-black mb-6">
          Mission control for your business tasks. Let’s get things done —
          faster, smarter, together.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-blue text-blue-800 font-semibold 
          px-6 py-3 rounded-full shadow-lg hover:bg-blue-100 transition"
        >
          Get Started
        </button>
      </div>
    </main>
  );
}

export default HomePage;
