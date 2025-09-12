"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Building2, 
  Users, 
  Clock, 
  FileText, 
  MapPin, 
  CalendarIcon, 
  CheckIcon, 
  ArrowRight,
  ArrowLeft,
  Shield,
  Globe
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Traveler {
  title: string;
  firstName: string;
  lastName: string;
}

export default function HotelBookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Traveler Information
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [primaryTraveler, setPrimaryTraveler] = useState<Traveler>({
    title: "",
    firstName: "",
    lastName: ""
  });
  const [additionalTravelers, setAdditionalTravelers] = useState<Traveler[]>([]);
  
  // Step 2: Hotel Booking Details
  const [destinationCity, setDestinationCity] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [numberOfHotels, setNumberOfHotels] = useState(1);
  
  // Step 3: Delivery Timing
  const [deliveryTiming, setDeliveryTiming] = useState("immediate");
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  
  // Step 4: Purpose & Special Requests
  const [purpose, setPurpose] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  
  // Date picker states
  const [isCheckInDateOpen, setIsCheckInDateOpen] = useState(false);
  const [isCheckOutDateOpen, setIsCheckOutDateOpen] = useState(false);
  const [isDeliveryDateOpen, setIsDeliveryDateOpen] = useState(false);

  const steps = [
    { number: 1, title: "Traveler Information", icon: Users },
    { number: 2, title: "Hotel Booking Details", icon: Building2 },
    { number: 3, title: "Delivery Timing", icon: Clock },
    { number: 4, title: "Special Request", icon: FileText }
  ];

  const handleTravelerCountChange = (count: number) => {
    setNumberOfTravelers(count);
    const newTravelers = [];
    for (let i = 1; i < count; i++) {
      newTravelers.push({ title: "", firstName: "", lastName: "" });
    }
    setAdditionalTravelers(newTravelers);
  };

  const updateAdditionalTraveler = (index: number, field: keyof Traveler, value: string) => {
    const updated = [...additionalTravelers];
    updated[index] = { ...updated[index], [field]: value };
    setAdditionalTravelers(updated);
  };

  const totalPrice = numberOfTravelers * 799;
  const progress = (currentStep / steps.length) * 100;
  
  const calculateTotal = () => {
    return numberOfTravelers * 799; // Base price per traveler
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate number of nights
  const numberOfNights = checkInDate && checkOutDate ? 
    Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700">
            <Building2 className="w-4 h-4 mr-1" />
            Hotel Booking for Visa Application
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Confirmed Hotel Reservation
          </h1>
          <p className="text-gray-600">
            Complete the form below to get your embassy-approved hotel booking confirmation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form - Left Side */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div
                      key={step.number}
                      className={`flex flex-col items-center ${
                        index < steps.length - 1 ? 'flex-1' : ''
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                          currentStep >= step.number
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-gray-300 text-gray-500'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`mt-2 text-sm font-medium text-center ${
                        currentStep >= step.number ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {steps[currentStep - 1].icon && (
                    <span className="mr-2">
                      {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
                    </span>
                  )}
                  Step {currentStep}: {steps[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Traveler Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <Label className="text-sm font-medium mb-2 block">
                        Number of Travelers <span className="text-red-500">*</span>
                      </Label>
                      <Select value={numberOfTravelers.toString()} onValueChange={(value) => handleTravelerCountChange(parseInt(value))}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="081234 56789"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Traveler Details ({numberOfTravelers} Traveler{numberOfTravelers > 1 ? 's' : ''})
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Traveler 1 - Your Title <span className="text-red-500">*</span>
                          </Label>
                          <Select value={primaryTraveler.title} onValueChange={(value) => setPrimaryTraveler(prev => ({...prev, title: value}))}>
                            <SelectTrigger>
                              <SelectValue placeholder="--- Select Choice ---" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mr">Mr</SelectItem>
                              <SelectItem value="Mrs">Mrs</SelectItem>
                              <SelectItem value="Miss">Miss</SelectItem>
                              <SelectItem value="Child (0-12 Years - Male)">Child (0-12 Years - Male)</SelectItem>
                              <SelectItem value="Child (0-12 Years - Female)">Child (0-12 Years - Female)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            First Name (must match passport) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={primaryTraveler.firstName}
                            onChange={(e) => setPrimaryTraveler(prev => ({...prev, firstName: e.target.value}))}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={primaryTraveler.lastName}
                            onChange={(e) => setPrimaryTraveler(prev => ({...prev, lastName: e.target.value}))}
                          />
                        </div>
                      </div>

                      {numberOfTravelers > 1 && (
                        <div>
                          <Label className="text-base font-medium mb-4 block">
                            Additional Travelers ({numberOfTravelers - 1})
                          </Label>
                          <div className="space-y-4">
                            {additionalTravelers.map((traveler, index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                                <div>
                                  <Label className="text-sm font-medium mb-2 block">
                                    Your Title <span className="text-red-500">*</span>
                                  </Label>
                                  <Select value={traveler.title} onValueChange={(value) => updateAdditionalTraveler(index, 'title', value)}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="--- Select Choice ---" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Mr">Mr</SelectItem>
                                      <SelectItem value="Mrs">Mrs</SelectItem>
                                      <SelectItem value="Miss">Miss</SelectItem>
                                      <SelectItem value="Child (0-12 Years - Male)">Child (0-12 Years - Male)</SelectItem>
                                      <SelectItem value="Child (0-12 Years - Female)">Child (0-12 Years - Female)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium mb-2 block">
                                    First Name <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    value={traveler.firstName}
                                    onChange={(e) => updateAdditionalTraveler(index, 'firstName', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium mb-2 block">
                                    Last Name <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    value={traveler.lastName}
                                    onChange={(e) => updateAdditionalTraveler(index, 'lastName', e.target.value)}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Hotel Booking Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Destination City <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          placeholder="Enter destination city or hotel name (e.g., Paris, London, New York, Hotel Marriott)"
                          value={destinationCity}
                          onChange={(e) => setDestinationCity(e.target.value)}
                          className="h-12"
                        />
                        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the city name or specific hotel where you plan to stay
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Check-in Date <span className="text-red-500">*</span>
                        </Label>
                        <Popover open={isCheckInDateOpen} onOpenChange={setIsCheckInDateOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-12",
                                !checkInDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkInDate}
                              onSelect={(date) => {
                                setCheckInDate(date);
                                setIsCheckInDateOpen(false);
                              }}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Check-out Date <span className="text-red-500">*</span>
                        </Label>
                        <Popover open={isCheckOutDateOpen} onOpenChange={setIsCheckOutDateOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-12",
                                !checkOutDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkOutDate}
                              onSelect={(date) => {
                                setCheckOutDate(date);
                                setIsCheckOutDateOpen(false);
                              }}
                              initialFocus
                              disabled={(date) => date < (checkInDate || new Date())}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Number of Hotels <span className="text-red-500">*</span>
                      </Label>
                      <Select value={numberOfHotels.toString()} onValueChange={(value) => setNumberOfHotels(parseInt(value))}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Delivery Timing */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Hotel Booking Delivery Timing
                      </Label>
                      <RadioGroup
                        value={deliveryTiming}
                        onValueChange={(value: "immediate" | "later") => setDeliveryTiming(value)}
                        className="space-y-4"
                      >
                        <Label
                          htmlFor="immediate"
                          className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            deliveryTiming === "immediate" ? 'border-green-500 bg-green-50' : 'border-gray-200'
                          }`}
                        >
                          <RadioGroupItem value="immediate" id="immediate" className="mt-1" />
                          <div>
                            <div className="font-medium">I need it now</div>
                            <div className="text-sm text-gray-500">
                              It will be sent within 20-60 minutes in our office hours<br />
                              7AM – 11:30PM GMT+7, Monday to Sunday (Recommended for most cases)
                            </div>
                          </div>
                        </Label>
                        <Label
                          htmlFor="later"
                          className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            deliveryTiming === "later" ? 'border-green-500 bg-green-50' : 'border-gray-200'
                          }`}
                        >
                          <RadioGroupItem value="later" id="later" className="mt-1" />
                          <div className="w-full">
                            <div className="font-medium">On a later date</div>
                            <div className="text-sm text-gray-500 mb-3">Recommended when visa interview date is further out</div>
                            {deliveryTiming === "later" && (
                              <div>
                                <Label className="text-sm font-medium mb-2 block">
                                  Select Delivery Date <span className="text-red-500">*</span>
                                </Label>
                                <Popover open={isDeliveryDateOpen} onOpenChange={setIsDeliveryDateOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal h-12",
                                        !deliveryDate && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={deliveryDate}
                                      onSelect={(date) => {
                                        setDeliveryDate(date);
                                        setIsDeliveryDateOpen(false);
                                      }}
                                      initialFocus
                                      disabled={(date) => date < new Date()}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            )}
                          </div>
                        </Label>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {/* Step 4: Special Request */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Special Request</Label>
                      <Textarea
                        placeholder="Enter any special requirements..."
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button onClick={nextStep} className="flex items-center bg-green-600 hover:bg-green-700">
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => {
                        // Save detailed booking data to localStorage for payment page
                        const bookingData = {
                          serviceType: "hotel-booking",
                          amount: calculateTotal(),
                          travelers: numberOfTravelers,
                          customerName: `${primaryTraveler.firstName} ${primaryTraveler.lastName}`,
                          customerEmail: email,
                          customerPhone: phone,
                          destinationCity: destinationCity,
                          checkInDate: checkInDate,
                          checkOutDate: checkOutDate,
                          numberOfHotels: numberOfHotels,
                          purpose: purpose,
                          deliveryTiming: deliveryTiming,
                          deliveryDate: deliveryDate,
                          specialRequest: specialRequest,
                          primaryTraveler: primaryTraveler,
                          additionalTravelers: additionalTravelers
                        };
                        localStorage.setItem("currentBooking", JSON.stringify(bookingData));
                        router.push(`/payment?service=hotel-booking&amount=${calculateTotal()}&travelers=${numberOfTravelers}`);
                      }}
                      className="flex items-center bg-green-600 hover:bg-green-700 text-lg px-8"
                    >
                      Proceed to Payment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                    <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
                    <div className="flex items-center space-x-2 text-green-100">
                      <Building2 className="w-5 h-5" />
                      <span className="text-lg font-medium">Hotel Booking</span>
                    </div>
                    <p className="text-green-100 text-sm mt-1">Embassy-Approved</p>
                  </div>

                  {/* Price Section */}
                  <div className="p-6 border-b">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        ₹{totalPrice.toLocaleString()}
                      </div>
                      <p className="text-gray-600">
                        Total for {numberOfTravelers} traveler{numberOfTravelers > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ₹799 per traveler
                      </p>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Real hotel confirmation</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Delivered in 20-60 minutes</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Embassy-approved format</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Worldwide acceptance</span>
                    </div>
                  </div>

                  {/* Booking Details Section */}
                  {(destinationCity || checkInDate || checkOutDate) && (
                    <div className="p-6 bg-gray-50 border-t">
                      <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
                      <div className="space-y-3 text-sm">
                        {destinationCity && (
                          <div>
                            <span className="text-gray-500">Destination: </span>
                            <span className="font-medium">{destinationCity}</span>
                          </div>
                        )}
                        {checkInDate && (
                          <div>
                            <span className="text-gray-500">Check-in: </span>
                            <span className="font-medium">{format(checkInDate, "MMM dd, yyyy")}</span>
                          </div>
                        )}
                        {checkOutDate && (
                          <div>
                            <span className="text-gray-500">Check-out: </span>
                            <span className="font-medium">{format(checkOutDate, "MMM dd, yyyy")}</span>
                          </div>
                        )}
                        {numberOfNights > 0 && (
                          <div>
                            <span className="text-gray-500">Duration: </span>
                            <span className="font-medium">{numberOfNights} night{numberOfNights > 1 ? 's' : ''}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-500">Hotels: </span>
                          <span className="font-medium">{numberOfHotels}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="p-6 border-t">
                    <p className="text-center text-sm text-gray-500">
                      Secure submission • Data stored securely
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
