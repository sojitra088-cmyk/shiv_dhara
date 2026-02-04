import React from 'react';
import MarbleShowcase from "../components/ScrollImageIntro";
import GraniteShowcase from '../components/GraniteShowcase';
import TilesShowcase from '../components/TilesShowcase';
import BathwareSection from '../components/BathwareSection';
import ProjectSection from '../components/ProjectSection';
import LocationSection from '../components/LocationSection';
import Link from "next/link";

import CTC from '../components/CTC';
const Home = () => {
  return (
    <div className="w-full">
      {/* --- HERO SECTION --- */}
      <section
        className="
            relative
            min-h-[85vh] md:min-h-[100vh]
            flex items-center
            overflow-hidden
        "
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1615873968403-89e068629265')",
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

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-white">
                Premium Marble <br />
                <span className="italic font-light text-white/70">
                    Collection
                </span>
                </h1>

                <p className="mt-5 md:mt-6 text-white/85 leading-relaxed max-w-xl text-sm sm:text-base">
                Experience the finest natural stones sourced globally, brought to your architectural masterpieces.
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

                <Link
                  href="/allproducts"
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
                </Link>

                </div>

            </div>
            </div>
        </div>
    </section>
      

      {/* --- INTRODUCTION SECTION --- */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
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

            <button className="mt-8 bg-lime-500 text-black px-7 py-3 rounded-full font-semibold hover:bg-lime-400 transition">
              Explore Collections
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Premium Interior"
              className="rounded-2xl shadow-lg w-full h-[460px] object-cover"
            />

            {/* FLOATING CARD */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg hidden md:block">
              <p className="text-3xl font-bold text-lime-500">25+</p>
              <p className="text-sm text-gray-600">
                Years of Excellence
              </p>
            </div>
          </div>

        </div>
      </section>
      {/* Section 2: Marble (Image RIGHT) */}
      <MarbleShowcase />

      {/* Section 2: Granite (Image Left) */}
      <GraniteShowcase />

      {/* Section 3: Tiles (Image RIGHT) */}
      <TilesShowcase />
      {/* Section 4: Bathware */}  
      <BathwareSection /> 

     {/* Section 5: Projects */}
      <ProjectSection />
      {/* Section 6: Locations */}
      {/* <LocationSection /> */}
      <CTC />
    </div>
  );
}

export default Home;
