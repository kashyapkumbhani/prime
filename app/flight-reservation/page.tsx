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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon, Plane, ArrowRight, ArrowLeft, CalendarIcon, MapPin, Users, Clock, FileText, Shield, Globe } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import airportsData from "@/data/airports.json";

interface Airport {
  name: string;
  city: string;
  country: string;
  code: string;
}

interface Traveler {
  title: string;
  firstName: string;
  lastName: string;
}

export default function FlightReservationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(null);
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [primaryTraveler, setPrimaryTraveler] = useState<Traveler>({
    title: "",
    firstName: "",
    lastName: ""
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalTravelers, setAdditionalTravelers] = useState<Traveler[]>([]);
  const [deliveryTiming, setDeliveryTiming] = useState<"now" | "later">("now");
  const [purpose, setPurpose] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);
  const [isArrivalOpen, setIsArrivalOpen] = useState(false);
  const [departureSearchValue, setDepartureSearchValue] = useState("");
  const [arrivalSearchValue, setArrivalSearchValue] = useState("");

  const airports: Airport[] = airportsData;
  
  const filteredDepartureAirports = airports.filter(airport => 
    airport.name.toLowerCase().includes(departureSearchValue.toLowerCase()) ||
    airport.city.toLowerCase().includes(departureSearchValue.toLowerCase()) ||
    airport.country.toLowerCase().includes(departureSearchValue.toLowerCase()) ||
    airport.code.toLowerCase().includes(departureSearchValue.toLowerCase())
  );

  const filteredArrivalAirports = airports.filter(airport => 
    airport.name.toLowerCase().includes(arrivalSearchValue.toLowerCase()) ||
    airport.city.toLowerCase().includes(arrivalSearchValue.toLowerCase()) ||
    airport.country.toLowerCase().includes(arrivalSearchValue.toLowerCase()) ||
    airport.code.toLowerCase().includes(arrivalSearchValue.toLowerCase())
  );

  const steps = [
    { number: 1, title: "Flight Details", icon: Plane },
    { number: 2, title: "Traveler Information", icon: Users },
    { number: 3, title: "Delivery Timing", icon: Clock },
    { number: 4, title: "Purpose & Review", icon: FileText }
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

  const totalPrice = numberOfTravelers * 999;
  const progress = (currentStep / steps.length) * 100;

  const calculateTotal = () => {
    return numberOfTravelers * 999; // Base price per traveler
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
            <Plane className="w-4 h-4 mr-1" />
            Flight Reservation for Visa Application
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            With Real PNR Number
          </h1>
          <p className="text-gray-600">
            Complete the form below to get your embassy-approved flight reservation
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
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
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
            {/* Step 1: Flight Trip Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Choose Your Trip Type <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={tripType}
                    onValueChange={(value: "one-way" | "round-trip") => setTripType(value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label
                      htmlFor="one-way"
                      className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        tripType === "one-way" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <RadioGroupItem value="one-way" id="one-way" />
                      <span>One-way</span>
                    </Label>
                    <Label
                      htmlFor="round-trip"
                      className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        tripType === "round-trip" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <RadioGroupItem value="round-trip" id="round-trip" />
                      <span>Round-trip</span>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Departure Airport (From) <span className="text-red-500">*</span>
                    </Label>
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isOpen}
                          className="w-full justify-between h-12"
                        >
                          {departureAirport ? (
                            <span>{`${departureAirport.name} - ${departureAirport.city}, ${departureAirport.country}`}</span>
                          ) : (
                            <span className="text-gray-500">Search Airport</span>
                          )}
                          <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Type 2 or more characters for results..."
                            value={searchValue}
                            onValueChange={setSearchValue}
                          />
                          <CommandEmpty>No airports found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {filteredAirports.slice(0, 10).map((airport) => (
                                <CommandItem
                                  key={airport.code}
                                  value={`${airport.name} ${airport.city} ${airport.country}`}
                                  onSelect={() => {
                                    setDepartureAirport(airport);
                                    setIsOpen(false);
                                    setSearchValue("");
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      departureAirport?.code === airport.code ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">{airport.name}</div>
                                    <div className="text-sm text-gray-500">{airport.city}, {airport.country} ({airport.code})</div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-gray-500 mt-1">Type 2 or more characters for results.</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Arrival Airport (To) <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between h-12"
                        >
                          {arrivalAirport ? (
                            <span>{`${arrivalAirport.name} - ${arrivalAirport.city}, ${arrivalAirport.country}`}</span>
                          ) : (
                            <span className="text-gray-500">Search Airport</span>
                          )}
                          <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Type 2 or more characters for results..." />
                          <CommandEmpty>No airports found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {airports.slice(0, 10).map((airport) => (
                                <CommandItem
                                  key={airport.code}
                                  onSelect={() => {
                                    setArrivalAirport(airport);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      arrivalAirport?.code === airport.code ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">{airport.name}</div>
                                    <div className="text-sm text-gray-500">{airport.city}, {airport.country} ({airport.code})</div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-gray-500 mt-1">Type 2 or more characters for results.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Departure Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !departureDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={departureDate}
                          onSelect={setDepartureDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {tripType === "round-trip" && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Return Date <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal h-12",
                              !returnDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Traveler Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Primary Traveler</Label>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Your Title <span className="text-red-500">*</span>
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
                        First Name <span className="text-red-500">*</span>
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

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
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

                  {numberOfTravelers > 1 && (
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Additional Travelers ({numberOfTravelers - 1})
                      </Label>
                      <div className="space-y-4">
                        {additionalTravelers.map((traveler, index) => (
                          <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
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

            {/* Step 3: Delivery Timing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Flight Reservation Delivery Timing
                  </Label>
                  <RadioGroup
                    value={deliveryTiming}
                    onValueChange={(value: "now" | "later") => setDeliveryTiming(value)}
                    className="space-y-4"
                  >
                    <Label
                      htmlFor="now"
                      className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        deliveryTiming === "now" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <RadioGroupItem value="now" id="now" className="mt-1" />
                      <div>
                        <div className="font-medium">I need it now</div>
                        <div className="text-sm text-gray-500">Immediate processing (within 5-15 minutes)</div>
                      </div>
                    </Label>
                    <Label
                      htmlFor="later"
                      className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        deliveryTiming === "later" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <RadioGroupItem value="later" id="later" className="mt-1" />
                      <div>
                        <div className="font-medium">On a later date</div>
                        <div className="text-sm text-gray-500">Recommended when your flight is 48+ hours from today</div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 4: Purpose & Review */}
            {currentStep === 4 && (
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
                      <SelectItem value="Proof of Return">Proof of Return</SelectItem>
                      <SelectItem value="Passport Renewal">Passport Renewal</SelectItem>
                      <SelectItem value="Visa Extension">Visa Extension</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Special Request</Label>
                  <Textarea 
                    placeholder="Enter any special requirements..."
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Flight Reservation ({numberOfTravelers} traveler{numberOfTravelers > 1 ? 's' : ''})</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 font-semibold text-lg">
                      <div className="flex justify-between">
                        <span>Total Amount</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
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
                <Button onClick={nextStep} className="flex items-center bg-blue-600 hover:bg-blue-700">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    // Save booking data to localStorage for payment page
                    const bookingData = {
                      serviceType: "flight-reservation",
                      amount: calculateTotal(),
                      travelers: numberOfTravelers,
                      customerName: `${primaryTraveler.firstName} ${primaryTraveler.lastName}`,
                      customerEmail: email,
                      customerPhone: phone
                    };
                    localStorage.setItem("currentBooking", JSON.stringify(bookingData));
                    router.push(`/payment?service=flight-reservation&amount=${calculateTotal()}&travelers=${numberOfTravelers}`);
                  }}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-lg px-8"
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