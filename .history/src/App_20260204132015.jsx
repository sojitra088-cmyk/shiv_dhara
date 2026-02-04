import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Product = lazy(() => import("./pages/Product"));
const Service = lazy(() => import("./pages/Service"));
const Contact = lazy(() => import("./pages/Contact"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const AllProducts = lazy(() => import("./pages/AllProducts"));


// Lazy load admin pages
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const AddCategory = lazy(() => import("./admin/AddCategory"));
const AddProduct = lazy(() => import("./admin/AddProduct"));
const ManageProducts = lazy(() => import("./admin/ManageProducts"));
const AddSubcategory = lazy(() => import("./admin/AddSubcategory"));
const ManageSubcategories = lazy(() => import("./admin/ManageSubcategories"));
const ManageCategories = lazy(() => import("./admin/ManageCategories"));
const AdminContacts = lazy(() => import("./admin/AdminContacts"));

import './index.css'

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!isAdmin && <Header logo="/logo.png" />}

      <ScrollToTop setLoading={setLoading} />

      {/* PAGE LOADER */}
      <AnimatePresence>
        {loading && <PageLoader />}
      </AnimatePresence>

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:category" element={<CategoryProducts />} />
          <Route path="/:category/:subcategory" element={<CategoryProducts />} />
          <Route path="/allproducts" element={<AllProducts />} />

          <Route
            path="/products/:category/:slug"
            element={<SingleProduct />}
          />

          <Route path="/admin" element={<AdminLogin />} />

<Route path="/admin/*" element={<AdminLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="add-category" element={<AddCategory />} />
  <Route path="add-product" element={<AddProduct />} />
  <Route path="manage-products" element={<ManageProducts />} />
  <Route path="add-subcategory" element={<AddSubcategory />} />
  <Route path="manage-subcategories" element={<ManageSubcategories />} />
  <Route path="manage-categories" element={<ManageCategories />} />
  <Route path="contacts" element={<AdminContacts />} />
</Route>

        </Routes>
      </Suspense>

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
