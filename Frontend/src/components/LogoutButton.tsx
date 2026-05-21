import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";


export default function LogoutButton(){
  const navigate = useNavigate()
  
  const handleLogout = () =>{
    logoutUser();
    navigate("/")
  }
  return(
    <>
    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </>
  )
}