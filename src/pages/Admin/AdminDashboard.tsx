
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight } from "lucide-react";

// Admin panel components
import { OrderManagement } from "@/components/admin/OrderManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { DiscountManagement } from "@/components/admin/DiscountManagement";
import { AdminProductAnalytics } from "@/components/admin/AdminProductAnalytics";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Redirect non-admin users
  if (!isAuthenticated || (user && user.role !== "admin")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-starry-darkPurple to-starry-darkBlue text-white">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6 starry-text-gradient">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-starry-purple">Products</CardTitle>
              <CardDescription className="text-gray-400">Manage your superhero t-shirts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <div className="text-xs text-gray-400 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-400" />
                <span className="text-green-400">+8%</span> from last month
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-starry-purple">Orders</CardTitle>
              <CardDescription className="text-gray-400">Track customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <div className="text-xs text-gray-400 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-400" />
                <span className="text-green-400">+12%</span> from last month
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-starry-purple">Users</CardTitle>
              <CardDescription className="text-gray-400">Active customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">287</div>
              <div className="text-xs text-gray-400 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-400" />
                <span className="text-green-400">+15%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-starry-darkPurple/40 border border-starry-purple/30 rounded-lg p-1 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-starry-purple">
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-starry-purple">
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-starry-purple">
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-starry-purple">
              Users
            </TabsTrigger>
            <TabsTrigger value="discounts" className="data-[state=active]:bg-starry-purple">
              Discounts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white h-[300px]">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Recent order stats and charts will go here</p>
                </CardContent>
              </Card>
              
              <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white h-[300px]">
                <CardHeader>
                  <CardTitle>Popular Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Popular product stats and charts will go here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <AdminProductAnalytics />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="discounts">
            <DiscountManagement />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
