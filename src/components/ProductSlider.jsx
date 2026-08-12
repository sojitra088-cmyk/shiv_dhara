import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";


const ProductSlider = ({

  // =========================================
  // PRODUCTS
  // =========================================
  products = [],


  // =========================================
  // DESKTOP
  // =========================================
  desktopSlides = 3,


  // =========================================
  // MOBILE
  // =========================================

  // Enable / disable mobile grid
  mobileGrid = true,

  // Number of columns in mobile grid
  mobileGridColumns = 2,

  // Number of rows in mobile grid
  mobileGridrow = 2,

  // Number of slides visible in mobile slider
  mobileSliderSlides = 1.15,

  // Initial mobile view
  // "grid" or "slider"
  mobileView = "grid",


  // =========================================
  // VIEW ALL
  // =========================================
  showViewAll = true,

  viewAllText = "View All",

  viewAllLink = "/products",


  // =========================================
  // MOBILE VIEW SWITCHER
  // =========================================
  showViewSwitcher = true,

}) => {

  // =========================================
  // MOBILE CURRENT VIEW
  // =========================================
  const [currentMobileView, setCurrentMobileView] =
    useState(mobileView);


  // =========================================
  // NO PRODUCTS
  // =========================================
  if (!products.length) return null;


  // =========================================
  // MOBILE GRID COLUMNS
  // =========================================
  const mobileGridClass = {

    1: "grid-cols-1",

    2: "grid-cols-2",

    3: "grid-cols-3",

    4: "grid-cols-4",

  }[mobileGridColumns] || "grid-cols-2";


  // =========================================
  // MOBILE GRID PRODUCT LIMIT
  //
  // Example:
  // 2 columns × 2 rows = 4 products
  //
  // 2 columns × 3 rows = 6 products
  // =========================================
  const mobileGridProductLimit =
    mobileGridColumns * mobileGridrow;


  return (

    <div
      className="
        relative
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        pb-8
      "
    >


      {/* =========================================
          TOP BAR
      ========================================= */}

      {(showViewAll || showViewSwitcher) && (

        <div
          className="
            flex
            items-center
            justify-between
            mb-5
          "
        >


          {/* =====================================
              VIEW ALL
              Visible on mobile + desktop
          ===================================== */}

          {showViewAll ? (

            <Link
              to={viewAllLink}
              className="
                text-sm
                font-medium
                uppercase
                tracking-[0.2em]
                text-gray-900
                hover:text-lime-600
                transition
              "
            >
              {viewAllText}
            </Link>

          ) : (

            <div />

          )}


          {/* =====================================
              MOBILE GRID / SLIDER SWITCH
              
              Hidden on desktop
          ===================================== */}

          {showViewSwitcher && mobileGrid && (

            <div className="flex md:hidden">

              <div
                className="
                  inline-flex
                  items-center
                  gap-1
                  p-1
                  bg-gray-100
                  rounded-lg
                "
              >


                {/* ===============================
                    GRID BUTTON
                =============================== */}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentMobileView("grid")
                  }
                  className={`
                    w-10
                    h-10
                    rounded-md
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300

                    ${
                      currentMobileView === "grid"
                        ? "bg-white shadow text-lime-600"
                        : "text-gray-500 hover:text-gray-900"
                    }
                  `}
                  aria-label="Grid view"
                >
                  <i className="fa-solid fa-grip"></i>
                </button>


                {/* ===============================
                    SLIDER BUTTON
                =============================== */}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentMobileView("slider")
                  }
                  className={`
                    w-10
                    h-10
                    rounded-md
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300

                    ${
                      currentMobileView === "slider"
                        ? "bg-white shadow text-lime-600"
                        : "text-gray-500 hover:text-gray-900"
                    }
                  `}
                  aria-label="Slider view"
                >
                  <i className="fa-solid fa-sliders"></i>
                </button>

              </div>

            </div>

          )}

        </div>

      )}



      {/* =========================================
          MOBILE GRID
      ========================================= */}

      {mobileGrid && currentMobileView === "grid" && (

        <div
          className={`
            grid
            ${mobileGridClass}
            gap-x-3
            gap-y-7
            md:hidden
          `}
        >

          {products
            .slice(
              0,
              mobileGridProductLimit
            )
            .map((product) => {


              // =================================
              // IMAGE
              // =================================

              const productImage =

                product.product_images
                  ?.filter(
                    (img) =>
                      img.image_type === "product"
                  )[0]
                  ?.image_url ||

                "/placeholder.jpg";


              // =================================
              // CATEGORY
              // =================================

              const categorySlug =

                product.subcategories
                  ?.categories
                  ?.slug ||

                "products";


              return (

                <Link
                  key={product.id}
                  to={`/products/${categorySlug}/${product.slug}`}
                  className="group block"
                >


                  {/* ============================
                      IMAGE
                  ============================ */}

                  <div
                    className="
                      bg-white
                      p-2
                      rounded-xl
                    "
                  >

                    <div
                      className="
                        h-[220px]
                        sm:h-[280px]
                        rounded-lg
                        overflow-hidden
                        bg-gray-100
                      "
                    >

                      <img
                        src={productImage}
                        alt={product.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                    </div>

                  </div>


                  {/* ============================
                      PRODUCT NAME
                  ============================ */}

                  <h3
                    className="
                      mt-3
                      text-center
                      text-[11px]
                      sm:text-xs
                      tracking-[0.18em]
                      uppercase
                      text-gray-900
                      line-clamp-2
                    "
                  >
                    {product.name}
                  </h3>


                </Link>

              );

            })}

        </div>

      )}



      {/* =========================================
          MOBILE SLIDER
      ========================================= */}

      {mobileGrid &&
        currentMobileView === "slider" && (

          <div
            className="
              relative
              md:hidden
            "
          >


            {/* =====================================
                MOBILE LEFT ARROW
            ===================================== */}

            <button
              className="
                mobile-swiper-prev
                absolute
                left-0
                top-1/2
                z-10
                -translate-y-1/2
                w-9
                h-9
                rounded-full
                bg-white
                shadow-lg
                border
                border-gray-200
                flex
                items-center
                justify-center
                hover:bg-lime-500
                hover:text-white
                transition
              "
            >

              <i
                className="
                  fa-solid
                  fa-arrow-left
                  text-xs
                "
              />

            </button>


            {/* =====================================
                MOBILE RIGHT ARROW
            ===================================== */}

            <button
              className="
                mobile-swiper-next
                absolute
                right-0
                top-1/2
                z-10
                -translate-y-1/2
                w-9
                h-9
                rounded-full
                bg-white
                shadow-lg
                border
                border-gray-200
                flex
                items-center
                justify-center
                hover:bg-lime-500
                hover:text-white
                transition
              "
            >

              <i
                className="
                  fa-solid
                  fa-arrow-right
                  text-xs
                "
              />

            </button>


            {/* =====================================
                MOBILE SWIPER
            ===================================== */}

            <Swiper
              modules={[
                Autoplay,
                Navigation,
              ]}
              navigation={{
                nextEl: ".mobile-swiper-next",
                prevEl: ".mobile-swiper-prev",
              }}
              autoplay={{
                delay: 2600,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={
                products.length >
                Math.ceil(mobileSliderSlides)
              }
              spaceBetween={12}
              slidesPerView={mobileSliderSlides}
            >

              {products.map((product) => {


                // ===============================
                // IMAGE
                // ===============================

                const productImage =

                  product.product_images
                    ?.filter(
                      (img) =>
                        img.image_type === "product"
                    )[0]
                    ?.image_url ||

                  "/placeholder.jpg";


                // ===============================
                // CATEGORY
                // ===============================

                const categorySlug =

                  product.subcategories
                    ?.categories
                    ?.slug ||

                  "products";


                return (

                  <SwiperSlide
                    key={product.id}
                  >

                    <Link
                      to={`/products/${categorySlug}/${product.slug}`}
                      className="group block"
                    >


                      {/* IMAGE */}

                      <div
                        className="
                          bg-white
                          p-3
                          rounded-2xl
                        "
                      >

                        <div
                          className="
                            h-[350px]
                            rounded-xl
                            overflow-hidden
                            bg-gray-100
                          "
                        >

                          <img
                            src={productImage}
                            alt={product.name}
                            className="
                              w-full
                              h-full
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                          />

                        </div>

                      </div>


                      {/* NAME */}

                      <h3
                        className="
                          mt-4
                          text-center
                          text-xs
                          tracking-[0.25em]
                          uppercase
                          text-gray-900
                        "
                      >
                        {product.name}
                      </h3>


                    </Link>

                  </SwiperSlide>

                );

              })}

            </Swiper>

          </div>

        )}



      {/* =========================================
          DESKTOP SLIDER
      ========================================= */}

      <div
        className="
          hidden
          md:block
          relative
        "
      >


        {/* =====================================
            DESKTOP LEFT ARROW
        ===================================== */}

        <button
          className="
            desktop-swiper-prev
            absolute
            left-0
            top-1/2
            z-10
            -translate-y-1/2
            w-11
            h-11
            rounded-full
            bg-white
            shadow-lg
            border
            border-gray-200
            flex
            items-center
            justify-center
            hover:bg-lime-500
            hover:text-white
            transition
          "
        >

          <i
            className="
              fa-solid
              fa-arrow-left
            "
          />

        </button>


        {/* =====================================
            DESKTOP RIGHT ARROW
        ===================================== */}

        <button
          className="
            desktop-swiper-next
            absolute
            right-0
            top-1/2
            z-10
            -translate-y-1/2
            w-11
            h-11
            rounded-full
            bg-white
            shadow-lg
            border
            border-gray-200
            flex
            items-center
            justify-center
            hover:bg-lime-500
            hover:text-white
            transition
          "
        >

          <i
            className="
              fa-solid
              fa-arrow-right
            "
          />

        </button>


        {/* =====================================
            DESKTOP SWIPER
        ===================================== */}

        <Swiper
          modules={[
            Autoplay,
            Navigation,
          ]}
          navigation={{
            nextEl: ".desktop-swiper-next",
            prevEl: ".desktop-swiper-prev",
          }}
          autoplay={{
            delay: 2600,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={
            products.length >
            desktopSlides
          }
          spaceBetween={30}
          slidesPerView={desktopSlides}
        >

          {products.map((product) => {


            // ===============================
            // IMAGE
            // ===============================

            const productImage =

              product.product_images
                ?.filter(
                  (img) =>
                    img.image_type === "product"
                )[0]
                ?.image_url ||

              "/placeholder.jpg";


            // ===============================
            // CATEGORY
            // ===============================

            const categorySlug =

              product.subcategories
                ?.categories
                ?.slug ||

              "products";


            return (

              <SwiperSlide
                key={product.id}
                className="!overflow-visible"
              >

                <Link
                  to={`/products/${categorySlug}/${product.slug}`}
                  className="group block"
                >


                  {/* IMAGE */}

                  <div
                    className="
                      bg-white
                      p-4
                      rounded-2xl
                    "
                  >

                    <div
                      className="
                        h-[420px]
                        rounded-xl
                        overflow-hidden
                        bg-gray-100
                      "
                    >

                      <img
                        src={productImage}
                        alt={product.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                    </div>

                  </div>


                  {/* NAME */}

                  <h3
                    className="
                      mt-5
                      text-center
                      text-sm
                      tracking-[0.3em]
                      uppercase
                      text-gray-900
                    "
                  >
                    {product.name}
                  </h3>


                </Link>

              </SwiperSlide>

            );

          })}

        </Swiper>

      </div>

    </div>
  );
};


export default ProductSlider;