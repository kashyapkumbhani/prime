"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2,
  Download,
  Mail,
  Phone,
  Calendar,
  Users,
  MapPin,
  Plane,
  Hotel,
  Heart,
  Home,
  FileText,
  Clock,
  Share2
} from "lucide-react";
import { format } from "date-fns";

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
  travelers: any[];
  numberOfTravelers: number;
  paymentMethod?: string;
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data.order);
      } else {
        setError("Order not found");
      }
    } catch (error) {
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

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
PRIME TRAVEL - BOOKING RECEIPT
===============================

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

Thank you for choosing Prime Travel!

For support, contact: support@primetravel.com
Phone: +91 9876543210
      `.trim();

      // Create and download file
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Prime-Travel-Receipt-${orderDetails.id}.txt`;
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
    
    const shareText = `🎉 Booking Confirmed with Prime Travel!\n\nOrder ID: ${orderDetails.id}\nService: ${getServiceName(orderDetails.serviceType)}\nTravelers: ${orderDetails.numberOfTravelers}\nAmount: ₹${orderDetails.totalAmount.toLocaleString()}\n\nThank you for choosing Prime Travel! 🛫✈️\n\nFor support: +91 9876543210`;
    
    const shareUrl = window.location.href;
    
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Prime Travel - Booking Confirmation',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for choosing Prime Travel. Your booking has been successfully processed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {getServiceIcon(orderDetails.serviceType)}
                  <span className="ml-2">{getServiceName(orderDetails.serviceType)}</span>
                </CardTitle>
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Confirmed
                </Badge>
              </div>
              <CardDescription>
                Order ID: <span className="font-mono text-blue-600">{orderDetails.id}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Description */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  {getServiceDescription(orderDetails.serviceType)}
                </p>
              </div>

              {/* Order Info */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="font-medium">Booking Date</div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(orderDetails.createdAt), "PPP 'at' p")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="font-medium">Number of Travelers</div>
                    <div className="text-sm text-gray-600">
                      {orderDetails.numberOfTravelers} traveler(s)
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="font-medium">Processing Time</div>
                    <div className="text-sm text-gray-600">
                      5-15 minutes (expedited processing)
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Details */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>₹{Math.round(orderDetails.totalAmount * 0.85).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>₹{Math.round(orderDetails.totalAmount * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{Math.round(orderDetails.totalAmount * 0.05).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-base">
                    <span>Total Paid</span>
                    <span>₹{orderDetails.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleDownloadReceipt}
                  disabled={isDownloading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleShareConfirmation}
                  variant="outline" 
                  className="w-full"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Confirmation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customer & Contact Info */}
          <div className="space-y-6">
            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-medium text-blue-600">
                      {orderDetails.customer.name?.charAt(0) || orderDetails.customer.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{orderDetails.customer.name || orderDetails.customer.email}</div>
                    <div className="text-sm text-gray-600">Primary Contact</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-3" />
                    <span className="text-sm">{orderDetails.customer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-3" />
                    <span className="text-sm">{orderDetails.customer.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-sm font-medium text-blue-600">1</span>
                    </div>
                    <div>
                      <div className="font-medium">Processing Started</div>
                      <div className="text-sm text-gray-600">Your booking is being processed by our team</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-sm font-medium text-gray-600">2</span>
                    </div>
                    <div>
                      <div className="font-medium">Document Preparation</div>
                      <div className="text-sm text-gray-600">Documents will be prepared within 5-15 minutes</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-sm font-medium text-gray-600">3</span>
                    </div>
                    <div>
                      <div className="font-medium">Email Delivery</div>
                      <div className="text-sm text-gray-600">Documents sent to {orderDetails.customer.email}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-800">Estimated Delivery</div>
                      <div className="text-yellow-600">Within 15 minutes to your email</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/contact")}>
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/")}>
                    <Home className="h-4 w-4 mr-2" />
                    Return Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}