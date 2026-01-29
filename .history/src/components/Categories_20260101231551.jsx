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

  const totalScreens = categories.length;
  const sectionHeight = `${totalScreens * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const index = useTransform(
    scrollYProgress,
    [0, 1],
    [0, categories.length - 1]
  );

  return (
    <section className="pt-24 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT — IMAGE */}
            <div className="relative h-[420px] md:h-[520px] rounded-[32px] overflow-hidden shadow-xl">
                <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Marble"
                className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* RIGHT — CONTENT */}
            <div className="max-w-xl">

                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                Category
                </p>

                <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                Marble
                </h1>

                <p className="text-gray-600 leading-relaxed mb-10">
                Timeless natural stone crafted for luxury interiors.
                Explore premium Italian and Indian marble collections
                designed to elevate architectural spaces.
                </p>

                <div className="inline-flex items-center gap-3 text-lime-600 font-semibold uppercase tracking-widest text-sm">
                Explore
                <span className="transition-transform duration-300 hover:translate-x-2">
                    <i className="fa-solid fa-arrow-right"></i>
                </span>
                </div>

            </div>

            </div>

        </div>
        </section>

  );
};

export default CategoryScrollSection;

