import api from "../api/axios";
import type { LoginResponse } from "../types/Auth";

// login
export const loginEmployee = async(username: string, password: string) =>{
  const response  = await api.post<LoginResponse> ("/employees/login",{
    username,
    password
  });

  // Expected login API response from backend
  const {token, employee} = response.data;

  localStorage.setItem("token",token)
   // storing full user object
  localStorage.setItem("user", JSON.stringify(employee));
  return response.data;
}

// logout

export const logoutUser = ()=>{
  localStorage.removeItem("token");
  window.location.href = "/"
}