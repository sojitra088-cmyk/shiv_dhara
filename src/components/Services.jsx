import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Services = () => {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

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

    // const slides = [
    // {
    //     title: "Global Quarry Access",
    //     type: "SOURCING • WORLDWIDE",
    //     desc: "Direct access to premium marble and granite quarries across India and international regions, ensuring consistent quality, variety, and reliable supply for every project scale.",
    //     image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    // },
    // {
    //     title: "Multi-Stage Quality Inspection",
    //     type: "QUALITY • ASSURANCE",
    //     desc: "Each stone undergoes rigorous inspection for color consistency, surface finish, thickness, and durability before approval and dispatch.",
    //     image: "https://images.unsplash.com/photo-1581093588401-12d4c6f64c73",
    // },
    // {
    //     title: "Custom Stone Processing",
    //     type: "PRECISION • CRAFT",
    //     desc: "In-house cutting, polishing, and edge detailing tailored precisely to architectural drawings and project specifications.",
    //     image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
    // },
    // {
    //     title: "Architect & Designer Support",
    //     type: "GUIDANCE • COLLABORATION",
    //     desc: "Dedicated assistance for architects and designers in material selection, application planning, and design integration.",
    //     image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    // },
    // {
    //     title: "Residential & Commercial Projects",
    //     type: "SCALE • EXECUTION",
    //     desc: "Seamless handling of projects ranging from private residences to hotels, offices, and large commercial developments.",
    //     image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    // },
    // ];
const slides = [
    {
      title: "Global Quarry Access",
      type: "SOURCING • WORLDWIDE",
      desc: "Direct access to premium marble and granite quarries across India and international regions, ensuring consistent quality, variety, and reliable supply for every project scale.",
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
    },
    {
        title: "Multi-Stage Quality Inspection",
        type: "QUALITY • ASSURANCE",
        desc: "Each stone undergoes rigorous inspection for color consistency, surface finish, thickness, and durability before approval and dispatch.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    },
    {
        title: "Custom Stone Processing",
        type: "PRECISION • CRAFT",
        desc: "In-house cutting, polishing, and edge detailing tailored precisely to architectural drawings and project specifications.",
        image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
    },
    {
        title: "Architect & Designer Support",
        type: "GUIDANCE • COLLABORATION",
        desc: "Dedicated assistance for architects and designers in material selection, application planning, and design integration.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    },
    
  ];



  // REVERSED ANIMATION LOGIC:
  const imageWidth = useTransform(
    smoothScroll,
    [0, 0.15],
    isDesktop ? ["50vw", "50vw"] : ["100vw", "100vw"]
  );

  // CHANGED: Moves to 0vw (Left Side) instead of 50vw
  const imageX = useTransform(
    smoothScroll,
    [0, 0.15],
    isDesktop ? ["0vw", "0vw"] : ["0vw", "0vw"]
  );
  useEffect(() => {
  const unsubscribe = smoothScroll.on("change", (v) => {
    const total = slides.length;
    const index = Math.min(total - 1, Math.floor(v * total));
    setActiveIndex(index);
  });
  return unsubscribe;
}, [smoothScroll, slides.length]);


  return (
    <div ref={containerRef} className="relative h-[400vh] bg-gray-50">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* UNIFIED RESPONSIVE TEXT LAYER */}
        <div className="max-w-7xl mx-auto px-6 w-full h-full grid grid-cols-1 md:grid-cols-2 items-center relative z-30">
          
          {/* Column 1: Hidden on mobile, spacer on desktop */}
          <div className="hidden md:block" /> 

          {/* Column 2: Content Area */}
          <div className="relative h-full w-full flex items-center">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                style={{
                  display: index === activeIndex ? "flex" : "none",
                  pointerEvents: index === activeIndex ? "auto" : "none",
                  zIndex: 30,
                }}
                className="absolute inset-0 flex flex-col justify-end pb-12 md:p-0 md:justify-center"
              >
                {/* MOBILE */}
                <div className="relative w-full md:hidden bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <span className="text-lime-400 text-xs tracking-widest">{slide.type}</span>
                  <h2 className="text-4xl font-serif uppercase mt-3">{slide.title}</h2>
                  <p className="mt-4 text-sm">{slide.desc}</p>
                </div>

                {/* DESKTOP */}
                <div className="hidden md:flex flex-col pl-16 lg:pl-24">
                  <span className="text-lime-600 tracking-widest text-xs">{slide.type}</span>
                  <h2 className="text-6xl lg:text-7xl font-serif uppercase mt-4">
                    {slide.title}
                  </h2>
                  <p className="text-slate-600 text-xl mt-6 max-w-md">
                    {slide.desc}
                  </p>
                </div>
              </motion.div>
            ))}

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

export default Services;