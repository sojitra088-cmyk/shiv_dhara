import { useEffect, useRef } from "react";
import gsap from "gsap";

const WhatsAppFloat = () => {
  const btnRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        btnRef.current,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          delay: 0.8,
        }
      );

      // Floating animation
      gsap.to(btnRef.current, {
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: "power1.inOut",
      });

      // Subtle icon pulse
      gsap.to(iconRef.current, {
        scale: 1.08,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={btnRef}
      href="https://wa.me/919723272739"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-6 right-5 z-50
        flex items-center 
        bg-white text-black
        pe-5 
        rounded-full
        border border-neutral-200
        shadow-xl
        cursor-pointer
        select-none
      "
      onMouseEnter={() =>
        gsap.to(btnRef.current, { scale: 1.06, duration: 0.25 })
      }
      onMouseLeave={() =>
        gsap.to(btnRef.current, { scale: 1, duration: 0.25 })
      }
    >
      {/* ICON */}
      <div
        ref={iconRef}
        className="flex items-center justify-center shrink-0"
      >
        <img
          src="/WhatsApp-Logo.wine.png"
          alt="WhatsApp"
          className="
            h-15 w-15 object-contain
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]
          "
        />
      </div>

      {/* TEXT */}
      <span className="text-sm font-black tracking-widest">
        CHAT
      </span>
    </a>
  );
};

export default WhatsAppFloat;
