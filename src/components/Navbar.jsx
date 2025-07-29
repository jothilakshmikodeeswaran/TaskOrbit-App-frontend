import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav class="flex space-x-4">
      <NavLink to="/">home</NavLink>
      <NavLink to="/register">register</NavLink>
      <NavLink to="/signin">signin</NavLink>
      <NavLink to="/dashboard"></NavLink>
      <NavLink to="/projects"></NavLink>
      <NavLink to="/tasks">task</NavLink>
      <NavLink to="/users"></NavLink>
      <NavLink to="/employee">employee</NavLink>
    </nav>
  );
}
export default NavBar;