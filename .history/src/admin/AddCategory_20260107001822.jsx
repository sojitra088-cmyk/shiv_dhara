import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

/* 🔹 Slug generator */
const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AddCategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id"); // 👈 edit mode
  const isEdit = Boolean(editId);

  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  /* 🔹 LOAD CATEGORY (EDIT MODE) */
  useEffect(() => {
    if (!isEdit) return;

    const fetchCategory = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", editId)
        .single();

      if (error) {
        Swal.fire("Error", error.message, "error");
        return;
      }

      setTitle(data.title);
      setSlug(data.slug);
      setSubtitle(data.subtitle || "");
      setDescription(data.description || "");
      setImage(data.image || "");
      setStep(1);
    };

    fetchCategory();
  }, [editId, isEdit]);

  /* 🔹 SUBMIT (ADD / UPDATE) */
  const submit = async () => {
    if (!title || !slug) {
      Swal.fire("Missing Fields", "Title & slug are required", "warning");
      setStep(1);
      return;
    }

    const payload = {
      title,
      slug,
      subtitle,
      description,
      image,
    };

    const { error } = isEdit
      ? await supabase
          .from("categories")
          .update(payload)
          .eq("id", editId)
      : await supabase
          .from("categories")
          .insert([payload]);

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    Swal.fire({
      icon: "success",
      title: isEdit ? "Category Updated" : "Category Added",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/admin/manage-categories");
    });
  };

  return (
    <div className="max-w-3xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? "Edit Category" : "Add Category"}
      </h2>

      {/* STEP INDICATOR */}
      <div className="relative mb-12">
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />

        <div
          className="absolute top-4 left-0 h-[2px] bg-lime-500 transition-all duration-300"
          style={{
            width:
              step === 1 ? "0%" :
              step === 2 ? "50%" :
              "100%",
          }}
        />

        <div className="relative flex justify-between">
          {[
            { id: 1, label: "Basic" },
            { id: 2, label: "Details" },
            { id: 3, label: "Image" },
          ].map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold
                ${step >= item.id
                  ? "bg-lime-500 text-white"
                  : "bg-gray-200 text-gray-500"}`}
              >
                {item.id}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step >= item.id ? "text-lime-600" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Category Name</h3>

          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Category Name"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              if (!slugTouched && !isEdit)
                setSlug(generateSlug(value));
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

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!title || !slug}
              className="bg-lime-500 text-white px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subtitle & Description</h3>

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
              className="bg-lime-500 text-white px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Category Image</h3>

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
              {isEdit ? "Update Category" : "Save Category"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
