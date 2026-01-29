import React from "react";
import { useEffect, useRef } from "react";

const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};

const Product = () => {
    const categoriesRef = useScrollReveal();
    const featuredRef = useScrollReveal();
    const applicationsRef = useScrollReveal();

    const categories = [
    {
      title: "Marble",
      desc: "Elegant natural marble curated for luxurious interiors with timeless appeal.",
      image:
        "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200",
    },
    {
      title: "Granite",
      desc: "Durable and resilient granite surfaces ideal for kitchens and high-traffic spaces.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    },
    {
      title: "Tiles",
      desc: "Versatile tile collections for walls and floors across residential and commercial spaces.",
      image:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200",
    },
    {
      title: "Bathware",
      desc: "Modern bathware designed for comfort, hygiene, and refined experiences.",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
    },
    {
      title: "Sanitaryware",
      desc: "Precision-crafted sanitaryware blending durability and modern aesthetics.",
      image:
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200",
    },
    {
      title: "Kitchen Sinks",
      desc: "Functional and stylish kitchen sinks engineered for everyday performance.",
      image:
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
    },
  ];
  const collections = [
    {
      title: "Italian Marble Series",
      desc: "Refined Italian marble collections known for timeless elegance, soft veining, and luxurious finishes.",
      image:
        "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1400",
    },
    {
      title: "Premium Granite Range",
      desc: "Durable granite selections engineered for strength, performance, and bold architectural expression.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400",
    },
    {
      title: "Designer Bathware Collection",
      desc: "Contemporary bathware designed for comfort, hygiene, and refined everyday experiences.",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1400",
    },
  ];
const applications = [
    {
      title: "Living Spaces",
      desc: "Elegant marble and tiles designed to enhance living rooms with timeless character and refined finishes.",
      image:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200",
    },
    {
      title: "Kitchens",
      desc: "Durable granite, tiles, and kitchen sinks engineered for performance, hygiene, and everyday use.",
      image:
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1200",
    },
    {
      title: "Bathrooms",
      desc: "Modern bathware and sanitaryware solutions crafted for comfort, cleanliness, and contemporary design.",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
    },
    {
      title: "Commercial Spaces",
      desc: "High-performance surfaces ideal for offices, hotels, showrooms, and high-traffic environments.",
      image:
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200",
    },
    {
      title: "Outdoor Areas",
      desc: "Weather-resistant stone and tiles suited for patios, facades, and exterior architectural elements.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    },
  ];


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
          "url('showroom_ad_scroller_homepage.jpg')",
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
    <section ref={categoriesRef}

      id="collections"
      className="relative bg-white py-28 reveal"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="max-w-3xl mb-20 header">
          <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
            Our Collections
          </p>

          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
            Explore Our <br />
            <span className="italic font-light text-neutral-400">
              Product Categories
            </span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
            Discover a thoughtfully curated range of surfaces and lifestyle
            products crafted to elevate residential and commercial spaces.
          </p>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {categories.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl card card-${i + 1}`}
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              {/* Hover Accent */}
              <span
                className="
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-br from-lime-400/15 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                "
              />

              {/* Content */}
              <div className="relative z-10 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {item.desc}
                </p>

                <a
                  href={`/products/${item.title.toLowerCase()}`}
                  className="
                    inline-flex items-center gap-2
                    text-xs font-bold uppercase tracking-widest
                    text-lime-500 hover:text-black transition
                  "
                >
                  Explore Collection →
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
    <section
      ref={featuredRef}
      className="relative bg-neutral-50 py-28 reveal"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="max-w-3xl mb-20 header">
          <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
            Featured Collections
          </p>

          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
            Signature Selections <br />
            <span className="italic font-light text-neutral-400">
              Crafted to Inspire
            </span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
            A curated showcase of our most sought-after collections — selected
            for their design excellence, durability, and architectural appeal.
          </p>
        </div>

        {/* COLLECTION BLOCKS */}
        <div className="space-y-28">

          {collections.map((item, i) => (
            <div
              key={i}
              className={`grid lg:grid-cols-2 gap-16 items-center card card-${i + 1}`}
            >
              {/* IMAGE */}
              <div
                className={`relative overflow-hidden rounded-3xl shadow-xl ${
                  i % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[420px] object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Hover Accent */}
                <span
                  className="
                    absolute inset-0 rounded-3xl
                    bg-gradient-to-br from-lime-400/15 to-transparent
                    opacity-0 hover:opacity-100
                    transition-opacity duration-500
                  "
                />
              </div>

              {/* CONTENT */}
              <div>
                <h3 className="text-3xl font-serif text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed max-w-md mb-8">
                  {item.desc}
                </p>

                <a
                  href="/contact"
                  className="
                    inline-flex items-center gap-2
                    text-xs font-bold uppercase tracking-widest
                    text-lime-500 hover:text-black transition
                  "
                >
                  Enquire Collection →
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
    <section
      ref={applicationsRef}
      className="relative bg-white py-28 reveal"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="max-w-3xl mb-20 header">
          <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
            Applications
          </p>

          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
            Designed for <br />
            <span className="italic font-light text-neutral-400">
              Every Space
            </span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
            Our products are thoughtfully selected to perform beautifully
            across diverse environments — combining durability with
            architectural elegance.
          </p>
        </div>

        {/* APPLICATION GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {applications.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl card card-${i + 1}`}
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              {/* HOVER ACCENT */}
              <span
                className="
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-br from-lime-400/15 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                "
              />

              {/* CONTENT */}
              <div className="relative z-10 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
    </>
  );
};

export default Product;
