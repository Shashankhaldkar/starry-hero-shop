
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as adminAPI from "@/api/admin";
import { toast } from "@/components/ui/use-toast";

// Define the interface for component props
interface ProductAnalyticsProps {
  productsData?: Product[];
  isLoading?: boolean;
}

export const ProductAnalytics = ({ productsData, isLoading }: ProductAnalyticsProps) => {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [timeRange, setTimeRange] = useState("6months");
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [revenueData, setRevenueData] = useState({ total: 0, growth: 0, orders: 0, avgOrderValue: 0 });
  
  // Fetch analytics data from the backend
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ['product-analytics', selectedProduct, timeRange],
    queryFn: async () => {
      try {
        return await adminAPI.getProductAnalytics(selectedProduct, timeRange);
      } catch (error) {
        toast({
          title: "Failed to fetch analytics",
          description: "There was an error loading analytics data",
          variant: "destructive"
        });
        return null;
      }
    }
  });

  // Update state when analytics data changes
  useEffect(() => {
    if (analyticsData) {
      setSalesData(analyticsData.salesData || []);
      setCategoryData(analyticsData.categoryData || []);
      setTopProducts(analyticsData.topProducts || []);
      setRevenueData(analyticsData.revenue || { 
        total: 0, 
        growth: 0,
        orders: 0,
        avgOrderValue: 0 
      });
    }
  }, [analyticsData]);
  
  // Product analytics config
  const productChartConfig = {
    sales: {
      label: "Sales",
      theme: {
        light: "#8B5CF6",
        dark: "#8B5CF6", 
      },
    }
  };

  // Category distribution config
  const categoryChartConfig = {
    category: {
      label: "Category Distribution",
      theme: {
        light: "#D946EF",
        dark: "#D946EF",
      },
    }
  };

  // Colors for pie chart
  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981'];

  // Display loading state
  if (isLoading || analyticsLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
          <CardContent className="flex items-center justify-center h-64">
            <p>Loading analytics data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Use productsData if available
  const displayProducts = productsData || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-64">
            <Select
              value={selectedProduct}
              onValueChange={setSelectedProduct}
            >
              <SelectTrigger className="bg-starry-darkPurple/40 border-starry-purple/30">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {displayProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="bg-starry-darkPurple/40 border-starry-purple/30">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Over Time */}
        <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle className="text-lg">Sales Over Time</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly sales performance
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={productChartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1F2C',
                      borderColor: '#7E69AB',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    formatter={(value) => [`₹${value}k`, 'Sales']}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="var(--color-sales)" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
            <CardDescription className="text-gray-400">
              Sales by product category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={categoryChartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#1A1F2C',
                      borderColor: '#7E69AB',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    formatter={(value) => [`${value} units`, 'Sales']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Best Selling Products */}
        <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle className="text-lg">Best Selling Products</CardTitle>
            <CardDescription className="text-gray-400">
              Top products by sales volume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.length > 0 ? (
                topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-starry-purple/30 flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <div className="truncate" style={{ maxWidth: '180px' }}>
                        {product.name}
                      </div>
                    </div>
                    <div className="text-starry-purple font-medium">
                      ₹{product.revenue}k
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">No product data available</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle className="text-lg">Total Revenue</CardTitle>
            <CardDescription className="text-gray-400">
              Overall sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-5xl font-bold text-starry-vividPurple mb-2">
                ₹{revenueData.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                {revenueData.growth > 0 ? (
                  <span className="text-green-400">↑ {revenueData.growth}%</span>
                ) : (
                  <span className="text-red-400">↓ {Math.abs(revenueData.growth)}%</span>
                )} from previous period
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-starry-darkPurple/60 rounded-lg">
                <div className="text-xs text-gray-400">Orders</div>
                <div className="text-xl font-medium">{revenueData.orders}</div>
              </div>
              <div className="p-3 bg-starry-darkPurple/60 rounded-lg">
                <div className="text-xs text-gray-400">Avg. Order Value</div>
                <div className="text-xl font-medium">₹{revenueData.avgOrderValue}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
