import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const ManageSubcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubcategories = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("subcategories")
      .select(`
        id,
        title,
        slug,
        categories ( title ),
        products ( id )
      `)
      .order("id");

    if (!error) {
      const formatted = data.map((sub) => ({
        ...sub,
        productCount: sub.products.length,
      }));

      setSubcategories(formatted);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const deleteSubcategory = async (id, productCount) => {
    if (productCount > 0) {
      alert("Please delete products under this subcategory first.");
      return;
    }

    if (!confirm("Delete this subcategory?")) return;

    await supabase.from("subcategories").delete().eq("id", id);
    fetchSubcategories();
  };

  if (loading) return <p>Loading subcategories...</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        Manage Subcategories
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Subcategory</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Products</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subcategories.map((sub) => (
              <tr key={sub.id} className="border-t">
                <td className="p-3">
                  <p className="font-medium">{sub.title}</p>
                  <p className="text-xs text-gray-500">{sub.slug}</p>
                </td>

                <td className="p-3">
                  {sub.categories?.title || "—"}
                </td>

                <td className="p-3 text-center font-semibold">
                  {sub.productCount}
                </td>

                <td className="p-3 text-right space-x-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteSubcategory(sub.id, sub.productCount)
                    }
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {subcategories.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No subcategories found
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageSubcategories;
