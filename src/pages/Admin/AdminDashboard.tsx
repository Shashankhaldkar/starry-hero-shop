
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserManagement } from "@/components/admin/UserManagement";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { DiscountManagement } from "@/components/admin/DiscountManagement";
import AdminProductAnalytics from "@/components/admin/AdminProductAnalytics";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  // Redirect if not admin
  React.useEffect(() => {
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
    <div className="min-h-screen bg-admin-black text-admin-white">
      {/* Header */}
      <header className="bg-admin-darkGrey py-4 px-6 border-b border-admin-grey/30 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="text-admin-white mr-2 hover:bg-admin-black/10"
            onClick={() => navigate('/')}
          >
            Back to Site
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold text-center admin-text-gradient">
          Admin Dashboard
        </h1>
        
        <div>
          <Button 
            variant="destructive" 
            className="bg-red-900 hover:bg-red-800" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-admin-darkGrey border border-admin-grey/30 p-1 rounded-lg mb-8 grid grid-cols-4">
              <TabsTrigger 
                value="products" 
                className="text-admin-white data-[state=active]:bg-admin-black"
              >
                Products
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="text-admin-white data-[state=active]:bg-admin-black"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="text-admin-white data-[state=active]:bg-admin-black"
              >
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="discounts" 
                className="text-admin-white data-[state=active]:bg-admin-black"
              >
                Discounts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="pt-2">
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
