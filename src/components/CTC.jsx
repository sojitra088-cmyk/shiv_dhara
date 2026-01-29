import React, { Component } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export class CTC extends Component {
  render() {
    return (
      <section className="relative pt-28 pb-28 bg-gray-900 overflow-hidden">
        {/* SUBTLE BACKGROUND ACCENT */}
        <div className="absolute inset-0">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">

            {/* CONTENT */}
            <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
            >
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-5">
                Let’s Work Together
            </p>

            <h2 className="text-3xl md:text-4xl font-serif text-white leading-snug">
                Ready to Build <br />
                <span className="italic text-white/70">
                Remarkable Spaces?
                </span>
            </h2>

            <p className="mt-6 text-gray-300 leading-relaxed">
                Partner with Shivdhara Marble Hub for premium marble and natural stone
                solutions shaped by experience, precision, and architectural intent.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">

                {/* PRIMARY CTA */}
                <motion.a
                href="/contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                    group inline-flex items-center justify-center gap-3
                    bg-lime-500 text-black
                    px-12 py-4 rounded-full
                    font-bold uppercase tracking-widest text-xs
                    transition-all duration-300
                    hover:bg-white
                "
                >
                Get a Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                {/* SECONDARY CTA */}
                <motion.a
                href="/service"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                    inline-flex items-center justify-center
                    border border-white/30 text-white
                    px-12 py-4 rounded-full
                    font-bold uppercase tracking-widest text-xs
                    transition-all duration-300
                    hover:bg-white hover:text-black
                "
                >
                Explore Services
                </motion.a>

            </div>
            </motion.div>

        </div>
    </section>
    );
  }
}

export default CTC;
