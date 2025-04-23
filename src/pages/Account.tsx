
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import * as authAPI from "@/api/auth";
import { getMyOrders } from "@/api/orders";
import { ShoppingBag, UserRound, Heart, Home, Package, Settings, LogOut, User } from "lucide-react";
import { getWishlist } from "@/api/auth";

const Account = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState({
    profile: false,
    orders: false,
    wishlist: false
  });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      fetchOrders();
      fetchWishlist();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(prev => ({ ...prev, orders: true }));
      const orderData = await getMyOrders();
      setOrders(orderData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to load your orders",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, orders: false }));
    }
  };

  const fetchWishlist = async () => {
    try {
      setLoading(prev => ({ ...prev, wishlist: true }));
      const wishlistItems = await getWishlist();
      setWishlist(wishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to load your wishlist",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, wishlist: false }));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
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
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

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
    <div className="min-h-screen bg-gradient-to-b from-starry-darkPurple to-starry-darkBlue text-white">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="md:w-1/4 space-y-6">
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
          </div>
          
          {/* Main Content Area */}
          <div className="md:w-3/4">
            <TabsContent value="profile" className="mt-0" forceMount={activeTab === "profile"}>
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
                      disabled={loading.profile}
                      className="bg-starry-purple hover:bg-starry-vividPurple w-full"
                    >
                      {loading.profile ? "Updating..." : "Save Changes"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders" className="mt-0" forceMount={activeTab === "orders"}>
              <Card className="bg-starry-darkPurple/40 border-starry-purple/20 text-white">
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription className="text-gray-400">
                    View your past orders and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading.orders ? (
                    <div className="p-10 text-center">
                      <p>Loading your orders...</p>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order: any) => (
                        <div key={order._id} className="border border-starry-purple/20 rounded-lg p-4">
                          <div className="flex justify-between">
                            <span>Order #{order._id.substring(0, 8)}</span>
                            <span className="text-starry-purple">{order.status}</span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                          <div className="mt-2 font-medium">${order.totalPrice.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center">
                      <Package className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                      <h3 className="text-lg font-medium mb-1">No Orders Yet</h3>
                      <p className="text-gray-400">
                        You haven't placed any orders yet. Start shopping!
                      </p>
                      <Button 
                        className="mt-4 bg-starry-purple hover:bg-starry-vividPurple"
                        onClick={() => navigate("/products")}
                      >
                        Shop Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="wishlist" className="mt-0" forceMount={activeTab === "wishlist"}>
              <Card className="bg-starry-darkPurple/40 border-starry-purple/20 text-white">
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription className="text-gray-400">
                    Products you've saved for later
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading.wishlist ? (
                    <div className="p-10 text-center">
                      <p>Loading your wishlist...</p>
                    </div>
                  ) : wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlist.map((product: any) => (
                        <div key={product.id} className="border border-starry-purple/20 rounded-lg p-4 flex">
                          <div className="w-16 h-16 bg-starry-charcoal/30 rounded overflow-hidden mr-4">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-400">${product.price.toFixed(2)}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="self-center border-starry-purple/30 text-starry-purple h-8"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center">
                      <Heart className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                      <h3 className="text-lg font-medium mb-1">Your Wishlist is Empty</h3>
                      <p className="text-gray-400">
                        You haven't added any items to your wishlist yet
                      </p>
                      <Button 
                        className="mt-4 bg-starry-purple hover:bg-starry-vividPurple"
                        onClick={() => navigate("/products")}
                      >
                        Browse Products
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="addresses" className="mt-0" forceMount={activeTab === "addresses"}>
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
            </TabsContent>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
