
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  handleLogout: () => void;
}

export const AdminHeader = ({ handleLogout }: AdminHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-900 py-4 px-6 border-b border-purple-700/30 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="text-white mr-2 hover:bg-purple-800/30"
          onClick={() => navigate('/')}
        >
          Back to Site
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold text-center hero-text-gradient">
        Admin Dashboard
      </h1>
      
      <div>
        <Button 
          variant="destructive" 
          className="bg-red-700 hover:bg-red-800 text-white" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
