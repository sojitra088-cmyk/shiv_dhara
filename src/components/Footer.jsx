import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = ({ logo }) => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid: Stacks on mobile, 3-Columns on 1024px+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-start">
          
          {/* Column 1: Brand (Spans 3/12) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-black inline-block p-3 rounded-xl">
              <img src={logo} alt="Shivdhara" className="h-8 object-contain" />
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed font-medium max-w-xs">
              Redefining luxury through world-class natural stones.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-lime-600 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Links (Spans 4/12) - Side-by-side links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black">Company</h4>
              <ul className="space-y-3 text-xs font-bold text-neutral-400 uppercase">
                <li className="hover:text-lime-600 cursor-pointer">About Us</li>
                <li className="hover:text-lime-600 cursor-pointer">Projects</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black">Collections</h4>
              <ul className="space-y-3 text-xs font-bold text-neutral-400 uppercase">
                <li className="hover:text-lime-600 cursor-pointer">Italian Marble</li>
                <li className="hover:text-lime-600 cursor-pointer">Bathware</li>
              </ul>
            </div>
          </div>

          {/* Column 3: High-Light Contact Card (Spans 5/12) */}
          <div className="lg:col-span-5 relative group">
            <div className="bg-neutral-50 p-8 rounded-[40px] border border-neutral-100 shadow-sm relative overflow-hidden">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-6">Get In Touch</h4>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-lime-500/10 p-2 rounded-lg text-lime-600"><MapPin size={20}/></div>
                    <p className="text-sm font-bold text-neutral-700">Surat, Gujarat, India</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-lime-500/10 p-2 rounded-lg text-lime-600"><Phone size={20}/></div>
                    <p className="text-sm font-black text-neutral-900">+91 98765 43210</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          <p>© 2025 Shivdhara Marble Hub.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;