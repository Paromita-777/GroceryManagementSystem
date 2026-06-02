import { useState } from "react";
import { loginEmployee } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await loginEmployee(username, password);

      // 🔍  DEBUG LOGS 
    console.log("TOKEN:", localStorage.getItem("token"));
    console.log("USER:", localStorage.getItem("user"));

      console.log("LOGIN RESPONSE:", response);

      navigate("/dashboard");

    } catch (error) {
      console.log("Login error:", error);

      alert("Invalid credentials");
    }
  };

  return (
    <>
      <h2 className="text-center mb-4 text-success fw-bold">
        Employee Login
      </h2>

      <form onSubmit={handleLogin}>

        <div className="mb-3">
          <label className="form-label">Username</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
        >
          Login
        </button>

      </form>
    </>
  );
}