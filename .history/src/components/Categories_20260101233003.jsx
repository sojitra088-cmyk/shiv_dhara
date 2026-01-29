import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";



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

const CategoryStackedCards = () => {
  const [active, setActive] = useState(0);

  const next = () => {
    if (active < categories.length - 1) {
      setActive(active + 1);
    }
  };

  return (
    <section className="py-24 bg-[#EEDBC8]">
      <div className="max-w-7xl mx-auto px-6">

        <div
          className="relative h-[520px]"
          onWheel={(e) => {
            if (e.deltaY > 0) next();
          }}
        >
          <AnimatePresence mode="wait">
            {categories.map(
              (item, i) =>
                i === active && (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    {/* CARD */}
                    <div className="grid md:grid-cols-2 h-full rounded-[32px] overflow-hidden shadow-xl bg-white">

                      {/* IMAGE */}
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className={`${item.bg} p-14 flex flex-col justify-center`}>
                        <p className="text-white/70 text-sm mb-4">
                          {item.id} – {categories.length}
                        </p>

                        <h2 className="text-4xl md:text-5xl text-white leading-tight mb-6">
                          {item.title}{" "}
                          <span className="font-serif italic text-[#F2C27D]">
                            {item.highlight}
                          </span>
                        </h2>

                        <p className="text-white/80 max-w-md leading-relaxed">
                          {item.desc}
                        </p>
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

export default CategoryStackedCards;
