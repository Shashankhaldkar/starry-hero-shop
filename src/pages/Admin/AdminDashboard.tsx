
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
  Line, 
  LineChart
} from "recharts";

// Admin panel components
import { OrderManagement } from "@/components/admin/OrderManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { DiscountManagement } from "@/components/admin/DiscountManagement";
import { AdminProductAnalytics } from "@/components/admin/AdminProductAnalytics";

// Sample data for fallback
const sampleDashboardData = {
  productCount: 24,
  orderCount: 87,
  userCount: 164,
  recentOrders: [
    { _id: "ord123", user: { name: "John Doe" }, totalPrice: 89.99, createdAt: new Date().toISOString() },
    { _id: "ord124", user: { name: "Jane Smith" }, totalPrice: 129.99, createdAt: new Date().toISOString() },
    { _id: "ord125", user: { name: "Mike Johnson" }, totalPrice: 59.99, createdAt: new Date().toISOString() }
  ],
  popularProducts: [
    { _id: "prod1", name: "Batman T-Shirt", price: 29.99, soldCount: 42 },
    { _id: "prod2", name: "Superman Hoodie", price: 49.99, soldCount: 38 },
    { _id: "prod3", name: "Spider-Man Cap", price: 19.99, soldCount: 35 }
  ],
  salesData: [
    { month: "Jan", sales: 40, revenue: 1200 },
    { month: "Feb", sales: 55, revenue: 1650 },
    { month: "Mar", sales: 68, revenue: 2040 },
    { month: "Apr", sales: 60, revenue: 1800 },
    { month: "May", sales: 75, revenue: 2250 },
    { month: "Jun", sales: 82, revenue: 2460 }
  ],
  growthData: {
    products: 12.5,
    orders: 8.3,
    users: 15.2,
    revenue: 10.7
  }
};

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
          description: "Using sample data for demonstration",
          variant: "destructive"
        });
        return sampleDashboardData;
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
    <Card className="bg-admin-darkGrey/90 border-admin-grey/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-admin-white text-lg">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-admin-darkGrey flex items-center justify-center">
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

  // Customer growth data
  const customerGrowthData = [
    { month: "Jan", users: 25 },
    { month: "Feb", users: 38 },
    { month: "Mar", users: 52 },
    { month: "Apr", users: 78 },
    { month: "May", users: 103 },
    { month: "Jun", users: 122 }
  ];
  
  return (
    <div className="min-h-screen bg-admin-black">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 admin-text-gradient">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Products" 
            value={productCount} 
            icon={<ShoppingBag className="h-4 w-4 text-admin-accent" />}
            growth={growthData.products}
          />
          <StatCard 
            title="Orders" 
            value={orderCount} 
            icon={<ShoppingBag className="h-4 w-4 text-admin-accent" />}
            growth={growthData.orders}
          />
          <StatCard 
            title="Users" 
            value={userCount} 
            icon={<Users className="h-4 w-4 text-admin-accent" />}
            growth={growthData.users}
          />
          <StatCard 
            title="Revenue" 
            value={salesData.reduce((sum, item) => sum + (item.revenue || 0), 0)} 
            icon={<Tag className="h-4 w-4 text-admin-accent" />}
            growth={growthData.revenue}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-admin-darkGrey/40 border border-admin-grey/30 rounded-lg p-1 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-admin-grey text-white">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-admin-grey text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-admin-grey text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-admin-grey text-white">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="discounts" className="data-[state=active]:bg-admin-grey text-white">
              <Tag className="h-4 w-4 mr-2" />
              Discounts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Sales Chart */}
              <Card className="bg-admin-darkGrey/80 border-admin-grey/30 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Sales Overview</CardTitle>
                  <CardDescription className="text-admin-softGrey">Monthly sales and revenue</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {salesData.length > 0 ? (
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
                        <Bar dataKey="revenue" name="Revenue ($)" fill="#737373" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-admin-softGrey">No sales data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Recent Orders */}
              <Card className="bg-admin-darkGrey/80 border-admin-grey/30 h-[400px]">
                <CardHeader>
                  <CardTitle className="text-white">Recent Orders</CardTitle>
                  <CardDescription className="text-admin-softGrey">Latest transactions</CardDescription>
                </CardHeader>
                <CardContent className="overflow-auto max-h-[300px]">
                  {statsLoading ? (
                    <p className="text-admin-softGrey">Loading recent orders...</p>
                  ) : recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order._id} className="flex justify-between border-b border-admin-grey/30 pb-3">
                          <div>
                            <div className="font-medium text-white">#{order._id.slice(-6)}</div>
                            <div className="text-sm text-admin-softGrey">{order.user?.name || 'Unknown'}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white">₹{order.totalPrice}</div>
                            <div className="text-sm text-admin-softGrey">{new Date(order.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-admin-softGrey mt-6">No recent orders found</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Popular Products */}
              <Card className="bg-admin-darkGrey/80 border-admin-grey/30">
                <CardHeader>
                  <CardTitle className="text-white">Popular Products</CardTitle>
                  <CardDescription className="text-admin-softGrey">Best selling items</CardDescription>
                </CardHeader>
                <CardContent className="overflow-auto max-h-[250px]">
                  {statsLoading ? (
                    <p className="text-admin-softGrey">Loading popular products...</p>
                  ) : popularProducts.length > 0 ? (
                    <div className="space-y-4">
                      {popularProducts.map((product) => (
                        <div key={product._id} className="flex justify-between border-b border-admin-grey/30 pb-3">
                          <div className="font-medium truncate max-w-[200px] text-white">{product.name}</div>
                          <div className="text-right">
                            <div className="text-white">₹{product.price}</div>
                            <div className="text-sm text-admin-softGrey">{product.soldCount || 0} sold</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-admin-softGrey mt-6">No popular products found</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Customer Growth */}
              <Card className="bg-admin-darkGrey/80 border-admin-grey/30 col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Customer Growth</CardTitle>
                  <CardDescription className="text-admin-softGrey">User acquisition trend</CardDescription>
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
      <Footer />
    </div>
  );
};

export default AdminDashboard;
