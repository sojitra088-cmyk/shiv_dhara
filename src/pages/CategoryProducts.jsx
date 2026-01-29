import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

import ProductSlider from "../components/ProductSlider";
import CTC from "../components/CTC";

const CategoryProducts = () => {
  const { category, subcategory } = useParams();

  const [products, setProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (subcategory) {
      setSelectedSubcategory(subcategory);
    } else {
      setSelectedSubcategory("All");
    }
  }, [subcategory]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      /* Fetch subcategories */
      const { data: subcats } = await supabase
        .from("subcategories")
        .select(`
          id,
          title,
          slug,
          categories!inner ( slug )
        `)
        .eq("categories.slug", category);

      setSubcategories(subcats || []);

      /* Fetch products */
      const { data: prods, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          subcategories (
            id,
            slug,
            categories ( slug )
          ),
          product_images (
            image_url,
            image_type
          ),
          product_finishes ( finish_name )
        `);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProducts(
        prods.filter(
          (p) => p.subcategories.categories.slug === category
        )
      );

      setOtherProducts(
        prods.filter(
          (p) => p.subcategories.categories.slug !== category
        )
      );

      setLoading(false);
    };

    fetchData();
  }, [category]);

  const filteredProducts =
    selectedSubcategory === "All"
      ? products
      : products.filter(
          (p) => p.subcategories.slug === selectedSubcategory
        );

  return (
    <>
    {/* CATEGORY HERO */}
    <section className="relative bg-neutral-900">
    {/* BACKGROUND IMAGE */}
    <div className="absolute inset-0">
        <img
        src={
            category === "marble"
            ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
            : category === "granite"
            ? "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600"
            : "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600"
        }
        alt={category}
        className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
    </div>

    {/* CONTENT */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-28">
        <p className="text-lime-400 text-xs tracking-[0.35em] uppercase font-bold mb-5">
        Category
        </p>

        <h1 className="text-4xl md:text-6xl font-serif text-white capitalize mb-6">
        {category.replace("-", " ")}
        </h1>

        <p className="text-white/80 max-w-xl leading-relaxed">
        Explore our premium {category.replace("-", " ")} collection crafted for
        luxury interiors, refined architectural spaces, and timeless elegance.
        </p>
    </div>
    </section>

    <section className="pt-32 pb-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="max-w-3xl mb-5">
          <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
            Category
          </p>

          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 capitalize">
            {category.replace("-", " ")}
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Explore our premium {category.replace("-", " ")} collection crafted
            for luxury interiors and architectural excellence.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">

            <span className="text-sm text-gray-500 uppercase tracking-wider shrink-0">
              Filter
            </span>

            <div className="flex gap-3">

              {/* ALL */}
              <button
                onClick={() => setSelectedSubcategory("All")}
                className={`
                  px-5 py-2 rounded-full text-sm whitespace-nowrap border
                  transition-all duration-300
                  ${
                    selectedSubcategory === "All"
                      ? "bg-lime-500 text-white border-lime-500"
                      : "bg-white border-gray-300 text-gray-700 hover:border-lime-500"
                  }
                `}
              >
                All
              </button>

              {/* SUBCATEGORIES */}
              {subcategories.map((sub) => {
                const active = selectedSubcategory === sub.slug;

                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.slug)}
                    className={`
                      px-5 py-2 rounded-full text-sm whitespace-nowrap border
                      transition-all duration-300
                      ${
                        active
                          ? "bg-blue-900 text-white border-blue-900"
                          : "bg-white border-gray-300 text-gray-700 hover:border-lime-500"
                      }
                    `}
                  >
                    {sub.title}
                  </button>
                );
              })}
            </div>

          </div>
        </div>


        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => {
              // ✅ IMAGE LOGIC (MUST BE INSIDE MAP)
              const productImage = product.product_images
                ?.filter((img) => img.image_type === "product")[0]
                ?.image_url || "/placeholder.jpg";



              return (
                <Link
                    key={product.id}
                    to={`/products/${category}/${product.slug}`}
                    className="group block"
                  >
                    {/* IMAGE */}
                    <div className="bg-white rounded-2xl p-4">
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

                    {/* PRODUCT NAME */}
                    <h3 className="mt-5 text-center text-sm font-medium tracking-[0.3em] uppercase text-gray-900">
                      {product.name}
                    </h3>
                  </Link>


              );
            })}
          </div>
        )}


      </div>
    </section>
    {/* OTHER CATEGORY PRODUCTS */}
        {otherProducts.length > 0 && (
          <section className="pt-32 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

              <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                Explore More
              </p>

              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-10">
                Other Collections
              </h2>

              <ProductSlider products={otherProducts} />
            </div>
          </section>
        )}

    <CTC/>
    </>
  );
};

export default CategoryProducts;
