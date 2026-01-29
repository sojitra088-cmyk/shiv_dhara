import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  /* STEP 1 */
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  /* STEP 2 */
  const [overview, setOverview] = useState("");
  const [overviewImage, setOverviewImage] = useState("");

  /* STEP 3 */
  const [usageAreas, setUsageAreas] = useState([]);
  const [usageInput, setUsageInput] = useState("");

  /* STEP 4 */
  const [applications, setApplications] = useState(["", "", ""]);

  /* STEP 5 */
  const [specs, setSpecs] = useState([
    { label: "Origin", value: "" },
  ]);

  /* Load subcategories */
  useEffect(() => {
    supabase
      .from("subcategories")
      .select("id, title")
      .then(({ data }) => setSubcategories(data || []));
  }, []);

  /* Add usage */
  const addUsage = () => {
    if (!usageInput) return;
    setUsageAreas([...usageAreas, usageInput]);
    setUsageInput("");
  };

  /* Add spec row */
  const addSpec = () =>
    setSpecs([...specs, { label: "", value: "" }]);

  /* Submit */
  const submit = async () => {
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
      subcategory_id: subcategoryId,
    };

    const { error } = await supabase
      .from("products")
      .insert([payload]);

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    Swal.fire("Success", "Product added successfully", "success")
      .then(() => navigate("/admin/manage-products"));
  };

  return (
    <div className="max-w-4xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-8">Add Product</h2>

      {/* STEP INDICATOR */}
      <div className="flex justify-between mb-10">
        {["Hero", "Overview", "Usage", "Applications", "Specs"].map(
          (s, i) => (
            <div
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
              ${step >= i + 1 ? "bg-lime-500 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </div>
          )
        )}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <input className="input" placeholder="Product Name"
            onChange={(e) => {
              setName(e.target.value);
              setSlug(generateSlug(e.target.value));
            }} />

          <input className="input" placeholder="Slug" value={slug} />

          <input className="input" placeholder="Subtitle"
            onChange={(e) => setSubtitle(e.target.value)} />

          <input className="input" placeholder="Hero Image URL"
            onChange={(e) => setHeroImage(e.target.value)} />

          {/* CATEGORY */}
          <select
            className="input"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          {/* SUBCATEGORY */}
          <select
            className="input"
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            disabled={!categoryId}
          >
            <option value="">Select Subcategory</option>
            {filteredSubcategories.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.title}
              </option>
            ))}
          </select>


          <button onClick={() => setStep(2)}
            className="btn-primary">Next</button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <textarea className="input" rows={4}
            placeholder="Overview"
            onChange={(e) => setOverview(e.target.value)} />

          <input className="input" placeholder="Overview Image URL"
            onChange={(e) => setOverviewImage(e.target.value)} />

          <div className="flex justify-between">
            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={() => setStep(3)} className="btn-primary">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <input className="input"
            placeholder="Usage Area"
            value={usageInput}
            onChange={(e) => setUsageInput(e.target.value)} />

          <button onClick={addUsage} className="btn-secondary">
            Add Usage
          </button>

          <ul className="list-disc ml-6">
            {usageAreas.map((u, i) => <li key={i}>{u}</li>)}
          </ul>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)}>Back</button>
            <button onClick={() => setStep(4)} className="btn-primary">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="space-y-4">
          {applications.map((img, i) => (
            <input key={i} className="input"
              placeholder={`Application Image ${i + 1}`}
              onChange={(e) => {
                const copy = [...applications];
                copy[i] = e.target.value;
                setApplications(copy);
              }} />
          ))}

          <div className="flex justify-between">
            <button onClick={() => setStep(3)}>Back</button>
            <button onClick={() => setStep(5)} className="btn-primary">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <div className="space-y-4">
          {specs.map((s, i) => (
            <div key={i} className="flex gap-3">
              <input className="input"
                placeholder="Label"
                onChange={(e) => {
                  const copy = [...specs];
                  copy[i].label = e.target.value;
                  setSpecs(copy);
                }} />

              <input className="input"
                placeholder="Value"
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
            <button onClick={() => setStep(4)}>Back</button>
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
