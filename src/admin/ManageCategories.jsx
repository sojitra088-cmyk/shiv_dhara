import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  const isActionLoading = (type, id) => actionLoading === `${type}-${id}`;

  const fetchCategories = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select(`
        id,
        title,
        slug,
        image,
        subcategories (
          id,
          products ( id )
        )
      `)
      .order("id");

    if (!error && data) {
      const formatted = data.map((cat) => ({
        ...cat,
        subCount: cat.subcategories?.length || 0,
        productCount: (cat.subcategories || []).reduce(
          (sum, sub) => sum + (sub.products?.length || 0),
          0
        ),
      }));

      setCategories(formatted);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (category) => {
    if (category.subCount > 0) {
      Swal.fire({
        icon: "warning",
        title: "Cannot delete",
        text: "Delete subcategories first.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `${category.title} will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setActionLoading(`delete-${category.id}`);

    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", category.id);

      if (error) throw error;

      setCategories((prev) => prev.filter((cat) => cat.id !== category.id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Category has been deleted.",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setActionLoading("");
    }
  };

  const editCategory = (category) => {
    setActionLoading(`edit-${category.id}`);
    navigate(`/admin/add-category?id=${category.id}`);
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Categories</h2>

        <button
          onClick={() => navigate("/admin/add-category")}
          className="bg-lime-500 text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          + Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Subcategories</th>
              <th className="p-3 text-center">Products</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-100 rounded-lg" />
                  )}
                </td>

                <td className="p-3">
                  <p className="font-medium">{cat.title}</p>
                  <p className="text-xs text-gray-500">{cat.slug}</p>
                </td>

                <td className="p-3 text-center font-semibold">
                  {cat.subCount}
                </td>

                <td className="p-3 text-center font-semibold">
                  {cat.productCount}
                </td>

                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() => editCategory(cat)}
                    disabled={Boolean(actionLoading)}
                    className="text-blue-600 hover:underline disabled:opacity-50"
                  >
                    {isActionLoading("edit", cat.id) ? "Opening..." : "Edit"}
                  </button>

                  <button
                    onClick={() => deleteCategory(cat)}
                    disabled={Boolean(actionLoading)}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {isActionLoading("delete", cat.id) ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <p className="text-gray-500 text-center py-6">No categories found</p>
        )}
      </div>
    </div>
  );
};

export default ManageCategories;

