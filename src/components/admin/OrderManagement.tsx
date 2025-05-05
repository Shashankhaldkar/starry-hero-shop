
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample orders data for demo
const sampleOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2023-04-15",
    items: 3,
    total: 89.97,
    status: "Processing",
    paymentStatus: "Paid"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2023-04-14",
    items: 2,
    total: 59.98,
    status: "Shipped",
    paymentStatus: "Paid"
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    date: "2023-04-12",
    items: 1,
    total: 29.99,
    status: "Delivered",
    paymentStatus: "Paid"
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    date: "2023-04-10",
    items: 4,
    total: 119.96,
    status: "Processing",
    paymentStatus: "Pending"
  },
  {
    id: "ORD-005",
    customer: "Alex Brown",
    email: "alex@example.com",
    date: "2023-04-08",
    items: 2,
    total: 59.98,
    status: "Cancelled",
    paymentStatus: "Refunded"
  }
];

export const OrderManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const viewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsViewOrderOpen(true);
  };

  const updateOrderStatus = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsUpdateStatusOpen(true);
  };

  const handleUpdateStatus = () => {
    toast({
      title: "Order Status Updated",
      description: `Order ${selectedOrder.id} status updated to ${newStatus}.`,
    });
    setIsUpdateStatusOpen(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "outline";
      case "shipped":
        return "secondary";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "default";
      case "pending":
        return "outline";
      case "refunded":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Order Management</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Select onValueChange={handleStatusFilterChange} value={statusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
        <ScrollArea className="h-[500px] rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-starry-darkPurple/60">
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">No orders found</TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-starry-darkPurple/60">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {order.customer}
                      <div className="text-xs text-gray-400">{order.email}</div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>₹{order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => viewOrder(order)}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => updateOrderStatus(order)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder?.date} by {selectedOrder?.customer} 
              ({selectedOrder?.email})
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="items">Order Items</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
              <TabsTrigger value="payment">Payment Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="items" className="space-y-4">
              <div className="border border-starry-purple/30 rounded-md p-4">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-starry-darkPurple/60">
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-md bg-gray-200"></div>
                          <div>
                            <div>Superhero T-Shirt</div>
                            <div className="text-xs text-gray-400">Size: L, Color: Black</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>₹29.99</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>₹29.99</TableCell>
                    </TableRow>
                    {selectedOrder?.items > 1 && (
                      <TableRow>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-gray-200"></div>
                            <div>
                              <div>Superhero Cap</div>
                              <div className="text-xs text-gray-400">Color: Red</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>₹19.99</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>₹19.99</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="border border-starry-purple/30 rounded-md p-4">
                <div className="flex justify-between py-1">
                  <span>Subtotal</span>
                  <span>₹{(selectedOrder?.total * 0.8).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Shipping</span>
                  <span>₹5.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Tax</span>
                  <span>₹{(selectedOrder?.total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold border-t border-starry-purple/30 mt-2">
                  <span>Total</span>
                  <span>₹{selectedOrder?.total.toFixed(2)}</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <div className="border border-starry-purple/30 rounded-md p-4">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p>{selectedOrder?.customer}</p>
                <p>123 Main Street</p>
                <p>Apartment 4B</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
                <p className="mt-2">Phone: +1 (555) 123-4567</p>
              </div>
              
              <div className="border border-starry-purple/30 rounded-md p-4">
                <h3 className="font-semibold mb-2">Shipping Method</h3>
                <p>Standard Shipping (3-5 business days)</p>
                <p className="text-sm text-gray-400">Tracking #: TRK987654321</p>
              </div>
            </TabsContent>
            
            <TabsContent value="payment" className="space-y-4">
              <div className="border border-starry-purple/30 rounded-md p-4">
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-12 bg-gray-800 rounded"></div>
                  <p>Credit Card (Visa ending in 4242)</p>
                </div>
                <p className="mt-2 text-sm text-gray-400">Payment processed on {selectedOrder?.date}</p>
              </div>
              
              <div className="border border-starry-purple/30 rounded-md p-4">
                <h3 className="font-semibold mb-2">Payment Status</h3>
                <Badge variant={getPaymentStatusBadgeVariant(selectedOrder?.paymentStatus || "")}>
                  {selectedOrder?.paymentStatus}
                </Badge>
                <p className="mt-2 text-sm text-gray-400">Transaction ID: TXID98765432100</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOrderOpen(false)}>Close</Button>
            <Button className="btn-hero-hover" onClick={() => {
              setIsViewOrderOpen(false);
              updateOrderStatus(selectedOrder);
            }}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          <Select onValueChange={setNewStatus} value={newStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>Cancel</Button>
            <Button className="btn-hero-hover" onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
