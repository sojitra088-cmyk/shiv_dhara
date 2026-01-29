import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Dashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: catCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });

      const { count: prodCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      setStats({
        categories: catCount || 0,
        products: prodCount || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your store content
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Categories"
          value={stats.categories}
          icon="fa-layer-group"
        />
        <StatCard
          title="Total Products"
          value={stats.products}
          icon="fa-box"
        />
        <StatCard
          title="Status"
          value="Live"
          icon="fa-circle-check"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">
          {title}
        </p>
        <h2 className="text-3xl font-bold text-gray-900">
          {value}
        </h2>
      </div>
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 text-lime-600">
        <i className={`fa-solid ${icon}`}></i>
      </div>
    </div>
  </div>
);

export default Dashboard;
