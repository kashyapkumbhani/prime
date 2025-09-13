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
import { Heart, ArrowRight, ArrowLeft, CalendarIcon, Users, Clock, MapPin, Shield } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";

interface Traveler {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | undefined;
}

export default function TravelInsurancePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [destinationCountry, setDestinationCountry] = useState("");
  const [travelStartDate, setTravelStartDate] = useState<Date>();
  const [travelEndDate, setTravelEndDate] = useState<Date>();
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [primaryTraveler, setPrimaryTraveler] = useState<Traveler>({
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: undefined
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalTravelers, setAdditionalTravelers] = useState<Traveler[]>([]);
  const [coverageType, setCoverageType] = useState<"basic" | "premium">("basic");
  const [purpose, setPurpose] = useState("");
  const [preExistingConditions, setPreExistingConditions] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const steps = [
    { number: 1, title: "Travel Details", icon: MapPin },
    { number: 2, title: "Traveler Information", icon: Users },
    { number: 3, title: "Coverage & Review", icon: Shield }
  ];

  const handleTravelerCountChange = (count: number) => {
    setNumberOfTravelers(count);
    const newTravelers = [];
    for (let i = 1; i < count; i++) {
      newTravelers.push({ title: "", firstName: "", lastName: "", dateOfBirth: undefined });
    }
    setAdditionalTravelers(newTravelers);
  };

  const updateAdditionalTraveler = (index: number, field: keyof Traveler, value: string | Date) => {
    const updated = [...additionalTravelers];
    updated[index] = { ...updated[index], [field]: value };
    setAdditionalTravelers(updated);
  };

  const basePrice = 1499;
  const premiumSurcharge = coverageType === "premium" ? 500 : 0;
  const totalPrice = (basePrice + premiumSurcharge) * numberOfTravelers;
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

  // Calculate trip duration
  const tripDuration = travelStartDate && travelEndDate ? 
    differenceInDays(travelEndDate, travelStartDate) + 1 : 0;

  const coverageOptions = [
    {
      type: "basic",
      title: "Basic Coverage",
      price: "₹1,499",
      features: [
        "Medical coverage up to €30,000",
        "Emergency evacuation coverage",
        "Trip cancellation (up to 50%)",
        "Personal liability coverage",
        "24/7 emergency assistance",
        "Valid for Schengen visa applications"
      ]
    },
    {
      type: "premium", 
      title: "Premium Coverage",
      price: "₹1,999",
      features: [
        "Medical coverage up to €100,000",
        "Emergency evacuation coverage",
        "Trip cancellation (up to 100%)",
        "Personal liability coverage",
        "24/7 emergency assistance",
        "Pre-existing conditions covered",
        "Adventure sports coverage",
        "Extended coverage period",
        "Valid for all visa applications"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
            <Heart className="w-4 h-4 mr-1" />
            Travel Insurance for Visa Application
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Comprehensive Travel Insurance
          </h1>
          <p className="text-gray-600">
            Get embassy-approved travel insurance certificate that meets all visa requirements
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
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    currentStep >= step.number ? 'text-purple-600' : 'text-gray-500'
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
            {/* Step 1: Travel Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Destination Country/Region <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter destination country or region (e.g., France, Europe, United States)"
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      className="h-12 pl-10"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the primary destination for your travel insurance coverage
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Travel Start Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !travelStartDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {travelStartDate ? format(travelStartDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={travelStartDate}
                          onSelect={setTravelStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Travel End Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !travelEndDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {travelEndDate ? format(travelEndDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={travelEndDate}
                          onSelect={setTravelEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {tripDuration > 0 && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-700 font-medium">
                      Trip Duration: {tripDuration} day{tripDuration > 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Number of Travelers <span className="text-red-500">*</span>
                  </Label>
                  <Select value={numberOfTravelers.toString()} onValueChange={(value) => handleTravelerCountChange(parseInt(value))}>
                    <SelectTrigger className="w-48 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} Traveler{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Traveler Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Primary Traveler</Label>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Title <span className="text-red-500">*</span>
                      </Label>
                      <Select value={primaryTraveler.title} onValueChange={(value) => setPrimaryTraveler(prev => ({...prev, title: value}))}>
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
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Date of Birth <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !primaryTraveler.dateOfBirth && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {primaryTraveler.dateOfBirth ? format(primaryTraveler.dateOfBirth, "PP") : <span>Pick date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={primaryTraveler.dateOfBirth}
                            onSelect={(date) => setPrimaryTraveler(prev => ({...prev, dateOfBirth: date}))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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

                  {numberOfTravelers > 1 && (
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Additional Travelers ({numberOfTravelers - 1})
                      </Label>
                      <div className="space-y-4">
                        {additionalTravelers.map((traveler, index) => (
                          <div key={index} className="grid md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                Title <span className="text-red-500">*</span>
                              </Label>
                              <Select value={traveler.title} onValueChange={(value) => updateAdditionalTraveler(index, 'title', value)}>
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
                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                Date of Birth <span className="text-red-500">*</span>
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal text-sm",
                                      !traveler.dateOfBirth && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {traveler.dateOfBirth ? format(traveler.dateOfBirth, "PP") : <span>Pick date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={traveler.dateOfBirth}
                                    onSelect={(date) => updateAdditionalTraveler(index, 'dateOfBirth', date!)}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Coverage & Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Choose Coverage Type <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={coverageType}
                    onValueChange={(value: "basic" | "premium") => setCoverageType(value)}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    {coverageOptions.map((option) => (
                      <Label
                        key={option.type}
                        htmlFor={option.type}
                        className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all ${
                          coverageType === option.type ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                        }`}
                      >
                        <RadioGroupItem 
                          value={option.type} 
                          id={option.type}
                          className="absolute top-4 right-4"
                        />
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                          <div className="text-2xl font-bold text-purple-600">{option.price}</div>
                          <div className="text-sm text-gray-500">per traveler</div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {option.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1 h-1 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Purpose of Travel <span className="text-red-500">*</span>
                  </Label>
                  <Select value={purpose} onValueChange={setPurpose}>
                    <SelectTrigger>
                      <SelectValue placeholder="--- Select Choice ---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tourism">Tourism</SelectItem>
                      <SelectItem value="Business Travel">Business Travel</SelectItem>
                      <SelectItem value="Conference / Meeting">Conference / Meeting</SelectItem>
                      <SelectItem value="Family Visit">Family Visit</SelectItem>
                      <SelectItem value="Medical Treatment">Medical Treatment</SelectItem>
                      <SelectItem value="Education / Studies">Education / Studies</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Pre-existing Medical Conditions</Label>
                  <Textarea 
                    placeholder="Please list any pre-existing medical conditions that may require coverage (leave blank if none)"
                    value={preExistingConditions}
                    onChange={(e) => setPreExistingConditions(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Special Requests</Label>
                  <Textarea 
                    placeholder="Enter any special requirements or additional coverage needs"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Insurance Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Insurance Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Destination:</span>
                      <span className="font-medium">{destinationCountry || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travel Period:</span>
                      <span className="font-medium">
                        {travelStartDate && travelEndDate ? 
                          `${format(travelStartDate, "PP")} - ${format(travelEndDate, "PP")}` : 
                          "Not selected"
                        }
                      </span>
                    </div>
                    {tripDuration > 0 && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{tripDuration} day{tripDuration > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Coverage Type:</span>
                      <span className="font-medium capitalize">{coverageType} Coverage</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of Travelers:</span>
                      <span className="font-medium">{numberOfTravelers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price per traveler:</span>
                      <span className="font-medium">₹{(basePrice + premiumSurcharge).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 font-semibold text-lg">
                      <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="text-purple-600">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
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
                <Button onClick={nextStep} className="flex items-center bg-purple-600 hover:bg-purple-700">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={async () => {
                    // Create secure booking data
                    const bookingDetails = {
                      customerName: `${primaryTraveler.firstName} ${primaryTraveler.lastName}`,
                      customerEmail: email,
                      customerPhone: phone,
                      destinationCountry: destinationCountry,
                      travelStartDate: travelStartDate,
                      travelEndDate: travelEndDate,
                      tripDuration: tripDuration,
                      coverageType: coverageType,
                      travelPurpose: purpose,
                      preExistingConditions: preExistingConditions,
                      specialRequests: specialRequests,
                      primaryTraveler: primaryTraveler,
                      additionalTravelers: additionalTravelers
                    };
                    
                    try {
                      const response = await fetch('/api/create-payment-token', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          service: 'travel-insurance',
                          travelers: numberOfTravelers,
                          totalAmount: totalPrice,
                          bookingDetails: bookingDetails
                        })
                      });
                      
                      if (response.ok) {
                        const data = await response.json();
                        router.push(data.redirectUrl);
                      } else {
                        console.error('Failed to create payment token');
                        alert('Error creating secure payment session. Please try again.');
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      alert('Network error. Please check your connection and try again.');
                    }
                  }}
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-lg px-8"
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