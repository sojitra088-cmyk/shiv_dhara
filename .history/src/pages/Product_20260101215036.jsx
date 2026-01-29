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
const applications = [
  {
    title: "Luxury Residences",
    desc: "Premium marble and stone solutions crafted for private homes, enhancing elegance, durability, and long-term value.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Villas & Apartments",
    desc: "Thoughtfully selected stones that elevate modern villas and apartments with refined textures and finishes.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
  },
  {
    title: "Hotel & Hospitality Projects",
    desc: "High-performance stone applications designed to withstand heavy use while maintaining luxury appeal.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
  {
    title: "Commercial Interiors",
    desc: "Durable and sophisticated stone solutions for offices, retail spaces, and corporate environments.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    title: "Feature Walls & Flooring",
    desc: "Statement stone surfaces that add depth, character, and visual impact to interior spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Staircases & Countertops",
    desc: "Precision-cut marble and granite designed for strength, safety, and timeless aesthetics.",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
  },
];

const featuredProducts = [
  {
    name: "Statuario Italian Marble",
    category: "Marble",
    finish: "Polished",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    name: "Black Galaxy Granite",
    category: "Granite",
    finish: "Polished",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
  },
  {
    name: "Carrara White Marble",
    category: "Marble",
    finish: "Honed",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
  },
  {
    name: "Designer Wall Tile",
    category: "Tiles",
    finish: "Matte",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    name: "Luxury Wash Basin",
    category: "Bathware",
    finish: "Glossy",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
  },
  {
    name: "Quartz Kitchen Sink",
    category: "Kitchen Sink",
    finish: "Textured",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
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

      <section className="pt-28 pb-28 bg-gray-50 overflow-hidden">
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
              Our Collections
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
              Curated Stone <br />
              <span className="text-neutral-400 font-light italic">
                Collections
              </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
              Explore thoughtfully curated collections of marble, granite, and surface
              materials designed to elevate architectural spaces.
            </p>
          </motion.div>

          {/* COLLECTION GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {collections.map((item, i) => (
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
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
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
                  {/* Animated border */}
                  <span className="
                    absolute inset-0 rounded-3xl border border-transparent
                    group-hover:border-lime-500/40
                    transition-colors duration-500
                  " />

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* EXPLORE */}
                  <div className="inline-flex items-center gap-2 text-lime-600 font-semibold text-sm uppercase tracking-wider group">
                    Explore
                    <i
                      className="
                        fa-solid fa-arrow-right
                        transition-transform duration-300 ease-out
                        group-hover:translate-x-2
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
              Applications
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
              Designed for <br />
              <span className="text-neutral-400 font-light italic">
                Every Space
              </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
              Our materials are thoughtfully applied across residential, commercial,
              and hospitality spaces — balancing aesthetics, durability, and purpose.
            </p>
          </motion.div>

          {/* GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {applications.map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="
                  group relative bg-gray-50 rounded-3xl overflow-hidden
                  border border-gray-200
                  transition-shadow duration-500
                  hover:shadow-xl
                "
              >
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
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
                  {/* Border hover */}
                  <span className="
                    absolute inset-0 rounded-3xl border border-transparent
                    group-hover:border-lime-500/40
                    transition-colors duration-500
                  " />

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm mb-6">
                    {item.desc}
                  </p>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-lime-600 font-semibold text-sm uppercase tracking-wider group">
                    Explore
                    <i
                      className="
                        fa-solid fa-arrow-right
                        transition-transform duration-300 ease-out
                        group-hover:translate-x-2
                      "
                    ></i>
                  </div>
                </div>

                {/* Soft glow */}
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
      <section className="pt-28 pb-28 bg-gray-50 overflow-hidden">
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
              Featured Products
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
              Handpicked <br />
              <span className="text-neutral-400 font-light italic">
                Signature Pieces
              </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
              A curated selection of our most sought-after stones and surface products —
              chosen for quality, aesthetics, and architectural versatility.
            </p>
          </motion.div>

          {/* PRODUCT GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {featuredProducts.map((product, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="
                  group relative bg-white rounded-3xl overflow-hidden
                  border border-gray-200 shadow-sm
                  hover:shadow-xl transition-shadow duration-500
                "
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-105
                    "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-8 relative">
                  {/* Border accent */}
                  <span className="
                    absolute inset-0 rounded-3xl border border-transparent
                    group-hover:border-lime-500/40
                    transition-colors duration-500
                  " />

                  {/* Category */}
                  <p className="text-lime-600 text-xs uppercase tracking-widest font-bold mb-2">
                    {product.category}
                  </p>

                  {/* Name */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  {/* Meta */}
                  <p className="text-gray-600 text-sm mb-6">
                    Finish: <span className="font-medium">{product.finish}</span>
                  </p>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-lime-600 font-semibold text-sm uppercase tracking-wider group">
                    View Details
                    <i
                      className="
                        fa-solid fa-arrow-right
                        transition-transform duration-300 ease-out
                        group-hover:translate-x-2
                      "
                    ></i>
                  </div>
                </div>

                {/* Soft glow */}
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
