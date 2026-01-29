import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop"; // Import it
import CategoryProducts from "./pages/CategoryProducts";
import SingleProduct from "./pages/SingleProduct";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Place it here */}
      <Header logo="/logo.png" />

      {/* Page Content */}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:category" element={<CategoryProducts />} />
          <Route path="/products/:category/:slug" element={<SingleProduct />} />
        </Routes>
      </div>
      <Footer logo="/logo.png" />
    </BrowserRouter>
  );
}

export default App;
