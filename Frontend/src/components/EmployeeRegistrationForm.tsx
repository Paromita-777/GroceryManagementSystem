import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// service function that calls backend API for registration
import { registerEmployee } from "../services/authService";

export default function EmployeeRegistrationForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      // update only the changed field using input "name"
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission 
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // calling backend API via service function 
      const response = await registerEmployee(form);
      console.log("REGISTER RESPONSE:", response);
      // success message to user
      alert("Employee registered successfully!");
      navigate("/login");

    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.message);

    alert(error.response?.data?.message || "Registration Failed!");
  } else {
    console.log("Unexpected error:", error);
    alert("Something went wrong");
  }
}
  };

  return (
    <>
      <h2 className="text-center mb-4 text-success fw-bold">
        Employee Registration
      </h2>

      <div className="container mt-5">
        <div className="card p-4 shadow mx-auto" style={{ maxWidth: "700px" }}>

          <form onSubmit={handleRegister}>

            {/* First Name */}
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <label className="form-label mb-0">First Name:</label>
              </div>

              <div className="col-md-9">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <label className="form-label mb-0">Last Name:</label>
              </div>

              <div className="col-md-9">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <label className="form-label mb-0">Username:</label>
              </div>

              <div className="col-md-9">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <label className="form-label mb-0">Password:</label>
              </div>

              <div className="col-md-9">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Register
            </button>

          </form>
        </div>
      </div>
    </>
  );
}