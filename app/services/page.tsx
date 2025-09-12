import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  Plane, 
  Building, 
  Heart, 
  Clock, 
  Shield, 
  Star,
  Users,
  FileText,
  Globe
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Plane,
      title: "Flight Reservation",
      description: "Get a real PNR flight reservation that's perfect for visa applications",
      price: "₹999",
      originalPrice: "₹1299",
      features: [
        "Real PNR number with airline confirmation",
        "Embassy-approved format and layout", 
        "Delivered within 15-30 minutes",
        "Valid for all visa applications worldwide",
        "24/7 customer support included",
        "Refundable if visa gets rejected"
      ],
      href: "/flight-reservation",
      gradient: "from-blue-500 to-blue-700",
      popular: true,
      deliveryTime: "15-30 minutes",
      validityNote: "Valid for 48 hours for immediate use"
    },
    {
      icon: Building,
      title: "Hotel Booking",
      description: "Confirmed hotel reservation certificate for your visa documentation",
      price: "₹799", 
      originalPrice: "₹999",
      features: [
        "Confirmed booking with hotel verification",
        "Embassy-approved reservation format",
        "Instant delivery in 15-30 minutes", 
        "Accepted by all embassies globally",
        "Free modifications within 24 hours",
        "Cancellation certificate if needed"
      ],
      href: "/hotel-booking",
      gradient: "from-green-500 to-green-700", 
      popular: false,
      deliveryTime: "15-30 minutes",
      validityNote: "Flexible dates as per your travel plan"
    },
    {
      icon: Heart,
      title: "Travel Insurance",
      description: "Comprehensive travel insurance certificate for visa requirements",
      price: "₹1499",
      originalPrice: "₹1799", 
      features: [
        "Valid insurance policy with coverage details",
        "Embassy-approved insurance certificate",
        "Fast delivery within 15-30 minutes",
        "Meets all Schengen visa requirements",
        "Medical coverage up to €30,000",
        "Worldwide coverage included"
      ],
      href: "/travel-insurance",
      gradient: "from-purple-500 to-purple-700",
      popular: false, 
      deliveryTime: "15-30 minutes",
      validityNote: "Valid for entire travel duration"
    }
  ];

  const additionalServices = [
    {
      icon: FileText,
      title: "Document Package",
      description: "Get all three documents together at a discounted price",
      price: "₹2999",
      originalPrice: "₹3297",
      savings: "Save ₹298"
    },
    {
      icon: Globe,
      title: "Express Service", 
      description: "Get your documents delivered in 5-10 minutes",
      price: "+₹500",
      originalPrice: "+₹299",
      savings: "Priority processing"
    },
    {
      icon: Users,
      title: "Family Package",
      description: "Special pricing for 4+ travelers on the same itinerary", 
      price: "Contact",
      originalPrice: "Custom",
      savings: "Up to 20% off"
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Embassy Approved",
      description: "All our documents are in embassy-approved formats and accepted worldwide."
    },
    {
      icon: Clock, 
      title: "Fast Delivery",
      description: "Get your documents delivered within 15-30 minutes, 24/7."
    },
    {
      icon: Star,
      title: "High Success Rate",
      description: "98% visa success rate with our professionally crafted documents."
    },
    {
      icon: Users,
      title: "Expert Support", 
      description: "Dedicated customer support team available round the clock."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Star className="w-4 h-4 mr-1" />
              Professional Visa Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose from our comprehensive range of visa document services. 
              All documents are embassy-approved and delivered fast.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                    service.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-blue-600 text-white">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <CardHeader className="text-center pb-4 relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${service.gradient} text-white mb-4 mx-auto`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <p className="text-gray-600">{service.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0 relative">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-blue-600">
                          {service.price}
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          {service.originalPrice}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm mb-2">per document</div>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.deliveryTime}
                      </Badge>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700 text-center">
                        {service.validityNote}
                      </p>
                    </div>

                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                      <Link href={service.href}>
                        Order Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your experience with our premium add-on services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mb-3 mx-auto">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                      {service.originalPrice !== service.price && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          {service.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {service.savings}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re trusted by thousands of travelers worldwide for our reliable and professional visa document services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Choosing the Right Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our expert team is available 24/7 to help you select the perfect documents for your visa application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/faqs">
                View FAQs
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}