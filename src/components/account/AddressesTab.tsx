
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export const AddressesTab = () => {
  return (
    <Card className="bg-starry-darkPurple/40 border-starry-purple/20 text-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>My Addresses</span>
          <Button 
            size="sm"
            className="bg-starry-purple hover:bg-starry-vividPurple text-white"
          >
            Add New Address
          </Button>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Manage your shipping addresses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-10 text-center">
          <Home className="mx-auto h-12 w-12 text-gray-500 mb-3" />
          <h3 className="text-lg font-medium mb-1">No Addresses Added</h3>
          <p className="text-gray-400">
            You haven't added any addresses yet
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
