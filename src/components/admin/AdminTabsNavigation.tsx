
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminTabsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminTabsNavigation = ({ 
  activeTab, 
  setActiveTab 
}: AdminTabsNavigationProps) => {
  return (
    <TabsList className="bg-admin-darkGrey border border-admin-grey/30 p-1 rounded-lg mb-8 grid grid-cols-4">
      <TabsTrigger 
        value="products" 
        className="text-admin-white data-[state=active]:bg-admin-black"
        onClick={() => setActiveTab("products")}
      >
        Products
      </TabsTrigger>
      <TabsTrigger 
        value="orders" 
        className="text-admin-white data-[state=active]:bg-admin-black"
        onClick={() => setActiveTab("orders")}
      >
        Orders
      </TabsTrigger>
      <TabsTrigger 
        value="users" 
        className="text-admin-white data-[state=active]:bg-admin-black"
        onClick={() => setActiveTab("users")}
      >
        Users
      </TabsTrigger>
      <TabsTrigger 
        value="discounts" 
        className="text-admin-white data-[state=active]:bg-admin-black"
        onClick={() => setActiveTab("discounts")}
      >
        Discounts
      </TabsTrigger>
    </TabsList>
  );
};
