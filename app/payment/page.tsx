"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Shield, 
  Lock,
  CheckCircle,
  ArrowLeft,
  Plane,
  Hotel,
  Heart,
  Users,
  Calendar,
  MapPin,
  Clock,
  Globe
} from "lucide-react";
import { format } from "date-fns";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  
  // Get booking details from URL params or localStorage
  const [bookingDetails, setBookingDetails] = useState({
    serviceType: searchParams.get("service") || "flight-reservation",
    amount: parseInt(searchParams.get("amount") || "2999"),
    travelers: parseInt(searchParams.get("travelers") || "1"),
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    // Flight specific details
    tripType: "",
    departureAirport: null,
    arrivalAirport: null,
    departureDate: null,
    returnDate: null,
    purpose: "",
    deliveryTiming: ""
  });

  useEffect(() => {
    // Try to get booking details from localStorage if available
    const savedBookingData = localStorage.getItem("currentBooking");
    if (savedBookingData) {
      const bookingData = JSON.parse(savedBookingData);
      setBookingDetails(prev => ({
        ...prev,
        ...bookingData
      }));
    }
    
    // Also try to get detailed form data from localStorage
    const savedFormData = localStorage.getItem("flightFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setBookingDetails(prev => ({
        ...prev,
        ...formData
      }));
    }
  }, []);

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "flight-reservation":
        return <Plane className="h-5 w-5" />;
      case "hotel-booking":
        return <Hotel className="h-5 w-5" />;
      case "travel-insurance":
        return <Heart className="h-5 w-5" />;
      default:
        return <Plane className="h-5 w-5" />;
    }
  };

  const getServiceName = (serviceType: string) => {
    switch (serviceType) {
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

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, MasterCard, American Express"
    },
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "GPay, PhonePe, Paytm, BHIM"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks supported"
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create order in database
    try {
      const orderData = {
        serviceType: bookingDetails.serviceType,
        customerName: bookingDetails.customerName || "John Doe",
        customerEmail: bookingDetails.customerEmail || "john.doe@example.com",
        customerPhone: bookingDetails.customerPhone || "+91 9876543210",
        numberOfTravelers: bookingDetails.travelers,
        totalAmount: bookingDetails.amount,
        paymentMethod: paymentMethod,
        status: "COMPLETED",
        // Include flight reservation details
        primaryTraveler: bookingDetails.primaryTraveler,
        additionalTravelers: bookingDetails.additionalTravelers,
        tripType: bookingDetails.tripType,
        departureAirport: bookingDetails.departureAirport,
        arrivalAirport: bookingDetails.arrivalAirport,
        departureDate: bookingDetails.departureDate,
        returnDate: bookingDetails.returnDate,
        purpose: bookingDetails.purpose,
        deliveryTiming: bookingDetails.deliveryTiming,
        specialRequest: bookingDetails.specialRequest
      };

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const { orderId } = await response.json();
        // Clear booking data
        localStorage.removeItem("currentBooking");
        // Redirect to confirmation
        router.push(`/order-confirmation?orderId=${orderId}`);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Booking
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Secure payment processing for your travel booking</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods - Left Side */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Secure Payment
              </CardTitle>
              <CardDescription>
                Choose your preferred payment method. All transactions are encrypted and secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <Label className="text-base font-medium mb-4 block">Select Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <Label
                        key={method.id}
                        htmlFor={method.id}
                        className={`flex flex-col items-center space-y-2 p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          paymentMethod === method.id ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} className="mb-2" />
                        <IconComponent className={`h-8 w-8 ${
                          paymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <div className="text-center">
                          <div className="font-medium text-sm">{method.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{method.description}</div>
                        </div>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Card Details Form */}
              {paymentMethod === "card" && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <h3 className="font-medium text-gray-900 mb-4">Card Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => handleInputChange("number", e.target.value)}
                        className="text-lg h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => handleInputChange("expiry", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {paymentMethod === "upi" && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">UPI Payment</h3>
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@paytm"
                      className="h-12 text-lg"
                    />
                    <p className="text-sm text-gray-500 mt-2">Enter your UPI ID to proceed with payment</p>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Net Banking</h3>
                  <div>
                    <Label>Select Your Bank</Label>
                    <select className="w-full mt-2 p-3 h-12 border border-gray-300 rounded-md bg-white">
                      <option>Select Bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Bank of India</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Lock className="h-5 w-5 text-green-600 mr-3" />
                <div className="text-sm">
                  <div className="font-medium text-green-800">Secure Payment</div>
                  <div className="text-green-600">Your payment information is encrypted and secure</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary - Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                    <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                    <div className="flex items-center space-x-2 text-blue-100">
                      {getServiceIcon(bookingDetails.serviceType)}
                      <span className="text-base font-medium">{getServiceName(bookingDetails.serviceType)}</span>
                    </div>
                    <p className="text-blue-100 text-sm mt-1">With Real PNR Number</p>
                  </div>

                  {/* Service Details */}
                  <div className="p-4 border-b">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        ₹{bookingDetails.amount.toLocaleString()}
                      </div>
                      <p className="text-gray-600 text-sm">
                        Total for {bookingDetails.travelers} traveler{bookingDetails.travelers > 1 ? 's' : ''}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        ₹999 per traveler
                      </p>
                    </div>
                  </div>

                  {/* Trip Details Section */}
                  {(bookingDetails.departureAirport || bookingDetails.arrivalAirport) && (
                    <div className="p-4 bg-gray-50 border-b">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">Trip Details</h3>
                      <div className="space-y-2 text-xs">
                    {bookingDetails.departureAirport && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">From: </span>
                          <span className="font-medium">
                            {bookingDetails.departureAirport.city} ({bookingDetails.departureAirport.code})
                          </span>
                        </div>
                      </div>
                    )}
                    {bookingDetails.arrivalAirport && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">To: </span>
                          <span className="font-medium">
                            {bookingDetails.arrivalAirport.city} ({bookingDetails.arrivalAirport.code})
                          </span>
                        </div>
                      </div>
                    )}
                    {bookingDetails.departureDate && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">Departure: </span>
                          <span className="font-medium">
                            {format(new Date(bookingDetails.departureDate), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    )}
                    {bookingDetails.tripType === "round-trip" && bookingDetails.returnDate && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">Return: </span>
                          <span className="font-medium">
                            {format(new Date(bookingDetails.returnDate), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    )}
                    {bookingDetails.tripType && (
                      <div className="flex items-center">
                        <Plane className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">Trip Type: </span>
                          <span className="font-medium capitalize">{bookingDetails.tripType.replace("-", " ")}</span>
                        </div>
                      </div>
                    )}
                    {bookingDetails.purpose && (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">Purpose: </span>
                          <span className="font-medium">{bookingDetails.purpose}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Customer Details */}
              {(bookingDetails.customerName || bookingDetails.customerEmail) && (
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-3">Customer Details</h3>
                  <div className="space-y-2 text-sm">
                    {bookingDetails.customerName && (
                      <div>
                        <span className="text-gray-500">Name: </span>
                        <span className="font-medium">{bookingDetails.customerName}</span>
                      </div>
                    )}
                    {bookingDetails.customerEmail && (
                      <div>
                        <span className="text-gray-500">Email: </span>
                        <span className="font-medium">{bookingDetails.customerEmail}</span>
                      </div>
                    )}
                    {bookingDetails.customerPhone && (
                      <div>
                        <span className="text-gray-500">Phone: </span>
                        <span className="font-medium">{bookingDetails.customerPhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Features Section */}
              <div className="p-6 space-y-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Real PNR number included</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Delivered in 15-30 minutes</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Embassy-approved format</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium">Worldwide acceptance</span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="p-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>₹{(bookingDetails.amount * 0.85).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Fee</span>
                    <span>₹{(bookingDetails.amount * 0.1).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>₹{(bookingDetails.amount * 0.05).toFixed(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span>₹{bookingDetails.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="p-6">
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg mb-4"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Pay ₹{bookingDetails.amount.toLocaleString()}
                    </>
                  )}
                </Button>

                {/* Trust Indicators */}
                <div className="text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>SSL Encrypted</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>PCI Compliant</span>
                  </div>
                  <p>Your payment information is safe and secure</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading payment details...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
