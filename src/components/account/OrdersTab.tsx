
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getMyOrders } from "@/api/orders";

export const OrdersTab = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <Card className="bg-starry-darkPurple/40 border-starry-purple/20 text-white">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription className="text-gray-400">
          View your past orders and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
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
                <div className="mt-2 font-medium">₹{order.totalPrice.toFixed(2)}</div>
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
  );
};
