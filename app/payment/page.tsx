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
    departureAirport: null as { name: string; city: string; country: string; code: string } | null,
    arrivalAirport: null as { name: string; city: string; country: string; code: string } | null,
    departureDate: null as Date | null,
    returnDate: null as Date | null,
    // Hotel specific details
    destinationCity: "",
    checkInDate: null as Date | null,
    checkOutDate: null as Date | null,
    numberOfHotels: 1,
    // Common details
    purpose: "",
    deliveryTiming: "",
    deliveryDate: null as Date | null,
    // Traveler details
    primaryTraveler: null as { title: string; firstName: string; lastName: string } | null,
    additionalTravelers: [] as { title: string; firstName: string; lastName: string }[],
    specialRequest: ""
  });

  useEffect(() => {
    // Try to get booking details from localStorage if available
    const savedBookingData = localStorage.getItem("currentBooking");
    if (savedBookingData) {
      try {
        const bookingData = JSON.parse(savedBookingData);
        console.log("Booking data from localStorage:", bookingData);
        setBookingDetails(prev => ({
          ...prev,
          ...bookingData
        }));
      } catch (error) {
        console.error("Error parsing booking data:", error);
      }
    }
    
    // Also try to get detailed form data from localStorage based on service type
    const serviceType = searchParams.get("service") || "flight-reservation";
    const formDataKey = serviceType === "hotel-booking" ? "hotelFormData" : "flightFormData";
    const savedFormData = localStorage.getItem(formDataKey);
    if (savedFormData) {
      try {
        const formData = JSON.parse(savedFormData);
        console.log(`${serviceType} form data from localStorage:`, formData);
        setBookingDetails(prev => ({
          ...prev,
          ...formData
        }));
      } catch (error) {
        console.error("Error parsing form data:", error);
      }
    }
    
    // Debug: Log all localStorage keys to see what's available
    console.log("Available localStorage keys:", Object.keys(localStorage));
    
    // Try other possible localStorage keys
    const allKeys = Object.keys(localStorage);
    const relevantKeys = allKeys.filter(key => 
      key.includes('flight') || key.includes('booking') || key.includes('travel')
    );
    
    if (relevantKeys.length > 0) {
      console.log("Found relevant localStorage keys:", relevantKeys);
      relevantKeys.forEach(key => {
        try {
          const data = localStorage.getItem(key);
          console.log(`${key}:`, data ? JSON.parse(data) : null);
        } catch {
          console.log(`${key} (raw):`, localStorage.getItem(key));
        }
      });
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
        paymentMethod: "card",
        status: "COMPLETED",
        // Common traveler details
        primaryTraveler: bookingDetails.primaryTraveler,
        additionalTravelers: bookingDetails.additionalTravelers,
        // Flight reservation specific details
        ...(bookingDetails.serviceType === "flight-reservation" && {
          tripType: bookingDetails.tripType,
          departureAirport: bookingDetails.departureAirport,
          arrivalAirport: bookingDetails.arrivalAirport,
          departureDate: bookingDetails.departureDate,
          returnDate: bookingDetails.returnDate,
        }),
        // Hotel booking specific details
        ...(bookingDetails.serviceType === "hotel-booking" && {
          destinationCity: bookingDetails.destinationCity,
          checkInDate: bookingDetails.checkInDate,
          checkOutDate: bookingDetails.checkOutDate,
          numberOfHotels: bookingDetails.numberOfHotels,
        }),
        // Common fields
        purpose: bookingDetails.purpose,
        deliveryTiming: bookingDetails.deliveryTiming,
        deliveryDate: bookingDetails.deliveryDate,
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-6 hover:bg-blue-50 border-blue-200 text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Booking
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
                        {getServiceIcon(bookingDetails.serviceType)}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold mb-1">{getServiceName(bookingDetails.serviceType)}</h2>
                        <p className="text-blue-100 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {bookingDetails.serviceType === "hotel-booking" ? 
                            "Real Hotel Confirmation • Embassy Approved" : 
                            "With Real PNR Number • Embassy Approved"
                          }
                        </p>
                        {/* Lead Passenger Info */}
                        {bookingDetails.primaryTraveler && (
                          <div className="mt-3 bg-white/10 rounded-lg px-3 py-2">
                            <div className="text-xs text-blue-200 mb-1">Lead Passenger</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.primaryTraveler.title} {bookingDetails.primaryTraveler.firstName} {bookingDetails.primaryTraveler.lastName}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-4xl font-bold mb-2">
                        ₹{bookingDetails.amount.toLocaleString()}
                      </div>
                      <div className="text-blue-100 text-sm">
                        {bookingDetails.travelers} Traveler{bookingDetails.travelers > 1 ? 's' : ''} • ₹{bookingDetails.serviceType === "hotel-booking" ? "799" : "999"} each
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
                            {bookingDetails.destinationCity || "Hotel Destination"}
                          </div>
                          <div className="text-blue-100 text-sm">
                            {bookingDetails.numberOfHotels || 1} Hotel{(bookingDetails.numberOfHotels || 1) > 1 ? 's' : ''} Reserved
                          </div>
                        </div>
                        
                        {/* Check-in and Check-out Dates */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <div className="text-center bg-white/10 rounded-lg p-4 flex-1">
                            <div className="text-blue-200 text-sm mb-1">Check-in Date</div>
                            <div className="text-white font-semibold">
                              {(() => {
                                if (bookingDetails.checkInDate) {
                                  try {
                                    const date = new Date(bookingDetails.checkInDate);
                                    if (date.toString() !== 'Invalid Date') {
                                      return format(date, "MMM dd, yyyy");
                                    }
                                  } catch (e) {
                                    console.log("Check-in date parsing error:", e, bookingDetails.checkInDate);
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
                                if (bookingDetails.checkOutDate) {
                                  try {
                                    const date = new Date(bookingDetails.checkOutDate);
                                    if (date.toString() !== 'Invalid Date') {
                                      return format(date, "MMM dd, yyyy");
                                    }
                                  } catch (e) {
                                    console.log("Check-out date parsing error:", e, bookingDetails.checkOutDate);
                                  }
                                }
                                return "Date TBD";
                              })()} 
                            </div>
                          </div>
                        </div>
                        
                        {/* Duration calculation for hotels */}
                        {bookingDetails.checkInDate && bookingDetails.checkOutDate && (
                          <div className="text-center">
                            <div className="text-blue-200 text-sm">Duration</div>
                            <div className="text-white font-bold text-lg">
                              {(() => {
                                try {
                                  const checkIn = new Date(bookingDetails.checkInDate);
                                  const checkOut = new Date(bookingDetails.checkOutDate);
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
                              {bookingDetails.departureAirport?.code || "DEP"}
                            </div>
                            <div className="text-blue-100 text-sm font-medium">
                              {bookingDetails.departureAirport?.city || "Departure City"}
                            </div>
                            <div className="text-xs text-blue-200">
                              {bookingDetails.departureAirport?.name || "International Airport"}
                            </div>
                            <div className="text-xs text-blue-200 mt-1 bg-white/10 rounded px-2 py-1">
                              {(() => {
                                if (bookingDetails.departureDate) {
                                  try {
                                    const date = new Date(bookingDetails.departureDate);
                                    if (date.toString() !== 'Invalid Date') {
                                      return `Depart: ${format(date, "MMM dd, yyyy")}`;
                                    }
                                  } catch (e) {
                                    console.log("Date parsing error:", e, bookingDetails.departureDate);
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
                              {bookingDetails.arrivalAirport?.code || "ARR"}
                            </div>
                            <div className="text-blue-100 text-sm font-medium">
                              {bookingDetails.arrivalAirport?.city || "Arrival City"}
                            </div>
                            <div className="text-xs text-blue-200">
                              {bookingDetails.arrivalAirport?.name || "International Airport"}
                            </div>
                            {bookingDetails.tripType === "round-trip" && (
                              <div className="text-xs text-blue-200 mt-1 bg-white/10 rounded px-2 py-1">
                                {(() => {
                                  if (bookingDetails.returnDate) {
                                    try {
                                      const date = new Date(bookingDetails.returnDate);
                                      if (date.toString() !== 'Invalid Date') {
                                        return `Return: ${format(date, "MMM dd, yyyy")}`;
                                      }
                                    } catch (e) {
                                      console.log("Return date parsing error:", e, bookingDetails.returnDate);
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
                              {bookingDetails.destinationCity || "TBD"}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Hotels</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.numberOfHotels || 1} Hotel{(bookingDetails.numberOfHotels || 1) > 1 ? 's' : ''}
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
                              {bookingDetails.deliveryTiming === "immediate" ? "20-60 min" : "Later date"}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Trip Type</div>
                            <div className="text-white font-semibold capitalize">
                              {bookingDetails.tripType ? bookingDetails.tripType.replace("-", " ") : "One Way"}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-blue-200 mb-1">Purpose</div>
                            <div className="text-white font-semibold">
                              {bookingDetails.purpose || "Business"}
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
                              {bookingDetails.deliveryTiming || "15-30 min"}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Data Source Indicator */}
                    <div className="mt-4 text-center">
                      <div className="text-xs text-blue-300">
                        {bookingDetails.serviceType === "hotel-booking" ? (
                          bookingDetails.destinationCity && bookingDetails.checkInDate ? 
                            "✓ Hotel booking details loaded from form" : 
                            "⚠ Using sample data - complete booking form for actual details"
                        ) : (
                          bookingDetails.departureAirport && bookingDetails.arrivalAirport ? 
                            "✓ Flight details loaded from booking form" : 
                            "⚠ Using sample data - complete booking form for actual details"
                        )}
                      </div>
                    </div>
                    
                  
                  </div>
                  
                  {/* Service Features */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {bookingDetails.serviceType === "hotel-booking" ? (
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
                        Pay ₹{bookingDetails.amount.toLocaleString()} Securely
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
                Other Passengers ({bookingDetails.additionalTravelers?.length || 0} Companions)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Optimized 3x3 Grid for Desktop, 1 Column for Mobile - Only Additional Travelers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {/* Additional Travelers in 3x3 Grid - Excluding Primary */}
                {bookingDetails.additionalTravelers && bookingDetails.additionalTravelers.length > 0 ? (
                  bookingDetails.additionalTravelers.map((traveler, index) => (
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
                      Total Travelers: {bookingDetails.travelers} | Additional Passengers: {bookingDetails.additionalTravelers?.length || 0}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Information */}
              {(bookingDetails.customerName || bookingDetails.customerEmail || bookingDetails.customerPhone) && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-purple-600 font-bold text-lg">
                        {bookingDetails.customerName ? bookingDetails.customerName.charAt(0) : 'C'}
                      </span>
                    </div>
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bookingDetails.customerName && (
                      <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow duration-200">
                        <div className="text-sm text-purple-600 font-bold mb-3 flex items-center">
                          <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
                          Contact Person
                        </div>
                        <div className="text-xl font-bold text-gray-900">{bookingDetails.customerName}</div>
                      </div>
                    )}
                    {bookingDetails.customerEmail && (
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow duration-200">
                        <div className="text-sm text-blue-600 font-bold mb-3 flex items-center">
                          <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                          Email Address
                        </div>
                        <div className="font-bold text-gray-900 break-all text-lg">{bookingDetails.customerEmail}</div>
                      </div>
                    )}
                    {bookingDetails.customerPhone && (
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow duration-200">
                        <div className="text-sm text-green-600 font-bold mb-3 flex items-center">
                          <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
                          Phone Number
                        </div>
                        <div className="text-xl font-bold text-gray-900">{bookingDetails.customerPhone}</div>
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
