import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import PageLoader from "./PageLoader";

const CategoryStackedSlider = () => {
  const [active, setActive] = useState(0);
  const isAnimatingRef = useRef(false);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const isStackedEnabled = categories.length > 1;

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("id", { ascending: true });

      setCategories(data || []);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  /* ---------- SAFE HEIGHT ---------- */
  const sectionHeight = isStackedEnabled
    ? `${(categories.length - 1) * 100}vh`
    : "auto";


  /* ---------- SCROLL ---------- */
  const handleWheel = (e) => {
    if (isAnimatingRef.current) return;

    const dir = Math.sign(e.deltaY);

    if (dir > 0 && active < categories.length - 1) {
      isAnimatingRef.current = true;
      setActive((p) => p + 1);
    }

    if (dir < 0 && active > 0) {
      isAnimatingRef.current = true;
      setActive((p) => p - 1);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <section
        onWheel={isStackedEnabled ? handleWheel : undefined}
        className="relative bg-[#F2E1CF]"
        style={{ height: sectionHeight }}
      >

      <div
        className={
          isStackedEnabled
            ? "sticky top-0 h-screen flex items-center"
            : "relative flex items-center py-20"
        }
      >

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="relative h-[520px] overflow-hidden">

            {categories.map((item, i) => {
              const offset = i - active;
              const isActive = offset === 0;

              return (
                <motion.div
                  key={item.id}
                  animate={{
                    y: offset * 60,
                    scale: isActive ? 1 : 0.95,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    zIndex: isActive ? 20 : 10,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  onAnimationComplete={() => {
                    isAnimatingRef.current = false;
                  }}
                  className="absolute inset-0 overflow-hidden rounded-[32px] shadow-xl bg-white"
                >
                  <div className="flex flex-col md:grid md:grid-cols-2 h-full">

                    {/* IMAGE (FULL HEIGHT – NO CUTTING) */}
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="bg-[#0C3D63] p-10 md:p-14 flex flex-col justify-center">
                      <p className="text-white/60 text-sm mb-3">
                        {i + 1} – {categories.length}
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
                        className="inline-flex items-center gap-3 text-lime-400 uppercase tracking-widest text-sm font-semibold hover:gap-4 transition-all"
                      >
                        Explore →
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryStackedSlider;
