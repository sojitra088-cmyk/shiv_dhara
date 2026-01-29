const [showAdd, setShowAdd] = useState(false);

const [title, setTitle] = useState("");
const [slug, setSlug] = useState("");
const [subtitle, setSubtitle] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState("");

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select(`
        id,
        title,
        slug,
        subcategories (
          id,
          products ( id )
        )
      `)
      .order("id");

    if (!error) {
      const formatted = data.map((cat) => ({
        ...cat,
        subCount: cat.subcategories.length,
        productCount: cat.subcategories.reduce(
          (sum, sub) => sum + sub.products.length,
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

  const deleteCategory = async (id) => {
    if (!confirm("Delete this category? All subcategories & products will be removed.")) return;

    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Manage Categories</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
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
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No categories found
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
