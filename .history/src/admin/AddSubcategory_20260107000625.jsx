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

const AddSubcategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id"); // 👈 detect edit mode
  const isEdit = Boolean(editId);

  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  /* 🔹 Load categories */
  useEffect(() => {
    supabase
      .from("categories")
      .select("id, title")
      .then(({ data }) => setCategories(data || []));
  }, []);

  /* 🔹 Load subcategory (EDIT MODE) */
  useEffect(() => {
    if (!isEdit) return;

    const fetchSubcategory = async () => {
      const { data, error } = await supabase
        .from("subcategories")
        .select("*")
        .eq("id", editId)
        .single();

      if (error) {
        Swal.fire("Error", error.message, "error");
        return;
      }

      setCategoryId(data.category_id);
      setTitle(data.title);
      setSlug(data.slug);
      setDescription(data.description || "");
      setImage(data.image || "");

      setStep(2); // ✅ IMPORTANT FIX
    };

    fetchSubcategory();
  }, [editId, isEdit]);


  /* 🔹 Submit (ADD / UPDATE) */
  const submit = async () => {
  // 🔒 Slug validation
  const unique = await isSlugUnique();
    if (!unique) {
      Swal.fire({
        icon: "warning",
        title: "Slug already exists",
        text: "Please use a different slug.",
      });
      return;
    }

    const payload = {
      category_id: categoryId,
      title,
      slug,
      description,
      image,
    };

    const { error } = isEdit
      ? await supabase
          .from("subcategories")
          .update(payload)
          .eq("id", editId)
      : await supabase
          .from("subcategories")
          .insert([payload]);

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }
    if (!categoryId) {
  Swal.fire({
    icon: "warning",
    title: "Missing Category",
    text: "Please select a category.",
  });
  setStep(1);
  return;
}

    Swal.fire({
      icon: "success",
      title: isEdit ? "Updated!" : "Added!",
      text: `Subcategory ${isEdit ? "updated" : "added"} successfully`,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/admin/manage-subcategories");
    });
  };

  const isSlugUnique = async () => {
  let query = supabase
    .from("subcategories")
    .select("id")
    .eq("slug", slug);

  if (isEdit) {
    query = query.neq("id", editId); // ignore current record
  }

  const { data } = await query;
  return data.length === 0;
};

  return (
    <div className="max-w-3xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? "Edit Subcategory" : "Add Subcategory"}
      </h2>

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
              {isEdit ? "Update Subcategory" : "Save Subcategory"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubcategory;
