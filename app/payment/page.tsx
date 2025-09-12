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
  Heart
} from "lucide-react";

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
    customerPhone: ""
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
        status: "COMPLETED"
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <Card>
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
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <Label
                        key={method.id}
                        htmlFor={method.id}
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Card Details Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => handleInputChange("number", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => handleInputChange("expiry", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {paymentMethod === "upi" && (
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                  />
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div>
                  <Label>Select Your Bank</Label>
                  <select className="w-full mt-2 p-3 border border-gray-300 rounded-md">
                    <option>Select Bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Bank of India</option>
                    <option>Punjab National Bank</option>
                  </select>
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

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Details */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getServiceIcon(bookingDetails.serviceType)}
                  <div>
                    <div className="font-medium">{getServiceName(bookingDetails.serviceType)}</div>
                    <div className="text-sm text-gray-500">{bookingDetails.travelers} traveler(s)</div>
                  </div>
                </div>
                <Badge variant="outline">Premium</Badge>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹{(bookingDetails.amount * 0.85).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>₹{(bookingDetails.amount * 0.1).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>₹{(bookingDetails.amount * 0.05).toFixed(0)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>₹{bookingDetails.amount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
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
