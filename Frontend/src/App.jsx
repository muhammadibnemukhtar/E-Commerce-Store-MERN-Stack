import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Products from "./pages/Products";
import AddProducts from "./pages/addProducts";
import ProtectedRoute from "./components/ProtectedRoutes";
import Register from "./pages/Register";
import Category from "./pages/category";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import PaymentSuccess from "./pages/paymentSuccess";
import PaymentCanclled from "./pages/paymentCancelled";

const App = () => {

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:category" element={<Category />} />
      <Route path="/products/:category/:id" element={<ProductDetail />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      <Route path="/paymentcanclled" element={<PaymentCanclled />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
