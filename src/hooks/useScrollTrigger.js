import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollTrigger = () => {
  useEffect(() => {
    // Refresh ScrollTrigger when component mounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const animateOnScroll = (element, animation) => {
    if (!element) return;

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 50%",
        scrub: false,
        markers: false,
      },
      ...animation,
    });
  };

  const parallaxEffect = (element, speed = 0.5) => {
    if (!element) return;

    gsap.to(element, {
      y: () => ScrollTrigger.getById("parallax") || window.innerHeight * speed,
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });
  };

  return { animateOnScroll, parallaxEffect };
};
