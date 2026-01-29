import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};


const categories = [
  {
    title: "Marble",
    subtitle: "Italian & Indian Luxury Stones",
    image:
      "Marble.jpg",
  },
  {
    title: "Granite",
    subtitle: "Strength with Natural Beauty",
    image:
      "Granite.jpg",
  },
  {
    title: "Tiles",
    subtitle: "Modern Floor & Wall Surfaces",
    image:
      "Tiles.jpg",
  },
  {
    title: "Bathware",
    subtitle: "Luxury Bathroom Essentials",
    image:
      "Bathware.jpg",
  },
  {
    title: "Sanitaryware",
    subtitle: "Elegant & Functional Designs",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
  },
  {
    title: "Kitchen Sinks",
    subtitle: "Modern Kitchen Solutions",
    image:
      "Kitchen_Sinks.avif",
  },
];
const collections = [
  {
    title: "Italian Marble Collection",
    desc: "Refined Italian marbles known for elegance, veining, and timeless appeal.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Premium Granite Series",
    desc: "Durable granites engineered for strength, texture, and long-term performance.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
  },
  {
    title: "Designer Tile Range",
    desc: "Contemporary tiles crafted for modern floors, walls, and feature surfaces.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
  },
];


const Product = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);
    }, []);



    return (
      <>
      <section
        className="
          relative
          min-h-[85vh] md:min-h-screen
          flex items-center
          overflow-hidden
        "
        style={{
          backgroundImage:
            "url('Top-Bathroom-Showrooms-in-New-York-City-You-Must-Visit-12.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 py-28 md:py-32">
            <div className="max-w-3xl">

              {/* Micro Heading */}
              <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                Our Products
              </p>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-white">
                Premium Stone <br />
                <span className="italic font-light text-white/70">
                  & Surface Solutions
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-white/85 leading-relaxed max-w-xl text-sm sm:text-base">
                Explore a curated range of marble, granite, tiles, bathware,
                sanitaryware, and kitchen solutions — crafted to elevate
                residential and commercial spaces.
              </p>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:gap-6">
                <a
                  href="#collections"
                  className="
                    bg-lime-500 text-black
                    px-10 py-4
                    rounded-full
                    font-bold uppercase tracking-widest text-xs
                    hover:bg-white transition-all
                    text-center
                  "
                >
                  View Collections
                </a>

                <a
                  href="/contact"
                  className="
                    border border-white/40 text-white
                    px-10 py-4
                    rounded-full
                    font-bold uppercase tracking-widest text-xs
                    hover:bg-white hover:text-black transition-all
                    text-center
                  "
                >
                  Get a Quote
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="pt-28 pb-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl mb-20"
          >
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
              Product Categories
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
              Premium Materials for <br />
              <span className="text-neutral-400 font-light italic">
                Inspired Spaces
              </span>
            </h2>
          </motion.div>

          {/* GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="
                  group relative bg-white rounded-3xl overflow-hidden
                  border border-gray-200 shadow-sm
                  hover:shadow-xl transition-shadow duration-500
                "
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-105
                    "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-8 relative">
                  <span className="
                    absolute inset-0 rounded-3xl border border-transparent
                    group-hover:border-lime-500/40
                    transition-colors duration-500
                  " />

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {cat.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {cat.subtitle}
                  </p>

                  <div className="inline-flex items-center gap-2 text-lime-600 font-semibold text-sm uppercase tracking-wider group">
                    Explore
                    <i
                      className="
                        fa-solid fa-arrow-right
                        opacity-70
                        transition-all duration-300 ease-out
                        group-hover:translate-x-2 group-hover:opacity-100
                      "
                    ></i>
                  </div>
                </div>

                {/* SOFT GLOW */}
                <div className="
                  absolute -bottom-10 -right-10 w-32 h-32
                  bg-lime-500/10 blur-3xl rounded-full
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-700
                " />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      
    </>
  );
};

export default Product;
