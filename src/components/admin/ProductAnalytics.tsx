
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { products } from "@/data/products";
import { Product } from "@/types";

// Sample analytics data - in a real app, this would come from your backend
const salesData = [
  { name: 'Jan', sales: 12 },
  { name: 'Feb', sales: 19 },
  { name: 'Mar', sales: 28 },
  { name: 'Apr', sales: 21 },
  { name: 'May', sales: 33 },
  { name: 'Jun', sales: 42 },
];

const categorySalesData = [
  { name: 'Oversized', value: 38 },
  { name: 'Graphic Printed', value: 25 },
  { name: 'Solid Color', value: 17 },
  { name: 'Long Sleeve', value: 10 },
  { name: 'Hooded', value: 10 },
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981'];

// Define the interface for component props
interface ProductAnalyticsProps {
  productsData?: Product[];
  isLoading?: boolean;
}

export const ProductAnalytics = ({ productsData, isLoading }: ProductAnalyticsProps) => {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [timeRange, setTimeRange] = useState("6months");
  
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

  // Display loading state
  if (isLoading) {
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

  // Use productData if available, otherwise fallback to the products import
  const displayProducts = productsData || products;

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
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categorySalesData.map((entry, index) => (
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
              {displayProducts.slice(0, 5).map((product, index) => (
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
                    ₹{(product.price * (Math.random() * 20 + 10)).toFixed(2)}k
                  </div>
                </div>
              ))}
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
                ₹458,290
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-green-400">↑ 12.5%</span> from previous period
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-starry-darkPurple/60 rounded-lg">
                <div className="text-xs text-gray-400">Orders</div>
                <div className="text-xl font-medium">1,245</div>
              </div>
              <div className="p-3 bg-starry-darkPurple/60 rounded-lg">
                <div className="text-xs text-gray-400">Avg. Order Value</div>
                <div className="text-xl font-medium">₹368.10</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
