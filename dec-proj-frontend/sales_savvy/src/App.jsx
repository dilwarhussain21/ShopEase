import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Admin_home from "./pages/Admin_home";
import Customer_home from "./pages/Customer_home";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import UpdateProduct from "./pages/UpdateProduct";
import ViewCart from "./pages/ViewCart";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSummary from "./pages/OrderSummary";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin_home" element={<Admin_home />} />
      <Route path="/customer_home" element={<Customer_home />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/updateProduct" element={<UpdateProduct />} />
      <Route path="/view-cart" element={<ViewCart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-summary/:orderId" element={<OrderSummary />} />
      {/* Catch-all route to redirect to home page for unmatched paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}