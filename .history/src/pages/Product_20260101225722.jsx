import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CTC from "../components/CTC";
import ApplicationCard from "../components/ApplicationCard";
im

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
const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const editorialCardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};
const mosaicVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};
const productCardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
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
    desc: "Timeless stone applications crafted for refined private living spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    span: 1,
  },
  {
    title: "Villas & Apartments",
    desc: "Elegant stone surfaces for modern residential architecture.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    span: 1,
  },
  {
    title: "Hotel & Hospitality Projects",
    desc: "Durable, high-performance stone solutions for luxury hospitality.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    span: 1,
  },
  {
    title: "Commercial Interiors",
    desc: "Sophisticated stone applications for offices and retail environments.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    span: 2,
  },
  {
    title: "Feature Walls & Flooring",
    desc: "Statement surfaces that define architectural character.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    span: 1,
  },
  {
    title: "Staircases & Countertops",
    desc: "Precision-cut surfaces balancing strength and elegance.",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
    span: 1,
  },
  {
    title: "Bathrooms & Wash Areas",
    desc: "Luxury stone solutions designed for comfort and durability.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    span: 2,
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
const trustPoints = [
  {
    title: "Decades of Industry Experience",
    desc: "Built on years of working with premium marble, granite, and surface materials across residential and commercial projects.",
  },
  {
    title: "Curated Global Sourcing",
    desc: "We source stones from trusted quarries worldwide to ensure consistency, authenticity, and superior quality.",
  },
  {
    title: "Trusted by Architects & Builders",
    desc: "Long-standing partnerships with architects, designers, and developers who value precision and reliability.",
  },
  {
    title: "Precision Processing & Quality Control",
    desc: "Every slab undergoes careful inspection, cutting, and finishing before delivery.",
  },
  {
    title: "End-to-End Project Support",
    desc: "From material selection to delivery, we remain involved at every stage of your project.",
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
      <categories />
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

      <section className="pt-28 pb-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="max-w-3xl mb-24"
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
              Thoughtfully curated groups of natural stone, selected for their character,
              harmony, and timeless architectural appeal.
            </p>
          </motion.div>

          {/* EDITORIAL GRID */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-16"
          >
            {collections.map((item, i) => (
              <motion.article
                key={i}
                variants={editorialCardVariants}
                className="group"
              >
                {/* IMAGE */}
                <div className="relative h-[340px] overflow-hidden rounded-[28px] mb-8">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-[1200ms] ease-out
                      group-hover:scale-[1.03]
                    "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* TEXT */}
                <div className="px-2">
                  <h3 className="text-2xl font-serif text-gray-900 mb-4 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base max-w-md">
                    {item.desc}
                  </p>

                  {/* SUBTLE LINK */}
                  <div className="mt-6 inline-flex items-center gap-2 text-lime-600 text-xs uppercase tracking-widest font-semibold opacity-80">
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
              </motion.article>
            ))}
          </motion.div>

        </div>
      </section>
      <section className="pt-32 pb-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="max-w-3xl mb-24">
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
              Our materials come to life across residential, hospitality, and commercial
              environments — shaped by purpose, proportion, and experience.
            </p>
          </div>

          {/* EDITORIAL GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {applications.map((item, i) => (
              <ApplicationCard key={i} {...item} />
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
      <section className="pt-28 pb-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT — HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
              Why Choose Us
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
              Experience You Can Trust, <br />
              <span className="text-neutral-400 font-light italic">
                Quality You Can Rely On
              </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Our reputation is built on consistent quality, long-term partnerships,
              and a commitment to delivering stone solutions that stand the test of time.
            </p>
          </motion.div>

          {/* RIGHT — TRUST POINTS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {trustPoints.map((item, i) => (
              <motion.div
                key={i}
                variants={rowVariants}
                className="
                  group relative pl-6 pr-4 py-2
                  transition-all duration-500
                  active:scale-[0.98]
                "
              >
                {/* LEFT ACCENT LINE */}
                <span
                  className="
                    absolute left-0 top-2 w-[2px] bg-lime-500/70
                    h-10
                    transition-all duration-700
                    md:group-hover:h-14
                  "
                />

                <h3 className="
                  font-semibold text-gray-900 mb-1
                  transition-colors duration-300
                  md:group-hover:text-black
                ">
                  {item.title}
                </h3>

                <p className="
                  text-gray-600 leading-relaxed text-sm md:text-base
                  transition-colors duration-300
                  md:group-hover:text-gray-700
                ">
                  {item.desc}
                </p>

                {/* HOVER GLOW */}
                <span
                  className="
                    pointer-events-none absolute inset-0 rounded-lg
                    bg-gradient-to-r from-lime-500/8 to-transparent
                    opacity-0 md:group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
      <CTC />
    </>
  );
};

export default Product;
