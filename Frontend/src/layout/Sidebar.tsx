export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
      <h4 className="mb-4">Admin</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">📦 Products</li>
        <li className="nav-item mb-2">👤 Employees</li>
        <li className="nav-item mb-2">📊 Dashboard</li>
      </ul>
    </div>
  );
}