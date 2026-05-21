import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";


function App(){
return(
  <BrowserRouter>

  <Routes>
  <Route path="/" element={<Login />} />

  <Route
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/products" element={<Products />} />
    <Route path="/add-product" element={<AddProduct />} />
    <Route path="/edit-product/:sku" element={<EditProduct />} />
  </Route>
</Routes>
 
  </BrowserRouter>
)
}


export default App;