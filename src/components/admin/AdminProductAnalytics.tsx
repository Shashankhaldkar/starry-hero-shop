
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ProductManagementForm } from "./ProductManagementForm";
import { ProductAnalytics } from "./ProductAnalytics";

export const AdminProductAnalytics = () => {
  const [activeTab, setActiveTab] = useState("manage");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Product Management & Analytics</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-starry-darkPurple/40 border border-starry-purple/30 rounded-lg p-1 mb-6">
          <TabsTrigger value="manage" className="data-[state=active]:bg-starry-purple">
            Manage Products
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-starry-purple">
            Product Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manage">
          <ProductManagementForm />
        </TabsContent>
        
        <TabsContent value="analytics">
          <ProductAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProductAnalytics;
