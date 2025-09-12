"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Building, ArrowRight, ArrowLeft, CalendarIcon, Users, Clock, FileText, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Guest {
  title: string;
  firstName: string;
  lastName: string;
}

export default function HotelBookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [destinationCity, setDestinationCity] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [primaryGuest, setPrimaryGuest] = useState<Guest>({
    title: "",
    firstName: "",
    lastName: ""
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalGuests, setAdditionalGuests] = useState<Guest[]>([]);
  const [purpose, setPurpose] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const steps = [
    { number: 1, title: "Hotel Details", icon: Building },
    { number: 2, title: "Guest Information", icon: Users },
    { number: 3, title: "Purpose & Review", icon: FileText }
  ];

  const handleGuestCountChange = (count: number) => {
    setNumberOfGuests(count);
    const newGuests = [];
    for (let i = 1; i < count; i++) {
      newGuests.push({ title: "", firstName: "", lastName: "" });
    }
    setAdditionalGuests(newGuests);
  };

  const updateAdditionalGuest = (index: number, field: keyof Guest, value: string) => {
    const updated = [...additionalGuests];
    updated[index] = { ...updated[index], [field]: value };
    setAdditionalGuests(updated);
  };

  const totalPrice = 799; // Fixed price for hotel booking
  const progress = (currentStep / steps.length) * 100;

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700">
            <Building className="w-4 h-4 mr-1" />
            Hotel Booking for Visa Application
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Confirmed Hotel Reservation
          </h1>
          <p className="text-gray-600">
            Get your embassy-approved hotel booking confirmation for visa documentation
          </p>
        </div>

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
                  <span className={`mt-2 text-sm font-medium ${
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
            {/* Step 1: Hotel Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Destination City <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter destination city (e.g., Paris, London, New York)"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="h-12 pl-10"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the city name where you plan to stay
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Check-in Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
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
                          onSelect={setCheckInDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Check-out Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
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
                          onSelect={setCheckOutDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {numberOfNights > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                      Duration: {numberOfNights} night{numberOfNights > 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Number of Rooms <span className="text-red-500">*</span>
                    </Label>
                    <Select value={numberOfRooms.toString()} onValueChange={(value) => setNumberOfRooms(parseInt(value))}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num} Room{num > 1 ? 's' : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Number of Guests <span className="text-red-500">*</span>
                    </Label>
                    <Select value={numberOfGuests.toString()} onValueChange={(value) => handleGuestCountChange(parseInt(value))}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Guest Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Primary Guest</Label>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Title <span className="text-red-500">*</span>
                      </Label>
                      <Select value={primaryGuest.title} onValueChange={(value) => setPrimaryGuest(prev => ({...prev, title: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="--- Select Choice ---" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                          <SelectItem value="Miss">Miss</SelectItem>
                          <SelectItem value="Dr">Dr</SelectItem>
                          <SelectItem value="Prof">Prof</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        value={primaryGuest.firstName}
                        onChange={(e) => setPrimaryGuest(prev => ({...prev, firstName: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        value={primaryGuest.lastName}
                        onChange={(e) => setPrimaryGuest(prev => ({...prev, lastName: e.target.value}))}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        placeholder="+1 234 567 8900"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {numberOfGuests > 1 && (
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Additional Guests ({numberOfGuests - 1})
                      </Label>
                      <div className="space-y-4">
                        {additionalGuests.map((guest, index) => (
                          <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                Title <span className="text-red-500">*</span>
                              </Label>
                              <Select value={guest.title} onValueChange={(value) => updateAdditionalGuest(index, 'title', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="--- Select Choice ---" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Mr">Mr</SelectItem>
                                  <SelectItem value="Mrs">Mrs</SelectItem>
                                  <SelectItem value="Miss">Miss</SelectItem>
                                  <SelectItem value="Dr">Dr</SelectItem>
                                  <SelectItem value="Prof">Prof</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                First Name <span className="text-red-500">*</span>
                              </Label>
                              <Input 
                                value={guest.firstName}
                                onChange={(e) => updateAdditionalGuest(index, 'firstName', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                Last Name <span className="text-red-500">*</span>
                              </Label>
                              <Input 
                                value={guest.lastName}
                                onChange={(e) => updateAdditionalGuest(index, 'lastName', e.target.value)}
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

            {/* Step 3: Purpose & Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Purpose of Booking <span className="text-red-500">*</span>
                  </Label>
                  <Select value={purpose} onValueChange={setPurpose}>
                    <SelectTrigger>
                      <SelectValue placeholder="--- Select Choice ---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Visa Submission / Application">Visa Submission / Application</SelectItem>
                      <SelectItem value="Tourism">Tourism</SelectItem>
                      <SelectItem value="Business Travel">Business Travel</SelectItem>
                      <SelectItem value="Conference / Meeting">Conference / Meeting</SelectItem>
                      <SelectItem value="Family Visit">Family Visit</SelectItem>
                      <SelectItem value="Medical Treatment">Medical Treatment</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Special Requests</Label>
                  <Textarea 
                    placeholder="Enter any special requirements or preferences (room type, amenities, dietary requirements, etc.)"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Destination:</span>
                      <span className="font-medium">{destinationCity || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-in:</span>
                      <span className="font-medium">
                        {checkInDate ? format(checkInDate, "PPP") : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out:</span>
                      <span className="font-medium">
                        {checkOutDate ? format(checkOutDate, "PPP") : "Not selected"}
                      </span>
                    </div>
                    {numberOfNights > 0 && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{numberOfNights} night{numberOfNights > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Rooms:</span>
                      <span className="font-medium">{numberOfRooms} room{numberOfRooms > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span className="font-medium">{numberOfGuests} guest{numberOfGuests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="border-t pt-3 font-semibold text-lg">
                      <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="text-green-600">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        <Clock className="w-3 h-3 mr-1" />
                        Delivered in 15-30 minutes
                      </Badge>
                    </div>
                  </div>
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
                    // Save booking data to localStorage for payment page
                    const bookingData = {
                      serviceType: "hotel-booking",
                      amount: totalPrice,
                      travelers: numberOfGuests,
                      customerName: `${primaryGuest.firstName} ${primaryGuest.lastName}`,
                      customerEmail: email,
                      customerPhone: phone
                    };
                    localStorage.setItem("currentBooking", JSON.stringify(bookingData));
                    router.push(`/payment?service=hotel-booking&amount=${totalPrice}&travelers=${numberOfGuests}`);
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
    </div>
  );
}