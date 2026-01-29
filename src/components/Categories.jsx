import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

/* =========================
   Animation Variants
========================= */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: -120,   // enter from top
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 120,   // exit to bottom
    scale: 0.96,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};



/* =========================
   Component
========================= */
const CategoryStackedSlider = () => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const handleTouchStart = (e) => {
  touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isAnimatingRef.current) return;

      const swipeDistance = touchStartY.current - touchEndY.current;

      // 🔥 Minimum swipe threshold (important)
      if (Math.abs(swipeDistance) < 60) return;

      // Swipe UP → next
      if (swipeDistance > 0 && active < categories.length - 1) {
        isAnimatingRef.current = true;
        setActive((prev) => prev + 1);
      }

      // Swipe DOWN → previous
      if (swipeDistance < 0 && active > 0) {
        isAnimatingRef.current = true;
        setActive((prev) => prev - 1);
      }
    };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }

      setLoading(false);
    };

    fetchCategories();
  }, []);
  const isMobile = window.innerWidth < 768;


  // Section height consumes scroll so next section NEVER appears early
  const sectionHeight = `${(categories.length - 1) * 100}vh`;

  const handleWheel = (e) => {
    // if (isMobile) return; // 🚫 disable on mobile
    if (isAnimatingRef.current) return;

    const direction = Math.sign(e.deltaY);

    if (direction > 0 && active < categories.length - 1) {
      isAnimatingRef.current = true;
      setActive((prev) => prev + 1);
    }

    if (direction < 0 && active > 0) {
      isAnimatingRef.current = true;
      setActive((prev) => prev - 1);
    }
  };





  return (
    <section
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}     // mobile
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative bg-[#F2E1CF] overscroll-none"
      style={{ height: sectionHeight }}
    >

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen grid place-items-end">
        <div className="relative h-[calc(100vh-74px)] w-full flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="relative h-[520px] md:h-[480px] overflow-hidden">

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
                      onAnimationComplete={() => {
                      isAnimatingRef.current = false;
                    }}

                      className="absolute inset-0"
                    >
                      
                      {/* CARD */}
                      <div className="grid md:grid-cols-2 h-full rounded-[32px] overflow-hidden shadow-xl bg-white">

                        {/* IMAGE */}
                        <div className="relative h-[251px] md:h-auto">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>

                        {/* CONTENT */}
                        <div className="bg-[#0C3D63] p-8 md:p-14 flex flex-col justify-center">
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

                          <button
                            onClick={() => navigate(`/products/${item.slug}`)}
                            className="
                              inline-flex items-center gap-3
                              text-lime-400 uppercase tracking-widest text-sm font-semibold
                              hover:gap-4 transition-all
                            "
                          >
                            Explore
                            <i className="fa-solid fa-arrow-right"></i>
                          </button>

                        </div>

                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>

          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryStackedSlider;
