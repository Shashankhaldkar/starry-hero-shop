
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample users data for demo
const sampleUsers = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    orders: 5,
    joined: "2023-01-15",
    lastLogin: "2023-04-20"
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    orders: 3,
    joined: "2023-02-20",
    lastLogin: "2023-04-18"
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "admin",
    orders: 0,
    joined: "2023-03-05",
    lastLogin: "2023-04-21"
  },
  {
    id: "USR-004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "user",
    orders: 2,
    joined: "2023-03-10",
    lastLogin: "2023-04-15"
  },
  {
    id: "USR-005",
    name: "Alex Brown",
    email: "alex@example.com",
    role: "user",
    orders: 1,
    joined: "2023-04-01",
    lastLogin: "2023-04-19"
  }
];

// Sample support queries for demo
const sampleSupport = [
  {
    id: "SUP-001",
    userId: "USR-001",
    user: "John Doe",
    email: "john@example.com",
    subject: "Order not delivered",
    message: "I ordered a t-shirt two weeks ago and it still hasn't arrived. Can you check the status?",
    status: "Open",
    date: "2023-04-18"
  },
  {
    id: "SUP-002",
    userId: "USR-002",
    user: "Jane Smith",
    email: "jane@example.com",
    subject: "Wrong size received",
    message: "I ordered a medium size but received a large. How can I exchange it?",
    status: "Pending",
    date: "2023-04-17"
  },
  {
    id: "SUP-003",
    userId: "USR-004",
    user: "Sarah Wilson",
    email: "sarah@example.com",
    subject: "Refund request",
    message: "I would like to return my order and get a refund. The quality is not what I expected.",
    status: "Closed",
    date: "2023-04-15"
  }
];

export const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  const [isViewTicketOpen, setIsViewTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSupport = sampleSupport.filter(query =>
    query.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewUserOpen(true);
  };

  const viewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsViewTicketOpen(true);
  };

  const resolveTicket = () => {
    toast({
      title: "Support Ticket Updated",
      description: `Ticket ${selectedTicket?.id} has been marked as resolved.`,
    });
    setIsViewTicketOpen(false);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-starry-darkPurple/40 border border-starry-purple/30 rounded-lg p-1 mb-4">
          <TabsTrigger value="users" className="data-[state=active]:bg-starry-purple">
            <Users className="h-4 w-4 mr-2" /> Users
          </TabsTrigger>
          <TabsTrigger value="support" className="data-[state=active]:bg-starry-purple">
            <FileText className="h-4 w-4 mr-2" /> Support Queries
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">User Management</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="max-w-sm"
            />
          </div>

          <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
            <ScrollArea className="h-[500px] rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-starry-darkPurple/60">
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">No users found</TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-starry-darkPurple/60">
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "admin" ? "default" : "outline"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => viewUser(user)}
                          >
                            <User className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </TabsContent>
        
        <TabsContent value="support" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Support Queries</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search support queries..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="max-w-sm"
            />
          </div>

          <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
            <ScrollArea className="h-[500px] rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-starry-darkPurple/60">
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSupport.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">No support queries found</TableCell>
                    </TableRow>
                  ) : (
                    filteredSupport.map((ticket) => (
                      <TableRow key={ticket.id} className="hover:bg-starry-darkPurple/60">
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          {ticket.user}
                          <div className="text-xs text-gray-400">{ticket.email}</div>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.date}</TableCell>
                        <TableCell>
                          <Badge variant={
                            ticket.status === "Open" ? "outline" : 
                            ticket.status === "Pending" ? "secondary" : 
                            "default"
                          }>
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => viewTicket(ticket)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View User Dialog */}
      <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>User Profile - {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              User ID: {selectedUser?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-starry-darkPurple/60 border-starry-purple/30">
              <ScrollArea className="h-60">
                <div className="p-4">
                  <h3 className="font-semibold mb-4">User Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span>{selectedUser?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span>{selectedUser?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Role:</span>
                      <Badge variant={selectedUser?.role === "admin" ? "default" : "outline"}>
                        {selectedUser?.role}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Joined:</span>
                      <span>{selectedUser?.joined}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Login:</span>
                      <span>{selectedUser?.lastLogin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Orders:</span>
                      <span>{selectedUser?.orders}</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </Card>
            
            <Card className="bg-starry-darkPurple/60 border-starry-purple/30">
              <ScrollArea className="h-60">
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="border-l-2 border-starry-purple pl-3 py-1">
                      <div className="text-sm">Logged in</div>
                      <div className="text-xs text-gray-400">{selectedUser?.lastLogin}</div>
                    </div>
                    {selectedUser?.orders > 0 && (
                      <div className="border-l-2 border-starry-purple pl-3 py-1">
                        <div className="text-sm">Placed an order</div>
                        <div className="text-xs text-gray-400">2023-04-15</div>
                      </div>
                    )}
                    <div className="border-l-2 border-starry-purple pl-3 py-1">
                      <div className="text-sm">Updated profile</div>
                      <div className="text-xs text-gray-400">2023-03-20</div>
                    </div>
                    <div className="border-l-2 border-starry-purple pl-3 py-1">
                      <div className="text-sm">Account created</div>
                      <div className="text-xs text-gray-400">{selectedUser?.joined}</div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewUserOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog */}
      <Dialog open={isViewTicketOpen} onOpenChange={setIsViewTicketOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Support Ticket - {selectedTicket?.id}</DialogTitle>
            <DialogDescription>
              Submitted on {selectedTicket?.date} by {selectedTicket?.user}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{selectedTicket?.subject}</h3>
              <Badge variant={
                selectedTicket?.status === "Open" ? "outline" : 
                selectedTicket?.status === "Pending" ? "secondary" : 
                "default"
              }>
                {selectedTicket?.status}
              </Badge>
            </div>
            
            <Card className="bg-starry-darkPurple/60 border-starry-purple/30 p-4">
              <p>{selectedTicket?.message}</p>
            </Card>
            
            <div className="pt-4">
              <h3 className="font-semibold mb-2">Response</h3>
              <div className="border border-starry-purple/30 rounded-md p-4">
                <textarea
                  className="w-full bg-transparent border-none focus:outline-none resize-none"
                  rows={4}
                  placeholder="Type your response here..."
                ></textarea>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewTicketOpen(false)}>Cancel</Button>
            <Button className="btn-hero-hover" onClick={resolveTicket}>Resolve Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
