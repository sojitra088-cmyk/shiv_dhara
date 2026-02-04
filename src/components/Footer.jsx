import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = ({ logo }) => {
  return (
    <footer className="bg-white pt-12 md:pt-20 pb-10 border-t border-neutral-100">

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mb-20">

          {/* LOGO + TAGLINE */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">

            <div className="inline-flex bg-black px-4 py-3 rounded-2xl mx-auto lg:mx-0">

              <img src={logo} alt="Shivdhara Marble Hub" className="h-8" />
            </div>

            <p className="text-sm text-neutral-500 max-w-xs">
              Redefining luxury through world-class natural stones.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 justify-center lg:justify-start">

              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:text-lime-600 hover:border-lime-500 transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-10 mt-10 lg:mt-0">


            {/* COMPANY */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6">
                Company
              </h4>
              <ul className="space-y-4 text-sm font-semibold text-neutral-400">
                <li><Link to="/about" className="hover:text-lime-600">About Us</Link></li>
                <li><Link to="/service" className="hover:text-lime-600">Services</Link></li>
                <li><Link to="/contact" className="hover:text-lime-600">Contact</Link></li>
              </ul>
            </div>

            {/* COLLECTIONS */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6">
                Collections
              </h4>
              <ul className="space-y-4 text-sm font-semibold text-neutral-400">
                <li><Link to="/product" className="hover:text-lime-600">Italian Marble</Link></li>
                <li><Link to="/product" className="hover:text-lime-600">Granite</Link></li>
                <li><Link to="/product" className="hover:text-lime-600">Bathware</Link></li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div className="text-center md:text-left">

              <h4 className="text-xs font-black uppercase tracking-widest mb-6">
                Support
              </h4>
              <ul className="space-y-4 text-sm font-semibold text-neutral-400">
                <li>
                  <a href="https://wa.me/9723272739" className="hover:text-lime-600 flex gap-2 items-center justify-center md:justify-start">
                    <Phone size={16} /> +91 97232 72739
                  </a>
                </li>
                <li>
                  <a href="mailto:info@shivdharamarble.com" className="hover:text-lime-600 flex gap-2 items-center justify-center md:justify-start">
                    <Mail size={16} /> info@shivdharamarble.com
                  </a>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-start text-center md:text-left">

              <h4 className="text-xs font-black uppercase tracking-widest mb-6">
                Enquiry
              </h4>

              <Link
                to="/contact"
                className="inline-block w-full md:w-auto text-center bg-black text-white py-3 rounded-xl text-sm font-bold hover:bg-lime-600 transition"
              >
                Get a Quote
              </Link>

            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          <p>© 2025 Shivdhara Marble Hub</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-black">Privacy</Link>
            <Link to="/terms" className="hover:text-black">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
