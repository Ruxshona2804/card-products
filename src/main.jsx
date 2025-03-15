import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Categories from "./pages/Categories.jsx";
import Login_cards from "./pages/Login_cards.jsx";
import Profile from "./pages/Profile.jsx"; // Импортируем Profile
import CartListProvider from "./Context/CartList.jsx";
import Carts from "./pages/Carts.jsx";
import { ToastContainer } from "react-toastify";


const AuthWrapper = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <CartListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login_cards />} />
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
            <Route path="profile" element={<Profile />} /> {/* Профиль здесь */}
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </CartListProvider>
  </StrictMode>
);
