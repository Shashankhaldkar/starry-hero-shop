
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
          description: "There was an error loading analytics data",
          variant: "destructive"
        });
        return {
          salesData: [],
          totalSales: 0,
          totalRevenue: 0,
          averageRating: 0
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
      revenue: item.revenue
    }));
  };

  const chartData = formatChartData();

  // Show loading state
  if (isLoading || analyticsLoading) {
    return (
      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-white">Loading analytics data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="product-select">Select Product</Label>
              <select
                id="product-select"
                className="w-full p-2 mt-1 bg-starry-darkPurple/20 border border-starry-purple/30 rounded-md text-white"
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
              <Label>Time Range</Label>
              <RadioGroup 
                value={timeRange} 
                onValueChange={handleTimeRangeChange} 
                className="flex flex-wrap gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30days" id="r1" />
                  <Label htmlFor="r1">30 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3months" id="r2" />
                  <Label htmlFor="r2">3 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6months" id="r3" />
                  <Label htmlFor="r3">6 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1year" id="r4" />
                  <Label htmlFor="r4">1 Year</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="bg-starry-darkPurple/60 border-starry-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData?.totalSales || 0}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-starry-darkPurple/60 border-starry-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{analyticsData?.totalRevenue?.toLocaleString() || 0}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-starry-darkPurple/60 border-starry-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Avg. Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData?.averageRating?.toFixed(1) || "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="h-80 mt-4">
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
                  <XAxis dataKey="name" stroke="#8E9196" />
                  <YAxis stroke="#8E9196" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1A1F2C", 
                      borderColor: "#9b87f5",
                      borderRadius: "4px",
                      color: "#fff"
                    }} 
                  />
                  <Bar dataKey="sales" name="Sales" fill="#9b87f5" />
                  <Bar dataKey="revenue" name="Revenue (₹)" fill="#6E59A5" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No data available for the selected period</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
