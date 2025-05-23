import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import * as adminAPI from "@/api/admin";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types";

interface ProductAnalyticsProps {
  productsData?: Product[];
  isLoading?: boolean;
}

export const ProductAnalytics = ({ productsData, isLoading }: ProductAnalyticsProps) => {
  const [productId, setProductId] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("6months");

  // Fetch analytics data
  const { data: analyticsData, isLoading: analyticsLoading, refetch } = useQuery({
    queryKey: ['product-analytics', productId, timeRange],
    queryFn: async () => {
      try {
        return await adminAPI.getProductAnalytics(productId, timeRange);
      } catch (error) {
        console.error('Error fetching product analytics:', error);
        toast({
          title: "Failed to fetch analytics",
          description: "Using sample data for demonstration",
          variant: "destructive"
        });
        // Return sample data as fallback
        return {
          salesData: [
            { period: 'Jan', sales: 45, revenue: 1350, views: 120 },
            { period: 'Feb', sales: 52, revenue: 1560, views: 145 },
            { period: 'Mar', sales: 61, revenue: 1830, views: 190 },
            { period: 'Apr', sales: 67, revenue: 2010, views: 220 },
            { period: 'May', sales: 70, revenue: 2100, views: 240 },
            { period: 'Jun', sales: 74, revenue: 2220, views: 260 }
          ],
          totalSales: 369,
          totalRevenue: 11070,
          totalViews: 1175,
          averageRating: 4.5,
          conversionRate: 7.8
        };
      }
    },
    enabled: !!productsData // Only run query when products are loaded
  });

  // Refetch when selection changes
  useEffect(() => {
    if (productsData && productsData.length > 0) {
      refetch();
    }
  }, [productId, timeRange, refetch, productsData]);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProductId(event.target.value);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const formatChartData = () => {
    if (!analyticsData || !analyticsData.salesData) return [];
    
    return analyticsData.salesData.map((item: any) => ({
      name: item.period,
      sales: item.sales,
      revenue: item.revenue,
      views: item.views
    }));
  };

  const chartData = formatChartData();

  // Show loading state
  if (isLoading || analyticsLoading) {
    return (
      <Card className="bg-indigo-900/50 border-purple-700/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-purple-200">Loading analytics data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-indigo-900/50 border-purple-700/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="product-select" className="text-purple-200">Select Product</Label>
              <select
                id="product-select"
                className="w-full p-2 mt-1 bg-indigo-800/70 border border-purple-700/30 rounded-md text-white"
                value={productId}
                onChange={handleProductChange}
              >
                <option value="all">All Products</option>
                {productsData && productsData.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label className="text-purple-200">Time Range</Label>
              <RadioGroup 
                value={timeRange} 
                onValueChange={handleTimeRangeChange} 
                className="flex flex-wrap gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30days" id="r1" className="text-purple-300 border-purple-400" />
                  <Label htmlFor="r1" className="text-purple-200">30 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3months" id="r2" className="text-purple-300 border-purple-400" />
                  <Label htmlFor="r2" className="text-purple-200">3 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6months" id="r3" className="text-purple-300 border-purple-400" />
                  <Label htmlFor="r3" className="text-purple-200">6 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1year" id="r4" className="text-purple-300 border-purple-400" />
                  <Label htmlFor="r4" className="text-purple-200">1 Year</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-indigo-800/50 border-purple-700/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-200">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {analyticsData?.totalSales || 0}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-indigo-800/50 border-purple-700/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-200">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ₹{analyticsData?.totalRevenue?.toLocaleString() || 0}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-indigo-800/50 border-purple-700/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-200">Avg. Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {analyticsData?.averageRating?.toFixed(1) || "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sales Chart */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-white">Sales Performance</h3>
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#737373" />
                    <YAxis stroke="#737373" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#171717", 
                        borderColor: "#404040",
                        borderRadius: "4px",
                        color: "#d4d4d4"
                      }} 
                    />
                    <Bar dataKey="sales" name="Sales" fill="#525252" />
                    <Bar dataKey="revenue" name="Revenue (₹)" fill="#737373" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-admin-softGrey">No data available for the selected period</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Product Views Chart */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Product Views</h3>
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#737373" />
                    <YAxis stroke="#737373" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#171717", 
                        borderColor: "#404040",
                        borderRadius: "4px",
                        color: "#d4d4d4"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#a3a3a3" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Product Views" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-admin-softGrey">No data available for the selected period</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
