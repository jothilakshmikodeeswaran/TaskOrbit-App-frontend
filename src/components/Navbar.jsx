import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex space-x-4">
      <NavLink to="/"></NavLink>
      <NavLink to="/register"></NavLink>
      <NavLink to="/signin"></NavLink>
      <NavLink to="/dashboard"></NavLink>
      <NavLink to="/projects"></NavLink>
      <NavLink to="/tasks"></NavLink>
      <NavLink to="/users"></NavLink>
      <NavLink to="/employees"></NavLink>
    </nav>
  );
}
export default NavBar;