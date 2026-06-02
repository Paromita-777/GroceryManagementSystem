import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row h-100">

        {/* Left Side */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-success text-white p-5">
          <h1 className="fw-bold display-5 text-center">
            Grocery Management System
          </h1>

          <p className="mt-3 text-center fs-5">
            Manage products, inventory, employees and sales efficiently.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3082/3082037.png"
            alt="grocery"
            style={{ width: "250px" }}
            className="mt-4"
          />
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">

          <h2 className="mb-4 fw-bold">Welcome</h2>

          {/* Buttons side by side */}
          <div className="d-flex gap-3">

            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}