import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useAnimationFrame } from "framer-motion";
import { useLocation } from "react-router-dom";

const SmoothScroll = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) {
      window.__lenis?.destroy();
      window.__lenis = null;
      return;
    }
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    // expose once
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, [isAdmin]);

  // ✅ Framer Motion drives RAF (single loop, optimized)
  useAnimationFrame((time) => {
    window.__lenis?.raf(time);
  });

  return children;
};

export default SmoothScroll;
