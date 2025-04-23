
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import * as authAPI from "@/api/auth";

export const ProfileTab = () => {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const updatedUser = await authAPI.updateUserProfile({ name, email });
      setUser(updatedUser);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Your profile has been updated",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update your profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-starry-darkPurple/40 border-starry-purple/20 text-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>My Profile</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="border-starry-purple text-starry-purple"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Manage your personal information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            type="text" 
            value={name} 
            disabled={!isEditing}
            onChange={(e) => setName(e.target.value)}
            className="bg-starry-darkPurple/60 border-starry-purple/30"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            disabled={!isEditing}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-starry-darkPurple/60 border-starry-purple/30"
          />
        </div>
        {isEditing && (
          <Button 
            onClick={handleUpdateProfile} 
            disabled={loading}
            className="bg-starry-purple hover:bg-starry-vividPurple w-full"
          >
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
