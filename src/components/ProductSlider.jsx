import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const ProductSlider = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <div className="relative max-w-7xl mx-auto px-6 pb-8 overflow-hidden">

      {/* LEFT ARROW */}
      <button
        className="swiper-prev absolute left-0 top-1/2 z-10 -translate-y-1/2
                   w-11 h-11 rounded-full bg-white shadow-lg
                   border border-gray-200 flex items-center justify-center
                   hover:bg-lime-500 hover:text-white transition"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      {/* RIGHT ARROW */}
      <button
        className="swiper-next absolute right-0 top-1/2 z-10 -translate-y-1/2
                   w-11 h-11 rounded-full bg-white shadow-lg
                   border border-gray-200 flex items-center justify-center
                   hover:bg-lime-500 hover:text-white transition"
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>

      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        autoplay={{
          delay: 2600,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        spaceBetween={30}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product) => {
          // 🔹 IMAGE (SAFE)
          const productImage =
            product.product_images
              ?.filter((img) => img.image_type === "product")[0]
              ?.image_url || "/placeholder.jpg";


          // 🔹 CATEGORY
          const categorySlug =
            product.subcategories?.categories?.slug || "products";

          // 🔹 FINISH
          const finish =
            product.product_finishes?.[0]?.finish_name || "—";

          return (
            <SwiperSlide key={product.id} className="!overflow-visible">
              <Link
                to={`/products/${categorySlug}/${product.slug}`}
                className="group block"
              >
                {/* IMAGE */}
                <div className="bg-white p-4 rounded-2xl">
                  <div className="h-[420px] rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={productImage}
                      alt={product.name}
                      className="
                        w-full h-full object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>
                </div>

                {/* NAME */}
                <h3 className="
                  mt-5 text-center text-sm
                  tracking-[0.3em] uppercase
                  text-gray-900
                ">
                  {product.name}
                </h3>
              </Link>
            </SwiperSlide>

          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
