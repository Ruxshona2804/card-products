import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Categories from "./pages/Categories.jsx";
import LoginCards from "./pages/Login_cards.jsx";
import CartListProvider from "./Context/CartList.jsx";
import Carts from "./pages/Carts.jsx";
import { ToastContainer } from "react-toastify";

const AuthWrapper = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Проверяем токен
  return isAuthenticated ? children : <Navigate to="/login" />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <CartListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginCards />} />
          <Route
            path="/"
            element={
              <AuthWrapper>
                <App />
              </AuthWrapper>
            }
          >
            <Route index element={<Products />} />
            <Route path="product-detail/:id" element={<ProductDetail />} />
            <Route path="category-list" element={<Categories />} />
            <Route path="carts" element={<Carts />} />
            <Route path="/profile" element={<LoginCards />} />
          </Route>

         
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </CartListProvider>
  </StrictMode>
);
