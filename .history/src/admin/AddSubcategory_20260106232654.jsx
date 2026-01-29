import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const AddSubcategory = () => {
  const [step, setStep] = useState(1);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    supabase
      .from("categories")
      .select("id, title")
      .then(({ data }) => setCategories(data || []));
  }, []);

  const submit = async () => {
    const { error } = await supabase.from("subcategories").insert([
      {
        category_id: categoryId,
        title,
        slug,
        description,
        image,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Subcategory added successfully!");
    setCategoryId("");
    setTitle("");
    setSlug("");
    setDescription("");
    setImage("");
    setStep(1);
  };

  return (
    <div className="max-w-3xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Add Subcategory</h2>

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between mb-12">

        {[1, 2, 3].map((s, index) => (
          <div key={s} className="flex-1 flex items-center">

            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold
                ${
                  step >= s
                    ? "bg-lime-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>

              <span
                className={`mt-2 text-xs font-medium ${
                  step >= s ? "text-lime-600" : "text-gray-400"
                }`}
              >
                {s === 1 && "Category"}
                {s === 2 && "Details"}
                {s === 3 && "Image"}
              </span>
            </div>

            {index !== 2 && (
              <div
                className={`flex-1 h-[2px] mx-2 ${
                  step > s ? "bg-lime-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}

      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Category</h3>

          <select
            className="w-full border px-4 py-2 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!categoryId}
              className="bg-lime-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subcategory Details</h3>

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Subcategory Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Slug (italian-marble)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <textarea
            className="w-full border px-4 py-2 rounded"
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              disabled={!title || !slug}
              className="bg-lime-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subcategory Image</h3>

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-gray-500 hover:underline"
            >
              Back
            </button>

            <button
              onClick={submit}
              className="bg-lime-500 text-white px-6 py-2 rounded"
            >
              Save Subcategory
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubcategory;
