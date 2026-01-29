import { useState } from "react";
import { supabase } from "../supabase";

const AddCategory = () => {
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const submit = async () => {
    const { error } = await supabase.from("categories").insert([
      { title, slug, subtitle, description, image },
    ]);

    if (error) alert(error.message);
    else {
      alert("Category added successfully!");
      setTitle("");
      setSlug("");
      setSubtitle("");
      setDescription("");
      setImage("");
      setStep(1);
    }
  };

  return (
    <div className="max-w-3xl bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-semibold mb-6">
        Add Category
      </h1>

      {/* STEP INDICATOR */}
      <div className="flex items-center gap-4 mb-10">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex items-center gap-2 ${
              step === s ? "text-lime-600 font-semibold" : "text-gray-400"
            }`}
          >
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full border
                ${step === s ? "border-lime-500" : "border-gray-300"}
              `}
            >
              {s}
            </span>
            Step {s}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Category Details
          </h2>

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Category Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Slug (e.g. marble)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!title || !slug}
              className="btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Subtitle & Description
          </h2>

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <textarea
            className="w-full border px-4 py-2 rounded"
            rows={4}
            placeholder="Category Description"
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
              className="btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Category Image
          </h2>

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
              className="btn-primary"
            >
              Save Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
