import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { supabase } from "../supabase";

const MarbleShowcase = () => {
  const containerRef = useRef(null);

  const [slides, setSlides] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ✅ FIX: hydration issue */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* screen resize */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* 🔥 FETCH ONLY MARBLE DATA */
  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("subcategories")
        .select("id, title, subtitle, description, image")
        .eq("category_id", 1) // 👈 MARBLE ONLY
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setSlides(data);
      }
      setLoading(false);
    };

    fetchSlides();
  }, []);

  const isDesktop = windowWidth >= 768;

  /* ✅ SAFE useScroll */
  const { scrollYProgress } = useScroll(
    mounted
      ? {
          target: containerRef,
          offset: ["start start", "end end"],
        }
      : {}
  );

  const imageWidth = useTransform(
    scrollYProgress,
    [0, 0.15],
    isDesktop ? ["100vw", "50vw"] : ["100vw", "100vw"]
  );

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.15],
    isDesktop ? ["0vw", "50vw"] : ["0vw", "0vw"]
  );

  if (loading || !mounted) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading Marble Collection...
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* TEXT LAYER */}
        <div className="max-w-7xl mx-auto px-6 w-full h-full grid grid-cols-1 md:grid-cols-2 items-center relative z-30 pointer-events-none">
          <div className="relative h-full flex items-center pointer-events-auto">
            {slides.map((slide, index) => {
              const start = index / slides.length;
              const end = (index + 1) / slides.length;

              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [0, 1, 1, index === slides.length - 1 ? 1 : 0]
              );

              return (
                <motion.div
                  key={slide.id}
                  style={{ opacity }}
                  className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-0 md:justify-center pr-24"
                >
                  <span className="text-lime-600 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2">
                    {slide.subtitle || "PREMIUM • MARBLE"}
                  </span>

                  <h2 className="text-4xl lg:text-7xl font-serif leading-tight uppercase text-white md:text-slate-900 mb-4">
                    {slide.title}
                  </h2>

                  <p className="text-gray-200 md:text-slate-600 text-sm md:text-xl leading-relaxed max-w-md font-light mb-8">
                    {slide.description}
                  </p>

                  <button className="bg-lime-500 text-black px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest shadow-xl">
                    View Collection
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="hidden md:block" />
        </div>

        {/* IMAGE CONTAINER */}
        <motion.div
          style={{ width: imageWidth, left: imageX }}
          className="absolute top-0 bottom-0 overflow-hidden z-10"
        >
          {slides.map((slide, index) => {
            const start = index / slides.length;
            const end = (index + 1) / slides.length;

            const y = useTransform(
              scrollYProgress,
              [start - 0.1, start, end],
              ["100%", "0%", "0%"]
            );

            return (
              <motion.div
                key={slide.id}
                style={{ y, zIndex: index + 10 }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:hidden z-20" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
};

export default MarbleShowcase;
