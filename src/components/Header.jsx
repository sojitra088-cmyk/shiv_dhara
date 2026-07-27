import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const Header = ({ logo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent Body Scroll when Mobile Menu is Open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const productMenu = [
    { name: "Marble", path: "/products/marble" },
    { name: "Granite", path: "/products/granite" },
    { name: "Tiles", path: "/products/tiles" },
    { name: "Bathware", path: "/products/bathware" },
  ];

  // Helper function for normal links styles on Desktop
  const getDesktopLinkStyle = (isActive) =>
    `text-[11px] uppercase tracking-[0.2em] font-bold transition ${
      isActive
        ? "text-lime-500"
        : scrolled
        ? "text-gray-900 hover:text-lime-500"
        : "text-white hover:text-lime-400"
    }`;

  // Helper function for normal links styles on Mobile
  const getMobileLinkStyle = (isActive) =>
    `text-2xl font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
      isActive ? "text-lime-600" : "text-gray-900 hover:text-lime-500"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled || isOpen ? "bg-white shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* ==================== Logo ==================== */}
        <NavLink
          to="/"
          className="flex items-center z-[110]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`transition-all duration-500 rounded-xl py-1 px-2 ${
              scrolled || isOpen ? "bg-black/90" : "bg-transparent"
            }`}
          >
            <img
              src={logo || "https://via.placeholder.com/150x50?text=LOGO"}
              alt="Logo"
              className={`transition-all duration-500 object-contain ${
                scrolled ? "h-8 md:h-10" : "h-10 md:h-14"
              }`}
            />
          </div>
        </NavLink>

        {/* ==================== Desktop Menu ==================== */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink to="/" className={({ isActive }) => getDesktopLinkStyle(isActive)}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => getDesktopLinkStyle(isActive)}>
            About Us
          </NavLink>

          {/* Desktop Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] font-bold transition py-2 ${
                scrolled ? "text-gray-900 hover:text-lime-500" : "text-white hover:text-lime-400"
              }`}
            >
              Products
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${productOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                productOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-3"
              }`}
            >
              {productMenu.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-lime-50 hover:text-lime-600 transition"
                  onClick={() => setProductOpen(false)}
                >
                  {item.name}
                  <ChevronRight size={16} className="opacity-40" />
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink to="/service" className={({ isActive }) => getDesktopLinkStyle(isActive)}>
            Services
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => getDesktopLinkStyle(isActive)}>
            Contact
          </NavLink>

          {/* CTA Button */}
          <NavLink
            to="/contact"
            className="bg-lime-500 text-black px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-md"
          >
            Get Quote
          </NavLink>
        </nav>

        {/* ==================== Mobile Menu Toggle Button ==================== */}
        <button
          className="md:hidden p-2 z-[110] relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="text-black" size={32} />
          ) : (
            <Menu className={scrolled ? "text-black" : "text-white"} size={32} />
          )}
        </button>

        {/* ==================== Mobile Menu Overlay ==================== */}
        <div
          className={`fixed inset-0 bg-white transition-transform duration-500 ease-in-out md:hidden overflow-y-auto ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ zIndex: 105 }}
        >
          <div className="flex flex-col min-h-screen w-full justify-center items-center gap-6 px-6 py-24">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => getMobileLinkStyle(isActive)}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => getMobileLinkStyle(isActive)}>
              About Us
            </NavLink>

            {/* Mobile Products Accordion */}
            <div className="flex flex-col items-center w-full">
              <button
                onClick={() => setMobileProductOpen(!mobileProductOpen)}
                className={`flex items-center gap-2 text-2xl font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  mobileProductOpen ? "text-lime-600" : "text-gray-900"
                }`}
              >
                Products
                <ChevronDown
                  size={24}
                  className={`transition-transform duration-300 ${mobileProductOpen ? "rotate-180 text-lime-600" : "text-gray-900"}`}
                />
              </button>
              
              {/* Mobile Submenu Items */}
              <div
                className={`flex flex-col items-center overflow-hidden transition-all duration-500 ease-in-out ${
                  mobileProductOpen ? "max-h-64 opacity-100 mt-4 gap-4" : "max-h-0 opacity-0"
                }`}
              >
                {productMenu.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-gray-600 hover:text-lime-600 uppercase tracking-widest"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink to="/service" onClick={() => setIsOpen(false)} className={({ isActive }) => getMobileLinkStyle(isActive)}>
              Services
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className={({ isActive }) => getMobileLinkStyle(isActive)}>
              Contact
            </NavLink>

            {/* Mobile CTA */}
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-6 bg-lime-500 text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
            >
              Get Quote
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;