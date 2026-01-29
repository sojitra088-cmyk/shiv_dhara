import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  /* STEP 2 – HERO */
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");

  /* STEP 3 – OVERVIEW */
  const [overview, setOverview] = useState("");
  const [overviewImage, setOverviewImage] = useState("");

  /* STEP 4 – USAGE */
  const [usageAreas, setUsageAreas] = useState([]);
  const [usageInput, setUsageInput] = useState("");

  /* STEP 5 – APPLICATIONS */
  const [applications, setApplications] = useState(["", "", ""]);

  /* STEP 6 – SPECIFICATIONS */
  const [specs, setSpecs] = useState([{ label: "", value: "" }]);

  /* 🔹 Load categories */
  useEffect(() => {
    supabase
      .from("categories")
      .select("id, title")
      .then(({ data }) => setCategories(data || []));
  }, []);

  /* 🔹 Load subcategories */
  useEffect(() => {
    supabase
      .from("subcategories")
      .select("id, title, category_id")
      .then(({ data }) => setSubcategories(data || []));
  }, []);

  /* 🔹 Filter subcategories */
  useEffect(() => {
    if (!categoryId) {
      setFilteredSubcategories([]);
      setSubcategoryId("");
      return;
    }

    const filtered = subcategories.filter(
      (sc) => String(sc.category_id) === String(categoryId)
    );

    setFilteredSubcategories(filtered);
  }, [categoryId, subcategories]);

  /* 🔹 Add usage */
  const addUsage = () => {
    if (!usageInput) return;
      setUsageAreas([...usageAreas, usageInput]);
      setUsageInput("");
    };

    /* 🔹 Add spec */
    const addSpec = () =>
      setSpecs([...specs, { label: "", value: "" }]);

    /* 🔹 Submit */
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

    const { data, error } = await supabase
      .from("products")
      .insert([payload])
      .select();

    if (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
      return;
    }

    Swal.fire("Success", "Product saved successfully", "success")
      .then(() => navigate("/admin/manage-products"));
  };
  useEffect(() => {
  console.log("Category:", categoryId);
  console.log("All Subcategories:", subcategories);
  console.log("Filtered:", filteredSubcategories);
}, [categoryId, filteredSubcategories]);

  return (
    <div className="max-w-4xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

      {/* STEP INDICATOR (SAME AS SUBCATEGORY) */}
      <div className="relative mb-12">
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />
        <div
          className="absolute top-4 left-0 h-[2px] bg-lime-500 transition-all"
          style={{
            width:
              step === 1 ? "0%" :
              step === 2 ? "20%" :
              step === 3 ? "40%" :
              step === 4 ? "60%" :
              step === 5 ? "80%" : "100%",
          }}
        />

        <div className="relative flex justify-between">
          {["Category", "Hero", "Overview", "Usage", "Images", "Specs"].map(
            (label, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold
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
          <select className="input" value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>

          <select className="input" value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            disabled={!categoryId}>
            <option value="">Select Subcategory</option>
            {filteredSubcategories.map(sc => (
              <option key={sc.id} value={sc.id}>{sc.title}</option>
            ))}
          </select>

          <div className="flex justify-end">
            <button
              disabled={!subcategoryId}
              onClick={() => setStep(2)}
              className="btn-primary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 – HERO */}
      {step === 2 && (
        <div className="space-y-4">
          <input className="input" placeholder="Product Name"
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(generateSlug(e.target.value));
            }} />

          <input className="input" placeholder="Slug" value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(generateSlug(e.target.value));
            }} />

          <input className="input" placeholder="Subtitle"
            onChange={(e) => setSubtitle(e.target.value)} />

          <input className="input" placeholder="Hero Image URL"
            onChange={(e) => setHeroImage(e.target.value)} />

          <div className="flex justify-between">
            <button onClick={() => setStep(1)}>Back</button>
            <button
              disabled={!name || !slug}
              onClick={() => setStep(3)}
              className="btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 – OVERVIEW */}
      {step === 3 && (
        <div className="space-y-4">
          <textarea className="input" rows={4}
            placeholder="Overview"
            onChange={(e) => setOverview(e.target.value)} />

          <input className="input" placeholder="Overview Image URL"
            onChange={(e) => setOverviewImage(e.target.value)} />

          <div className="flex justify-between">
            <button onClick={() => setStep(2)}>Back</button>
            <button onClick={() => setStep(4)} className="btn-primary">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 – USAGE */}
      {step === 4 && (
        <div className="space-y-4">
          <input className="input" placeholder="Usage Area"
            value={usageInput}
            onChange={(e) => setUsageInput(e.target.value)} />

          <button onClick={addUsage} className="btn-secondary">
            Add Usage
          </button>

          <ul className="list-disc ml-6">
            {usageAreas.map((u, i) => <li key={i}>{u}</li>)}
          </ul>

          <div className="flex justify-between">
            <button onClick={() => setStep(3)}>Back</button>
            <button onClick={() => setStep(5)} className="btn-primary">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 – IMAGES */}
      {step === 5 && (
        <div className="space-y-4">
          {applications.map((_, i) => (
            <input key={i} className="input"
              placeholder={`Application Image ${i + 1}`}
              onChange={(e) => {
                const copy = [...applications];
                copy[i] = e.target.value;
                setApplications(copy);
              }} />
          ))}

          <div className="flex justify-between">
            <button onClick={() => setStep(4)}>Back</button>
            <button onClick={() => setStep(6)} className="btn-primary">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 – SPECS */}
      {step === 6 && (
        <div className="space-y-4">
          {specs.map((s, i) => (
            <div key={i} className="flex gap-3">
              <input className="input" placeholder="Label"
                onChange={(e) => {
                  const copy = [...specs];
                  copy[i].label = e.target.value;
                  setSpecs(copy);
                }} />
              <input className="input" placeholder="Value"
                onChange={(e) => {
                  const copy = [...specs];
                  copy[i].value = e.target.value;
                  setSpecs(copy);
                }} />
            </div>
          ))}

          <button onClick={addSpec} className="btn-secondary">
            + Add Specification
          </button>

          <div className="flex justify-between">
            <button onClick={() => setStep(5)}>Back</button>
            <button onClick={submit} className="btn-primary">
              Save Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
