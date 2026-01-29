import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useCallback } from "react";

gsap.registerPlugin(ScrollToPlugin);

export const useSmoothScroll = () => {
  const scrollToTop = useCallback(() => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  const scrollToElement = useCallback((element, offset = 80) => {
    if (!element) return;

    gsap.to(window, {
      scrollTo: {
        y: element,
        offsetY: offset,
      },
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  const scrollToPosition = useCallback((position) => {
    gsap.to(window, {
      scrollTo: position,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return { scrollToTop, scrollToElement, scrollToPosition };
};
