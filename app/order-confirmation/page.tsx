"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Download,
  Mail,
  Phone,
  Plane,
  Hotel,
  Heart,
  Home,
  FileText,
  Clock,
  Share2
} from "lucide-react";
import { format } from "date-fns";

interface Traveler {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
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

interface OrderDetails {
  id: string;
  serviceType: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
  travelers: Traveler[];
  numberOfTravelers: number;
  paymentMethod?: string;
  flightBooking?: FlightBooking;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const fetchOrderDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data.order);
      } else {
        setError("Order not found");
      }
    } catch {
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, fetchOrderDetails]);

  const getServiceIcon = (serviceType: string) => {
    // Normalize the service type to handle both formats
    const normalizedType = serviceType.toLowerCase().replace('_', '-');
    
    switch (normalizedType) {
      case "flight-reservation":
        return <Plane className="h-6 w-6 text-blue-600" />;
      case "hotel-booking":
        return <Hotel className="h-6 w-6 text-green-600" />;
      case "travel-insurance":
        return <Heart className="h-6 w-6 text-red-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  const getServiceName = (serviceType: string) => {
    // Normalize the service type to handle both formats
    const normalizedType = serviceType.toLowerCase().replace('_', '-');
    
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

  const getServiceDescription = (serviceType: string) => {
    // Normalize the service type to handle both formats
    const normalizedType = serviceType.toLowerCase().replace('_', '-');
    
    switch (normalizedType) {
      case "flight-reservation":
        return "Your flight reservation documents will be processed and delivered within 15 minutes.";
      case "hotel-booking":
        return "Your hotel booking confirmation will be processed and sent to your email.";
      case "travel-insurance":
        return "Your travel insurance policy documents will be generated and emailed to you.";
      default:
        return "Your booking will be processed and confirmed.";
    }
  };

  const handleDownloadReceipt = async () => {
    if (!orderDetails) return;
    
    setIsDownloading(true);
    
    try {
      // Create receipt content
      const receiptContent = `
PRIMEDUMMYTICKET - BOOKING RECEIPT
==================================

Order ID: ${orderDetails.id}
Booking Date: ${format(new Date(orderDetails.createdAt), "PPP 'at' p")}

Service Details:
- Service: ${getServiceName(orderDetails.serviceType)}
- Travelers: ${orderDetails.numberOfTravelers}
- Status: ${orderDetails.status}

Customer Information:
- Name: ${orderDetails.customer.name || orderDetails.customer.email}
- Email: ${orderDetails.customer.email}
- Phone: ${orderDetails.customer.phone}

Payment Summary:
- Service Fee: ₹${Math.round(orderDetails.totalAmount * 0.85).toLocaleString()}
- Processing Fee: ₹${Math.round(orderDetails.totalAmount * 0.1).toLocaleString()}
- Taxes & Fees: ₹${Math.round(orderDetails.totalAmount * 0.05).toLocaleString()}
- Total Paid: ₹${orderDetails.totalAmount.toLocaleString()}

Thank you for choosing PrimeDummyTicket!

For support:
- WhatsApp (Fastest): +91 93161 05685
- Email: primedummyticket@gmail.com
- Phone: +91 93161 05685
- Website: https://primedummyticket.com
      `.trim();

      // Create and download file
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PrimeDummyTicket-Receipt-${orderDetails.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Show success message
      alert('Receipt downloaded successfully!');
      
    } catch (error) {
      console.error('Error downloading receipt:', error);
      alert('Failed to download receipt. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareConfirmation = async () => {
    if (!orderDetails) return;
    
    const shareText = `🎉 Booking Confirmed with PrimeDummyTicket!\n\nOrder ID: ${orderDetails.id}\nService: ${getServiceName(orderDetails.serviceType)}\nTravelers: ${orderDetails.numberOfTravelers}\nAmount: ₹${orderDetails.totalAmount.toLocaleString()}\n\nThank you for choosing PrimeDummyTicket! 🛫✈️\n\nFor support: +91 93161 05685 (WhatsApp)`;
    
    const shareUrl = window.location.href;
    
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PrimeDummyTicket - Booking Confirmation',
          text: shareText,
          url: shareUrl
        });
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          fallbackShare(shareText, shareUrl);
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      fallbackShare(shareText, shareUrl);
    }
  };

  const fallbackShare = (text: string, url: string) => {
    // Copy to clipboard
    const shareContent = `${text}\n\nConfirmation Link: ${url}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareContent).then(() => {
        alert('Confirmation details copied to clipboard! You can now share it anywhere.');
      }).catch(() => {
        // Fallback to manual copy
        showShareModal(shareContent);
      });
    } else {
      // Fallback for older browsers
      showShareModal(shareContent);
    }
  };

  const showShareModal = (content: string) => {
    const shareWindow = window.open('', '_blank', 'width=500,height=400');
    if (shareWindow) {
      shareWindow.document.write(`
        <html>
          <head><title>Share Confirmation</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Share Your Booking Confirmation</h2>
            <p>Copy the text below and share it:</p>
            <textarea style="width: 100%; height: 200px; margin: 10px 0; padding: 10px;" readonly>${content}</textarea>
            <button onclick="navigator.clipboard.writeText(document.querySelector('textarea').value).then(() => alert('Copied!')); window.close();" style="background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Copy & Close</button>
          </body>
        </html>
      `);
    } else {
      alert('Please copy this confirmation:\n\n' + content);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="text-red-600 mb-4">
              <FileText className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => router.push("/")} className="w-full">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center shadow-xl">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Thank you for choosing PrimeDummyTicket. Your booking has been successfully processed and is being prepared for delivery.
          </p>
          <div className="mt-6 inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-green-200">
            <span className="text-sm font-medium text-green-700">Order ID:</span>
            <span className="ml-2 font-mono text-lg font-bold text-green-800">{orderDetails.id}</span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Premium Service Summary Card */}
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-green-600 via-emerald-700 to-green-800 text-white p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full transform -translate-x-20 translate-y-20"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                    <div className="flex items-center space-x-4 mb-6 lg:mb-0">
                      <div className="bg-white/20 rounded-full p-4">
                        {getServiceIcon(orderDetails.serviceType)}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold mb-1">{getServiceName(orderDetails.serviceType)}</h2>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-green-500/20 rounded-full px-3 py-1">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            <span className="text-green-100 text-sm">Confirmed & Processing</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-4xl font-bold mb-2">
                        ₹{orderDetails.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-green-100 text-sm">
                        {orderDetails.numberOfTravelers} Traveler{orderDetails.numberOfTravelers > 1 ? 's' : ''} • Paid
                      </div>
                    </div>
                  </div>
                  
                  {/* Service Description */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                    <p className="text-green-100 text-lg leading-relaxed">
                      {getServiceDescription(orderDetails.serviceType)}
                    </p>
                  </div>
                  
                  {/* Service Features */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-300" />
                      <span className="text-green-100">Instant confirmation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-300" />
                      <span className="text-green-100">5-15 min delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-green-300" />
                      <span className="text-green-100">Email delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-green-300" />
                      <span className="text-green-100">24/7 support</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons Section */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    onClick={handleDownloadReceipt}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                        Generating Receipt...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-3" />
                        Download Receipt
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleShareConfirmation}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Share2 className="h-5 w-5 mr-3" />
                    Share Confirmation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Flight Booking Details */}
            {orderDetails.flightBooking && (
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50 border-b">
                  <CardTitle className="flex items-center text-xl">
                    <Plane className="h-6 w-6 mr-3 text-blue-600" />
                    Flight Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {/* Route Visualization */}
                  <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Flight Route</h4>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {orderDetails.flightBooking.departureAirport}
                        </div>
                        <div className="text-sm text-gray-600">Departure</div>
                      </div>
                      <div className="mx-8 flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="h-px bg-blue-400 w-16"></div>
                        <Plane className="h-6 w-6 text-blue-600 mx-2" />
                        <div className="h-px bg-blue-400 w-16"></div>
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {orderDetails.flightBooking.arrivalAirport}
                        </div>
                        <div className="text-sm text-gray-600">Arrival</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Flight Information Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                      <div className="text-sm text-purple-600 font-bold mb-2">Trip Type</div>
                      <div className="text-lg font-bold text-gray-900 capitalize">
                        {orderDetails.flightBooking.tripType.replace("-", " ")}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                      <div className="text-sm text-green-600 font-bold mb-2">Travel Purpose</div>
                      <div className="text-lg font-bold text-gray-900">{orderDetails.flightBooking.purpose}</div>
                    </div>
                  </div>
                  
                  {/* Travel Dates */}
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
                      <div className="text-sm text-orange-600 font-bold mb-2">Departure Date</div>
                      <div className="text-lg font-bold text-gray-900">
                        {format(new Date(orderDetails.flightBooking.departureDate), "EEEE, MMMM dd, yyyy")}
                      </div>
                    </div>
                    
                    {orderDetails.flightBooking.returnDate && (
                      <div className="bg-pink-50 rounded-xl p-5 border border-pink-200">
                        <div className="text-sm text-pink-600 font-bold mb-2">Return Date</div>
                        <div className="text-lg font-bold text-gray-900">
                          {format(new Date(orderDetails.flightBooking.returnDate), "EEEE, MMMM dd, yyyy")}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* PNR Number (if available) */}
                  {orderDetails.flightBooking.pnrNumber && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600 mr-3" />
                        <span className="text-lg font-bold text-gray-900">PNR Number</span>
                      </div>
                      <div className="font-mono text-2xl font-bold text-green-700 tracking-wider">
                        {orderDetails.flightBooking.pnrNumber}
                      </div>
                      <div className="text-sm text-green-600 mt-2">Use this PNR for check-in and boarding</div>
                    </div>
                  )}
                  
                  {/* Special Requests */}
                  {orderDetails.flightBooking.specialRequests && (
                    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5">
                      <div className="text-sm text-yellow-600 font-bold mb-2">Special Requests</div>
                      <div className="text-gray-700">{orderDetails.flightBooking.specialRequests}</div>
                    </div>
                  )}
                  
                  {/* Delivery Information */}
                  <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200">
                    <div className="text-sm text-indigo-600 font-bold mb-2">Document Delivery</div>
                    <div className="text-lg font-bold text-gray-900 capitalize">
                      {orderDetails.flightBooking.deliveryTiming}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">via email to {orderDetails.customer.email}</div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            

            {/* What's Next */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <Clock className="h-6 w-6 mr-3 text-orange-600" />
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900 mb-2">Processing Started</div>
                      <div className="text-gray-600">Your booking is being processed by our expert team right now</div>
                      <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        ✓ In Progress
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900 mb-2">Document Preparation</div>
                      <div className="text-gray-600">Your travel documents are being prepared and verified</div>
                      <div className="mt-2 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        ⏳ 5-15 minutes
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900 mb-2">Email Delivery</div>
                      <div className="text-gray-600">Documents will be sent to <span className="font-medium text-purple-600">{orderDetails.customer.email}</span></div>
                      <div className="mt-2 inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                        📧 Email Notification
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="h-6 w-6 text-yellow-600 mr-3" />
                    <span className="text-lg font-bold text-gray-900">Estimated Delivery</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-700 mb-2">Within 15 Minutes</div>
                  <div className="text-yellow-600">Check your email inbox and spam folder</div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <Phone className="h-6 w-6 mr-3 text-indigo-600" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-14 text-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:bg-blue-100 transition-all duration-200" 
                    onClick={() => router.push("/contact")}
                  >
                    <Phone className="h-5 w-5 mr-3 text-blue-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Contact Support</div>
                      <div className="text-sm text-gray-600">Get help from our travel experts</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-14 text-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:bg-green-100 transition-all duration-200" 
                    onClick={() => router.push("/")}
                  >
                    <Home className="h-5 w-5 mr-3 text-green-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Return Home</div>
                      <div className="text-sm text-gray-600">Explore more travel services</div>
                    </div>
                  </Button>
                  
                  {/* Quick Contact Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center text-sm text-gray-600">
                      <div className="mb-2">WhatsApp Support: <span className="font-semibold text-green-600">+91 93161 05685</span></div>
                      <div className="mb-2">Emergency Phone: <span className="font-semibold text-gray-900">+91 93161 05685</span></div>
                      <div>Email: <span className="font-semibold text-gray-900">primedummyticket@gmail.com</span></div>
                      <div className="mt-2">24/7 Support • Avg response: 30 minutes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
