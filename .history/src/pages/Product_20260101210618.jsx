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
    <section
      ref={sectionRef}
      className="py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div
          className={`max-w-3xl mb-20 transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
            Product Categories
          </p>

          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
            Premium Materials for <br />
            <span className="text-neutral-400 italic font-light">
              Inspired Spaces
            </span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`group relative h-[420px] overflow-hidden rounded-xl shadow-lg transition-all duration-1000 ease-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition duration-500"></div>

              {/* CONTENT */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif text-white mb-2">
                  {cat.title}
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  {cat.subtitle}
                </p>

                <span className="inline-flex items-center text-lime-400 text-sm font-semibold tracking-wide">
                  Explore Collection →
                </span>
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
