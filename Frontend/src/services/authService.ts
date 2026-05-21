import api from "../api/axios";

// login
export const loginEmployee = async(
  username: string,
  password: string
) =>{
  const response  = await api.post ("/employees/login",{
    username,
    password
  });

  return response.data;
}

// logout

export const logout = ()=>{
  localStorage.removeItem("token");
  window.location.href = "/"
}