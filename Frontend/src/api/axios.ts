import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
})

// ======================================================
//  REQUEST INTERCEPTOR (BEFORE REQUEST IS SENT)
// ======================================================
// This runs BEFORE every API request
api.interceptors.request.use((config)=>{
   // Get JWT token from browser storage
  const token = localStorage.getItem("token");
    // If token exists, attach it to request headers
  if(token && config.headers){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

// ======================================================
// RESPONSE INTERCEPTOR (AFTER RESPONSE IS RECEIVED)
// ======================================================
api.interceptors.response.use(
  (response) => response, 
  (error) =>{
    // HANDLE UNAUTHORIZED ERROR (401)
    if(error.response?.status === 401){
      localStorage.removeItem("token")
      window.location.href = "/"
    }
    return Promise.reject(error)
  }
)
export default api