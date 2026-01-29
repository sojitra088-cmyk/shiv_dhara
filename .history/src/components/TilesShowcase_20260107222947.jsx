import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';

const TilesShowcase = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // FIX: Added useSpring to smooth out the scroll input
  // stiffness: 100 (smoothness), damping: 30 (prevents bounce)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const slides = [
    {
      title: "Ceramic Tiles",
      type: "MODERN • VERSATILE",
      desc: "Elegant ceramic tiles crafted for modern kitchens and bathrooms, offering easy maintenance and timeless appeal.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
      slug: "ceramic-tiles",
    },
    {
      title: "Vitrified Tiles",
      type: "PREMIUM • HIGH-GLOSS",
      desc: "Premium vitrified tiles with superior strength and a luxurious glossy finish, ideal for high-traffic spaces.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    },
    {
      title: "Porcelain Tiles",
      type: "STRONG • MINIMAL",
      desc: "Dense porcelain tiles designed for durability and minimal aesthetics in both residential and commercial interiors.",
      image: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da",
    },
  ];

  useEffect(() => {
    // FIX: Listen to the smoothProgress instead of raw scrollYProgress
    return smoothProgress.onChange((latest) => {
      const newIndex = Math.min(
        Math.floor(latest * slides.length),
        slides.length - 1
      );
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
  }, [smoothProgress, activeIndex, slides.length]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* BACKGROUND IMAGES */}
        <div className="absolute inset-0 z-10">
          {slides.map((slide, index) => {
            const start = index / slides.length;
            const end = (index + 1) / slides.length;
            
            // FIX: Using smoothProgress for the Y translation (parallax)
            const y = useTransform(smoothProgress, [start - 0.1, start, end], ["100%", "0%", "0%"]);

            return (
              <motion.div
                key={index}
                style={{ y, zIndex: index + 10 }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/50" />
              </motion.div>
            );
          })}
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-30 w-full h-full flex flex-col">
          {/* HEADER SPACER for 1024px+ screens */}
          <div className="h-[72px] lg:h-[72px] w-full shrink-0" />

          <div className="flex-grow flex items-center justify-center  px-6">
            <div className="w-full max-w-7xl mx-auto h-full grid lg:grid-cols-2 lg:gap-12 items-center">
              
              <div className="hidden lg:block" />

              {/* GLASS BOX */}
              <div className="relative w-full max-h-full lg:max-h-[650px] bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[40px] md:rounded-[60px] shadow-2xl overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Smooth cinematic ease
                    className="p-8 md:p-12 lg:p-10  xl:p-14 flex flex-col items-center text-center lg:items-start lg:text-left justify-center h-full"
                  >
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <div className="h-[2px] w-8 bg-lime-500" />
                      <span className="text-lime-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                        {slides[activeIndex].type}
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] uppercase text-white mb-4 md:mb-6">
                      {slides[activeIndex].title.split(' ')[0]} <br className="hidden lg:block" /> 
                      <span className="opacity-80">{slides[activeIndex].title.split(' ')[1]}</span>
                    </h2>

                    <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-10 font-light max-w-md">
                      {slides[activeIndex].desc}
                    </p>

                    <button className="w-full md:w-fit bg-lime-500 hover:bg-white text-black px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest transition-all active:scale-95 shadow-xl">
                      View Collection
                    </button>
                    
                    {/* PROGRESS DOTS */}
                    <div className="flex gap-2 mt-8 lg:mt-10">
                       {slides.map((_, i) => (
                         <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-10 bg-lime-500' : 'w-2 bg-white/20'}`} />
                       ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TilesShowcase;