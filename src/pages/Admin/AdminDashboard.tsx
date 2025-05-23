
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserManagement } from "@/components/admin/UserManagement";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { DiscountManagement } from "@/components/admin/DiscountManagement";
import AdminProductAnalytics from "@/components/admin/AdminProductAnalytics";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabsNavigation } from "@/components/admin/AdminTabsNavigation";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/ui/progress-indicator";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Toaster position="top-right" />
      <ScrollProgress />
      <AdminHeader handleLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <Tabs value={activeTab}>
            <AdminTabsNavigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />

            <TabsContent value="products" className="pt-2">
              <ProductManagement />
            </TabsContent>

            <TabsContent value="analytics" className="pt-2">
              <AdminProductAnalytics />
            </TabsContent>

            <TabsContent value="orders" className="pt-2">
              <OrderManagement />
            </TabsContent>

            <TabsContent value="users" className="pt-2">
              <UserManagement />
            </TabsContent>

            <TabsContent value="discounts" className="pt-2">
              <DiscountManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
