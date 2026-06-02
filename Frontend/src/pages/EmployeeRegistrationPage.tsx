import EmployeeRegistrationForm from "../components/EmployeeRegistrationForm";

export default function EmployeeRegistrationPage(){
  return(
    <div  className="container mt-5">
      <div 
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
        >
        
        <EmployeeRegistrationForm/>
      </div>
    </div>
  )
}

