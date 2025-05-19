
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { ProfileTab } from "@/components/account/ProfileTab";
import { OrdersTab } from "@/components/account/OrdersTab";
import { WishlistTab } from "@/components/account/WishlistTab";
import { AddressesTab } from "@/components/account/AddressesTab";
import { AccountLayout } from "@/components/account/AccountLayout";

const Account = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const renderActiveTab = () => {
    switch(activeTab) {
      case "profile":
        return <ProfileTab />;
      case "orders":
        return <OrdersTab />;
      case "wishlist":
        return <WishlistTab />;
      case "addresses":
        return <AddressesTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <AccountLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
    >
      {renderActiveTab()}
    </AccountLayout>
  );
};

export default Account;
