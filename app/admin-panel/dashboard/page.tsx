"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Shield,
  Users,
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  MoreHorizontal,
  LogOut,
  Search,
  Download,
  Plane,
  Building,
  Heart,
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  CreditCard,
  X
} from "lucide-react";
import { format, isAfter, isBefore, startOfDay, endOfDay, subDays, startOfMonth, subMonths } from "date-fns";
import type { DateRange } from "react-day-picker";

interface AdminAuth {
  id: number;
  username: string;
  email: string;
  role: string;
  loginTime: string;
}

interface Traveler {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  isPrimary: boolean;
}

interface FlightBooking {
  id: number;
  tripType: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate?: string;
  purpose: string;
  specialRequests?: string;
  deliveryTiming: string;
  pnrNumber?: string;
}

interface HotelBooking {
  id: number;
  destinationCity: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms: number;
  numberOfGuests: number;
  purpose: string;
  specialRequests?: string;
  confirmationNumber?: string;
}

interface InsuranceBooking {
  id: number;
  destinationCountry: string;
  travelStartDate: string;
  travelEndDate: string;
  coverageType: string;
  purpose: string;
  preExistingConditions?: string;
  specialRequests?: string;
  policyNumber?: string;
}

interface Order {
  id: string;
  serviceType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfTravelers: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  completedAt?: string;
  travelers: Traveler[];
  flightBooking?: FlightBooking;
  hotelBooking?: HotelBooking;
  insuranceBooking?: InsuranceBooking;
}

type DateFilter = 'today' | 'yesterday' | 'last7days' | 'thismonth' | 'last3months' | 'custom';

interface CustomDateRange {
  from?: Date;
  to?: Date;
}

