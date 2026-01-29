import React from 'react';
import { motion } from 'framer-motion';

const BathwareSection = () => {
  const categories = [
    {
      title: "Luxury Bathware",
      type: "ELEGANT • DESIGNER",
      desc: "Refined bath fittings crafted with precision finishes.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    },
    {
      title: "Premium Sanitaryware",
      type: "HYGIENIC • MINIMAL",
      desc: "Modern sanitary solutions designed for cleanliness.",
      image: "https://images.unsplash.com/photo-1604709177225-055f99402ea3",
    },
    {
      title: "Kitchen Sinks",
      type: "FUNCTIONAL • STYLISH",
      desc: "High-performance kitchen sinks for everyday luxury.",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
    },
  ];

  return (
    <section className="bg-neutral-50 py-24">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-12 bg-lime-500" />
          <span className="text-lime-600 font-bold tracking-widest text-xs uppercase">
            Premium Essentials
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-serif uppercase text-gray-900">
          Kitchen & <span className="text-gray-400">Bathware</span>
        </h2>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, ease: "easeOut" }}
            className="group relative h-[500px] overflow-hidden rounded-[40px] shadow-xl bg-white"
          >
            {/* IMAGE */}
            <div className="h-2/3 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06] will-change-transform"
              />
            </div>

            {/* CONTENT */}
            <div className="p-8 flex flex-col justify-between h-1/3">
              <div>
                <span className="text-[10px] font-bold text-lime-600 tracking-widest uppercase mb-2 block">
                  {item.type}
                </span>
                <h3 className="text-2xl font-serif uppercase text-gray-900">
                  {item.title}
                </h3>
              </div>

              <button className="text-gray-900 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:text-lime-600 transition-colors">
                Explore More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BathwareSection;
