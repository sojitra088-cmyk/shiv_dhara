import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MarbleShowcase = () => {
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

  const slides = [
    {
      title: "Italian Marble",
      type: "PREMIUM • IMPORTED",
      desc: "World-class Italian marble known for its elegance, fine veining, and timeless luxury appeal.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      
    },
    {
      title: "Statuario Marble",
      type: "LUXURY • EXCLUSIVE",
      desc: "Pure white marble with bold grey veining, preferred for statement interiors and luxury residences.",
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
    },
    {
      title: "Carrara Marble",
      type: "CLASSIC • REFINED",
      desc: "Soft white tones with subtle grey patterns, ideal for sophisticated and minimalist spaces.",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    },
    {
      title: "Indian Marble",
      type: "NATURAL • TIMELESS",
      desc: "High-quality Indian marble offering durability and beauty for both traditional and modern designs.",
      image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
    },
  ];


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

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* TEXT LAYER: Left Aligned for Marble */}
        <div className="max-w-7xl mx-auto px-6 w-full h-full grid grid-cols-1 md:grid-cols-2 items-center relative z-30 pointer-events-none">
          <div className="relative h-full flex items-center pointer-events-auto">
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
                <motion.div
                  key={index}
                  style={{ opacity }}
                  // MOBILE: justify-end and pb-12 moves text to the safe bottom area
                  className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-0  md:justify-center pr-24"
                >
                  <span className="text-lime-600 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2">
                    {slide.type}
                  </span>
                  <h2 className="text-4xl lg:text-7xl font-serif leading-tight uppercase text-white md:text-slate-900 mb-4">
                    {slide.title}
                  </h2>
                  
                  {/* Description now visible on Mobile with improved bottom spacing */}
                  <p className="text-gray-200 md:text-slate-600 text-sm md:text-xl leading-relaxed max-w-md font-light mb-8">
                    {slide.desc}
                  </p>
                  
                  <div>
                    <button className="bg-lime-500 text-black px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest shadow-xl">
                      View Collection
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* Empty spacer for desktop image placement */}
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
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start - 0.1, start, end], ["100%", "0%", "0%"]);

            return (
              <motion.div
                key={index}
                style={{ y, zIndex: index + 10 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* DARK OVERLAY for Mobile Readability */}
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