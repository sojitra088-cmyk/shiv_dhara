import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");

  const isActionLoading = (type, id) => actionLoading === `${type}-${id}`;

  const viewProduct = async (id) => {
    setViewLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        hero_subtitle,
        overview,
        subcategories (
          title,
          categories ( title )
        ),
        product_images ( image_url, image_type ),
        product_usage ( usage_title ),
        product_finishes ( finish_name ),
        product_specifications ( spec_key, spec_value )
      `)
      .eq("id", id)
      .single();

    if (!error) setSelectedProduct(data);
    setViewLoading(false);
  };

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
          ),
          product_images (
            image_url,
            image_type
          )
        `)
        .order("created_at", { ascending: false });

      if (!error) setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (product) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `${product.name} will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setActionLoading(`delete-${product.id}`);

    try {
      const childTables = [
        "product_images",
        "product_usage",
        "product_specifications",
        "product_finishes",
      ];

      for (const table of childTables) {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq("product_id", product.id);

        if (error) throw error;
      }

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;

      setProducts((prev) => prev.filter((p) => p.id !== product.id));

      Swal.fire({
        title: "Deleted!",
        text: "Product deleted successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setActionLoading("");
    }
  };

  const editProduct = (product) => {
    setActionLoading(`edit-${product.id}`);
    navigate(`/admin/add-product?id=${product.id}`);
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
              <th className="text-left px-6 py-3">Image</th>
              <th className="text-left px-6 py-3">Product</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => {
              const productImage =
                p.product_images?.find((img) => img.image_type === "product")
                  ?.image_url ||
                p.product_images?.find((img) => img.image_type === "hero")
                  ?.image_url ||
                "/placeholder.jpg";

              return (
                <tr key={p.id} className="border-t">
                  <td className="px-6 py-4">
                    <img
                      src={productImage}
                      alt={p.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">{p.name}</td>

                  <td className="px-6 py-4">
                    {p.subcategories?.categories?.title || "-"}
                  </td>

                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      onClick={() => viewProduct(p.id)}
                      disabled={Boolean(actionLoading)}
                      className="text-green-600 hover:underline disabled:opacity-50"
                    >
                      View
                    </button>

                    <button
                      onClick={() => editProduct(p)}
                      disabled={Boolean(actionLoading)}
                      className="text-blue-600 hover:underline disabled:opacity-50"
                    >
                      {isActionLoading("edit", p.id) ? "Opening..." : "Edit"}
                    </button>

                    <button
                      onClick={() => deleteProduct(p)}
                      disabled={Boolean(actionLoading)}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      {isActionLoading("delete", p.id) ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
            <div className="bg-white max-w-5xl w-full rounded-2xl shadow-xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-black text-xl"
                >
                  x
                </button>
              </div>

              {viewLoading ? (
                <p className="p-6">Loading...</p>
              ) : (
                <div className="p-6 space-y-8">
                  <div>
                    <p><strong>Category:</strong> {selectedProduct.subcategories?.categories?.title}</p>
                    <p><strong>Subcategory:</strong> {selectedProduct.subcategories?.title}</p>
                    <p className="mt-2 text-gray-600">{selectedProduct.hero_subtitle}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Overview</h3>
                    <p className="text-gray-600">{selectedProduct.overview}</p>
                  </div>

                  <div className="space-y-6">
                    {["hero", "product", "gallery"].map((type) => {
                      const imgs = selectedProduct.product_images.filter(
                        (i) => i.image_type === type
                      );

                      if (!imgs.length) return null;

                      return (
                        <div key={type}>
                          <h4 className="font-semibold capitalize mb-3">
                            {type} Images
                          </h4>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {imgs.map((img, i) => (
                              <img
                                key={i}
                                src={img.image_url}
                                alt={`${selectedProduct.name} ${type}`}
                                className="rounded-xl h-40 w-full object-cover border"
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Usage Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.product_usage.map((u, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {u.usage_title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Finishes</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.product_finishes.map((f, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-lime-100 text-lime-800 rounded-full text-sm"
                        >
                          {f.finish_name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Specifications</h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      {selectedProduct.product_specifications.map((s, i) => (
                        <div key={i} className="flex justify-between border-b pb-1">
                          <span className="text-gray-500">{s.spec_key}</span>
                          <span className="font-medium">{s.spec_value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {products.length === 0 && (
          <p className="p-6 text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;

