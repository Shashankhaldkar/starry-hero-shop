
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminTabsNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const AdminTabsNavigation = ({ 
  activeTab, 
  setActiveTab 
}: AdminTabsNavigationProps) => {
  return (
    <TabsList className="bg-indigo-900/40 border border-purple-700/30 rounded-lg p-1 mb-6">
      <TabsTrigger 
        value="products" 
        onClick={() => setActiveTab("products")}
        className="data-[state=active]:bg-purple-700 text-white"
      >
        Products
      </TabsTrigger>
      <TabsTrigger 
        value="analytics" 
        onClick={() => setActiveTab("analytics")}
        className="data-[state=active]:bg-purple-700 text-white"
      >
        Analytics
      </TabsTrigger>
      <TabsTrigger 
        value="orders" 
        onClick={() => setActiveTab("orders")}
        className="data-[state=active]:bg-purple-700 text-white"
      >
        Orders
      </TabsTrigger>
      <TabsTrigger 
        value="users" 
        onClick={() => setActiveTab("users")}
        className="data-[state=active]:bg-purple-700 text-white"
      >
        Users
      </TabsTrigger>
      <TabsTrigger 
        value="discounts" 
        onClick={() => setActiveTab("discounts")}
        className="data-[state=active]:bg-purple-700 text-white"
      >
        Discounts
      </TabsTrigger>
    </TabsList>
  );
};
