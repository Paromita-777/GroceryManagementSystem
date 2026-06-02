import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmployeeRegistrationPage from "./pages/EmployeeRegistrationPage";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import EmployeeDetails from "./pages/EmployeeDetails";



function App(){
return(
  <BrowserRouter>

 <Routes>
  {/* Home Page (NEW FIRST PAGE) */}
  <Route path="/" element={<Home />} />

  {/* Auth Pages */}
  <Route path="/login" element={<Login />} />

  <Route
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }>
    
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/products" element={<Products />} />
    <Route path="/add-product" element={<AddProduct />} />
    <Route path="/edit-product/:sku" element={<EditProduct />} />
    <Route path="/employees/add" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <EmployeeRegistrationPage />
        </ProtectedRoute>
      }
    />
    <Route path="/employees" element={<EmployeeDetails />} />
  </Route>
</Routes>
 
</BrowserRouter>
)
}


export default App;