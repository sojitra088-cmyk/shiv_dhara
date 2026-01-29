import { useState } from "react";
import { supabase } from "../supabase";

const AddCategory = () => {
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
    else alert("Category added!");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add Category</h1>

      <input className="input" placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input className="input" placeholder="Slug" onChange={e => setSlug(e.target.value)} />
      <input className="input" placeholder="Subtitle" onChange={e => setSubtitle(e.target.value)} />
      <textarea className="input" placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input className="input" placeholder="Image URL" onChange={e => setImage(e.target.value)} />

      <button onClick={submit} className="btn-primary mt-4">
        Save Category
      </button>
    </div>
  );
};

export default AddCategory;

