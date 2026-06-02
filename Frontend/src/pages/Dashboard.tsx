import type { User } from "../types/User";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const storedUser = localStorage.getItem("user");

  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const isAdmin = user?.roles?.includes("admin") ?? false;

  if (!user) {
    return <h2>Please login again</h2>;
  }

  return (
    <>
      {isAdmin ? (
        <div>
          <h2 className="text-primary">👑 Admin Dashboard</h2>
          <p>Manage employees, roles, and system settings.</p>

          <ul>
            <li> <NavLink to="/employees">👥 View Employees</NavLink></li>
            <li><NavLink to="/employees/add">➕ Add Employee</NavLink></li>
            <li> <NavLink to="/employees/update">👥 Update Employees</NavLink></li>
            <li><NavLink to="/roles">🔐 Manage Roles</NavLink></li>
            <li> <NavLink to="/employees/delete">👥 Delete Employees</NavLink></li>
            <li><NavLink to="/products">📦 Manage Products</NavLink></li>
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-primary">👤 Employee Dashboard</h2>
          <p>Welcome! You can view your profile and products.</p>

          <ul>
            <li><NavLink to="/profile">👤 My Profile</NavLink></li>
            <li><NavLink to="/change-password">🔑 Change Password</NavLink></li>
            <li> <NavLink to="/products">📦 View Products</NavLink></li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Dashboard;