import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // base: "/shiv_dhara/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          admin: [
            './src/admin/AdminLogin.jsx',
            './src/admin/AdminLayout.jsx',
            './src/admin/Dashboard.jsx',
            './src/admin/AddCategory.jsx',
            './src/admin/AddProduct.jsx',
            './src/admin/ManageProducts.jsx',
            './src/admin/AddSubcategory.jsx',
            './src/admin/ManageSubcategories.jsx',
            './src/admin/ManageCategories.jsx',
            './src/admin/AdminContacts.jsx',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
