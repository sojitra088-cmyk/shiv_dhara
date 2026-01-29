import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ProductSlider from "../components/ProductSlider";
import CTC from "../components/CTC";
import usageIcons from "../data/usageIcons";


// animations.js (optional helper file)
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const SingleProduct = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openItem, setOpenItem] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);

  useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true);

        // 🔹 Fetch current product
        const { data, error } = await supabase
          .from("products")
          .select(`
            id,
            name,
            slug,
            hero_subtitle,
            overview,
            subcategories (
              categories ( title, slug )
            ),
            product_images ( image_url, image_type ),
            product_usage ( usage_title ),
            product_finishes ( finish_name ),
            product_specifications ( spec_key, spec_value )
          `)
          .eq("slug", slug)
          .single();

        if (error || !data) {
          console.error(error);
          setLoading(false);
          return;
        }

        setProduct(data);

        // 🔹 Fetch other products
        const { data: others } = await supabase
          .from("products")
          .select(`
            id,
            name,
            slug,
            product_images ( image_url, image_type )
          `)
          .neq("slug", slug)
          .limit(8);

        setOtherProducts(others || []);
        setLoading(false);
      };

      fetchProduct();
    }, [slug]);

  if (!product) {
    return <p className="pt-40 text-center">Product not found</p>;
  }

  
  const heroImage =
  product.product_images?.find((i) => i.image_type === "hero")?.image_url ||
  product.product_images?.[0]?.image_url;
  const productimg =
  product.product_images?.find((i) => i.image_type === "product")?.image_url ||
  product.product_images?.[0]?.image_url;
  const galleryImages = product.product_images
  ?.filter((i) => i.image_type === "gallery")
  .map((i) => i.image_url);

  return (
    <>
      {/* ================================================= */}
      {/* 1️⃣ WOW – HERO */}
      {/* ================================================= */}
      <section className="relative h-[75vh] min-h-[520px] overflow-hidden">
        <motion.img
          src={heroImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/45" />

        <motion.div
          className="relative z-10 h-full flex items-center"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <div className="max-w-7xl mx-auto px-6 text-white">
            <p className="text-lime-400 text-xs tracking-[0.35em] uppercase font-bold mb-4">
              {product.subcategories.categories.title}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              {product.name}
            </h1>
            <p className="max-w-xl text-white/90 leading-relaxed">
              {product.hero_subtitle}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===================================== ============ */}
      {/* 2️⃣ UNDERSTAND – OVERVIEW */}
      {/* ================================================= */}
      <section className="py-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 capitalize mb-6">
              Product Overview
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.overview}
            </p>
            <p className="mb-10">
              Finish: <strong>
              {product.product_finishes?.map(f => f.finish_name).join(", ") || "—"}
            </strong>
            </p>

            <button className="px-8 py-3 rounded-full bg-lime-500 text-black font-semibold hover:bg-lime-600 transition">
              Enquire Now →
            </button>
          </motion.div>

          <motion.img
            variants={fadeUp}
            src={productimg }
            className="rounded-3xl shadow-2xl"
            alt={product.name}
          />

        </motion.div>
      </section>

      {/* ================================================= */}
      {/* 3️⃣ TRUST – USAGE AREAS */}
      {/* ================================================= */}
      <section className="py-28 bg-[#F7F7F5]">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* HEADER */}
          <div className="max-w-3xl mb-16">
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
              Usage Areas
            </p>

            <h3 className="text-3xl md:text-4xl font-serif text-gray-900">
              Designed for <br />
              <span className="text-neutral-400 italic font-light">
                Real-World Applications
              </span>
            </h3>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-14">
            {product.product_usage.map((u)  => (
              <motion.div
                key={u.id}
                variants={fadeUp}
                className="group text-center"
              >
                {/* ICON */}
                <i
                  className={`
                    fa-solid ${usageIcons[u.usage_title] || "fa-check"}
                    text-4xl md:text-5xl
                    text-gray-400
                    group-hover:text-lime-500
                    transition-colors duration-300
                  `}
                ></i>

                {/* LABEL */}
                <p className="mt-4 text-sm font-medium tracking-wide text-gray-800">
                  {u.usage_title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>




      {/* ================================================= */}
      {/* 4️⃣ IMAGINE – GALLERY */}
      {/* ================================================= */}
      <section className="py-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900 capitalize mb-10">
            Inspiring Applications
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((img, i) => (
              <motion.img
                key={i}
                variants={fadeUp}
                src={img}
                className="rounded-2xl h-[260px] w-full object-cover"
                alt=""
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================================================= */}
      {/* 5️⃣ CONFIRM – TECH DETAILS (HOVER + CLICK) */}
      {/* ================================================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-14">
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-3">
              Technical Details
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 capitalize">
              Product Specifications
            </h2>
          </div>

          <div className="space-y-6">

            {/* ================= SPECIFICATIONS ================= */}
            <div
              onMouseEnter={() => setHoverItem("specs")}
              onMouseLeave={() => setHoverItem(null)}
              className="rounded-2xl border border-gray-200 bg-white
                        transition-all duration-300
                        hover:border-lime-500 hover:shadow-lg"
            >
              {/* HEADER */}
              <button
                onClick={() =>
                  setOpenItem(openItem === "specs" ? null : "specs")
                }
                className="w-full flex justify-between items-center px-8 py-6 text-left"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  Specifications
                </h3>

                <span
                  className={`w-9 h-9 flex items-center justify-center rounded-full
                              border transition-all duration-300
                              ${
                                openItem === "specs" || hoverItem === "specs"
                                  ? "bg-lime-500 text-white border-lime-500"
                                  : "border-gray-300 text-gray-600"
                              }`}
                >
                  {openItem === "specs" ? (
                    <i className="fa-solid fa-xmark text-sm"></i>
                  ) : (
                    <i className="fa-regular fa-plus text-sm"></i>
                  )}
                </span>
              </button>

              {/* CONTENT */}
              {(hoverItem === "specs" || openItem === "specs") && (
                <div className="px-8 pb-8">
                  <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {product.product_specifications.map((s)  => (
                      <div
                        key={s.spec_key}
                        className="flex justify-between border-b border-gray-100 pb-2"
                      >
                        <span className="capitalize text-gray-500">
                          {s.spec_key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="font-medium text-gray-900">
                          {s.spec_value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ================= FINISH OPTIONS ================= */}
            {product.product_finishes?.length > 0 && (
              <div
                onMouseEnter={() => setHoverItem("finish")}
                onMouseLeave={() => setHoverItem(null)}
                className="rounded-2xl border border-gray-200 bg-white
                          transition-all duration-300
                          hover:border-lime-500 hover:shadow-lg"
              >
                {/* HEADER */}
                <button
                  onClick={() =>
                    setOpenItem(openItem === "finish" ? null : "finish")
                  }
                  className="w-full flex justify-between items-center px-8 py-6 text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    Finish Options
                  </h3>

                  <span
                    className={`w-9 h-9 flex items-center justify-center rounded-full
                                border transition-all duration-300
                                ${
                                  openItem === "finish" || hoverItem === "finish"
                                    ? "bg-lime-500 text-white border-lime-500"
                                    : "border-gray-300 text-gray-600"
                                }`}
                  >
                    {openItem === "finish" ? (
                      <i className="fa-solid fa-xmark text-sm"></i>
                    ) : (
                      <i className="fa-regular fa-plus text-sm"></i>
                    )}
                  </span>
                </button>

                {/* CONTENT */}
                {(hoverItem === "finish" || openItem === "finish") && (
                  <div className="px-8 pb-8 flex flex-wrap gap-3">
                    {product.product_finishes.map((f) => (
                      <span
                        key={f.finish_name}
                        className="
                          px-4 py-2 rounded-full bg-gray-100 text-sm
                          font-medium text-gray-800
                          hover:bg-lime-500 hover:text-white transition
                        "
                      >
                        {f.finish_name}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      </section>




      {/* ================================================= */}
      {/* 7️⃣ EXPLORE – OTHER COLLECTIONS */}
      {/* ================================================= */}
      {otherProducts.length > 0 &&  (
        <section className="pt-28 pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
              Explore More
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 capitalize mb-12">
              Other Collections
            </h2>
            <ProductSlider products={otherProducts} />

          </div>
        </section>
      )}

      <CTC />
    </>
  );
};

export default SingleProduct;
