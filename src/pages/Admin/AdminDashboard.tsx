
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import * as adminAPI from "@/api/admin";
import { toast } from "@/components/ui/use-toast";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Tag, 
  ArrowUp, 
  ArrowDown
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  LineChart,
  Line
} from "recharts";

// Admin panel components
import { OrderManagement } from "@/components/admin/OrderManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { DiscountManagement } from "@/components/admin/DiscountManagement";
import { AdminProductAnalytics } from "@/components/admin/AdminProductAnalytics";
import { Header } from "@/components/Header";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();
  
  // Fetch dashboard stats
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      try {
        const data = await adminAPI.getDashboardStats();
        console.log("Dashboard data:", data);
        return data;
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        toast({
          title: "Failed to fetch dashboard stats",
          description: "Please check your connection and try again.",
          variant: "destructive"
        });
        return null;
      }
    },
    retry: 1,
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

  // Customer growth data
  const customerGrowthData = dashboardStats?.userGrowthData || [
    { month: "Jan", users: 0 },
    { month: "Feb", users: 0 },
    { month: "Mar", users: 0 },
    { month: "Apr", users: 0 },
    { month: "May", users: 0 },
    { month: "Jun", users: 0 }
  ];
  
  // Get stats from dashboard data
  const productCount = dashboardStats?.productCount || 0;
  const orderCount = dashboardStats?.orderCount || 0;
  const userCount = dashboardStats?.userCount || 0;
  const recentOrders = dashboardStats?.recentOrders || [];
  const popularProducts = dashboardStats?.popularProducts || [];
  const salesData = dashboardStats?.salesData || [];
  const growthData = dashboardStats?.growthData || { 
    products: 0, orders: 0, users: 0, revenue: 0 
  };
  
  const StatCard = ({ title, value, icon, growth }: { title: string, value: number, icon: React.ReactNode, growth?: number }) => (
    <Card className="bg-gray-900/90 border-gray-700/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white text-lg">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1 text-white">{value}</div>
        {growth !== undefined && (
          <div className={`text-sm flex items-center ${growth >= 0 ? "text-green-500" : "text-red-500"}`}>
            {growth >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {Math.abs(growth)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 admin-text-gradient">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Products" 
            value={productCount} 
            icon={<ShoppingBag className="h-4 w-4 text-gray-400" />}
            growth={growthData.products}
          />
          <StatCard 
            title="Orders" 
            value={orderCount} 
            icon={<ShoppingBag className="h-4 w-4 text-gray-400" />}
            growth={growthData.orders}
          />
          <StatCard 
            title="Users" 
            value={userCount} 
            icon={<Users className="h-4 w-4 text-gray-400" />}
            growth={growthData.users}
          />
          <StatCard 
            title="Revenue" 
            value={salesData?.reduce((sum, item) => sum + (item.revenue || 0), 0) || 0} 
            icon={<Tag className="h-4 w-4 text-gray-400" />}
            growth={growthData.revenue}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-900/40 border border-gray-700/30 rounded-lg p-1 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700 text-white">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-gray-700 text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gray-700 text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gray-700 text-white">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="discounts" className="data-[state=active]:bg-gray-700 text-white">
              <Tag className="h-4 w-4 mr-2" />
              Discounts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Sales Chart */}
              <Card className="bg-gray-900/80 border-gray-700/30 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Sales Overview</CardTitle>
                  <CardDescription className="text-gray-400">Monthly sales and revenue</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {salesData?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                        <XAxis dataKey="month" stroke="#666666" />
                        <YAxis stroke="#666666" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#171717",
                            borderColor: "#333333",
                            color: "#e5e5e5"
                          }}
                        />
                        <Bar dataKey="sales" name="Sales" fill="#525252" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="revenue" name="Revenue (₹)" fill="#737373" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-400">No sales data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Recent Orders */}
              <Card className="bg-gray-900/80 border-gray-700/30 h-[400px]">
                <CardHeader>
                  <CardTitle className="text-white">Recent Orders</CardTitle>
                  <CardDescription className="text-gray-400">Latest transactions</CardDescription>
                </CardHeader>
                <CardContent className="overflow-auto max-h-[300px]">
                  {statsLoading ? (
                    <p className="text-gray-400">Loading recent orders...</p>
                  ) : recentOrders?.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order._id} className="flex justify-between border-b border-gray-700/30 pb-3">
                          <div>
                            <div className="font-medium text-white">#{order._id.slice(-6)}</div>
                            <div className="text-sm text-gray-400">{order.user?.name || 'Unknown'}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white">₹{order.totalPrice}</div>
                            <div className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-400 mt-6">No recent orders found</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Popular Products */}
              <Card className="bg-gray-900/80 border-gray-700/30">
                <CardHeader>
                  <CardTitle className="text-white">Popular Products</CardTitle>
                  <CardDescription className="text-gray-400">Best selling items</CardDescription>
                </CardHeader>
                <CardContent className="overflow-auto max-h-[250px]">
                  {statsLoading ? (
                    <p className="text-gray-400">Loading popular products...</p>
                  ) : popularProducts?.length > 0 ? (
                    <div className="space-y-4">
                      {popularProducts.map((product) => (
                        <div key={product._id} className="flex justify-between border-b border-gray-700/30 pb-3">
                          <div className="font-medium truncate max-w-[200px] text-white">{product.name}</div>
                          <div className="text-right">
                            <div className="text-white">₹{product.price}</div>
                            <div className="text-sm text-gray-400">{product.soldCount || 0} sold</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-400 mt-6">No popular products found</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Customer Growth */}
              <Card className="bg-gray-900/80 border-gray-700/30 col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Customer Growth</CardTitle>
                  <CardDescription className="text-gray-400">User acquisition trend</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customerGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="month" stroke="#666666" />
                      <YAxis stroke="#666666" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "#171717",
                          borderColor: "#333333",
                          color: "#e5e5e5"
                        }}
                      />
                      <Line type="monotone" dataKey="users" stroke="#525252" name="New Users" />
                    </LineChart>
                  </ResponsiveContainer>
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
      {/* Removed footer as requested */}
    </div>
  );
};

export default AdminDashboard;
