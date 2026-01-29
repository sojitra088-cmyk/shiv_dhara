import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import usageIcons from "../data/usageIcons";

/* 🔹 Slug generator */
const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AddProduct = () => {
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
  const [applications, setApplications] = useState(["", "", ""]);

  /* SPECIFICATIONS */
  const [specs, setSpecs] = useState([{ label: "", value: "" }]);

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

  /* SUBMIT */
  const submit = async () => {
    if (!categoryId || !subcategoryId) {
      Swal.fire("Error", "Select category & subcategory", "warning");
      setStep(1);
      return;
    }

    const payload = {
      name,
      slug,
      subtitle,
      category_id: categoryId,
      subcategory_id: subcategoryId,
      hero_image: heroImage,
      overview,
      overview_image: overviewImage,
      usage_areas: usageAreas,
      applications,
      specifications: specs,
    };

    const { error } = await supabase.from("products").insert([payload]);

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    Swal.fire("Success", "Product added successfully", "success")
      .then(() => navigate("/admin/manage-products"));
  };

  return (
    <div className="max-w-4xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

      {/* STEP INDICATOR */}
      <div className="relative mb-12">
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />
        <div
          className="absolute top-4 left-0 h-[2px] bg-lime-500 transition-all"
          style={{ width: `${(step - 1) * 20}%` }}
        />

        <div className="relative flex justify-between">
          {["Category", "Hero", "Overview", "Usage", "Images", "Specs"].map(
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
            placeholder="Subtitle"
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Hero Image URL"
            onChange={(e) => setHeroImage(e.target.value)}
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

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Overview Image URL"
            onChange={(e) => setOverviewImage(e.target.value)}
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
          {applications.map((_, i) => (
            <input
              key={i}
              className="w-full border px-4 py-2 rounded"
              placeholder={`Application Image ${i + 1}`}
              onChange={(e) => {
                const copy = [...applications];
                copy[i] = e.target.value;
                setApplications(copy);
              }}
            />
          ))}

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

      {/* STEP 6 – SPECIFICATIONS */}
      {step === 6 && (
        <div className="space-y-4">
          {specs.map((s, i) => (
            <div key={i} className="flex gap-3">
              <input
                className="w-full border px-4 py-2 rounded"
                placeholder="Label"
                onChange={(e) => {
                  const copy = [...specs];
                  copy[i].label = e.target.value;
                  setSpecs(copy);
                }}
              />
              <input
                className="w-full border px-4 py-2 rounded"
                placeholder="Value"
                onChange={(e) => {
                  const copy = [...specs];
                  copy[i].value = e.target.value;
                  setSpecs(copy);
                }}
              />
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
              onClick={() => setStep(5)}
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
