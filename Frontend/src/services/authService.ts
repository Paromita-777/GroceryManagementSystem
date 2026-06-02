import api from "../api/axios";
import type { LoginResponse, RegisterRequest } from "../types/Auth";


// ======================================================
//  LOGIN FUNCTION
// Used when user submits login form
// ======================================================
export const loginEmployee = async(username: string, password: string) =>{
    // Send login request to backend API
  const response  = await api.post<LoginResponse> ("/employees/login",{
    username,
    password
  });

  // Destructure backend response
  // Expected: { token: string, employee: object }
  const {token, employee} = response.data;

    // -----------------------------------------
  // STORE AUTH DATA IN LOCAL STORAGE
  // -----------------------------------------
  localStorage.setItem("token",token)
  // user info → used for UI (profile, navbar, role display, etc.)
  localStorage.setItem("user", JSON.stringify(employee));
  return response.data;
}



// ======================================================
// 🧾 REGISTER FUNCTION
// Used when user submits registration form
// ======================================================
export const registerEmployee = async (employeeData: RegisterRequest) => {
  // Send registration data to backend
  const response = await api.post("/employees/register", {
    firstName: employeeData.firstName,
    lastName: employeeData.lastName,
    username: employeeData.username,
    password: employeeData.password,
  });
// Return backend response (usually success message or created user)
  return response.data;
};

// ======================================================
// 🚪 LOGOUT FUNCTION
// Used when user clicks "Logout" button
// ======================================================
export const logoutUser = ()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}