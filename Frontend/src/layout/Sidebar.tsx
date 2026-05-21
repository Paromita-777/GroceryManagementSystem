import { NavLink } from "react-router-dom";

export default function Sidebar() {
   const user = JSON.parse(localStorage.getItem("user") || "{}");
   const role = user.roles?.[0]
  return (
    <div className="bg-secondary  text-white vh-100 p-3" style={{ width: "220px" }}>
      <h4 className="mb-4">  Welcome <b>{role || "Guest"}</b></h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
         <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"
            }
          >
            📦 Products
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <span className="text-muted">👤 Employees (Coming Soon)</span>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"
            }
          >
            📊 Dashboard
          </NavLink>
        </li>

      </ul>
    </div>
  );
}