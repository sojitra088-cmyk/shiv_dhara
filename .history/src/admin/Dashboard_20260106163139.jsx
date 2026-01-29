const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Categories</p>
          <h2 className="text-3xl font-bold">—</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-3xl font-bold">—</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Last Updated</p>
          <h2 className="text-lg font-semibold">—</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
