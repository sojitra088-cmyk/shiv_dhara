import React from 'react';
import { useEffect, useRef, useState } from "react";
import Services from '../components/Services.jsx';
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import CTC from '../components/CTC.jsx';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const relatedServices = [
  {
    title: "Granite & Natural Stone Supply",
    desc: "Curated granite and stone solutions engineered for durability and refined aesthetics.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Custom Stone Processing",
    desc: "Precision cutting, finishing, and detailing aligned with project-specific requirements.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
  },
  {
    title: "Architectural Consultation",
    desc: "Collaborative material guidance for architects, designers, and builders.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
  },
];

const applications = [
  {
    title: "Luxury Residences",
    desc: "Premium marble and stone solutions crafted for private homes, enhancing elegance, durability, and long-term value.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265",
  },
  {
    title: "Villas & Apartments",
    desc: "Thoughtfully selected stones that elevate modern villas and apartments with refined textures and finishes.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
  },
  {
    title: "Hotel & Hospitality Projects",
    desc: "High-performance stone applications designed to withstand heavy use while maintaining luxury appeal.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
  {
    title: "Commercial Interiors",
    desc: "Durable and sophisticated stone solutions for offices, retail spaces, and corporate environments.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    title: "Feature Walls & Flooring",
    desc: "Statement stone surfaces that add depth, character, and visual impact to interior spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Staircases & Countertops",
    desc: "Precision-cut marble and granite designed for strength, safety, and timeless aesthetics.",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
  },
];


const Service = () => {
    const [open, setOpen] = useState(null);
    const sectionRefs = useRef([]);
    const [sectionVisibles, setSectionVisibles] = useState([]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
            entries.forEach((entry) => {
                const index = Number(entry.target.dataset.index);
                if (entry.isIntersecting) {
                setSectionVisibles((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                });
                }
            });
            },
            { threshold: 0.25 }
        );

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
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
                "url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg')",
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
                    Premium Marble <br />
                    <span className="italic font-light text-white/70">
                        & Stone Solutions
                    </span>
                    </h1>

                    <p className="mt-5 md:mt-6 text-white/85 leading-relaxed max-w-xl text-sm sm:text-base">
                    From sourcing the world’s finest natural stones to precision processing
                    and architectural support, our services are designed to elevate spaces
                    with clarity, quality, and confidence.
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
            data-index="0"
            className="pt-20 pb-16 md:pt-32 md:pb-24 bg-white overflow-hidden"
            >

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

                {/* LEFT CONTENT */}
                <div
                className={`transition-all duration-[1200ms] ease-out ${
                    sectionVisibles[0]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                >
                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    Services
                </p>

                <h1 className="text-5xl md:text-6xl font-serif leading-tight text-gray-900">
                    Premium Marble <br />
                    <span className="italic font-light text-neutral-400">
                    Supply
                    </span>
                </h1>

                <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
                    We curate and supply premium marble sourced from renowned quarries,
                    selected for consistency, durability, and timeless elegance.
                </p>
                </div>

                {/* RIGHT IMAGE */}
                <div
                className={`transition-all duration-[1400ms] ease-out delay-150 ${
                    sectionVisibles[0]
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[0.96]"
                }`}
                >
                <img
                    src="/Marble-Marvels-A-Symphony-Of-Luxury-Style-In-Interior-Design.jpg"
                    alt="Premium Marble Supply"
                    className="w-full h-[300px] sm:h-[400px] md:h-[480px] object-cover rounded-2xl shadow-xl"
                />
                </div>

            </div>
        </section>

        <Services />

        <section className="pt-28 pb-28 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* SECTION TITLE */}
                <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-4xl font-serif mb-16"
                >
                Common <span className="italic text-neutral-400">Applications</span>
                </motion.h2>

                {/* APPLICATION GRID */}
                <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-10"
                >
                {applications.map((item, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="group relative bg-gray-50 rounded-2xl overflow-hidden cursor-default"
                        >
                        {/* GRADIENT BORDER */}
                        <span className="
                            pointer-events-none absolute inset-0 rounded-2xl
                            bg-gradient-to-br from-lime-400/40 via-transparent to-transparent
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-500
                        " />

                        {/* IMAGE */}
                        <div className="h-48 w-full overflow-hidden relative z-10">
                            <img
                            src={item.image}
                            alt={item.title}
                            className="
                                w-full h-full object-cover
                                transition-transform duration-700 ease-out
                                group-hover:scale-105
                            "
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="relative z-10 p-7">
                            <h3 className="font-semibold text-gray-900 text-lg mb-3">
                            {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                            {item.desc}
                            </p>
                        </div>

                        {/* SOFT GLOW */}
                        <div className="
                            absolute -bottom-10 -right-10 w-32 h-32
                            bg-lime-500/10 blur-3xl rounded-full
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-700
                        " />
                        </motion.div>

                ))}
                </motion.div>

            </div>
        </section>

        <section className="pt-28 pb-28 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* SECTION HEADER */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="max-w-3xl mb-20"
                >
                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    Our Approach
                </p>

                <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
                    A Thoughtful Process
                    <br />
                    <span className="italic text-neutral-500">
                        Built Around Precision & Trust
                    </span>
                    </h2>


                <p className="mt-6 text-gray-600 leading-relaxed">
                    Every project is guided by a clear methodology — combining expertise,
                    craftsmanship, and structured execution to deliver lasting value.
                </p>
                </motion.div>

                {/* APPROACH STEPS */}
                <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-5 gap-10"
                >
                {[
                    {
                    step: "01",
                    title: "Understand",
                    desc: "We begin by understanding your vision, space requirements, and architectural intent.",
                    },
                    {
                    step: "02",
                    title: "Curate",
                    desc: "Materials are carefully curated from trusted sources to align with design and performance needs.",
                    },
                    {
                    step: "03",
                    title: "Engineer",
                    desc: "Precision processing ensures accuracy, finish quality, and project-specific detailing.",
                    },
                    {
                    step: "04",
                    title: "Deliver",
                    desc: "Logistics and coordination are handled seamlessly to meet timelines and expectations.",
                    },
                    {
                    step: "05",
                    title: "Support",
                    desc: "We remain engaged beyond delivery, ensuring long-term satisfaction and reliability.",
                    },
                ].map((item, i) => (
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -6 }}
                        className="group relative bg-white rounded-2xl p-8 border border-gray-100 transition-all duration-300"
                        >
                        {/* STEP BADGE */}
                        <div className="w-10 h-10 rounded-full bg-lime-500/10 text-lime-600
                            flex items-center justify-center text-sm font-bold mb-6">
                            {item.step}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            {item.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            {item.desc}
                        </p>

                        {/* HOVER ACCENT */}
                        <span className="
                            absolute inset-0 rounded-2xl
                            bg-gradient-to-br from-lime-400/15 to-transparent
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-500
                        " />
                        </motion.div>

                ))}
                </motion.div>

            </div>
        </section>

        <section className="pt-28 pb-28 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* SECTION HEADER */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="max-w-3xl mb-16"
                >
                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    Related Services
                </p>

                <h2 className="text-3xl md:text-4xl font-serif leading-snug">
                    Explore More <span className="italic text-neutral-400">Expertise</span>
                </h2>

                <p className="mt-6 text-gray-600 leading-relaxed">
                    Discover complementary services designed to support every stage of your
                    architectural and interior journey.
                </p>
                </motion.div>

                {/* SERVICES GRID */}
                <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-10"
                >
                {relatedServices.map((item, index) => (
                    <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                    >

                    {/* IMAGE */}
                    <div className="relative h-56 overflow-hidden">
                        <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-8 relative">

                        {/* Animated border accent */}
                        <span className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-lime-500/40 transition-colors duration-500 pointer-events-none" />

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed mb-6">
                        {item.desc}
                        </p>

                        <div className="flex items-center gap-2 text-lime-600 font-semibold text-sm uppercase tracking-wider">
                        Learn More
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>

                    </div>
                    </motion.div>
                ))}
                </motion.div>

            </div>
        </section>

        <section className="pt-28 pb-28 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

                {/* LEFT — MINI CASE STUDY */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                >
                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    Case Study
                </p>

                <h2 className="text-3xl md:text-4xl font-serif leading-snug mb-6">
                    A Luxury Villa Project <br />
                    <span className="italic text-neutral-400">
                    Delivered with Precision
                    </span>
                </h2>

                <p className="text-gray-600 leading-relaxed mb-8">
                    For a high-end residential villa project, we supplied uniform marble
                    slabs with custom finishes tailored to architectural drawings. Our
                    in-house inspection and processing ensured consistency across all
                    surfaces — approved on first review.
                </p>

                {/* HIGHLIGHTS */}
                <div className="space-y-4">
                    {[
                    "Custom-finished marble slabs",
                    "Color consistency across batches",
                    "On-time delivery as per schedule",
                    "Zero rework during installation",
                    ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-gray-700"
                    >
                        <span className="text-lime-500 font-bold">✓</span>
                        {item}
                    </motion.div>
                    ))}
                </div>
                </motion.div>

                {/* RIGHT — FAQ */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                >
                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    FAQs
                </p>

                <h3 className="text-2xl font-serif mb-10">
                    Frequently Asked Questions
                </h3>

                <div className="space-y-6">
                    {[
                    {
                        q: "How do you ensure stone consistency across large projects?",
                        a: "We follow a multi-stage inspection process, batch matching, and pre-dispatch approvals to maintain consistency across all supplied materials.",
                    },
                    {
                        q: "Can architects inspect materials before final delivery?",
                        a: "Yes. We encourage slab selection and inspection prior to dispatch to ensure complete alignment with design intent.",
                    },
                    {
                        q: "Do you support large-scale commercial projects?",
                        a: "Absolutely. Our infrastructure and sourcing network are equipped to handle both residential and commercial-scale developments.",
                    },
                    {
                        q: "What is the typical delivery timeline?",
                        a: "Timelines vary by project size and material selection, but we ensure clear scheduling and on-time delivery commitments.",
                    },
                    ].map((item, i) => (
                    <div
                        key={i}
                        className="border-b border-gray-200 pb-4"
                    >
                        <button
                        onClick={() => setOpen(open === i ? null : i)}
                        className="w-full flex justify-between items-center text-left"
                        >
                        <span className="font-medium text-gray-900">
                            {item.q}
                        </span>
                        {open === i ? (
                            <Minus className="w-4 h-4 text-lime-500" />
                        ) : (
                            <Plus className="w-4 h-4 text-lime-500" />
                        )}
                        </button>

                        <AnimatePresence>
                        {open === i && (
                            <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="mt-3 text-gray-600 text-sm leading-relaxed"
                            >
                            {item.a}
                            </motion.p>
                        )}
                        </AnimatePresence>
                    </div>
                    ))}
                </div>
                </motion.div>

            </div>
        </section>
        <CTC />

        </>
    );
}

export default Service;