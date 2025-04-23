
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRound, ShoppingBag, Heart, Home, Settings, LogOut } from "lucide-react";

interface AccountSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

export const AccountSidebar = ({ activeTab, setActiveTab, handleLogout }: AccountSidebarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const renderInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="bg-starry-darkPurple/40 border-starry-purple/20 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4 bg-starry-purple/30 border-2 border-starry-purple">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-2xl">
              {renderInitials(user?.name || "")}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-sm text-gray-400">{user?.email}</p>
          {user?.role === "admin" && (
            <div className="mt-2">
              <span className="px-2 py-1 text-xs rounded-md bg-starry-purple text-white">
                Admin
              </span>
            </div>
          )}
        </div>
        
        <Separator className="my-6 bg-starry-charcoal/50" />
        
        <nav className="space-y-2">
          <Button 
            variant={activeTab === "profile" ? "default" : "ghost"} 
            className={`w-full justify-start ${activeTab !== "profile" ? "text-gray-400 hover:text-white" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <UserRound className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button 
            variant={activeTab === "orders" ? "default" : "ghost"} 
            className={`w-full justify-start ${activeTab !== "orders" ? "text-gray-400 hover:text-white" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Orders
          </Button>
          <Button 
            variant={activeTab === "wishlist" ? "default" : "ghost"} 
            className={`w-full justify-start ${activeTab !== "wishlist" ? "text-gray-400 hover:text-white" : ""}`}
            onClick={() => setActiveTab("wishlist")}
          >
            <Heart className="mr-2 h-4 w-4" />
            Wishlist
          </Button>
          <Button 
            variant={activeTab === "addresses" ? "default" : "ghost"} 
            className={`w-full justify-start ${activeTab !== "addresses" ? "text-gray-400 hover:text-white" : ""}`}
            onClick={() => setActiveTab("addresses")}
          >
            <Home className="mr-2 h-4 w-4" />
            Addresses
          </Button>
          {user?.role === "admin" && (
            <Button
              variant="destructive"
              className="w-full justify-start mt-4"
              onClick={() => navigate("/admin")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Button>
          )}
          <Button 
            variant="outline" 
            className="w-full justify-start mt-6 border-starry-purple/30 text-gray-400 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
};
