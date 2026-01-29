import { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Italian Marble",
    desc: "Luxury Italian marble with timeless elegance for premium interiors.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Granite Collection",
    desc: "Durable granite stones crafted for strength and beauty.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
  },
  {
    title: "Natural Stone",
    desc: "Authentic natural stones that enhance architectural spaces.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
  },
];

const MorphImageIntro = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reveal, setReveal] = useState(0);
  const [split, setSplit] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start split after first screen
      setSplit(rect.top <= -vh);

      if (rect.top <= -vh) {
        const progress = Math.abs(rect.top + vh);

        let index = Math.floor(progress / vh);
        index = Math.min(index, slides.length - 1);

        const localProgress = (progress % vh) / vh;

        setActive(index);

        // Last slide should be fully visible
        if (index === slides.length - 1) {
          setReveal(100);
        } else {
          setReveal(localProgress * 100);
        }
      } else {
        setActive(0);
        setReveal(0);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-[#faf7f2]">
      <div className="sticky top-0 h-screen flex overflow-hidden">

        {/* LEFT TEXT */}
        <div className="w-1/2 flex items-center px-20">
          {split && (
            <div
              key={active}
              style={{
                transform: `translateY(${40 - reveal * 0.4}px)`,
                opacity: reveal > 15 ? 1 : 0,
                transition: "all 0.5s ease",
              }}
            >
              <h2 className="text-6xl font-serif text-gray-900">
                {slides[active].title}
              </h2>

              <p className="mt-6 text-gray-600 max-w-md">
                {slides[active].desc}
              </p>

              <button className="mt-10 border border-gray-800 px-8 py-3 rounded-full text-sm tracking-widest">
                VIEW FULL PROJECT
              </button>
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div
          className={`relative transition-all duration-700 ${
            split ? "w-1/2 scale-[0.75]" : "w-full scale-100"
          }`}
        >
          {/* CURRENT IMAGE */}
          <img
            src={slides[active].image}
            className="absolute inset-0 w-full h-full object-cover"
            alt={slides[active].title}
          />

          {/* NEXT IMAGE REVEAL */}
          {active < slides.length - 1 && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ height: `${reveal}%`, bottom: 0 }}
            >
              <img
                src={slides[active + 1].image}
                className="absolute bottom-0 w-full h-full object-cover"
                alt={slides[active + 1].title}
              />
            </div>
          )}

          {/* INDICATOR */}
          <div className="absolute bottom-6 right-6 z-20 text-white text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur">
            {active + 1} / {slides.length}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MorphImageIntro;
