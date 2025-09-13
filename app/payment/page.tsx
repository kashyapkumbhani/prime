"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Lock,
  CheckCircle,
  ArrowLeft,
  Plane,
  Hotel,
  Heart,
  Clock,
  Globe
} from "lucide-react";
import { format } from "date-fns";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setTokenError('Invalid payment session. Please start your booking again.');
        setIsLoading(false);
        return;
      }

      setPaymentToken(token);

      try {
        const response = await fetch('/api/validate-payment-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid) {
            setBookingDetails(data.data);
            console.log('Validated booking details:', data.data);
          } else {
            setTokenError(data.error || 'Invalid token');
          }
        } else {
          const errorData = await response.json();
          setTokenError(errorData.error || 'Token validation failed');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setTokenError('Network error. Please try again.');
      }

      setIsLoading(false);
    };

    validateToken();
  }, [searchParams]);

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


  const handlePayment = async () => {
    if (!paymentToken) {
      alert('Invalid payment session');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create order using secure token
    try {
      const response = await fetch('/api/orders/create-with-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: paymentToken,
          paymentMethod: "card"
        }),
      });

      if (response.ok) {
        const { orderId } = await response.json();
        // Redirect to confirmation
        router.push(`/order-confirmation?orderId=${orderId}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };


  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Validating Payment Session</h2>
              <p className="text-gray-600">Please wait while we verify your booking details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (tokenError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Session Expired</h2>
                <p className="text-gray-600 mb-6">{tokenError}</p>
                <Button onClick={() => router.push('/')} className="w-full">
                  Start New Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Invalid booking details
  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Booking Found</h2>
                <p className="text-gray-600 mb-6">Unable to load your booking details. Please start a new booking.</p>
                <Button onClick={() => router.push('/')} className="w-full">
                  Start New Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="mb-6 hover:bg-blue-50 border-blue-200 text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Start New Booking
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Payment</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Review your booking details and proceed with secure payment</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Premium Order Summary Card */}
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full transform -translate-x-20 translate-y-20"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                    <div className="flex items-center space-x-4 mb-6 lg:mb-0">
                      <div className="bg-white/20 rounded-full p-4">
                        {getServiceIcon(bookingDetails.service)}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold mb-1">{getServiceName(bookingDetails.service)}</h2>
                        <p className="text-blue-100 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {bookingDetails.service === "hotel-booking" ? 
                            "Real Hotel Confirmation • Embassy Approved" : 
                            "With Real PNR Number • Embassy Approved"
                          }
                        </p>
                        {/* Lead Passenger Info */}
                        {bookingDetails.bookingDetails?.primaryTraveler && (
                          <div className="mt-3 bg-white/10 rounded-lg px-3 py-2">
                            <div className="text-xs text-blue-200 mb-1">Lead Passenger</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.bookingDetails.primaryTraveler.title} {bookingDetails.bookingDetails.primaryTraveler.firstName} {bookingDetails.bookingDetails.primaryTraveler.lastName}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-4xl font-bold mb-2">
                        ₹{bookingDetails.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-blue-100 text-sm">
                        {bookingDetails.travelers} Traveler{bookingDetails.travelers > 1 ? 's' : ''} • ₹{bookingDetails.service === "hotel-booking" ? "799" : bookingDetails.service === "travel-insurance" ? "1499" : "999"} each
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Trip Route Visual with More Details */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {bookingDetails.serviceType === "hotel-booking" ? "Hotel Booking Details" : "Travel Details"}
                      </h3>
                    </div>
                    
                    {bookingDetails.serviceType === "hotel-booking" ? (
                      /* Hotel Booking Information */
                      <div className="space-y-4">
                        {/* Hotel Information */}
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-4">
                            <Hotel className="h-12 w-12 text-white bg-white/20 rounded-full p-3" />
                          </div>
                          <div className="text-2xl font-bold mb-2">
                            {bookingDetails.bookingDetails?.destinationCity || "Hotel Destination"}
                          </div>
                          <div className="text-blue-100 text-sm">
                            {bookingDetails.bookingDetails?.numberOfHotels || 1} Hotel{(bookingDetails.bookingDetails?.numberOfHotels || 1) > 1 ? 's' : ''} Reserved
                          </div>
                        </div>
                        
                        {/* Check-in and Check-out Dates */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <div className="text-center bg-white/10 rounded-lg p-4 flex-1">
                            <div className="text-blue-200 text-sm mb-1">Check-in Date</div>
                            <div className="text-white font-semibold">
                              {(() => {
                                if (bookingDetails.bookingDetails?.checkInDate) {
                                  try {
                                    const date = new Date(bookingDetails.bookingDetails.checkInDate);
                                    if (date.toString() !== 'Invalid Date') {
                                      return format(date, "MMM dd, yyyy");
                                    }
                                  } catch (e) {
                                    console.log("Check-in date parsing error:", e, bookingDetails.bookingDetails?.checkInDate);
                                  }
                                }
                                return "Date TBD";
                              })()} 
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="h-px bg-white/40 w-16 md:w-32"></div>
                            <Hotel className="h-6 w-6 text-white mx-4" />
                            <div className="h-px bg-white/40 w-16 md:w-32"></div>
                          </div>
                          
                          <div className="text-center bg-white/10 rounded-lg p-4 flex-1">
                            <div className="text-blue-200 text-sm mb-1">Check-out Date</div>
                            <div className="text-white font-semibold">
                              {(() => {
                                if (bookingDetails.bookingDetails?.checkOutDate) {
                                  try {
                                    const date = new Date(bookingDetails.bookingDetails.checkOutDate);
                                    if (date.toString() !== 'Invalid Date') {
                                      return format(date, "MMM dd, yyyy");
                                    }
                                  } catch (e) {
                                    console.log("Check-out date parsing error:", e, bookingDetails.bookingDetails?.checkOutDate);
                                  }
                                }
                                return "Date TBD";
                              })()} 
                            </div>
                          </div>
                        </div>
                        
                        {/* Duration calculation for hotels */}
                        {bookingDetails.bookingDetails?.checkInDate && bookingDetails.bookingDetails?.checkOutDate && (
                          <div className="text-center">
                            <div className="text-blue-200 text-sm">Duration</div>
                            <div className="text-white font-bold text-lg">
                              {(() => {
                                try {
                                  const checkIn = new Date(bookingDetails.bookingDetails.checkInDate);
                                  const checkOut = new Date(bookingDetails.bookingDetails.checkOutDate);
                                  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
                                  return `${nights} night${nights > 1 ? 's' : ''}`;
                                } catch {
                                  return "Duration TBD";
                                }
                              })()} 
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Flight Route Information - Always show the flight path */
                      <div>
                        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                          {/* Departure */}
                          <div className="text-center mb-4 md:mb-0">
                            <div className="text-2xl font-bold mb-1">
                              {bookingDetails.bookingDetails?.departureAirport?.code || "DEP"}
                            </div>
                            <div className="text-blue-100 text-sm font-medium">
                              {bookingDetails.bookingDetails?.departureAirport?.city || "Departure City"}
                            </div>
                            <div className="text-xs text-blue-200">
                              {bookingDetails.bookingDetails?.departureAirport?.name || "International Airport"}
                            </div>
                            <div className="text-xs text-blue-200 mt-1 bg-white/10 rounded px-2 py-1">
                              {(() => {
                                if (bookingDetails.bookingDetails?.departureDate) {
                                  try {
                                    const date = new Date(bookingDetails.bookingDetails.departureDate);
                                    if (date.toString() !== 'Invalid Date') {
                                      return `Depart: ${format(date, "MMM dd, yyyy")}`;
                                    }
                                  } catch (e) {
                                    console.log("Date parsing error:", e, bookingDetails.bookingDetails?.departureDate);
                                  }
                                }
                                return "Departure Date: TBD";
                              })()} 
                            </div>
                          </div>
                          
                          {/* Flight Path */}
                          <div className="flex-1 flex items-center justify-center mb-4 md:mb-0">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                              <div className="h-px bg-white/40 w-16 md:w-32"></div>
                              <Plane className="h-6 w-6 text-white" />
                              <div className="h-px bg-white/40 w-16 md:w-32"></div>
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Arrival */}
                          <div className="text-center">
                            <div className="text-2xl font-bold mb-1">
                              {bookingDetails.bookingDetails?.arrivalAirport?.code || "ARR"}
                            </div>
                            <div className="text-blue-100 text-sm font-medium">
                              {bookingDetails.bookingDetails?.arrivalAirport?.city || "Arrival City"}
                            </div>
                            <div className="text-xs text-blue-200">
                              {bookingDetails.bookingDetails?.arrivalAirport?.name || "International Airport"}
                            </div>
                            {bookingDetails.bookingDetails?.tripType === "round-trip" && (
                              <div className="text-xs text-blue-200 mt-1 bg-white/10 rounded px-2 py-1">
                                {(() => {
                                  if (bookingDetails.bookingDetails?.returnDate) {
                                    try {
                                    const date = new Date(bookingDetails.bookingDetails.returnDate);
                                      if (date.toString() !== 'Invalid Date') {
                                        return `Return: ${format(date, "MMM dd, yyyy")}`;
                                      }
                                    } catch (e) {
                                    console.log("Return date parsing error:", e, bookingDetails.bookingDetails?.returnDate);
                                    }
                                  }
                                  return "Return Date: TBD";
                                })()} 
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Additional Travel Info - Service-specific data */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      {bookingDetails.serviceType === "hotel-booking" ? (
                        <>
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Destination</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.bookingDetails?.destinationCity || "TBD"}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Hotels</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.bookingDetails?.numberOfHotels || 1} Hotel{(bookingDetails.bookingDetails?.numberOfHotels || 1) > 1 ? 's' : ''}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Travelers</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.travelers} Guest{bookingDetails.travelers > 1 ? 's' : ''}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Delivery</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.bookingDetails?.deliveryTiming === "immediate" ? "20-60 min" : "Later date"}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Trip Type</div>
                            <div className="text-white font-semibold capitalize">
                              {bookingDetails.bookingDetails?.tripType ? bookingDetails.bookingDetails.tripType.replace("-", " ") : "One Way"}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Purpose</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.bookingDetails?.purpose || "Business"}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Passengers</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.travelers} Traveler{bookingDetails.travelers > 1 ? 's' : ''}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Delivery</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.bookingDetails?.deliveryTiming || "15-30 min"}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Data Source Indicator */}
                    <div className="mt-4 text-center">
                      <div className="text-xs text-blue-300">
                        {bookingDetails.service === "hotel-booking" ? (
                          bookingDetails.bookingDetails?.destinationCity && bookingDetails.bookingDetails?.checkInDate ? 
                            "✓ Hotel booking details loaded from secure session" : 
                            "⚠ Using sample data - complete booking form for actual details"
                        ) : (
                          bookingDetails.bookingDetails?.departureAirport && bookingDetails.bookingDetails?.arrivalAirport ? 
                            "✓ Flight details loaded from secure session" : 
                            "⚠ Using sample data - complete booking form for actual details"
                        )}
                      </div>
                    </div>
                    
                  
                  </div>
                  
                  {/* Service Features */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {bookingDetails.service === "hotel-booking" ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-300" />
                          <span className="text-blue-100">Real hotel confirmation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-green-300" />
                          <span className="text-blue-100">20-60 min delivery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-300" />
                          <span className="text-blue-100">Embassy approved</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-green-300" />
                          <span className="text-blue-100">Worldwide accepted</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-300" />
                          <span className="text-blue-100">Real PNR included</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-green-300" />
                          <span className="text-blue-100">15-30 min delivery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-300" />
                          <span className="text-blue-100">Embassy approved</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-green-300" />
                          <span className="text-blue-100">Worldwide accepted</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Payment Button Section */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-8">
                <div className="max-w-md mx-auto text-center">
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="h-6 w-6 mr-3" />
                        Pay ₹{bookingDetails.totalAmount.toLocaleString()} Securely
                      </>
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span>256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-600" />
                      <span>PCI DSS Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Other Passengers Information - Full Width with 3x3 Grid */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="flex items-center text-xl">
                <Shield className="h-6 w-6 mr-3 text-blue-600" />
                Other Passengers ({bookingDetails.bookingDetails?.additionalTravelers?.length || 0} Companions)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Optimized 3x3 Grid for Desktop, 1 Column for Mobile - Only Additional Travelers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {/* Additional Travelers in 3x3 Grid - Excluding Primary */}
                {bookingDetails.bookingDetails?.additionalTravelers && bookingDetails.bookingDetails.additionalTravelers.length > 0 ? (
                  bookingDetails.bookingDetails.additionalTravelers.map((traveler, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:bg-gray-100 transition-all duration-200 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gray-200/30 rounded-full transform translate-x-6 -translate-y-6"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded-full">Passenger {index + 2}</span>
                          <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">{index + 2}</span>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-gray-900 mb-1">
                          {traveler.title} {traveler.firstName} {traveler.lastName}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">Additional Passenger</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="lg:col-span-3 text-center py-8 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="text-lg font-bold text-gray-900 mb-2">
                      No Additional Passengers
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      This booking only includes the lead passenger shown above.
                    </div>
                    <div className="text-xs text-gray-500">
                      Total Travelers: {bookingDetails.travelers} | Additional Passengers: {bookingDetails.bookingDetails?.additionalTravelers?.length || 0}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Information */}
              {(bookingDetails.bookingDetails?.customerName || bookingDetails.bookingDetails?.customerEmail || bookingDetails.bookingDetails?.customerPhone) && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-purple-600 font-bold text-lg">
                      {bookingDetails.bookingDetails?.customerName ? bookingDetails.bookingDetails.customerName.charAt(0) : 'C'}
                      </span>
                    </div>
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bookingDetails.bookingDetails?.customerName && (
                      <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow duration-200">
                        <div className="text-sm text-purple-600 font-bold mb-3 flex items-center">
                          <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
                          Contact Person
                        </div>
                        <div className="text-xl font-bold text-gray-900">{bookingDetails.bookingDetails?.customerName}</div>
                      </div>
                    )}
                    {bookingDetails.bookingDetails?.customerEmail && (
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow duration-200">
                        <div className="text-sm text-blue-600 font-bold mb-3 flex items-center">
                          <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                          Email Address
                        </div>
                        <div className="font-bold text-gray-900 break-all text-lg">{bookingDetails.bookingDetails?.customerEmail}</div>
                      </div>
                    )}
                    {bookingDetails.bookingDetails?.customerPhone && (
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow duration-200">
                        <div className="text-sm text-green-600 font-bold mb-3 flex items-center">
                          <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
                          Phone Number
                        </div>
                        <div className="text-xl font-bold text-gray-900">{bookingDetails.bookingDetails?.customerPhone}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
