
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  
  // Redirect to login if not authenticated
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <h1 className="font-bold text-xl">MPARTS Admin</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-3 text-xs uppercase font-bold text-gray-500">
            Management
          </div>
          <a href="/admin" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
            Dashboard
          </a>
          <a href="/admin/products" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
            Products
          </a>
          <a href="/admin/orders" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
            Orders
          </a>
          <a href="/admin/customers" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
            Customers
          </a>
        </nav>
      </div>
      {/* Admin Content */}
      <div className="flex-1 flex flex-col">
        {/* Admin Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-3">
            <h2 className="text-xl font-semibold">Admin Panel</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <Button variant="outline" size="sm" onClick={signOut} className="flex items-center gap-1">
                <LogOut size={16} /> Logout
              </Button>
            </div>
          </div>
        </header>
        {/* Admin Page Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
