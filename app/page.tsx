import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Shield, Star, CheckCircle, Plane, Building, Heart, Globe } from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: Plane,
      title: "Flight Reservation",
      description: "Real PNR flight reservation valid for visa applications",
      price: "₹999",
      features: [
        "Delivered in 15-30 minutes",
        "Embassy-approved format", 
        "Real PNR & verification"
      ],
      href: "/flight-reservation",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: Building,
      title: "Hotel Booking",
      description: "Confirmed hotel reservation for visa documentation", 
      price: "₹799",
      features: [
        "Delivered in 15-30 minutes",
        "Embassy-approved format",
        "Real booking confirmation"
      ],
      href: "/hotel-booking",
      gradient: "from-green-500 to-green-700"
    },
    {
      icon: Heart,
      title: "Travel Insurance",
      description: "Travel insurance certificate for visa requirements",
      price: "₹1499",
      features: [
        "Delivered in 15-30 minutes",
        "Embassy-approved format",
        "Real insurance certificate"
      ],
      href: "/travel-insurance",
      gradient: "from-purple-500 to-purple-700"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Documents Delivered" },
    { value: "98%", label: "Visa Success Rate" },
    { value: "24/7", label: "Customer Support" },
    { value: "15min", label: "Average Delivery" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Star className="w-4 h-4 mr-1" />
              Embassy Approved Documents
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional
              <span className="text-blue-600 block mt-2">
                Visa Documents
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get embassy-approved flight reservations, hotel bookings, and travel insurance 
              for your visa applications from PrimeDummyTicket. Delivered fast with real PNR numbers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg" asChild>
                <Link href="/services" className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>Delivered in 15-30 minutes</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                <span>Embassy Approved</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>Real PNR Numbers</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our professional visa document services with fast delivery and embassy approval.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 hover:border-blue-200">
                  <Link href={service.href} className="absolute inset-0 z-10" aria-label={`Order ${service.title}`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${service.gradient} text-white mb-4 mx-auto`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {service.price}
                      </div>
                      <div className="text-gray-500 text-sm">per document</div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-3 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer relative z-20"
                    >
                      <Link href={service.href} className="inline-flex items-center justify-center">
                        Order Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose PrimeDummyTicket Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PrimeDummyTicket for Visa Documents?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in providing embassy-approved visa documents with real PNR numbers and confirmations 
              that are accepted worldwide for visa applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              [
                {
                  icon: Shield,
                  title: "Embassy Approved Format",
                  description: "All our documents follow embassy-approved formats and templates, ensuring maximum acceptance rates for visa applications across different countries.",
                  color: "text-green-600 bg-green-100"
                },
                {
                  icon: Clock,
                  title: "Fast 15-30 Minute Delivery",
                  description: "Get your visa documents delivered within 15-30 minutes via email. Our automated system ensures quick processing and instant delivery.",
                  color: "text-blue-600 bg-blue-100"
                },
                {
                  icon: CheckCircle,
                  title: "Real PNR & Confirmation Numbers",
                  description: "Every flight reservation comes with genuine PNR numbers that can be verified on airline websites, and hotel bookings include real confirmation numbers.",
                  color: "text-purple-600 bg-purple-100"
                },
                {
                  icon: Globe,
                  title: "Worldwide Visa Support",
                  description: "Our documents are accepted by embassies and consulates worldwide including USA, UK, Canada, Schengen countries, Australia, and many more.",
                  color: "text-orange-600 bg-orange-100"
                },
                {
                  icon: Star,
                  title: "98% Visa Success Rate",
                  description: "Our customers enjoy a 98% visa approval success rate when using our professional dummy ticket and hotel booking services for their applications.",
                  color: "text-yellow-600 bg-yellow-100"
                },
                {
                  icon: Heart,
                  title: "24/7 Customer Support",
                  description: "Get instant support via WhatsApp, email, or phone. Our dedicated team is available round-the-clock to assist with your visa document needs.",
                  color: "text-pink-600 bg-pink-100"
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${feature.color} mb-4`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </Card>
                );
              })
            }
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Get Your Visa Documents in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting your visa documents has never been easier. Follow our streamlined process 
              and receive your documents within minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                1
              </div>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 z-0" style={{transform: 'translateX(50%)'}}></div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Service</h3>
              <p className="text-gray-600">
                Select from flight reservations, hotel bookings, or travel insurance. 
                Fill out the booking form with your travel details and passenger information.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                2
              </div>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 z-0" style={{transform: 'translateX(50%)'}}></div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Payment</h3>
              <p className="text-gray-600">
                Complete your payment securely using our encrypted payment system. 
                We accept all major payment methods for your convenience.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receive Documents</h3>
              <p className="text-gray-600">
                Get your visa documents delivered to your email within 15-30 minutes. 
                All documents include real PNR numbers and are embassy-approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About Visa Documents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our dummy ticket and visa document services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {
              [
                {
                  question: "Are your flight reservations real and verifiable?",
                  answer: "Yes, all our flight reservations come with genuine PNR numbers that can be verified directly on airline websites. These are real reservations that are embassy-approved and accepted worldwide."
                },
                {
                  question: "How quickly will I receive my visa documents?",
                  answer: "Most documents are delivered within 15-30 minutes via email. For urgent requests, we can process documents even faster. Our automated system ensures quick delivery."
                },
                {
                  question: "Which countries accept your visa documents?",
                  answer: "Our documents are accepted by embassies worldwide including USA, UK, Canada, Schengen countries, Australia, New Zealand, and many more. We follow embassy-approved formats."
                },
                {
                  question: "What if my visa application gets rejected?",
                  answer: "While we cannot guarantee visa approval (as it depends on various factors), our documents have a 98% success rate. Our embassy-approved format maximizes your chances."
                },
                {
                  question: "Can I modify my booking details after payment?",
                  answer: "Yes, minor modifications can be made within 24 hours of booking. Contact our 24/7 support team via WhatsApp for assistance with any changes."
                },
                {
                  question: "Is it legal to use dummy tickets for visa applications?",
                  answer: "Yes, it's completely legal and widely accepted practice. Embassies understand that travelers need visa approval before purchasing actual tickets, so dummy tickets are standard."
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Visa Applicants Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our satisfied customers who have successfully obtained their visas using our professional services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Documents Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Visa Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">15min</div>
              <div className="text-gray-600">Average Delivery</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {
                [
                  {
                    text: "PrimeDummyTicket saved my visa application! Got my flight reservation with real PNR in just 20 minutes. Embassy accepted it without any issues.",
                    author: "Sarah Johnson",
                    country: "USA Visa Applicant"
                  },
                  {
                    text: "Excellent service! The hotel booking confirmation looked completely professional and helped me get my Schengen visa approved on the first try.",
                    author: "Michael Chen",
                    country: "Germany Visa Applicant"
                  },
                  {
                    text: "Fast, reliable, and affordable. The travel insurance document was exactly what I needed for my UK visa application. Highly recommended!",
                    author: "Priya Sharma",
                    country: "UK Visa Applicant"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="text-center">
                    <div className="text-gray-600 mb-4 italic">&quot;{testimonial.text}&quot;</div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.country}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Your Visa Documents?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust PrimeDummyTicket for their visa documentation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/services">
                View All Services
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
