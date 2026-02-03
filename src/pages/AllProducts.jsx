import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1615873968403-89e068629265";

const AllProducts = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categorySlug || "All"
  );
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH CATEGORIES ---------- */
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, title, slug, description, image")
        .order("id", { ascending: true });

      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  /* ---------- SYNC URL → STATE ---------- */
  useEffect(() => {
    if (categorySlug) setSelectedCategory(categorySlug);
    else setSelectedCategory("All");
  }, [categorySlug]);

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let query = supabase
        .from("products")
        .select(`
          *,
          product_images(image_url, image_type),
          subcategories(
            categories(slug)
          )
        `);

      if (selectedCategory !== "All") {
        query = query.eq(
          "subcategories.categories.slug",
          selectedCategory
        );
      }

      const { data } = await query;
      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  /* ---------- HERO DATA ---------- */
  const activeCategory =
    selectedCategory !== "All"
      ? categories.find((c) => c.slug === selectedCategory)
      : null;

  const heroImage = activeCategory?.image || DEFAULT_HERO_IMAGE;
  const heroTitle = activeCategory?.title || "Our Products";
  const heroDescription =
    activeCategory?.description ||
    "Experience the finest natural stones sourced globally, brought to your architectural masterpieces.";

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[85vh] md:min-h-[100vh] flex items-center"
        style={{
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-3xl">

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white">
                {heroTitle} <br />
                <span className="italic font-light text-white/70">
                  Collection
                </span>
              </h1>

              <p className="mt-6 text-white/85 max-w-xl">
                {heroDescription}
              </p>

              
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="pt-24 pb-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-serif mb-16">
            All Products
          </h2>
          
            {/* CATEGORY PILLS */}
            <div className="mt-10 flex gap-3 flex-wrap">

            {/* ALL */}
            <button
                onClick={() => navigate("/products")}
                className={`
                px-5 py-2 rounded-full text-xs uppercase tracking-widest
                transition-all duration-300
                ${
                    selectedCategory === "All"
                    ? "bg-lime-500 text-black border border-lime-500"
                    : "bg-white text-gray-800 border border-gray-300 hover:border-lime-500 hover:text-lime-600"
                }
                `}
            >
                All
            </button>

            {/* CATEGORIES */}
            {categories.map((cat) => (
                <button
                key={cat.id}
                onClick={() => navigate(`/products/${cat.slug}`)}
                className={`
                    px-5 py-2 rounded-full text-xs uppercase tracking-widest
                    transition-all duration-300
                    ${
                    selectedCategory === cat.slug
                        ? "bg-lime-500 text-black border border-lime-500"
                        : "bg-white text-gray-800 border border-gray-300 hover:border-lime-500 hover:text-lime-600"
                    }
                `}
                >
                {cat.title}
                </button>
            ))}
            </div>

          {loading ? (
            <p>Loading products…</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product) => {
                const image =
                  product.product_images?.find(
                    (img) => img.image_type === "product"
                  )?.image_url || "/placeholder.jpg";

                const category =
                  product.subcategories?.categories?.slug || "products";

                return (
                  <Link
                    key={product.id}
                    to={`/products/${category}/${product.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="h-[320px] rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <h3 className="mt-4 text-center text-sm tracking-widest uppercase">
                      {product.name}
                    </h3>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
