import { NavLink, Outlet } from "react-router-dom";
import { supabase } from "../supabase";

const AdminLayout = () => {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0C3D63] text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-wide">
            ShivDhara
          </h1>
          <p className="text-xs text-white/70 mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">

          {/* DASHBOARD */}
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive ? "bg-lime-500 text-white" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </NavLink>

          {/* CATEGORY */}
          <NavLink
            to="/admin/add-category"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive ? "bg-lime-500 text-white" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <i className="fa-solid fa-layer-group"></i>
            Add Category
          </NavLink>
              <NavLink
                to="/admin/manage-categories"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${isActive ? "bg-lime-500 text-white" : "text-white/80 hover:bg-white/10"}`
                }
              >
                <i className="fa-solid fa-layer-group"></i>
                Manage Categories
              </NavLink>

          {/* SUBCATEGORY */}
          <NavLink
            to="/admin/add-subcategory"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive ? "bg-lime-500 text-white" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <i className="fa-solid fa-diagram-project"></i>
            Add Subcategory
          </NavLink>

          <NavLink
            to="/admin/manage-subcategories"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive ? "bg-lime-500 text-white" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <i className="fa-solid fa-list"></i>
            Manage Subcategories
          </NavLink>

          {/* PRODUCT */}
          <NavLink
            to="/admin/add-product"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive ? "bg-lime-500 text-white" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <i className="fa-solid fa-box"></i>
            Add Product
          </NavLink>

          <NavLink
            to="/admin/manage-products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive ? "bg-lime-500 text-white" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <i className="fa-solid fa-list"></i>
            Manage Products
          </NavLink>

        </nav>


        <div className="px-6 py-6 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-300 hover:text-red-400 transition"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
