import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


const slideVariants = {
  enter: {
    y: "100%",
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
  exit: {
    y: "-40%",
    opacity: 0,
    transition: { duration: 0.6, ease: "easeIn" },
  },
};
const categories = [
  {
    title: "Marble",
    desc: "Timeless natural stone crafted for luxury interiors.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Granite",
    desc: "Durable and elegant surfaces built for performance.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
  },
  {
    title: "Tiles",
    desc: "Modern tiles designed for contemporary spaces.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    title: "Bathware",
    desc: "Refined bath solutions with a luxury finish.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
  },
  {
    title: "Kitchen Sinks",
    desc: "Precision-crafted sinks for modern kitchens.",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
  },
];

const CategoryScrollSection = () => {
  const sectionRef = useRef(null);

  const totalScreens = categories.length + 2; // top + bottom spacer
  const sectionHeight = `${totalScreens * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // map scroll progress to category index
  const index = useTransform(
    scrollYProgress,
    [0, 1],
    [-1, categories.length]
  );

  return (
    <section
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative bg-black"
    >
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* CATEGORY CARD */}
        {categories.map((cat, i) => (
          <motion.div
  key={i}
  style={{
    opacity: useTransform(index, [i - 0.5, i, i + 0.5], [0, 1, 0]),
    y: useTransform(index, [i - 0.5, i], ["40%", "0%"]),
  }}
  className="absolute inset-0 flex items-center justify-center"
>
  <div className="relative w-full h-full flex items-center justify-center px-6 md:px-10">
    <div className="relative w-full max-w-[1400px] h-[85vh] rounded-[36px] overflow-hidden shadow-2xl">

      {/* IMAGE */}
      <img
        src={cat.image}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-10 text-white">
          <p className="text-lime-400 text-xs uppercase tracking-[0.35em] font-bold mb-4">
            Category
          </p>

          <h2 className="text-6xl md:text-7xl font-serif mb-6">
            {cat.title}
          </h2>

          <p className="text-lg max-w-xl text-white/85 mb-10">
            {cat.desc}
          </p>

          <div className="inline-flex items-center gap-3 text-lime-400 uppercase tracking-widest text-sm font-semibold">
            Explore
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>

    </div>
  </div>
</motion.div>

        ))}

      </div>
    </section>
  );
};

export default CategoryScrollSection;
