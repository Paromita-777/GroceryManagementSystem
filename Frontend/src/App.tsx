import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Products from "./pages/Products";
import ProtectedRoute from "./routes/ProtectedRoute";

function App(){
return(
  <BrowserRouter>
  <Routes>
    <Route path =  "/" element={<Login/>}></Route>
    <Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
  </Routes>
  </BrowserRouter>
)
}


export default App;