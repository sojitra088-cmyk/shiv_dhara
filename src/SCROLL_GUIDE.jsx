/*
  ============================================
  SMOOTH SCROLL & SCROLL TRIGGER SETUP GUIDE
  ============================================

  Your app now has complete smooth scrolling and scroll trigger support!

  🎯 FEATURES INSTALLED:
  ✅ Smooth page scrolling with GSAP
  ✅ Scroll trigger animations
  ✅ Parallax effects
  ✅ Anchor link smooth scrolling
  ✅ Auto-refresh on window resize

  ============================================
  HOW TO USE IN YOUR COMPONENTS:
  ============================================

  1. BASIC SCROLL ANIMATION
  ───────────────────────────
  Import ScrollTriggerElement from "../components/ScrollTriggerElement";

  <ScrollTriggerElement
    animation={{ opacity: 1, y: 0, duration: 0.8 }}
    triggerStart="top 75%"
  >
    <div>Content that animates in on scroll</div>
  </ScrollTriggerElement>

  Props:
  - animation: Object with GSAP animation properties (opacity, y, x, scale, etc.)
  - triggerStart: When animation triggers (default: "top 80%")
  - className: Additional CSS classes
  - stagger: Enable staggered animation for children with data-animate

  ───────────────────────────
  2. PARALLAX EFFECT
  ───────────────────────────
  Import ParallaxImage from "../components/ParallaxImage";

  <ParallaxImage speed={0.3}>
    <img src="image.jpg" alt="parallax" />
  </ParallaxImage>

  Props:
  - speed: Parallax speed (0.1 = slow, 0.5 = medium, 1.0 = fast)
  - className: Additional CSS classes

  ───────────────────────────
  3. SCROLL TRIGGER HOOK
  ───────────────────────────
  Import { useScrollTrigger } from "../hooks/useScrollTrigger";

  const MyComponent = () => {
    const { animateOnScroll, parallaxEffect } = useScrollTrigger();
    const ref = useRef();

    useEffect(() => {
      animateOnScroll(ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
      });
    }, []);

    return <div ref={ref}>Animated element</div>;
  };

  ───────────────────────────
  4. SMOOTH SCROLL HOOK
  ───────────────────────────
  Import { useSmoothScroll } from "../hooks/useSmoothScroll";

  const MyComponent = () => {
    const { scrollToTop, scrollToElement, scrollToPosition } = useSmoothScroll();

    return (
      <>
        <button onClick={scrollToTop}>Scroll to Top</button>
        <button onClick={() => scrollToElement(ref.current)}>
          Scroll to Element
        </button>
        <button onClick={() => scrollToPosition(500)}>
          Scroll to 500px
        </button>
      </>
    );
  };

  ───────────────────────────
  5. ANCHOR LINK SMOOTH SCROLL
  ───────────────────────────
  Automatic! Just use regular anchor links:

  // Navigation
  <a href="#section-about">About</a>

  // Target section
  <section id="section-about">
    Content here
  </section>

  The SmoothScrollProvider automatically handles all anchor link clicks
  and scrolls smoothly to the target element.

  ============================================
  ANIMATION EXAMPLES:
  ============================================

  // Fade in and slide up
  animation={{ opacity: 1, y: 0, duration: 0.6 }}

  // Fade and scale
  animation={{ opacity: 1, scale: 1, duration: 0.8 }}

  // Slide in from left
  animation={{ opacity: 1, x: 0, duration: 0.7 }}

  // Rotate and fade
  animation={{ opacity: 1, rotation: 0, duration: 0.8 }}

  // Multiple properties
  animation={{
    opacity: 1,
    y: 0,
    x: 0,
    duration: 0.8,
    ease: "power2.inOut"
  }}

  ============================================
  TRIGGER START OPTIONS:
  ============================================

  "top 80%"    - When element top reaches 80% from top of viewport
  "top 50%"    - When element top reaches 50% from top of viewport
  "center"     - When element center reaches center of viewport
  "bottom 0%"  - When element bottom reaches bottom of viewport

  ============================================
  STAGGERED ANIMATIONS:
  ============================================

  <ScrollTriggerElement
    stagger
    animation={{ opacity: 1, y: 0, duration: 0.6 }}
  >
    <div data-animate>Item 1</div>
    <div data-animate>Item 2</div>
    <div data-animate>Item 3</div>
  </ScrollTriggerElement>

  All children with data-animate will animate in sequence!

  ============================================
  FILE STRUCTURE:
  ============================================

  src/
  ├── hooks/
  │   ├── useSmoothScroll.js       (Smooth scrolling hook)
  │   └── useScrollTrigger.js      (Scroll trigger hook)
  ├── components/
  │   ├── SmoothScrollProvider.jsx (Global smooth scroll provider)
  │   ├── ScrollTriggerElement.jsx (Scroll trigger wrapper component)
  │   └── ParallaxImage.jsx        (Parallax image component)
  └── App.jsx                      (Wrapped with SmoothScrollProvider)

  ============================================
*/

export default function ScrollGuide() {
  return null;
}
