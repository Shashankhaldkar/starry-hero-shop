
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AccountSidebar } from "@/components/account/AccountSidebar";

interface AccountLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

export const AccountLayout = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  handleLogout 
}: AccountLayoutProps) => {
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
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
