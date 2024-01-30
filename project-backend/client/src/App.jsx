import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Signup from "./components/signup/Signup";
import SignIn from "./components/signin/Signin";
import HomePage from "./pages/HomePage";
import ListProducts from "./components/products/ListProducts";
import ProductDetail from "./components/products/ProductDetail";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />}>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route path="/" element={<HomePage />}>
        <Route path="" element={<ListProducts />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
