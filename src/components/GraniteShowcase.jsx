import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from "react-router-dom";

const GraniteShowcase = () => {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 35,   // lower = slower
    damping: 28,     // higher = smoother
    mass: 1.3
  });

  const slides = [
    {
      title: "Black Granite",
      type: "BOLD • LUXURY",
      desc: "Deep-toned black granite with a polished finish, perfect for statement countertops and premium interiors.",
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
      slug: "black-granite",
    },
    {
      title: "White Granite",
      type: "ELEGANT • TIMELESS",
      desc: "Bright white granite with natural mineral patterns, adding sophistication to kitchens and living spaces.",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      slug: "white-granite",
    },
    {
      title: "Grey Granite",
      type: "MODERN • VERSATILE",
      desc: "Neutral grey granite offering strength and style, ideal for both residential and commercial applications.",
      image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
      slug: "grey-granite",
    },
    
  ];



  // REVERSED ANIMATION LOGIC:
  const imageWidth = useTransform(
    smoothScroll,
    [0, 0.15],
    isDesktop ? ["100vw", "50vw"] : ["100vw", "100vw"]
  );


  // CHANGED: Moves to 0vw (Left Side) instead of 50vw
  const imageX = useTransform(
    smoothScroll,
    [0, 0.15],
    isDesktop ? ["0vw", "0vw"] : ["0vw", "0vw"]
  );

  const getIsActive = (index) => {
    const total = slides.length;
    const progress = scrollYProgress.get();
    const start = index / total;
    const end = (index + 1) / total;
    return progress >= start && progress < end;
  };
  return (
    <div ref={containerRef} className="relative h-[400vh] bg-gray-50">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* UNIFIED RESPONSIVE TEXT LAYER */}
        <div className="max-w-7xl mx-auto px-6 w-full h-full grid grid-cols-1 md:grid-cols-2 items-center relative z-30">
          
          {/* Column 1: Hidden on mobile, spacer on desktop */}
          <div className="hidden md:block" /> 

          {/* Column 2: Content Area */}
          <div className="relative h-full w-full flex items-center">
            {slides.map((slide, index) => {
              const start = index / slides.length;
              const end = (index + 1) / slides.length;
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [0, 1, 1, index === slides.length - 1 ? 1 : 0]
              );

              return (
                // inside slides.map return (...)
                <motion.div
                  key={index}
                   style={{
                    opacity,
                    pointerEvents: getIsActive(index) ? "auto" : "none",
                    zIndex: getIsActive(index) ? 30 : 10,
                  }}
                  className="absolute inset-0 flex flex-col justify-end pb-12 md:p-0 md:justify-center pointer-events-auto"
                >
                  {/* MOBILE ONLY: Architectural Floating Glass Card */}
                  <div className="relative w-full md:hidden bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    {/* Subtle inner glow for depth */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-lime-500/20 blur-3xl rounded-full" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-[1px] w-6 bg-lime-400" />
                        <span className="text-lime-400 font-bold tracking-[0.2em] uppercase text-[10px]">
                          {slide.type}
                        </span>
                      </div>

                      <h2 className="text-4xl leading-tight font-serif uppercase mb-4">
                        {slide.title}
                      </h2>

                      <p className="text-sm leading-relaxed mb-8 font-light">
                        {slide.desc}
                      </p>

                      <button className="w-full bg-lime-500 text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-transform">
                        View Collection
                      </button>
                    </div>
                  </div>

                  {/* DESKTOP CONTENT: Remains clean on the white background */}
                  <div className="hidden md:flex flex-col pl-16 lg:pl-24">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-[1px] w-8 bg-lime-500" />
                      <span className="text-lime-600 font-bold tracking-[0.3em] uppercase text-xs">
                        {slide.type}
                      </span>
                    </div>

                    <h2 className="text-6xl lg:text-7xl font-serif mb-6 leading-[1.1] uppercase text-slate-900">
                      {slide.title}
                    </h2>

                    <p className="text-slate-600 text-xl leading-relaxed max-w-md font-light mb-10">
                      {slide.desc}
                    </p>
                    <Link to={`/granite/${slide.slug}`}>
                    <button className="w-fit bg-lime-500 text-black px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-500">
                      View Collection
                    </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* IMAGE CONTAINER */}
        <motion.div
          style={{ width: imageWidth, left: imageX }}
          className="absolute top-0 bottom-0 overflow-hidden z-10"
        >
          {slides.map((slide, index) => {
            const start = index / slides.length;
            const end = (index + 1) / slides.length;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(
              smoothScroll,
              [start - 0.15, start, end],
              ["120%", "0%", "0%"]
            );


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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default GraniteShowcase;