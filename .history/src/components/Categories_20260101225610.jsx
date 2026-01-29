import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const CategoryVerticalSlider = () => {
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleWheel = (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0 && index < categories.length - 1) {
      setIsScrolling(true);
      setIndex((prev) => prev + 1);
    } else if (e.deltaY < 0 && index > 0) {
      setIsScrolling(true);
      setIndex((prev) => prev - 1);
    }

    setTimeout(() => setIsScrolling(false), 900);
  };

  return (
    <section
      onWheel={handleWheel}
      className="h-screen w-full overflow-hidden bg-black relative"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* BACKGROUND IMAGE */}
          <img
            src={categories[index].image}
            alt={categories[index].title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/55" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-8 text-white">
              <p className="text-lime-400 text-xs uppercase tracking-[0.35em] font-bold mb-4">
                Category
              </p>

              <h2 className="text-6xl md:text-7xl font-serif mb-6">
                {categories[index].title}
              </h2>

              <p className="text-lg max-w-xl mb-10 text-white/85">
                {categories[index].desc}
              </p>

              <div className="inline-flex items-center gap-3 text-lime-400 font-semibold uppercase tracking-widest text-sm">
                Explore Collection
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* PROGRESS INDICATOR */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-3">
        {categories.map((_, i) => (
          <div
            key={i}
            className={`w-[3px] h-10 ${
              i === index ? "bg-lime-400" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryVerticalSlider;
