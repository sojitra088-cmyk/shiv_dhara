import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Diamond, Layers, Clock, Eye, Users, Leaf } from "lucide-react"
import CTC from "../components/CTC";

const useCountUp = (end, duration = 2000, startWhen = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let start = 0;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration, startWhen]);

  return count;
};
const philosophy = [
  {
    icon: Diamond,
    title: "Craftsmanship",
    desc: "A deep respect for stone, refined through precision and skilled workmanship."
  },
  {
    icon: Layers,
    title: "Authentic Materials",
    desc: "We source natural stones that preserve their original character and integrity."
  },
  {
    icon: Clock,
    title: "Timeless Design",
    desc: "Designs that endure beyond trends, grounded in proportion and balance."
  },
  {
    icon: Eye,
    title: "Attention to Detail",
    desc: "Every edge, surface, and finish is considered with intent and care."
  },
  {
    icon: Users,
    title: "Client Partnership",
    desc: "Collaborating closely with architects, designers, and builders."
  },
  {
    icon: Leaf,
    title: "Responsible Sourcing",
    desc: "Mindful practices that respect nature and future generations."
  }
];


const About = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 200);
    }, []);

    const sectionRefs = useRef([]);
    const [sectionVisibles, setSectionVisibles] = useState(new Array(7).fill(false));

    useEffect(() => {
        const observers = sectionRefs.current.map((ref, index) => {
            if (!ref) return null;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setSectionVisibles(prev => {
                            const newVis = [...prev];
                            newVis[index] = true;
                            return newVis;
                        });
                    }
                },
                { threshold: 0.3 }
            );
            observer.observe(ref);
            return observer;
        });
        return () => observers.forEach(obs => obs && obs.disconnect());
    }, []);

  return (
    <>
    <section
        className="
            relative
            min-h-[85vh] md:min-h-[100vh]
            flex items-center
            overflow-hidden
        "
        style={{
            backgroundImage:
            "url('showroom_ad_scroller_homepage.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

        {/* CONTENT */}
        <div className="relative z-10 w-full">
            <div
            className="
                max-w-7xl mx-auto
                px-6
                py-24 md:py-32
            "
            >
            <div className="max-w-3xl">

                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                Our Services
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-white">
                Crafting Timeless <br />
                <span className="italic font-light text-white/70">
                    & Stone Experiences
                </span>
                </h1>

                <p className="mt-5 md:mt-6 text-white/85 leading-relaxed max-w-xl text-sm sm:text-base">
                With decades of expertise in premium marble and natural stones,
                we partner with architects, designers, and builders to shape
                spaces defined by elegance, durability, and craftsmanship.
                </p>

                {/* CTA */}
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-5 sm:gap-6">
                <a
                    href="/contact"
                    className="
                    bg-lime-500 text-black
                    px-10 py-4
                    rounded-full
                    font-bold uppercase tracking-widest text-xs
                    hover:bg-white transition-all
                    text-center
                    "
                >
                    Get a Quote
                </a>

                <a
                    href="/product"
                    className="
                    border border-white/40 text-white
                    px-10 py-4
                    rounded-full
                    font-bold uppercase tracking-widest text-xs
                    hover:bg-white hover:text-black transition-all
                    text-center
                    "
                >
                    View Collections
                </a>
                </div>

            </div>
            </div>
        </div>
    </section>
    <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="pt-32 pb-24 bg-white overflow-hidden"
        >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

            {/* IMAGE — LEFT */}
            <div
            className={`relative transition-all duration-[900ms] ease-out ${
                sectionVisibles[0]
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-[0.97]"
            }`}
            >
            <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
                alt="Luxury Architecture"
                className="w-full h-[500px] object-cover rounded-[32px] shadow-xl"
            />

            {/* EXPERIENCE BADGE */}
            <div className="absolute bottom-6 left-6 bg-white px-6 py-4 rounded-xl shadow-lg">
                <p className="text-3xl font-extrabold text-lime-500">25+</p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">
                Years of Excellence
                </p>
            </div>
            </div>

            {/* TEXT — RIGHT */}
            <div
            className={`transition-all duration-[900ms] delay-[120ms] ease-out ${
                sectionVisibles[0]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            >
            <p className="text-lime-500 text-xs font-bold tracking-[0.35em] uppercase mb-4">
                About Shivdhara
            </p>

            <h1 className="text-5xl md:text-6xl font-serif leading-tight text-gray-900">
                Remarkable Spaces, <br />
                <span className="italic font-light text-neutral-400">
                Guided by Lifestyle
                </span>
            </h1>
            <p className="mt-6 text-gray-600 max-w-lg leading-relaxed">
                We curate and supply premium marble and natural stones that elevate
                residential and commercial spaces with timeless elegance and
                exceptional craftsmanship.
            </p>

            <NavLink
                to="/product"
                className="inline-block mt-8 bg-lime-500 text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all"
            >
                Explore Collections
            </NavLink>
            </div>

        </div>
    </section>

    <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="pt-24 pb-28 bg-gray-50 overflow-hidden"
        >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

            {/* CONTENT */}
            <div
            className={`transition-all duration-[1000ms] delay-[120ms] ease-out ${
                sectionVisibles[1]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            >
            <p className="text-lime-500 text-xs font-bold tracking-[0.35em] uppercase mb-6">
                Who We Are
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900 max-w-xl">
                A Legacy Built on <br />
                <span className="text-neutral-400 font-light italic">
                Stone, Craft & Trust
                </span>
            </h2>

            <div className="mt-8 space-y-6 text-gray-600 leading-relaxed max-w-lg">
                <p>
                Shivdhara Marble Hub is a premium destination for natural stones,
                built on decades of industry expertise and a deep respect for
                architectural excellence.
                </p>

                <p>
                From sourcing the finest marble across the globe to delivering
                precision-finished stone solutions, our approach blends tradition,
                technology, and craftsmanship.
                </p>

                <p>
                Trusted by architects, designers, and builders, Shivdhara stands as
                a partner in creating spaces that endure — visually, structurally,
                and emotionally.
                </p>
            </div>

            <div className="mt-10 pl-6 border-l-4 border-lime-500">
                <p className="text-gray-900 font-semibold">
                Designing with stone is not just our profession — it is our heritage.
                </p>
            </div>
            </div>

            {/* IMAGE (NO BADGE HERE) */}
            <div
            className={`transition-all duration-[1000ms] ease-out ${
                sectionVisibles[1]
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[0.97]"
            }`}
            >
            <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800"
                alt="Luxury Interior with Marble"
                className="w-full h-[520px] object-cover rounded-[32px] shadow-xl"
            />
            </div>

        </div>
    </section>
    <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="pt-28 pb-28 bg-white overflow-hidden"
        >
        <div className="max-w-7xl mx-auto px-6">

            {/* HEADER */}
            <div
            className={`max-w-3xl mb-20 transition-all duration-[1000ms] ease-out ${
                sectionVisibles[2]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            >
            <p className="text-lime-500 text-xs font-bold tracking-[0.35em] uppercase mb-4">
                Our Philosophy
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
                Principles That Define <br />
                <span className="text-neutral-400 font-light italic">
                Our Work
                </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
                Our philosophy is shaped by experience, restraint, and a commitment to
                creating stone solutions that stand the test of time.
            </p>
            </div>

            {/* PHILOSOPHY TILES */}
            <div className="grid md:grid-cols-3 gap-x-16 gap-y-20">

            {[
                {
                    title: "Craftsmanship",
                    desc: "A deep respect for stone, refined through precision and skilled workmanship.",
                },
                {
                    title: "Authentic Materials",
                    desc: "We source natural stones that preserve their original character and integrity.",
                },
                {
                    title: "Timeless Design",
                    desc: "Designs that endure beyond trends, grounded in proportion and balance.",
                },
                {
                    title: "Attention to Detail",
                    desc: "Every edge, surface, and finish is considered with intent and care.",
                },
                {
                    title: "Client Partnership",
                    desc: "Collaborating closely with architects, designers, and builders.",
                },
                {
                    title: "Responsible Sourcing",
                    desc: "Mindful practices that respect nature and future generations.",
                },
                ].map((item, index) => (
                <div
                    key={index}
                    style={{ transitionDelay: `${index * 120}ms` }}
                    className={`group relative pl-6 pr-4 py-2 rounded-xl
                    transition-all duration-500 active:scale-[0.98]
                    ${sectionVisibles[2]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"}
                    `}
                >
                    {/* ANIMATED LINE ACCENT */}
                    <span
                    className={`
                        absolute left-0 top-3 w-[2px] bg-lime-500/70
                        transition-all duration-700 ease-out
                        ${sectionVisibles[2] ? "h-10" : "h-0"}
                    `}
                    />

                    {/* CONTENT */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3
                    transition-colors duration-300 group-hover:text-black">
                    {item.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed max-w-sm
                    transition-colors duration-300 group-hover:text-gray-700">
                    {item.desc}
                    </p>

                    {/* HOVER ACCENT */}
                        <span className="
                            absolute inset-0 rounded-2xl
                            bg-gradient-to-br from-lime-400/15 to-transparent
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-500
                        " />

                </div>
                ))}


            </div>

        </div>
    </section>

    <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="pt-24 md:pt-28 pb-24 md:pb-28 bg-gray-50 overflow-hidden"
        >
        <div className="max-w-7xl mx-auto px-6">

            {/* HEADER */}
            <div
            className={`max-w-3xl mb-14 md:mb-20 transition-all duration-[1000ms] ease-out ${
                sectionVisibles[3]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            >
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                What We Do
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
                Expertise Shaped by <br />
                <span className="text-neutral-400 font-light italic">
                Experience & Precision
                </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
                Our work spans sourcing, processing, and delivering premium natural
                stones for residential and commercial spaces, guided by quality and
                architectural intent.
            </p>
            </div>

            {/* TILE GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

            {[
                {
                title: "Premium Marble Supply",
                desc: "Curated marble collections sourced globally, selected for elegance, durability, and consistency.",
                },
                {
                title: "Granite & Natural Stones",
                desc: "A refined range of granites and stones suited for both contemporary and classic architecture.",
                },
                {
                title: "Residential Stone Solutions",
                desc: "Tailored stone applications for villas, apartments, and private residences.",
                },
                {
                title: "Commercial & Large-Scale Projects",
                desc: "Stone solutions engineered for hotels, offices, retail spaces, and public architecture.",
                },
                {
                title: "Custom Stone Processing",
                desc: "Precision cutting, finishing, and detailing aligned with project-specific requirements.",
                },
                {
                title: "Architectural Consultation",
                desc: "Collaborative guidance on material selection, application, and design integration.",
                },
            ].map((item, index) => (
                <div
                    key={index}
                    style={{ transitionDelay: `${index * 90}ms` }}
                    className={`
                    group relative flex flex-col h-full p-8 rounded-2xl
                    bg-white border border-gray-200
                    transition-all duration-[800ms] ease-out
                    active:scale-[0.98]
                    ${
                        sectionVisibles[3]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }
                    md:hover:-translate-y-2
                    md:hover:border-lime-500/60
                    md:hover:shadow-lg
                    `}
                >
                    {/* TOP ACCENT LINE (ANIMATED) */}
                    <span
                    className={`
                        absolute top-0 left-8 h-[2px]
                        transition-all duration-700 ease-out
                        ${
                        sectionVisibles[3]
                            ? "w-10"
                            : "w-0"
                        }
                        md:group-hover:w-20
                    `}
                    />

                    {/* CONTENT */}
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300">
                    {item.title}
                    </h3>

                    <p className="mt-3 text-gray-600 leading-relaxed text-sm md:text-base transition-colors duration-300">
                    {item.desc}
                    </p>

                    {/* KEEP HEIGHT CONSISTENT */}
                    <div className="flex-grow" />

                    {/* HOVER ACCENT */}
                        <span className="
                            absolute inset-0 rounded-2xl
                            bg-gradient-to-br from-lime-400/15 to-transparent
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-500
                        " />
                </div>

            ))}

            </div>

        </div>
    </section>

    <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className="pt-24 md:pt-28 pb-24 md:pb-28 bg-white overflow-hidden"
        >
        <div className="max-w-7xl mx-auto px-6">

            {/* SECTION HEADER */}
            <div
            className={`max-w-3xl mb-14 md:mb-16 transition-all duration-[1000ms] ease-out ${
                sectionVisibles[4]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            >
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                Why Choose Us
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
                Experience You Can Trust, <br />
                <span className="text-neutral-400 font-light italic">
                Quality You Can Rely On
                </span>
            </h2>
            </div>


            <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">

            {/* LEFT IMAGE */}
            <div
                className={`
                    relative overflow-hidden rounded-2xl shadow-xl
                    transition-all duration-[1200ms] ease-out
                    ${
                    sectionVisibles[4]
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-6 scale-[0.96]"
                    }
                    md:hover:-translate-y-1
                `}
                >
                <img
                    src="/wide-range-of-marble-selection-loved-by-designers-and-architects.png"
                    alt="Stone Craftsmanship"
                    className="
                    w-full h-[360px] sm:h-[420px] md:h-[480px]
                    object-cover
                    transition-transform duration-700 ease-out
                    md:hover:scale-[1.03]
                    "
                />
                </div>


            {/* RIGHT CONTENT */}
            <div
                className={`transition-all duration-[1000ms] delay-150 ease-out ${
                sectionVisibles[4]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
            >
                <ul className="space-y-5 md:space-y-6">

                {[
                    {
                        title: "Decades of Industry Experience",
                        desc: "Our knowledge is built on years of working with premium natural stones across diverse projects.",
                    },
                    {
                        title: "Curated Global Stone Sourcing",
                        desc: "We source select materials from trusted quarries worldwide to ensure consistency and quality.",
                    },
                    {
                        title: "Trusted by Architects & Builders",
                        desc: "Long-standing relationships with professionals who value reliability and precision.",
                    },
                    {
                        title: "Precision Processing & Quality Control",
                        desc: "Each stone undergoes detailed inspection and finishing before delivery.",
                    },
                    {
                        title: "End-to-End Project Support",
                        desc: "From consultation to delivery, we remain involved at every stage of your project.",
                    },
                    ].map((item, index) => (
                    <li
                        key={index}
                        style={{ transitionDelay: `${index * 100}ms` }}
                        className={`
                        group relative pl-6 pr-4 py-1
                        transition-all duration-[800ms] ease-out
                        active:scale-[0.98]
                        ${
                            sectionVisibles[4]
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-3"
                        }
                        `}
                    >
                        {/* ANIMATED LEFT BORDER */}
                        <span
                        className={`
                            absolute left-0 top-1 w-[2px] bg-lime-500/70
                            transition-all duration-700 ease-out
                            ${sectionVisibles[4] ? "h-10" : "h-0"}
                            md:group-hover:h-14
                        `}
                        />

                        <h3 className="
                        font-semibold text-gray-900 mb-1
                        transition-colors duration-300
                        md:group-hover:text-black
                        ">
                        {item.title}
                        </h3>

                        <p className="
                        text-gray-600 leading-relaxed text-sm md:text-base
                        transition-colors duration-300
                        md:group-hover:text-gray-700
                        ">
                        {item.desc}
                        </p>

                        {/* DESKTOP HOVER GLOW */}
                        <span
                        className="
                            pointer-events-none absolute inset-0 rounded-lg
                            bg-gradient-to-r from-lime-500/6 to-transparent
                            opacity-100 md:opacity-0
                            md:group-hover:opacity-100
                            transition-opacity duration-500
                        "
                        />
                    </li>
                    ))}


                </ul>

            </div>

            </div>
        </div>
    </section>

    <section
        ref={(el) => sectionRefs.current[5] = el}
        className="pt-28 pb-28 bg-gray-50 overflow-hidden"
        >
        <div className="max-w-7xl mx-auto px-6">

            {/* HEADER */}
            <div
                className={`max-w-3xl mb-24 transition-all duration-[1200ms] ease-out ${
                    sectionVisibles[5]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                >
                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    Our Process
                </p>

                <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
                    A Seamless Journey <br />
                    <span className="text-neutral-400 font-light italic">
                    From Concept to Completion
                    </span>
                </h2>

                <p className="mt-6 text-gray-600 leading-relaxed">
                    Our structured process ensures clarity, precision, and confidence at every
                    stage of your project.
                </p>
                </div>


            {/* HORIZONTAL TIMELINE */}
            <div className="relative">
            {/* DESKTOP HORIZONTAL LINE */}
            <div
                className={`hidden md:block absolute top-7 left-0 h-[2px] bg-lime-500/40
                transition-all duration-[1600ms] ease-out
                ${
                    sectionVisibles[5] ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
            />

            {/* STEPS */}
            <div className="grid gap-16 md:grid-cols-5">
                {[
                {
                    step: "01",
                    title: "Consultation",
                    desc: "Understanding your design intent and project requirements.",
                },
                {
                    step: "02",
                    title: "Material Selection",
                    desc: "Guided selection of stones aligned with aesthetics and use.",
                },
                {
                    step: "03",
                    title: "Custom Processing",
                    desc: "Precision cutting and finishing to project specifications.",
                },
                {
                    step: "04",
                    title: "Quality Inspection",
                    desc: "Ensuring consistency, finish, and quality standards.",
                },
                {
                    step: "05",
                    title: "Delivery & Support",
                    desc: "Timely delivery and continued project assistance.",
                },
                ].map((item, index) => (
                <div
                    key={index}
                    style={{ transitionDelay: `${index * 120}ms` }}
                    className={`relative group transition-all duration-[900ms] ease-out
                    ${
                        sectionVisibles[5]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                >
                    {/* STEP MARKER */}
                    <div className="flex items-center justify-center md:justify-start">
                    <div
                        className={`
                        flex items-center justify-center
                        w-14 h-14 rounded-full
                        bg-white border border-lime-500/40
                        text-sm font-bold text-lime-600
                        transition-all duration-500
                        md:group-hover:bg-lime-500 md:group-hover:text-black
                        `}
                    >
                        {item.step}
                    </div>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-6 text-center md:text-left">
                    <h3 className="font-semibold text-gray-900 mb-2">
                        {item.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto md:mx-0">
                        {item.desc}
                    </p>
                    </div>

                    {/* MOBILE VERTICAL CONNECTOR */}
                    <span className="md:hidden absolute left-7 top-16 h-full w-[1px] bg-lime-500/30"></span>
                </div>
                ))}
            </div>
            </div>


        </div>
    </section>
    <section
        ref={(el) => sectionRefs.current[6] = el}
        className="pt-28 pb-28 bg-white overflow-hidden"
        >
        <div className="max-w-7xl mx-auto px-6">

            {/* HEADER */}
            <div
            className={`max-w-3xl mb-24 transition-all duration-[1400ms] ease-out ${
                sectionVisibles[6]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            >
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                Experience & Scale
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
                Built on Experience, <br />
                <span className="text-neutral-400 font-light italic">
                Measured by Trust
                </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
                Our journey is defined by consistent quality, long-term partnerships,
                and projects that stand the test of time.
            </p>
            </div>


            {/* STATS GRID */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[
                    { value: 25, suffix: "+", label: "Years of Excellence" },
                    { value: 500, suffix: "+", label: "Projects Completed" },
                    { value: 20, suffix: "+", label: "Cities Served" },
                    { value: 1000, suffix: "+", label: "Happy Clients" },
                ].map((item, index) => {
                    const count = useCountUp(item.value, 2200, sectionVisibles[6]);

                    return (
                    <div
                        key={index}
                        style={{ transitionDelay: `${index * 160}ms` }}
                        className={`
                        group relative
                        transition-all duration-[1200ms] ease-out
                        ${
                            sectionVisibles[6]
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }
                        `}
                    >
                        {/* NUMBER */}
                        <div
                        className={`
                            text-5xl md:text-6xl font-bold text-gray-900
                            transition-transform duration-700 ease-out
                            md:group-hover:scale-[1.05]
                        `}
                        >
                        {count}
                        <span className="text-lime-500">{item.suffix}</span>
                        </div>

                        {/* ACCENT LINE */}
                        <div
                        className={`
                            mx-auto mt-4 h-[2px] bg-lime-500
                            transition-all duration-700 ease-out
                            ${
                            sectionVisibles[6] ? "w-10 opacity-100" : "w-0 opacity-0"
                            }
                            md:group-hover:w-16
                        `}
                        />

                        {/* LABEL */}
                        <p className="mt-4 text-gray-600 uppercase tracking-wider text-xs">
                        {item.label}
                        </p>
                    </div>
                    );
                })}
                </div>

        </div>
    </section>
    <CTC />
    </>
  );

}

export default About;
