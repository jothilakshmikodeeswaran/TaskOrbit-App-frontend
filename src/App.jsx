//import { useState } from 'react';
import { Router, Route, Routes} from "react-router-dom"
import Homepage from './pages/Home';
import RegisterPage from './pages/Register';
import SignINPage from './pages/SignIn';
import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TaskPage from "./pages/TasksPage";
import './App.css';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
      <Routes>
       <Route path='/' element={<Homepage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/signin' element={<SignINPage/>}/>        
       <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </>
  )
}

export default App
