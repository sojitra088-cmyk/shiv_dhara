import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
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
        `);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const formatted = data.map((cat) => {
        const subcategoryCount = cat.subcategories.length;
        const productCount = cat.subcategories.reduce(
          (total, sub) => total + sub.products.length,
          0
        );

        return {
          id: cat.id,
          title: cat.title,
          subcategories: subcategoryCount,
          products: productCount,
        };
      });

      setStats(formatted);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {item.title}
            </h2>

            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Total Subcategories</p>
                <p className="text-2xl font-bold">
                  {item.subcategories}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Total Products</p>
                <p className="text-2xl font-bold">
                  {item.products}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
