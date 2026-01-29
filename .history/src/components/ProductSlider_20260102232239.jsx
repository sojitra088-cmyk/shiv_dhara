import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const ProductSlider = ({ products }) => {
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
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!overflow-visible">
            <Link
              to={`/products/${product.category}/${product.slug}`}
              className="block"
            >
              <div
                className="group bg-white rounded-[28px]
                           border border-gray-200
                           transition-all duration-500
                           hover:border-lime-500/40 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden rounded-t-[28px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover
                               transition-transform duration-700
                               group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-7">
                  <p className="text-lime-600 text-xs uppercase tracking-widest font-bold mb-2">
                    {product.category}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4">
                    Finish: <span className="font-medium">{product.finish}</span>
                  </p>

                  <span className="inline-flex items-center gap-2 text-lime-600
                                   font-semibold text-sm uppercase tracking-wider">
                    View Details
                    <i className="fa-solid fa-arrow-right transition-transform
                                  duration-300 group-hover:translate-x-2" />
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
