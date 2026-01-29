import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const lockScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockScroll = () => {
  document.body.style.overflow = "";
};


const cardVariants = {
  hidden: {
    opacity: 0,
    y: -120, // from top
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 120, // exit down
    scale: 0.96,
    transition: { duration: 0.6, ease: "easeIn" },
  },
};


const categories = [
  {
    title: "Marble",
    subtitle: "Italian & Indian Luxury Stones",
    description:
      "Timeless natural marble crafted for premium interiors, offering elegance, durability, and architectural refinement.",
    image: "/Marble.jpg",
  },
  {
    title: "Granite",
    subtitle: "Strength with Natural Beauty",
    description:
      "Highly durable granite surfaces engineered for performance, longevity, and bold natural aesthetics.",
    image: "/Granite.jpg",
  },
  {
    title: "Tiles",
    subtitle: "Modern Floor & Wall Surfaces",
    description:
      "Versatile tile collections designed for contemporary floors and walls with refined textures and finishes.",
    image: "/Tiles.jpg",
  },
  {
    title: "Bathware",
    subtitle: "Luxury Bathroom Essentials",
    description:
      "Premium bathware solutions that blend modern design with everyday comfort and reliability.",
    image: "/Bathware.jpg",
  },
  {
    title: "Sanitaryware",
    subtitle: "Elegant & Functional Designs",
    description:
      "Thoughtfully designed sanitaryware offering hygiene, durability, and seamless aesthetics.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
  },
  {
    title: "Kitchen Sinks",
    subtitle: "Modern Kitchen Solutions",
    description:
      "Precision-crafted kitchen sinks built for modern lifestyles, combining strength and style.",
    image: "/Kitchen_Sinks.avif",
  },
];


const CategoryStackedSlider = () => {
  const [active, setActive] = useState(0);

  const handleWheel = (e) => {
    if (e.deltaY > 0 && active < categories.length - 1) {
      setActive(active + 1);
    } else if (e.deltaY < 0 && active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <section className="py-24 bg-[#F2E1CF]">
      <div className="max-w-7xl mx-auto px-6">

        <div
          className="relative h-[520px] md:h-[480px]"
          onWheel={handleWheel}
        >
          <AnimatePresence mode="wait">
            {categories.map(
              (item, i) =>
                i === active && (
                  <motion.div
                    key={item.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    {/* CARD */}
                    <div className="
                      grid md:grid-cols-2
                      h-full rounded-[32px] overflow-hidden
                      shadow-xl bg-white
                    ">

                      {/* IMAGE */}
                      <div className="relative h-[220px] md:h-auto">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="
                        bg-[#0C3D63]
                        p-8 md:p-14
                        flex flex-col justify-center
                      ">
                        <p className="text-white/60 text-sm mb-3">
                          {active + 1} – {categories.length}
                        </p>

                        <h2 className="text-3xl md:text-4xl text-white mb-2">
                          {item.title}
                        </h2>

                        <p className="text-[#F2C27D] italic font-serif text-lg mb-6">
                          {item.subtitle}
                        </p>

                        <p className="text-white/80 leading-relaxed max-w-md mb-8">
                          {item.description}
                        </p>

                        <div className="inline-flex items-center gap-3 text-lime-400 uppercase tracking-widest text-sm font-semibold">
                          Explore
                          <i className="fa-solid fa-arrow-right transition-transform duration-300 hover:translate-x-2"></i>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default CategoryStackedSlider;
