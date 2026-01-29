import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageSubcategories = () => {
  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    // Categories for filter
    const { data: cats } = await supabase
      .from("categories")
      .select("id, title");

    setCategories(cats || []);

    // Subcategories with products
    const { data, error } = await supabase
      .from("subcategories")
      .select(`
        id,
        title,
        slug,
        image,
        categories ( id, title ),
        products ( id, name )
      `)
      .order("id");

    if (!error) setSubcategories(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteSubcategory = async (id, productCount) => {
    if (productCount > 0) {
      Swal.fire({
        icon: "warning",
        title: "Cannot delete",
        text: "Please delete products under this subcategory first.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This subcategory will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16", // lime
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase
      .from("subcategories")
      .delete()
      .eq("id", id);

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Subcategory has been deleted.",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchData();
  };

  const editSubcategory = (id) => {
    navigate(`/admin/edit-subcategory/${id}`);
  };

  const filtered =
    selectedCategory === "All"
      ? subcategories
      : subcategories.filter(
          (s) => s.categories?.id === Number(selectedCategory)
        );

  if (loading) return <p>Loading subcategories...</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Manage Subcategories
        </h2>

        <button
          onClick={() => navigate("/admin/add-subcategory")}
          className="bg-lime-500 text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          + Add Subcategory
        </button>
      </div>

      {/* FILTER */}
      <div className="mb-6">
        <select
          className="border px-4 py-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Subcategory</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Products</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((sub) => {
              const isOpen = expanded === sub.id;

              return (
                <>
                  <tr key={sub.id} className="border-t">
                    <td className="p-3">
                      {sub.image ? (
                        <img
                          src={sub.image}
                          alt={sub.title}
                          className="w-14 h-14 rounded-lg object-cover border"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-100 rounded-lg" />
                      )}
                    </td>

                    <td className="p-3">
                      <p className="font-medium">{sub.title}</p>
                      <p className="text-xs text-gray-500">
                        {sub.slug}
                      </p>
                    </td>

                    <td className="p-3">
                      {sub.categories?.title || "—"}
                    </td>

                    <td className="p-3 text-center font-semibold">
                      {sub.products.length}
                    </td>

                    <td className="p-3 text-right space-x-3">
                      <button
                        onClick={() =>
                          setExpanded(isOpen ? null : sub.id)
                        }
                        className="text-gray-600 hover:underline"
                      >
                        {isOpen ? "Hide" : "View"}
                      </button>

                      <button
  onClick={() =>
    navigate(`/admin/add-subcategory?id=${sub.id}`)
  }
  className="text-blue-600 hover:underline"
>
  Edit
</button>


                      <button
                        onClick={() =>
                          deleteSubcategory(sub.id, sub.products.length)
                        }
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* EXPANDED PRODUCTS */}
                  {isOpen && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="p-4">
                        {sub.products.length === 0 ? (
                          <p className="text-gray-500">
                            No products in this subcategory.
                          </p>
                        ) : (
                          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {sub.products.map((p) => (
                              <li
                                key={p.id}
                                className="border px-3 py-2 rounded text-sm bg-white"
                              >
                                {p.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No subcategories found
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageSubcategories;
