import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import CategoryProducts from "./pages/CategoryProducts";
import SingleProduct from "./pages/SingleProduct";

// ADMIN
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import AddSubcategory from "./admin/AddSubcategory";
import ManageSubcategories from "./admin/ManageSubcategories";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header logo="/logo.png" />}

      <ScrollToTop />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:category" element={<CategoryProducts />} />
        <Route
          path="/products/:category/:slug"
          element={<SingleProduct />}
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="add-subcategory" element={<AddSubcategory />} />
  <Route path="manage-subcategories" element={<ManageSubcategories />} />
        </Route>
      </Routes>

      {!isAdmin && <Footer logo="/logo.png" />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
