import { useState, useEffect } from "react";
import MarbleShowcase from "../components/ScrollImageIntro";
import GraniteShowcase from '../components/GraniteShowcase';
import TilesShowcase from '../components/TilesShowcase';
import BathwareSection from '../components/BathwareSection';
import ProjectSection from '../components/ProjectSection';
import LocationSection from '../components/LocationSection';
import ProductSlider from "../components/ProductSlider";
import { supabase } from "../supabase";

// import Link from "next/link";
import { Link } from "react-router-dom";

import CTC from '../components/CTC';


const Home = () => {
  const [marbleProducts, setMarbleProducts] = useState([]);
  const [graniteProducts, setGraniteProducts] = useState([]);
  const [tilesProducts, setTilesProducts] = useState([]);
  const [bathwareProducts, setBathwareProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadProducts = async () => {


      const loadCategory = async (slug) => {

        const { data } = await supabase
          .from("products")
          .select(`
                      id,
                      name,
                      slug,
                      product_images(image_url,image_type),
                      subcategories(
                          categories(title,slug)
                      )
                  `)
          .eq("subcategories.categories.slug", slug);

        return data || [];
      };
      setLoading(true);

      setMarbleProducts(await loadCategory("marble"));
      setGraniteProducts(await loadCategory("granite"));
      setTilesProducts(await loadCategory("tiles"));
      setBathwareProducts(await loadCategory("bathware"));

      setLoading(false);
    };

    loadProducts();

  }, []);
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

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-white">
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
                  to="/allproducts"
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-gray-900">
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
      {/* <MarbleShowcase /> */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-lime-500 text-xs font-bold tracking-[0.35em] uppercase mb-4">
            Premium Marble
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-gray-900">
            Timeless Marble, <br />
            <span className="italic font-light text-neutral-400">
              Crafted by Nature
            </span>
          </h1>

          {/* <p className="mt-6 text-gray-600 max-w-lg leading-relaxed">
            Discover an exclusive collection of premium marble sourced from around the
            world, offering unmatched elegance, natural beauty, and enduring quality for
            luxurious interiors and architectural masterpieces.
          </p> */}

          <ProductSlider
            products={marbleProducts}

            /* Desktop */
            desktopSlides={3}

            /* Mobile */
            mobileGrid={true}
            mobileGridColumns={2}
            mobileGridrow={2}
            mobileSliderSlides={1.15}
            mobileView="grid"

            /* View All */
            showViewAll={true}
            viewAllText="View All"
            viewAllLink="/products/marble"

            /* Mobile [▦] [☷] */
            showViewSwitcher={true}
          />
        </div>

      </section>

      {/* Section 2: Granite (Image Left) */}
      {/* <GraniteShowcase /> */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-lime-500 text-xs font-bold tracking-[0.35em] uppercase mb-4">
            Premium Granite
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-gray-900">
            Strength in Stone, <br />
            <span className="italic font-light text-neutral-400">
              Built to Last
            </span>
          </h1>

          {/* <p className="mt-6 text-gray-600 max-w-lg leading-relaxed">
            Explore our premium granite collection designed for exceptional durability,
            stunning finishes, and timeless appeal, making every residential and
            commercial space stronger and more sophisticated.
          </p> */}

          <ProductSlider products={graniteProducts} 
            /* Desktop */
            desktopSlides={3}

            /* Mobile */
            mobileGrid={true}
            mobileGridColumns={2}
            mobileGridrow={2}
            mobileSliderSlides={1.15}
            mobileView="grid"

            /* View All */
            showViewAll={true}
            viewAllText="View All"
            viewAllLink="/products/granite"

            /* Mobile [▦] [☷] */
            showViewSwitcher={true}
          />
        </div>

      </section>
      {/* Section 3: Tiles (Image RIGHT) */}
      {/* <TilesShowcase /> */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-lime-500 text-xs font-bold tracking-[0.35em] uppercase mb-4">
            Designer Tiles
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-gray-900">
            Modern Designs, <br />
            <span className="italic font-light text-neutral-400">
              Endless Possibilities
            </span>
          </h1>

          {/* <p className="mt-6 text-gray-600 max-w-lg leading-relaxed">
            From contemporary patterns to timeless textures, our designer tiles combine
            style, performance, and versatility to create beautiful spaces for every
            lifestyle.
          </p> */}

          <ProductSlider products={tilesProducts} 
            /* Desktop */
            desktopSlides={3}

            /* Mobile */
            mobileGrid={true}
            mobileGridColumns={2}
            mobileGridrow={2}
            mobileSliderSlides={1.15}
            mobileView="grid"

            /* View All */
            showViewAll={true}
            viewAllText="View All"
            viewAllLink="/products/tiles"

            /* Mobile [▦] [☷] */
            showViewSwitcher={true}
          />
        </div>

      </section>
      {/* Section 4: Bathware */}
      {/* <BathwareSection />  */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-lime-500 text-xs font-bold tracking-[0.35em] uppercase mb-4">
            Luxury Bathware
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-gray-900">
            Everyday Comfort, <br />
            <span className="italic font-light text-neutral-400">
              Designed Beautifully
            </span>
          </h1>

          {/* <p className="mt-6 text-gray-600 max-w-lg leading-relaxed">
            Elevate your bathroom with premium bathware that blends innovative
            functionality, refined aesthetics, and lasting quality to create a luxurious
            everyday experience.
          </p> */}

          <ProductSlider products={bathwareProducts} 
            /* Desktop */
            desktopSlides={3}

            /* Mobile */
            mobileGrid={true}
            mobileGridColumns={2}
            mobileGridrow={2}
            mobileSliderSlides={1.15}
            mobileView="grid"

            /* View All */
            showViewAll={true}
            viewAllText="View All"
            viewAllLink="/products/bathware"

            /* Mobile [▦] [☷] */
            showViewSwitcher={true}
          />
        </div>

      </section>
      {/* Section 5: Projects */}
      <ProjectSection />
      {/* Section 6: Locations */}
      {/* <LocationSection /> */}
      <CTC />
    </div>
  );
}

export default Home;
