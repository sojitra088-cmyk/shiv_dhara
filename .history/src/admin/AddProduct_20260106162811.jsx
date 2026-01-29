import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    supabase.from("subcategories").select("*")
      .then(({ data }) => setSubcategories(data));
  }, []);

  const submit = async () => {
    const { error } = await supabase.from("products").insert([
      { name, slug, subcategory_id: subcategoryId },
    ]);

    if (error) alert(error.message);
    else alert("Product added!");
  };

  return (
    <div>
      <h1 className="text-2xl mb-6">Add Product</h1>

      <input className="input" placeholder="Name" onChange={e => setName(e.target.value)} />
      <input className="input" placeholder="Slug" onChange={e => setSlug(e.target.value)} />

      <select className="input" onChange={e => setSubcategoryId(e.target.value)}>
        <option>Select Subcategory</option>
        {subcategories.map(sc => (
          <option key={sc.id} value={sc.id}>{sc.title}</option>
        ))}
      </select>

      <button onClick={submit} className="btn-primary mt-4">
        Save Product
      </button>
    </div>
  );
};

export default AddProduct;

