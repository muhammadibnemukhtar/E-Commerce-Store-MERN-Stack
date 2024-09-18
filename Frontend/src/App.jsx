import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Products from "./pages/Products";
import AddProducts from "./pages/addProducts";
import ProtectedRoute from "./components/ProtectedRoutes";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Category from "./pages/category";
import ProductDetail from "./pages/productDetail";

const App = () => {
  const loggedin = useSelector((state) => state.loginAdmin.loggedin);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:category" element={<Category />} />
      <Route path="/products/:category/:id" element={<ProductDetail />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
