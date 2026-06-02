import { useState } from "react";
import { loginEmployee } from "../services/authService";
import { useNavigate } from "react-router-dom";
import LoginFields from "./LoginFields";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  // -----------------------------
  // HANDLE LOGIN SUBMISSION
  // -----------------------------
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent page reload on form submit
    e.preventDefault();
    try {
       // Call backend login API via service function
      const response = await loginEmployee(username, password);

      // DEBUG LOGS for development only
      console.log("TOKEN:", localStorage.getItem("token"));
      console.log("USER:", localStorage.getItem("user"));
      console.log("LOGIN RESPONSE:", response);

       // -----------------------------
      // NAVIGATION AFTER SUCCESS LOGIN
      // -----------------------------
      navigate("/dashboard");

    } catch (error) {
      // If login fails (wrong credentials, server error, etc.)
      console.log("Login error:", error);
      alert("Invalid credentials");
    }
  };

   // -----------------------------
  // UI SECTION (FORM)
  // -----------------------------

  return (
    <>
      <h2 className="text-center mb-4 text-success fw-bold">
        Employee Login
      </h2>

      <form onSubmit={handleLogin}>

        <LoginFields
         username = {username}
         password = {password}
         setUsername={setUsername}
         setPassword={setPassword}
         >
        </LoginFields>

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