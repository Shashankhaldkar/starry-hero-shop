
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  handleLogout: () => void;
}

export const AdminHeader = ({ handleLogout }: AdminHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-admin-darkGrey py-4 px-6 border-b border-admin-grey/30 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="text-admin-white mr-2 hover:bg-admin-black/10"
          onClick={() => navigate('/')}
        >
          Back to Site
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold text-center admin-text-gradient">
        Admin Dashboard
      </h1>
      
      <div>
        <Button 
          variant="destructive" 
          className="bg-red-900 hover:bg-red-800" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
