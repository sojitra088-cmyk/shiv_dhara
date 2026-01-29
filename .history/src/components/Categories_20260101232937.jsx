import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";



const cardVariants = {
  hidden: {
    opacity: 0,
    y: 120,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -120,
    scale: 0.96,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

const categories = [
  {
    id: "01",
    title: "Heartwarming and",
    highlight: "Cosy Nurseries",
    desc:
      "Let your children be surrounded by care and attention. Our kindergarten teachers are both compassionate and highly skilled.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    bg: "bg-[#0C3D63]",
  },
  {
    id: "02",
    title: "Vibrant Family",
    highlight: "Event Planning",
    desc:
      "From intimate gatherings to joyful celebrations, we help families create unforgettable moments together.",
    image:
      "https://images.unsplash.com/photo-1600880292103-2b7b4a3e1c2d",
    bg: "bg-[#0C3D63]",
  },
];

const CategoryScrollSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const index = useTransform(
    scrollYProgress,
    [0.15, 0.85], // section active range
    [0, categories.length - 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh] "
    >
      {/* STICKY VIEWPORT */}
      <div className="sticky top-24 h-[calc(100vh-96px)] overflow-hidden flex items-center justify-center">

        {categories.map((cat, i) => (
          <motion.div
            key={i}
            style={{
              opacity: useTransform(index, [i - 0.4, i, i + 0.4], [0, 1, 0]),
              y: useTransform(index, [i - 0.4, i], ["40%", "0%"]),
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* CARD */}
            <div className="w-full max-w-7xl mx-auto px-6">
              <div className="relative h-[520px] rounded-[32px] overflow-hidden shadow-2xl">

                <img
                  src={cat.image}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/55" />

                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-xl text-white">
                    <p className="text-lime-400 text-xs uppercase tracking-[0.35em] font-bold mb-4">
                      Category
                    </p>

                    <h2 className="text-5xl font-serif mb-6">
                      {cat.title}
                    </h2>

                    <p className="text-lg text-white/85 mb-10">
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
