
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import * as adminAPI from "@/api/admin";
import { toast } from "@/components/ui/use-toast";

// Admin panel components
import { OrderManagement } from "@/components/admin/OrderManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { DiscountManagement } from "@/components/admin/DiscountManagement";
import { AdminProductAnalytics } from "@/components/admin/AdminProductAnalytics";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();
  
  // Fetch dashboard stats
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      try {
        return await adminAPI.getDashboardStats();
      } catch (error) {
        toast({
          title: "Failed to fetch dashboard stats",
          description: "There was an error loading dashboard data",
          variant: "destructive"
        });
        return { 
          productCount: 0,
          orderCount: 0,
          userCount: 0,
          recentOrders: [],
          popularProducts: []
        };
      }
    }
  });
  
  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === "/admin/products") {
      setActiveTab("products");
    } else if (location.pathname === "/admin/orders") {
      setActiveTab("orders");
    } else if (location.pathname === "/admin/users") {
      setActiveTab("users");
    } else if (location.pathname === "/admin/discounts") {
      setActiveTab("discounts");
    } else {
      setActiveTab("overview");
    }
  }, [location.pathname]);

  // Redirect non-admin users
  if (!isAuthenticated || (user && user.role !== "admin")) {
    return <Navigate to="/" />;
  }

  // Get stats from dashboard data
  const productCount = dashboardStats?.productCount || 0;
  const orderCount = dashboardStats?.orderCount || 0;
  const userCount = dashboardStats?.userCount || 0;
  const recentOrders = dashboardStats?.recentOrders || [];
  const popularProducts = dashboardStats?.popularProducts || [];
  
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
              {statsLoading ? (
                <div className="text-2xl font-bold">Loading...</div>
              ) : (
                <div className="text-2xl font-bold">{productCount}</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-starry-purple">Orders</CardTitle>
              <CardDescription className="text-gray-400">Track customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="text-2xl font-bold">Loading...</div>
              ) : (
                <div className="text-2xl font-bold">{orderCount}</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-starry-purple">Users</CardTitle>
              <CardDescription className="text-gray-400">Active customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="text-2xl font-bold">Loading...</div>
              ) : (
                <div className="text-2xl font-bold">{userCount}</div>
              )}
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
                  {statsLoading ? (
                    <p>Loading recent order data...</p>
                  ) : recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order._id} className="flex justify-between">
                          <div>
                            <div className="font-medium">Order #{order._id.slice(-6)}</div>
                            <div className="text-sm text-gray-400">{order.user.name}</div>
                          </div>
                          <div className="text-right">
                            <div>₹{order.totalPrice}</div>
                            <div className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No recent orders found</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white h-[300px]">
                <CardHeader>
                  <CardTitle>Popular Products</CardTitle>
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <p>Loading popular products...</p>
                  ) : popularProducts.length > 0 ? (
                    <div className="space-y-4">
                      {popularProducts.map((product) => (
                        <div key={product._id} className="flex justify-between">
                          <div className="font-medium truncate" style={{ maxWidth: "200px" }}>{product.name}</div>
                          <div className="text-right">
                            <div>₹{product.price}</div>
                            <div className="text-sm text-gray-400">{product.soldCount} sold</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No popular products found</p>
                  )}
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
