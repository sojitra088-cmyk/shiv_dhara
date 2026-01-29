import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = ({ logo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menu = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Product", path: "/product" },
    { name: "Service", path: "/service" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <NavLink to="/" className="flex items-center z-[110]" onClick={() => setIsOpen(false)}>
          <div className={`transition-all duration-500 rounded-xl py-1 ${
            scrolled || isOpen ? "bg-black/90" : "bg-transparent"
          }`}>
            <img 
              src={logo} 
              className={`transition-all duration-500 object-contain ${
                scrolled ? "h-8 md:h-10" : "h-10 md:h-14"
              }`} 
              alt="Shivdhara Marble Hub" 
            />
          </div>
        </NavLink>

        {/* DESKTOP NAVIGATION (Visible only on md screens and up) */}
        <nav className="hidden md:flex gap-8 lg:gap-10 items-center">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                  isActive
                    ? "text-lime-500"
                    : scrolled 
                      ? "text-gray-900 hover:text-lime-500" 
                      : "text-white hover:text-lime-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="bg-lime-500 text-black px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-md"
          >
            Get Quote
          </NavLink>
        </nav>

        {/* MOBILE MENU TOGGLE BUTTON */}
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

        {/* MOBILE MENU OVERLAY */}
        <div 
          className={`fixed inset-0 bg-white transition-transform duration-500 ease-in-out md:hidden ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ zIndex: 105 }} 
        >
          <div className="flex flex-col h-full w-full justify-center items-center gap-6 px-6 pt-20">
            {menu.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `text-2xl font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive ? "text-lime-600" : "text-gray-900"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-lime-500 text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
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