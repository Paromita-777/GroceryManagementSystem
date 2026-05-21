import React, { useState } from "react";
import { loginEmployee } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState ("");

  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent)=>{
    e.preventDefault();

    try{
      const data = await loginEmployee(username, password)
      localStorage.setItem("token", data.token)

      navigate("/products")
    } catch(error){
      alert("Invalid credential")
    }
    
  }

  return(
    <form onSubmit={handleLogin}>
       <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>

    </form>
  )
}