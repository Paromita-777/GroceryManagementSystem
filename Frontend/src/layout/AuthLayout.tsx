import type { ReactNode } from "react";

type AuthLayoutProps ={
  children : ReactNode;
}

export default function AuthLayoutProps({children}: AuthLayoutProps){
  return(
    <div className="container-fluid vh-100 bg-light">
      <div className="row h-100">
        {/* Left Side */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-success text-white p-5">
          <h1 className="fw-bold display-5">Grocery Management System</h1>
          <p className="mt-3 text-center fs-5"> Manage products, inventory, employees and sales efficiently.</p>
           <img
            src="https://cdn-icons-png.flaticon.com/512/3082/3082037.png"
            alt="grocery"
            style={{ width: "250px" }}
            className="mt-4"
          />
        </div>

         {/* Right Side */}
         <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card shadow-lg border-0 p-4"
            style={{ width: "400px", borderRadius: "15px" }}>
              {children}
            </div>
         </div>
      </div>
    </div>
  )
}