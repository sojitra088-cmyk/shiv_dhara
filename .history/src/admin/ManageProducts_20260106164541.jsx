import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          subcategories (
            categories ( title )
          )
        `)
        .order("created_at", { ascending: false });

      if (!error) setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirm = window.confirm("Delete this product?");
    if (!confirm) return;

    await supabase.from("products").delete().eq("id", id);
    setProducts(products.filter(p => p.id !== id));
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <Link
          to="/admin/add-product"
          className="bg-lime-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3">Product</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4">
                  {p.subcategories?.categories?.title || "—"}
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="p-6 text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
