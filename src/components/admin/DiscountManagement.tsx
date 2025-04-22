
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Percent, Tag, Discount } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Sample coupons data for demo
const sampleCoupons = [
  {
    id: "COUPON-001",
    code: "SUMMER25",
    type: "percentage",
    amount: 25,
    minimumPurchase: 50,
    usageCount: 145,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    isActive: true
  },
  {
    id: "COUPON-002",
    code: "FREESHIP",
    type: "fixed",
    amount: 10,
    minimumPurchase: 75,
    usageCount: 89,
    startDate: "2023-04-15",
    endDate: "2023-05-15",
    isActive: true
  },
  {
    id: "COUPON-003",
    code: "WELCOME10",
    type: "percentage",
    amount: 10,
    minimumPurchase: 0,
    usageCount: 210,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    isActive: true
  },
  {
    id: "COUPON-004",
    code: "FLASH50",
    type: "percentage",
    amount: 50,
    minimumPurchase: 150,
    usageCount: 32,
    startDate: "2023-04-10",
    endDate: "2023-04-12",
    isActive: false
  }
];

export const DiscountManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [isEditCouponOpen, setIsEditCouponOpen] = useState(false);
  const [isDeleteCouponOpen, setIsDeleteCouponOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Form states
  const [couponForm, setCouponForm] = useState({
    code: "",
    type: "percentage",
    amount: 0,
    minimumPurchase: 0,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isActive: true
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const filteredCoupons = sampleCoupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === "all" || 
      (selectedStatus === "active" && coupon.isActive) || 
      (selectedStatus === "inactive" && !coupon.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCouponForm({ ...couponForm, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCouponForm({ ...couponForm, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setCouponForm({ ...couponForm, [name]: checked });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setCouponForm({ ...couponForm, startDate: date });
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setCouponForm({ ...couponForm, endDate: date });
    }
  };

  const resetForm = () => {
    setCouponForm({
      code: "",
      type: "percentage",
      amount: 0,
      minimumPurchase: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: true
    });
  };

  const editCoupon = (coupon: any) => {
    setSelectedCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      type: coupon.type,
      amount: coupon.amount,
      minimumPurchase: coupon.minimumPurchase,
      startDate: new Date(coupon.startDate),
      endDate: new Date(coupon.endDate),
      isActive: coupon.isActive
    });
    setIsEditCouponOpen(true);
  };

  const confirmDelete = (coupon: any) => {
    setSelectedCoupon(coupon);
    setIsDeleteCouponOpen(true);
  };

  const handleAddCoupon = () => {
    // Add coupon logic would go here
    toast({
      title: "Coupon Added",
      description: `Coupon ${couponForm.code} has been created successfully.`,
    });
    setIsAddCouponOpen(false);
    resetForm();
  };

  const handleUpdateCoupon = () => {
    // Update coupon logic would go here
    toast({
      title: "Coupon Updated",
      description: `Coupon ${couponForm.code} has been updated successfully.`,
    });
    setIsEditCouponOpen(false);
    resetForm();
  };

  const handleDeleteCoupon = () => {
    // Delete coupon logic would go here
    toast({
      title: "Coupon Deleted",
      description: `Coupon ${selectedCoupon?.code} has been deleted.`,
    });
    setIsDeleteCouponOpen(false);
    setSelectedCoupon(null);
  };

  const CouponFormContent = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="code">Coupon Code</Label>
          <Input 
            id="code" 
            name="code" 
            value={couponForm.code} 
            onChange={handleInputChange} 
            placeholder="SUMMER25" 
            className="uppercase"
          />
        </div>
        
        <div>
          <Label htmlFor="type">Discount Type</Label>
          <RadioGroup
            value={couponForm.type}
            onValueChange={(value) => handleSelectChange("type", value)}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage" className="cursor-pointer flex items-center">
                <Percent className="h-4 w-4 mr-1" /> Percentage
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed" className="cursor-pointer flex items-center">
                <Tag className="h-4 w-4 mr-1" /> Fixed Amount
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="amount">
            {couponForm.type === "percentage" ? "Discount Percentage (%)" : "Discount Amount ($)"}
          </Label>
          <Input 
            id="amount" 
            name="amount" 
            type="number" 
            value={couponForm.amount} 
            onChange={handleInputChange} 
            placeholder={couponForm.type === "percentage" ? "25" : "10"} 
          />
        </div>
        
        <div>
          <Label htmlFor="minimumPurchase">Minimum Purchase ($)</Label>
          <Input 
            id="minimumPurchase" 
            name="minimumPurchase" 
            type="number" 
            value={couponForm.minimumPurchase} 
            onChange={handleInputChange} 
            placeholder="50" 
          />
        </div>
        
        <div>
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal mt-1"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(couponForm.startDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-starry-darkPurple border-starry-purple" align="start">
              <Calendar
                mode="single"
                selected={couponForm.startDate}
                onSelect={handleStartDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal mt-1"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(couponForm.endDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-starry-darkPurple border-starry-purple" align="start">
              <Calendar
                mode="single"
                selected={couponForm.endDate}
                onSelect={handleEndDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch 
          id="isActive" 
          checked={couponForm.isActive} 
          onCheckedChange={(checked) => handleSwitchChange("isActive", checked)} 
        />
        <Label htmlFor="isActive">Active</Label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Discount & Coupon Management</h2>
        <Dialog open={isAddCouponOpen} onOpenChange={setIsAddCouponOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero-hover">
              <Plus className="mr-2 h-4 w-4" /> Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-starry-darkPurple text-white border-starry-purple max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Coupon</DialogTitle>
              <DialogDescription>
                Create a new coupon for your store.
              </DialogDescription>
            </DialogHeader>
            <CouponFormContent />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCouponOpen(false)}>Cancel</Button>
              <Button className="btn-hero-hover" onClick={handleAddCoupon}>Create Coupon</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          placeholder="Search coupons..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Select onValueChange={handleStatusChange} defaultValue="all">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Coupons</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
        <ScrollArea className="h-[500px] rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-starry-darkPurple/60">
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Min. Purchase</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Validity Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">No coupons found</TableCell>
                </TableRow>
              ) : (
                filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id} className="hover:bg-starry-darkPurple/60">
                    <TableCell className="font-medium">{coupon.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {coupon.type === "percentage" ? 
                          <span className="flex items-center"><Percent className="h-3 w-3 mr-1" /> Percentage</span> : 
                          <span className="flex items-center"><Tag className="h-3 w-3 mr-1" /> Fixed</span>
                        }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {coupon.type === "percentage" ? `${coupon.amount}%` : `$${coupon.amount.toFixed(2)}`}
                    </TableCell>
                    <TableCell>
                      {coupon.minimumPurchase > 0 ? `$${coupon.minimumPurchase.toFixed(2)}` : "None"}
                    </TableCell>
                    <TableCell>{coupon.usageCount}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>{coupon.startDate}</div>
                        <div>to</div>
                        <div>{coupon.endDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={coupon.isActive ? "default" : "destructive"}>
                        {coupon.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => editCoupon(coupon)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => confirmDelete(coupon)}
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Edit Coupon Dialog */}
      <Dialog open={isEditCouponOpen} onOpenChange={setIsEditCouponOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>
              Update the details for coupon {selectedCoupon?.code}.
            </DialogDescription>
          </DialogHeader>
          <CouponFormContent />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCouponOpen(false)}>Cancel</Button>
            <Button className="btn-hero-hover" onClick={handleUpdateCoupon}>Update Coupon</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={isDeleteCouponOpen} onOpenChange={setIsDeleteCouponOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the coupon {selectedCoupon?.code}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteCouponOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCoupon}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
