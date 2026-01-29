import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const AddSubcategory = () => {
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

  const submit = async (e) => {
    e.preventDefault();

    await supabase.from("subcategories").insert([
      {
        category_id: categoryId,
        title,
        slug,
        description,
        image,
      },
    ]);

    alert("Subcategory added");
    setTitle("");
    setSlug("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Add Subcategory</h2>

      <form onSubmit={submit} className="space-y-4">
        <select
          required
          className="w-full border px-4 py-2 rounded"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          placeholder="Subcategory Title"
          className="w-full border px-4 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Slug (auto or manual)"
          className="w-full border px-4 py-2 rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border px-4 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Image URL"
          className="w-full border px-4 py-2 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="bg-lime-500 text-white px-6 py-2 rounded">
          Save Subcategory
        </button>
      </form>
    </div>
  );
};

export default AddSubcategory;
