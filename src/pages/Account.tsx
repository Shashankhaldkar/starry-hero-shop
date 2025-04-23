
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { ProfileTab } from "@/components/account/ProfileTab";
import { OrdersTab } from "@/components/account/OrdersTab";
import { WishlistTab } from "@/components/account/WishlistTab";
import { AddressesTab } from "@/components/account/AddressesTab";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-starry-darkPurple to-starry-darkBlue text-white">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <AccountSidebar 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleLogout={handleLogout}
            />
          </div>
          
          <div className="md:w-3/4">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "wishlist" && <WishlistTab />}
            {activeTab === "addresses" && <AddressesTab />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
