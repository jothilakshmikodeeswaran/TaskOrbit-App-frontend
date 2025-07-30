//import { useState } from 'react';
import { Router, Route, Routes} from "react-router-dom"
import Homepage from './pages/Home';
import RegisterPage from './pages/Register';
import SignINPage from './pages/SignIn';
import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TasksPage from "./pages/TasksPage";
import EmployeePage from "./pages/EmployeePage";
import TaskDetail from "./pages/TaskDetail";
import { useUser } from "./context/UserContext";
import './App.css';

function App() {
  const { currentUser } = useUser();
  console.log(currentUser);

  return (
    <>
    <NavBar/>
    {!currentUser ? (
      <Routes>
       <Route path='/' element={<Homepage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/signin' element={<SignINPage/>}/>
        <Route path="*" element={<Homepage />}/> 
         </Routes>  
    ):( 
        <Routes> 
        <Route path='/' element={<Homepage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/signin' element={<SignINPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:projectId" element={<TaskDetail />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/employees" element={<EmployeePage />} />        
      </Routes>
    )}
    </>
  )
}

export default App
