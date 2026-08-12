import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate, useSearchParams } from "react-router-dom";
import ImageUploader from "../components/ImageUpload";
import PageLoader from "../components/PageLoader";
import { deleteStorageFile } from "../utils/supabaseHelpers";
import { generateSlug } from "../utils/slug";
import { toastSuccess, toastError, toastWarning } from "../components/Toast";

const AddCategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const isEdit = Boolean(editId);

  const [step, setStep] = useState(1);
  const [formLoading, setFormLoading] = useState(isEdit);
  const [pageLoading, setPageLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [initialImage, setInitialImage] = useState("");

  const isSlugUnique = async () => {
    let query = supabase
      .from("categories")
      .select("id")
      .eq("slug", slug);

    if (isEdit) query = query.neq("id", editId);

    const { data, error } = await query;
    if (error) return false;

    return data.length === 0;
  };

  useEffect(() => {
    if (!isEdit) {
      setPageLoading(false);
      return;
    }

    const fetchCategory = async () => {
      setFormLoading(true);
      setPageLoading(true);

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", editId)
        .single();

      if (error) {
        toastError("Failed to load category", error.message || "Please try again.");
        setFormLoading(false);
        setPageLoading(false);
        return;
      }

      setTitle(data.title);
      setSlug(data.slug);
      setSubtitle(data.subtitle || "");
      setDescription(data.description || "");
      setImage(data.image || "");
      setInitialImage(data.image || "");
      setStep(1);
      setFormLoading(false);
      setPageLoading(false);
    };

    fetchCategory();
  }, [editId, isEdit]);

  const submit = async () => {
    setSaving(true);

    if (!title || !slug) {
      toastWarning("Missing fields", "Category name and slug are required.");
      setStep(1);
      setSaving(false);
      return;
    }

    if (!image) {
      toastWarning("Image missing", "Please upload a category image.");
      setStep(3);
      setSaving(false);
      return;
    }

    const unique = await isSlugUnique();
    if (!unique) {
      toastWarning("Duplicate slug", "That slug is already in use.");
      setSaving(false);
      return;
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      subtitle: subtitle.trim() || null,
      description: description.trim() || null,
      image: image || null,
    };

    try {
      if (isEdit) {
        if (initialImage && initialImage !== image) {
          try {
            await deleteStorageFile(initialImage);
          } catch (error) {
            console.warn("Failed to delete old category image", error.message);
          }
        }

        const { data, error } = await supabase
          .from("categories")
          .update(payload)
          .eq("id", editId)
          .select()
          .single();

        if (error) throw error;
        toastSuccess("Category updated", `${data.title} has been updated.`);
      } else {
        const { data, error } = await supabase
          .from("categories")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        toastSuccess("Category added", `${data.title} has been created.`);
      }

      navigate("/admin/manage-categories");
    } catch (error) {
      toastError("Save failed", error.message || "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  if (pageLoading) return <PageLoader />;

  return (
    <div className="max-w-3xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? `Edit Category${title ? `: ${title}` : ""}` : "Add Category"}
      </h2>

      {formLoading && <p className="mb-6 text-sm text-gray-500">Loading category...</p>}

      <div className="relative mb-12">
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />

        <div
          className="absolute top-4 left-0 h-[2px] bg-lime-500 transition-all duration-300"
          style={{
            width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
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
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold ${
                  step >= item.id
                    ? "bg-lime-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
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
              if (!slugTouched && !isEdit) setSlug(generateSlug(value));
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
              className="bg-lime-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

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

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Category Image</h3>

          <ImageUploader
            label="Category Image"
            value={image}
            onChange={setImage}
            folder="categories"
          />

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-gray-500 hover:underline"
            >
              Back
            </button>

            <button
              onClick={submit}
              disabled={saving}
              className="bg-lime-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Update Category" : "Save Category"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;

