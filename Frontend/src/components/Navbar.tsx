import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";


export default function Navbar(){
  const navigate = useNavigate()
  
  const handleLogout = () =>{
    logout();
    navigate("/")
  }
  return(
    <>
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}