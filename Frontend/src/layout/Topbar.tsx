import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      <span className="navbar-brand mb-0 h5">Product Dashboard</span>

      <div className="d-flex gap-3 align-items-center">
        <input
          className="form-control form-control-sm"
          placeholder="Search products..."
          style={{ width: "200px" }}
        />

        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}