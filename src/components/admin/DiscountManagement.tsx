import { useState, useEffect } from "react";
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
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Percent, Tag, Ticket, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as adminAPI from "@/api/admin";
import { toast } from "sonner";
import { Coupon } from "@/types";

export const DiscountManagement = () => {
  const { toast: uiToast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [isEditCouponOpen, setIsEditCouponOpen] = useState(false);
  const [isDeleteCouponOpen, setIsDeleteCouponOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [couponForm, setCouponForm] = useState({
    code: "",
    description: "",
    discountType: "percentage", // Changed from 'type' to match backend
    discountAmount: 0, // Changed from 'amount' to match backend
    minimumPurchase: 0,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    usageLimit: 0,
    isActive: true
  });

  // Fetch coupons data - fixed the useQuery syntax
  const { data: couponsData, isLoading: couponsLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: adminAPI.getCoupons,
    meta: { // Using meta for error handling instead of onError
      error: (error: any) => {
        console.error("Error fetching coupons:", error);
        uiToast({
          title: "Error",
          description: "Failed to load coupons. Using sample data.",
        });
      }
    }
  });

  // Create coupon mutation
  const createCouponMutation = useMutation({
    mutationFn: adminAPI.createCoupon,
    onSuccess: () => {
      toast.success("Coupon created successfully");
      setIsAddCouponOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error creating coupon:", error);
      toast.error("Failed to create coupon");
      setIsSubmitting(false);
    }
  });

  // Update coupon mutation
  const updateCouponMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminAPI.updateCoupon(id, data),
    onSuccess: () => {
      toast.success("Coupon updated successfully");
      setIsEditCouponOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error updating coupon:", error);
      toast.error("Failed to update coupon");
      setIsSubmitting(false);
    }
  });

  // Delete coupon mutation
  const deleteCouponMutation = useMutation({
    mutationFn: adminAPI.deleteCoupon,
    onSuccess: () => {
      toast.success("Coupon deleted successfully");
      setIsDeleteCouponOpen(false);
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error) => {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon");
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  // Use either API data or fallback to sample data
  const coupons = couponsData || sampleCoupons;

  const filteredCoupons = coupons.filter((coupon: Coupon) => {
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
      description: "",
      discountType: "percentage",
      discountAmount: 0,
      minimumPurchase: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      usageLimit: 0,
      isActive: true
    });
  };

  const editCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      description: coupon.description || "",
      discountType: coupon.discountType,
      discountAmount: coupon.discountAmount,
      minimumPurchase: coupon.minimumPurchase,
      startDate: new Date(coupon.startDate),
      endDate: new Date(coupon.endDate),
      usageLimit: coupon.usageLimit || 0,
      isActive: coupon.isActive
    });
    setIsEditCouponOpen(true);
  };

  const confirmDelete = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsDeleteCouponOpen(true);
  };

  const handleAddCoupon = () => {
    if (!validateCouponForm()) return;
    
    setIsSubmitting(true);
    createCouponMutation.mutate(couponForm);
  };

  const handleUpdateCoupon = () => {
    if (!selectedCoupon || !validateCouponForm()) return;
    
    setIsSubmitting(true);
    updateCouponMutation.mutate({ id: selectedCoupon.id, data: couponForm });
  };

  const handleDeleteCoupon = () => {
    if (!selectedCoupon) return;
    
    deleteCouponMutation.mutate(selectedCoupon.id);
  };

  const validateCouponForm = () => {
    if (!couponForm.code) {
      toast.error("Please enter a coupon code");
      return false;
    }
    
    if (couponForm.discountAmount <= 0) {
      toast.error("Discount amount must be greater than zero");
      return false;
    }
    
    if (couponForm.discountType === 'percentage' && couponForm.discountAmount > 100) {
      toast.error("Percentage discount cannot exceed 100%");
      return false;
    }
    
    if (couponForm.endDate < couponForm.startDate) {
      toast.error("End date cannot be earlier than start date");
      return false;
    }
    
    return true;
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
          <Label htmlFor="discountType">Discount Type</Label>
          <RadioGroup
            value={couponForm.discountType}
            onValueChange={(value) => handleSelectChange("discountType", value)}
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
          <Label htmlFor="discountAmount">
            {couponForm.discountType === "percentage" ? "Discount Percentage (%)" : "Discount Amount ($)"}
          </Label>
          <Input 
            id="discountAmount" 
            name="discountAmount" 
            type="number" 
            value={couponForm.discountAmount} 
            onChange={handleInputChange} 
            placeholder={couponForm.discountType === "percentage" ? "25" : "10"} 
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
        
        <div>
          <Label htmlFor="description">Description (optional)</Label>
          <Input 
            id="description" 
            name="description" 
            value={couponForm.description} 
            onChange={handleInputChange} 
            placeholder="Summer sale discount" 
          />
        </div>
        
        <div>
          <Label htmlFor="usageLimit">Usage Limit (0 for unlimited)</Label>
          <Input 
            id="usageLimit" 
            name="usageLimit" 
            type="number" 
            value={couponForm.usageLimit} 
            onChange={handleInputChange} 
            placeholder="100" 
          />
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
              <Button 
                className="btn-hero-hover" 
                onClick={handleAddCoupon}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : "Create Coupon"}
              </Button>
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
              {couponsLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin text-purple-500 mr-2" />
                      <span>Loading coupons...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredCoupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">No coupons found</TableCell>
                </TableRow>
              ) : (
                filteredCoupons.map((coupon: Coupon) => (
                  <TableRow key={coupon.id} className="hover:bg-starry-darkPurple/60">
                    <TableCell className="font-medium">{coupon.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {coupon.discountType === "percentage" ? 
                          <span className="flex items-center"><Percent className="h-3 w-3 mr-1" /> Percentage</span> : 
                          <span className="flex items-center"><Tag className="h-3 w-3 mr-1" /> Fixed</span>
                        }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {coupon.discountType === "percentage" ? `${coupon.discountAmount}%` : `$${coupon.discountAmount.toFixed(2)}`}
                    </TableCell>
                    <TableCell>
                      {coupon.minimumPurchase > 0 ? `$${coupon.minimumPurchase.toFixed(2)}` : "None"}
                    </TableCell>
                    <TableCell>{coupon.usageCount}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>{typeof coupon.startDate === 'string' ? coupon.startDate : format(coupon.startDate, 'yyyy-MM-dd')}</div>
                        <div>to</div>
                        <div>{typeof coupon.endDate === 'string' ? coupon.endDate : format(coupon.endDate, 'yyyy-MM-dd')}</div>
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
            <Button 
              className="btn-hero-hover" 
              onClick={handleUpdateCoupon}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : "Update Coupon"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <Button 
              variant="destructive" 
              onClick={handleDeleteCoupon}
              disabled={deleteCouponMutation.isPending}
            >
              {deleteCouponMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Sample data as fallback if API fails
const sampleCoupons: Coupon[] = [
  {
    id: "COUPON-001",
    code: "SUMMER25",
    discountType: "percentage",
    discountAmount: 25,
    minimumPurchase: 50,
    usageCount: 145,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    isActive: true
  },
  {
    id: "COUPON-002",
    code: "FREESHIP",
    discountType: "fixed",
    discountAmount: 10,
    minimumPurchase: 75,
    usageCount: 89,
    startDate: "2023-04-15",
    endDate: "2023-05-15",
    isActive: true
  },
  {
    id: "COUPON-003",
    code: "WELCOME10",
    discountType: "percentage",
    discountAmount: 10,
    minimumPurchase: 0,
    usageCount: 210,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    isActive: true
  },
  {
    id: "COUPON-004",
    code: "FLASH50",
    discountType: "percentage",
    discountAmount: 50,
    minimumPurchase: 150,
    usageCount: 32,
    startDate: "2023-04-10",
    endDate: "2023-04-12",
    isActive: false
  }
];
