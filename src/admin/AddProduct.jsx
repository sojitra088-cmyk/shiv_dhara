import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import usageIcons from "../data/usageIcons";
import { useSearchParams } from "react-router-dom";
import ImageUploader from "../components/ImageUpload";

/* 🔹 Slug generator */
const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AddProduct = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const isEdit = Boolean(productId);

  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  /* CATEGORY + SUBCATEGORY */
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  /* HERO */
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");

  /* OVERVIEW */
  const [overview, setOverview] = useState("");
  const [overviewImage, setOverviewImage] = useState("");

  /* USAGE (MULTI SELECT) */
  const [usageAreas, setUsageAreas] = useState([]);

  /* APPLICATION IMAGES */
  const [applications, setApplications] = useState([]);

  /* FINISH OPTIONS */
  const [finishes, setFinishes] = useState([""]);
  const addFinish = () => setFinishes([...finishes, ""]);

  const removeFinish = (index) =>
    setFinishes(finishes.filter((_, i) => i !== index));

  /* SPECIFICATIONS */
  const [specs, setSpecs] = useState([{ label: "", value: "" }]);
  const removeSpec = (index) =>
  setSpecs(specs.filter((_, i) => i !== index));

  /* LOAD CATEGORIES */
  useEffect(() => {
    supabase
      .from("categories")
      .select("id, title")
      .then(({ data }) => setCategories(data || []));
  }, []);

  /* LOAD SUBCATEGORIES */
  useEffect(() => {
    supabase
      .from("subcategories")
      .select("id, title, category_id")
      .then(({ data }) => setSubcategories(data || []));
  }, []);

  /* FILTER SUBCATEGORIES */
  useEffect(() => {
    if (!categoryId) {
      setFilteredSubcategories([]);
      setSubcategoryId("");
      return;
    }

    setFilteredSubcategories(
      subcategories.filter(
        (s) => String(s.category_id) === String(categoryId)
      )
    );
  }, [categoryId, subcategories]);

  /* TOGGLE USAGE */
  const toggleUsage = (usage) => {
    setUsageAreas((prev) =>
      prev.includes(usage)
        ? prev.filter((u) => u !== usage)
        : [...prev, usage]
    );
  };

  /* ADD SPEC ROW */
  const addSpec = () =>
    setSpecs([...specs, { label: "", value: "" }]);


  useEffect(() => {
    if (!isEdit) return;

    const loadProduct = async () => {
      const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        hero_subtitle,
        overview,
        subcategory_id,
        subcategories ( category_id ),
        product_images ( image_url, image_type ),
        product_usage ( usage_title ),
        product_specifications ( spec_key, spec_value ),
        product_finishes ( finish_name )
      `)
      .eq("id", productId)
      .single();


      if (error) {
        Swal.fire("Error", error.message, "error");
        return;
      }

      // BASIC
      setName(data.name);
      setSlug(data.slug);
      setSubtitle(data.hero_subtitle || "");
      setOverview(data.overview || "");
      setSubcategoryId(data.subcategory_id);
      setCategoryId(data.subcategories.category_id);
      setFinishes(
        data.product_finishes?.length
          ? data.product_finishes.map(f => f.finish_name)
          : [""]
      );


      // HERO IMAGE
      const hero = data.product_images.find(i => i.image_type === "hero");
      setHeroImage(hero?.image_url || "");
      // OVERVIEW IMAGE
      const overviewImg = data.product_images.find(
        i => i.image_type === "product"
      );
      setOverviewImage(overviewImg?.image_url || "");

      // GALLERY
      const gallery = data.product_images
        .filter(i => i.image_type === "gallery")
        .map(i => i.image_url);
      setApplications(gallery);


      // USAGE
      setUsageAreas(data.product_usage.map(u => u.usage_title));

      // SPECS
      setSpecs(
        data.product_specifications.map(s => ({
          label: s.spec_key,
          value: s.spec_value
        }))
      );
    };

    loadProduct();
  }, [isEdit, productId]);

  const submit = async () => {
  try {
    let product;

    // 1️⃣ CREATE / UPDATE PRODUCT
    if (isEdit) {
      const { data, error } = await supabase
        .from("products")
        .update({
          name,
          slug,
          hero_subtitle: subtitle,
          overview,
          subcategory_id: subcategoryId
        })
        .eq("id", productId)
        .select()
        .single();

      if (error) throw error;
      product = data;

      // 2️⃣ CLEAN OLD CHILD DATA
      await supabase.from("product_images").delete().eq("product_id", productId);
      await supabase.from("product_usage").delete().eq("product_id", productId);
      await supabase.from("product_specifications").delete().eq("product_id", productId);
      await supabase.from("product_finishes").delete().eq("product_id", productId);

    } else {
      const { data, error } = await supabase
        .from("products")
        .insert([{
          name,
          slug,
          hero_subtitle: subtitle,
          overview,
          subcategory_id: subcategoryId
        }])
        .select()
        .single();

      if (error) throw error;
      product = data;
    }

    // 🔥 FROM HERE product.id IS GUARANTEED

    // 3️⃣ HERO IMAGE
    const imageRows = [];

    if (heroImage?.trim()) {
      imageRows.push({
        product_id: product.id,
        image_url: heroImage.trim(),
        image_type: "hero"
      });
    }

    if (overviewImage?.trim()) {
      imageRows.push({
        product_id: product.id,
        image_url: overviewImage.trim(),
        image_type: "product"
      });
    }

    if (imageRows.length) {
      await supabase.from("product_images").insert(imageRows);
    }


    // 4️⃣ GALLERY
    const gallery = applications
      .filter(u => typeof u === "string" && u.length > 5)
      .map((url, i) => ({
        product_id: product.id,
        image_url: url,
        image_type: "gallery",
        sort_order: i
      }));

    if (gallery.length) {
      await supabase.from("product_images").insert(gallery);
    }



    // 5️⃣ USAGE
    const usageRows = [...new Set(usageAreas)]
      .map(u => u.trim())
      .filter(Boolean)
      .map(u => ({
        product_id: product.id,
        usage_title: u
      }));

    if (usageRows.length) {
      await supabase.from("product_usage").insert(usageRows);
    }


    // 6️⃣ FINISH OPTIONS ✅ (THIS WAS MISSING / WRONG)
    const finishRows = [...new Set(finishes)]
      .map(f => f.trim())
      .filter(Boolean)
      .map(f => ({
        product_id: product.id,
        finish_name: f
      }));

    if (finishRows.length) {
      await supabase.from("product_finishes").insert(finishRows);
    }


    // 7️⃣ SPECIFICATIONS
    const specRows = specs
      .filter(s => s.label?.trim() && s.value?.trim())
      .map(s => ({
        product_id: product.id,
        spec_key: s.label.trim(),
        spec_value: s.value.trim()
      }));

    if (specRows.length) {
      await supabase.from("product_specifications").insert(specRows);
    }


    Swal.fire(
      "Success",
      isEdit ? "Product updated successfully" : "Product added successfully",
      "success"
    );

    navigate("/admin/manage-products");

  } catch (err) {
    Swal.fire("Error", err.message, "error");
  }
};


  return (
    <div className="max-w-4xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>


      {/* STEP INDICATOR */}
      <div className="relative mb-12">
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />
        <div
          className="absolute top-4 left-0 h-[2px] bg-lime-500 transition-all"
          style={{ width: `${(step - 1) * 16.66}%` }}
        />

        <div className="relative flex justify-between">
          {["Category", "Hero", "Overview", "Usage", "Images", "Finishes", "Specs"].map(
            (label, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
                  ${step >= i + 1 ? "bg-lime-500 text-white" : "bg-gray-200"}`}
                >
                  {i + 1}
                </div>
                <span className="text-xs mt-2">{label}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* STEP 1 – CATEGORY */}
      {step === 1 && (
        <div className="space-y-4">
          <select
            className="w-full border px-4 py-2 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>

          <select
            className="w-full border px-4 py-2 rounded"
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            disabled={!categoryId}
          >
            <option value="">Select Subcategory</option>
            {filteredSubcategories.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>

          <div className="flex justify-between">
            <button className="text-gray-500 hover:underline" disabled>
              Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!subcategoryId}
              className="bg-lime-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 – HERO */}
      {step === 2 && (
        <div className="space-y-4">
          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Product Name"
            value={name}                     
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(generateSlug(e.target.value));
            }}
          />

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(generateSlug(e.target.value));
            }}
          />

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Subtitle" value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <ImageUploader
            label="Hero Image"
            value={heroImage}
            onChange={setHeroImage}
            folder="hero"
          />


          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-gray-500 hover:underline"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!name || !slug}
              className="bg-lime-500 text-white px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 – OVERVIEW */}
      {step === 3 && (
        <div className="space-y-4">
          <textarea
            className="w-full border px-4 py-2 rounded"
            rows={4}
            placeholder="Overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />

          <ImageUploader
            label="Overview Image"
            value={overviewImage}
            onChange={setOverviewImage}
            folder="overview"
          />



          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-gray-500 hover:underline"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="bg-lime-500 text-white px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 – USAGE (ICONS) */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(usageIcons).map(([label, icon]) => {
              const active = usageAreas.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleUsage(label)}
                  className={`flex items-center gap-3 border px-4 py-3 rounded
                    ${active
                      ? "bg-lime-50 border-lime-500 text-lime-700"
                      : "border-gray-300 text-gray-600"}
                  `}
                >
                  <i className={`fa-solid ${icon}`} />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="text-gray-500 hover:underline"
            >
              Back
            </button>
            <button
              onClick={() => setStep(5)}
              disabled={usageAreas.length === 0}
              className="bg-lime-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 – APPLICATION IMAGES */}
      {step === 5 && (
        <div className="space-y-4">
          <ImageUploader
            label="Application / Gallery Images"
            value={applications.filter(Boolean)}
            onChange={(urls) => setApplications(urls)}
            folder="gallery"
            multiple
          />


          <div className="flex justify-between">
            <button
              onClick={() => setStep(4)}
              className="text-gray-500 hover:underline"
            >
              Back
            </button>
            <button
              onClick={() => setStep(6)}
              className="bg-lime-500 text-white px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* STEP 6 – FINISH OPTIONS */}
      {step === 6 && (
        <div className="space-y-4">
          {finishes.map((f, i) => (
            <div key={i} className="flex gap-3">
              <input
                className="w-full border px-4 py-2 rounded"
                placeholder="Finish name (e.g. Polished)"
                value={f}
                onChange={(e) => {
                  const copy = [...finishes];
                  copy[i] = e.target.value;
                  setFinishes(copy);
                }}
              />
              {finishes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFinish(i)}
                  className="text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addFinish}
            className="bg-gray-100 px-4 py-2 rounded"
          >
            + Add Finish
          </button>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(5)}
              className="text-gray-500 hover:underline"
            >
              Back
            </button>
            <button
              onClick={() => setStep(7)}
              className="bg-lime-500 text-white px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 7 – SPECIFICATIONS */}
      {step === 7 && (
        <div className="space-y-4">
          {specs.map((s, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                className="w-full border px-4 py-2 rounded"
                placeholder="Label"
                value={s.label}
                onChange={(e) => {
                  const copy = [...specs];
                  copy[i].label = e.target.value;
                  setSpecs(copy);
                }}
              />

              <input
                className="w-full border px-4 py-2 rounded"
                placeholder="Value"
                value={s.value}
                onChange={(e) => {
                  const copy = [...specs];
                  copy[i].value = e.target.value;
                  setSpecs(copy);
                }}
              />

              {/* ❌ DELETE ICON */}
              {specs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove specification"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addSpec}
            className="bg-gray-100 px-4 py-2 rounded"
          >
            + Add Specification
          </button>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(6)}
              className="text-gray-500 hover:underline"
            >
              Back
            </button>
            <button
              onClick={submit}
              className="bg-lime-500 text-white px-6 py-2 rounded"
            >
              Save Product
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default AddProduct;