export default function AdminDashboard() {
  const [adminAuth, setAdminAuth] = useState<AdminAuth | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, completedOrders: 0, averageOrderValue: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>('thismonth');
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Console log to verify component is loading
  console.log("🚀 AdminDashboard component loaded!");

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem("adminAuth");
    if (!authData) {
      router.push("/admin-panel");
      return;
    }
    setAdminAuth(JSON.parse(authData));
    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      if (response.ok) {
        const data = await response.json();
        console.log('📊 Fetched orders data:', data);
        console.log('🧑‍💼 Sample order with travelers:', data.allOrders?.[0] || data.orders?.[0]);
        setAllOrders(data.allOrders || data.orders);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Date filtering function
  const getDateRange = useCallback((filter: DateFilter, customRange?: CustomDateRange): { from: Date; to: Date } => {
    const now = new Date();
    const today = startOfDay(now);
    
    switch (filter) {
      case 'today':
        return { from: today, to: endOfDay(now) };
      case 'yesterday':
        const yesterday = subDays(today, 1);
        return { from: yesterday, to: endOfDay(yesterday) };
      case 'last7days':
        return { from: subDays(today, 6), to: endOfDay(now) };
      case 'thismonth':
        return { from: startOfMonth(now), to: endOfDay(now) };
      case 'last3months':
        return { from: startOfMonth(subMonths(now, 2)), to: endOfDay(now) };
      case 'custom':
        return {
          from: customRange?.from || subDays(today, 7),
          to: customRange?.to ? endOfDay(customRange.to) : endOfDay(now)
        };
      default:
        return { from: startOfMonth(now), to: endOfDay(now) };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin-panel");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: "default" as const, color: "bg-green-500", label: "Completed" },
      processing: { variant: "secondary" as const, color: "bg-yellow-500", label: "Processing" },
      pending: { variant: "outline" as const, color: "bg-orange-500", label: "Pending" },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className="capitalize">
        {config.label}
      </Badge>
    );
  };

  const getServiceIcon = (serviceType: string) => {
    // Normalize the service type to handle both formats
    const normalizedType = (serviceType || '').toLowerCase().replace('_', '-');
    
    switch (normalizedType) {
      case "flight-reservation":
        return <Plane className="h-4 w-4" />;
      case "hotel-booking":
        return <Building className="h-4 w-4" />;
      case "travel-insurance":
        return <Heart className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getServiceName = (serviceType: string) => {
    // Normalize the service type to handle both formats
    const normalizedType = (serviceType || '').toLowerCase().replace('_', '-');
    
    switch (normalizedType) {
      case "flight-reservation":
        return "Flight Reservation";
      case "hotel-booking":
        return "Hotel Booking";
      case "travel-insurance":
        return "Travel Insurance";
      default:
        return "Travel Service";
    }
  };


  // Update orders state when filters change
  useEffect(() => {
    const filtered = allOrders.filter(order => {
      const matchesSearch = (order.customerName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (order.customerEmail?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (order.id?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesService = serviceFilter === "all" || order.serviceType === serviceFilter;
      
      // Date filtering
      const orderDate = new Date(order.createdAt);
      const dateRange = getDateRange(dateFilter, customDateRange);
      const matchesDate = isAfter(orderDate, dateRange.from) && isBefore(orderDate, dateRange.to);
      
      return matchesSearch && matchesStatus && matchesService && matchesDate;
    });
    setOrders(filtered);
  }, [allOrders, searchTerm, statusFilter, serviceFilter, dateFilter, customDateRange, getDateRange]);

  // Export data functionality
  const exportToCSV = () => {
    const csvHeaders = [
      'Order ID',
      'Service Type',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Number of Travelers',
      'Total Amount',
      'Status',
      'Order Date',
      'Completed Date',
      'Travelers Details',
      'Service Details'
    ];

    const csvData = orders.map(order => {
      // Format travelers data
      const travelersInfo = order.travelers?.map(t => 
        `${t.title} ${t.firstName} ${t.lastName}${t.dateOfBirth ? ` (DOB: ${format(new Date(t.dateOfBirth), 'yyyy-MM-dd')})` : ''}${t.isPrimary ? ' [PRIMARY]' : ''}`
      ).join('; ') || 'No travelers';

      // Format service-specific details
      let serviceDetails = '';
      if (order.flightBooking) {
        serviceDetails = `Flight: ${order.flightBooking.departureAirport} to ${order.flightBooking.arrivalAirport}, Departure: ${format(new Date(order.flightBooking.departureDate), 'yyyy-MM-dd')}${order.flightBooking.returnDate ? `, Return: ${format(new Date(order.flightBooking.returnDate), 'yyyy-MM-dd')}` : ''}, Purpose: ${order.flightBooking.purpose}${order.flightBooking.pnrNumber ? `, PNR: ${order.flightBooking.pnrNumber}` : ''}`;
      } else if (order.hotelBooking) {
        serviceDetails = `Hotel: ${order.hotelBooking.destinationCity}, Check-in: ${format(new Date(order.hotelBooking.checkInDate), 'yyyy-MM-dd')}, Check-out: ${format(new Date(order.hotelBooking.checkOutDate), 'yyyy-MM-dd')}, Rooms: ${order.hotelBooking.numberOfRooms}, Guests: ${order.hotelBooking.numberOfGuests}${order.hotelBooking.confirmationNumber ? `, Confirmation: ${order.hotelBooking.confirmationNumber}` : ''}`;
      } else if (order.insuranceBooking) {
        serviceDetails = `Insurance: ${order.insuranceBooking.destinationCountry}, Travel: ${format(new Date(order.insuranceBooking.travelStartDate), 'yyyy-MM-dd')} to ${format(new Date(order.insuranceBooking.travelEndDate), 'yyyy-MM-dd')}, Coverage: ${order.insuranceBooking.coverageType}${order.insuranceBooking.policyNumber ? `, Policy: ${order.insuranceBooking.policyNumber}` : ''}`;
      }

      return [
        order.id,
        getServiceName(order.serviceType || ''),
        order.customerName || '',
        order.customerEmail || '',
        order.customerPhone || '',
        order.travelers?.length || 0,
        order.totalAmount || 0,
        order.status || '',
        order.createdAt ? format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm:ss') : '',
        order.completedAt ? format(new Date(order.completedAt), 'yyyy-MM-dd HH:mm:ss') : '',
        travelersInfo,
        serviceDetails
      ];
    });

    // Create CSV content
    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `orders-export-${format(new Date(), 'yyyy-MM-dd-HHmm')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Export single order data
  const exportSingleOrderToCSV = (order: Order) => {
    const csvHeaders = [
      'Field',
      'Value'
    ];

    // Format travelers data
    const travelersInfo = order.travelers?.map(t => 
      `${t.title} ${t.firstName} ${t.lastName}${t.dateOfBirth ? ` (DOB: ${format(new Date(t.dateOfBirth), 'yyyy-MM-dd')})` : ''}${t.isPrimary ? ' [PRIMARY]' : ''}`
    ).join('; ') || 'No travelers';

    // Format service-specific details
    let serviceDetails = '';
    if (order.flightBooking) {
      serviceDetails = `Flight: ${order.flightBooking.departureAirport} to ${order.flightBooking.arrivalAirport}, Departure: ${format(new Date(order.flightBooking.departureDate), 'yyyy-MM-dd')}${order.flightBooking.returnDate ? `, Return: ${format(new Date(order.flightBooking.returnDate), 'yyyy-MM-dd')}` : ''}, Purpose: ${order.flightBooking.purpose}${order.flightBooking.pnrNumber ? `, PNR: ${order.flightBooking.pnrNumber}` : ''}${order.flightBooking.specialRequests ? `, Special Requests: ${order.flightBooking.specialRequests}` : ''}`;
    } else if (order.hotelBooking) {
      serviceDetails = `Hotel: ${order.hotelBooking.destinationCity}, Check-in: ${format(new Date(order.hotelBooking.checkInDate), 'yyyy-MM-dd')}, Check-out: ${format(new Date(order.hotelBooking.checkOutDate), 'yyyy-MM-dd')}, Rooms: ${order.hotelBooking.numberOfRooms}, Guests: ${order.hotelBooking.numberOfGuests}${order.hotelBooking.confirmationNumber ? `, Confirmation: ${order.hotelBooking.confirmationNumber}` : ''}${order.hotelBooking.specialRequests ? `, Special Requests: ${order.hotelBooking.specialRequests}` : ''}`;
    } else if (order.insuranceBooking) {
      serviceDetails = `Insurance: ${order.insuranceBooking.destinationCountry}, Travel: ${format(new Date(order.insuranceBooking.travelStartDate), 'yyyy-MM-dd')} to ${format(new Date(order.insuranceBooking.travelEndDate), 'yyyy-MM-dd')}, Coverage: ${order.insuranceBooking.coverageType}${order.insuranceBooking.policyNumber ? `, Policy: ${order.insuranceBooking.policyNumber}` : ''}${order.insuranceBooking.preExistingConditions ? `, Pre-existing: ${order.insuranceBooking.preExistingConditions}` : ''}${order.insuranceBooking.specialRequests ? `, Special Requests: ${order.insuranceBooking.specialRequests}` : ''}`;
    }

    const csvData = [
      ['Order ID', order.id],
      ['Service Type', getServiceName(order.serviceType || '')],
      ['Customer Name', order.customerName || ''],
      ['Customer Email', order.customerEmail || ''],
      ['Customer Phone', order.customerPhone || ''],
      ['Number of Travelers', order.travelers?.length || 0],
      ['Total Amount (₹)', order.totalAmount || 0],
      ['Status', order.status || ''],
      ['Order Date', order.createdAt ? format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm:ss') : ''],
      ['Completed Date', order.completedAt ? format(new Date(order.completedAt), 'yyyy-MM-dd HH:mm:ss') : 'Not completed'],
      ['Travelers Details', travelersInfo],
      ['Service Details', serviceDetails]
    ];

    // Create CSV content
    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `order-${order.id}-export-${format(new Date(), 'yyyy-MM-dd-HHmm')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!adminAuth || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{adminAuth.username}</p>
                <p className="text-xs text-gray-500">{adminAuth.role}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedOrders}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{Math.round(stats.totalRevenue / (stats.totalOrders || 1)).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Per order average</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order Management</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={exportToCSV} disabled={orders.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Export ({orders.length} records)
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by customer name, email, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Date Filter */}
                <div className="flex gap-2">
                  <Select value={dateFilter} onValueChange={(value: DateFilter) => setDateFilter(value)}>
                    <SelectTrigger className="w-[160px]">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last7days">Last 7 days</SelectItem>
                      <SelectItem value="thismonth">This month</SelectItem>
                      <SelectItem value="last3months">Last 3 months</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {dateFilter === 'custom' && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {customDateRange?.from ? (
                            customDateRange.to ? (
                              <>
                                {format(customDateRange.from, "LLL dd, y")} -{" "}
                                {format(customDateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(customDateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={customDateRange?.from}
                          selected={customDateRange as DateRange}
                          onSelect={(range: DateRange | undefined) => setCustomDateRange(range || {})}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="FLIGHT_RESERVATION">Flight</SelectItem>
                    <SelectItem value="HOTEL_BOOKING">Hotel</SelectItem>
                    <SelectItem value="TRAVEL_INSURANCE">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <Drawer key={order.id}>
                      <TableRow>
                        <TableCell className="font-medium text-sm">
                          <DrawerTrigger asChild>
                            <Button variant="link" className="p-0 h-auto font-medium text-sm text-blue-600 hover:text-blue-800">
                              {order.id}
                            </Button>
                          </DrawerTrigger>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerName || 'N/A'}</p>
                            <p className="text-sm text-muted-foreground">{order.customerEmail || 'N/A'}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getServiceIcon(order.serviceType || '')}
                            <span className="text-sm">
                              {getServiceName(order.serviceType || '')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">₹{(order.totalAmount || 0).toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(order.status || 'pending')}</TableCell>
                        <TableCell className="text-sm">
                          {order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy") : 'N/A'}
                        </TableCell>
                      </TableRow>
                      
                      <DrawerContent className="max-h-[90vh] overflow-y-auto">
                        <DrawerHeader className="text-left border-b">
                          <div className="flex items-center justify-between">
                            <div>
                              <DrawerTitle className="flex items-center gap-2 text-xl">
                                {getServiceIcon(order.serviceType || '')}
                                Order Details - {order.id}
                              </DrawerTitle>
                              <DrawerDescription className="text-base">
                                {getServiceName(order.serviceType || '')} • {order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy 'at' HH:mm") : 'N/A'}
                              </DrawerDescription>
                            </div>
                            <DrawerClose asChild>
                              <Button variant="outline" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            </DrawerClose>
                          </div>
                        </DrawerHeader>
                        
                        <div className="px-6 py-4 space-y-6 overflow-y-auto flex-1">
                          {/* Customer Information */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <User className="h-5 w-5" />
                                Customer Information
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-medium">{order.customerName || 'N/A'}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{order.customerEmail || 'N/A'}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium">{order.customerPhone || 'N/A'}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Travelers</p>
                                    <p className="font-medium">{order.travelers?.length || 0}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Order Information */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <FileText className="h-5 w-5" />
                                Order Information
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Total Amount</p>
                                    <p className="font-medium text-lg">₹{(order.totalAmount || 0).toLocaleString()}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <div className="mt-1">
                                      {getStatusBadge(order.status || 'pending')}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Order Date</p>
                                    <p className="font-medium">{order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy 'at' HH:mm") : 'N/A'}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Completed Date</p>
                                    <p className="font-medium">{order.completedAt ? format(new Date(order.completedAt), "MMM dd, yyyy 'at' HH:mm") : 'Not completed'}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Travelers Information */}
                          {(() => {
                            console.log('👥 Order travelers data:', order.travelers);
                            return order.travelers && order.travelers.length > 0 ? (
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="flex items-center gap-2 text-lg">
                                    <Users className="h-5 w-5" />
                                    Travelers ({order.travelers.length})
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                  <div className="overflow-x-auto -mx-4">
                                    <div className="min-w-full px-4">
                                      <Table className="w-full">
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead className="min-w-[200px] text-left">Full Name</TableHead>
                                            <TableHead className="min-w-[140px] text-left">Date of Birth</TableHead>
                                            <TableHead className="min-w-[100px] text-left">Type</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {order.travelers.map((traveler, index) => {
                                            console.log(`👤 Traveler ${index + 1}:`, traveler);
                                            return (
                                              <TableRow key={traveler.id || index} className="border-b">
                                                <TableCell className="py-3">
                                                  <div className="font-medium text-sm">
                                                    {[
                                                      traveler.title?.trim(),
                                                      traveler.firstName?.trim(),
                                                      traveler.lastName?.trim()
                                                    ].filter(Boolean).join(' ') || 'N/A'}
                                                  </div>
                                                </TableCell>
                                                <TableCell className="py-3 text-sm">
                                                  {traveler.dateOfBirth ? (
                                                    format(new Date(traveler.dateOfBirth), "MMM dd, yyyy")
                                                  ) : (
                                                    <span className="text-muted-foreground">N/A</span>
                                                  )}
                                                </TableCell>
                                                <TableCell className="py-3">
                                                  {traveler.isPrimary ? (
                                                    <Badge variant="default" className="text-xs">Primary</Badge>
                                                  ) : (
                                                    <Badge variant="secondary" className="text-xs">Companion</Badge>
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            );
                                          })}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ) : (
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="flex items-center gap-2 text-lg">
                                    <Users className="h-5 w-5" />
                                    Travelers
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-center py-4 text-muted-foreground">
                                    <Users className="h-8 w-8 mx-auto mb-2" />
                                    <p>No traveler information available</p>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })()}

                          {/* Service-Specific Details */}
                          {order.flightBooking && (
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Plane className="h-5 w-5" />
                                  Flight Details
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="rounded-md border">
                                  <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="font-medium">Trip Type</TableCell>
                                        <TableCell>{order.flightBooking.tripType}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Route</TableCell>
                                        <TableCell>{order.flightBooking.departureAirport} → {order.flightBooking.arrivalAirport}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Departure Date</TableCell>
                                        <TableCell>{format(new Date(order.flightBooking.departureDate), "MMM dd, yyyy")}</TableCell>
                                      </TableRow>
                                      {order.flightBooking.returnDate && (
                                        <TableRow>
                                          <TableCell className="font-medium">Return Date</TableCell>
                                          <TableCell>{format(new Date(order.flightBooking.returnDate), "MMM dd, yyyy")}</TableCell>
                                        </TableRow>
                                      )}
                                      <TableRow>
                                        <TableCell className="font-medium">Purpose</TableCell>
                                        <TableCell>{order.flightBooking.purpose}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Delivery Timing</TableCell>
                                        <TableCell>{order.flightBooking.deliveryTiming}</TableCell>
                                      </TableRow>
                                      {order.flightBooking.pnrNumber && (
                                        <TableRow>
                                          <TableCell className="font-medium">PNR Number</TableCell>
                                          <TableCell className="font-mono">{order.flightBooking.pnrNumber}</TableCell>
                                        </TableRow>
                                      )}
                                      {order.flightBooking.specialRequests && (
                                        <TableRow>
                                          <TableCell className="font-medium">Special Requests</TableCell>
                                          <TableCell>{order.flightBooking.specialRequests}</TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {order.hotelBooking && (
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Building className="h-5 w-5" />
                                  Hotel Details
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="rounded-md border">
                                  <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="font-medium">Destination</TableCell>
                                        <TableCell>{order.hotelBooking.destinationCity}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Check-in Date</TableCell>
                                        <TableCell>{format(new Date(order.hotelBooking.checkInDate), "MMM dd, yyyy")}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Check-out Date</TableCell>
                                        <TableCell>{format(new Date(order.hotelBooking.checkOutDate), "MMM dd, yyyy")}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Rooms</TableCell>
                                        <TableCell>{order.hotelBooking.numberOfRooms}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Guests</TableCell>
                                        <TableCell>{order.hotelBooking.numberOfGuests}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Purpose</TableCell>
                                        <TableCell>{order.hotelBooking.purpose}</TableCell>
                                      </TableRow>
                                      {order.hotelBooking.confirmationNumber && (
                                        <TableRow>
                                          <TableCell className="font-medium">Confirmation Number</TableCell>
                                          <TableCell className="font-mono">{order.hotelBooking.confirmationNumber}</TableCell>
                                        </TableRow>
                                      )}
                                      {order.hotelBooking.specialRequests && (
                                        <TableRow>
                                          <TableCell className="font-medium">Special Requests</TableCell>
                                          <TableCell>{order.hotelBooking.specialRequests}</TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {order.insuranceBooking && (
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Heart className="h-5 w-5" />
                                  Insurance Details
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="rounded-md border">
                                  <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="font-medium">Destination Country</TableCell>
                                        <TableCell>{order.insuranceBooking.destinationCountry}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Travel Start Date</TableCell>
                                        <TableCell>{format(new Date(order.insuranceBooking.travelStartDate), "MMM dd, yyyy")}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Travel End Date</TableCell>
                                        <TableCell>{format(new Date(order.insuranceBooking.travelEndDate), "MMM dd, yyyy")}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Coverage Type</TableCell>
                                        <TableCell>{order.insuranceBooking.coverageType}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">Purpose</TableCell>
                                        <TableCell>{order.insuranceBooking.purpose}</TableCell>
                                      </TableRow>
                                      {order.insuranceBooking.policyNumber && (
                                        <TableRow>
                                          <TableCell className="font-medium">Policy Number</TableCell>
                                          <TableCell className="font-mono">{order.insuranceBooking.policyNumber}</TableCell>
                                        </TableRow>
                                      )}
                                      {order.insuranceBooking.preExistingConditions && (
                                        <TableRow>
                                          <TableCell className="font-medium">Pre-existing Conditions</TableCell>
                                          <TableCell>{order.insuranceBooking.preExistingConditions}</TableCell>
                                        </TableRow>
                                      )}
                                      {order.insuranceBooking.specialRequests && (
                                        <TableRow>
                                          <TableCell className="font-medium">Special Requests</TableCell>
                                          <TableCell>{order.insuranceBooking.specialRequests}</TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                        
                        <DrawerFooter className="pt-2">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => exportSingleOrderToCSV(order)}
                              className="flex-1"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Order Data
                            </Button>
                            <DrawerClose asChild>
                              <Button variant="secondary" className="flex-1">
                                Close
                              </Button>
                            </DrawerClose>
                          </div>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  ))}
                </TableBody>
              </Table>
            </div>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No orders found</h3>
                <p className="text-muted-foreground">Try adjusting your search, date range, or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}