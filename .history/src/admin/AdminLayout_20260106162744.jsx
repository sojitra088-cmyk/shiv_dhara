import { Link, Outlet } from "react-router-dom";
import { supabase } from "../supabase";

const AdminLayout = () => {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0C3D63] text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/add-category">Add Category</Link>
          <Link to="/admin/add-product">Add Product</Link>
          <Link to="/admin/manage-products">Manage Products</Link>
        </nav>

        <button
          onClick={logout}
          className="mt-10 text-sm text-red-300"
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
