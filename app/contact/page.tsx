import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Send,
  Headphones,
  Globe,
  Shield
} from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed assistance via email",
      contact: "support@primetravel.com",
      availability: "24/7 Response",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+91 9876543210",
      availability: "24/7 Available",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant messaging support",
      contact: "Chat Widget",
      availability: "Real-time Help",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Headphones,
      title: "WhatsApp",
      description: "Quick support via WhatsApp",
      contact: "+91 9876543210",
      availability: "Business Hours",
      color: "text-emerald-600 bg-emerald-100"
    }
  ];

  const supportTopics = [
    "General Inquiry",
    "Flight Reservation Help",
    "Hotel Booking Support", 
    "Travel Insurance Questions",
    "Payment & Billing",
    "Technical Issues",
    "Document Delivery",
    "Booking Modifications",
    "Account Management",
    "Other"
  ];

  const quickStats = [
    { value: "< 15 min", label: "Average Response Time" },
    { value: "24/7", label: "Support Availability" },
    { value: "98%", label: "Customer Satisfaction" },
    { value: "5 min", label: "Live Chat Response" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <MessageSquare className="w-4 h-4 mr-1" />
              We're Here to Help
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Our Support Team
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Need assistance with your travel plans? Our expert support team is available 24/7 
              to help you with flight reservations, hotel bookings, and travel insurance.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Can We Help You Today?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you. Our team is ready to assist 
              with all your travel booking and insurance needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${method.color} mb-4 mx-auto`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{method.description}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-900 mb-1">{method.contact}</p>
                    <Badge variant="outline" className="text-xs">
                      {method.availability}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium mb-2 block">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                      Phone Number
                    </Label>
                    <Input id="phone" placeholder="+91 9876543210" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm font-medium mb-2 block">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportTopics.map((topic, index) => (
                        <SelectItem key={index} value={topic.toLowerCase().replace(/\s+/g, '-')}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="message"
                    placeholder="Please describe your question or concern in detail..."
                    rows={6}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    className="mt-1 rounded border-gray-300"
                  />
                  <Label htmlFor="consent" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and consent to being contacted regarding my inquiry.
                  </Label>
                </div>

                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Business Information */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Business Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Travel Street, Business District<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday to Friday: 9:00 AM - 8:00 PM<br />
                      Saturday & Sunday: 10:00 AM - 6:00 PM<br />
                      24/7 Emergency Support Available
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Global Coverage</h3>
                    <p className="text-gray-600">
                      Serving customers worldwide<br />
                      Flight reservations & hotel bookings<br />
                      Travel insurance coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Contact Us?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Expert Guidance",
                    description: "Get personalized advice from travel experts who understand booking requirements and travel regulations."
                  },
                  {
                    title: "Quick Resolution",
                    description: "Most inquiries are resolved within 15 minutes with our efficient support system."
                  },
                  {
                    title: "Booking Assistance",
                    description: "Help with flight reservations, hotel bookings, and travel insurance selection for your needs."
                  },
                  {
                    title: "Technical Support",
                    description: "Assistance with website navigation, payment issues, and booking confirmations."
                  },
                  {
                    title: "Custom Solutions",
                    description: "Special requirements? We can create custom travel packages for unique situations."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0 mt-1">
                      <Shield className="h-3 w-3" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Urgent Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            For urgent travel bookings or time-sensitive support, 
            contact our priority support line available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +91 9876543210
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-blue-600">
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}