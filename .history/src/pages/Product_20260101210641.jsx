import React from "react";
import { useEffect, useRef } from "react";

const categories = [
  {
    title: "Marble",
    subtitle: "Italian & Indian Luxury Stones",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
  },
  {
    title: "Granite",
    subtitle: "Strength with Natural Beauty",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200",
  },
  {
    title: "Tiles",
    subtitle: "Modern Floor & Wall Surfaces",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200",
  },
  {
    title: "Bathware",
    subtitle: "Luxury Bathroom Essentials",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
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
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1200",
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
      
    </>
  );
};

export default Product;
