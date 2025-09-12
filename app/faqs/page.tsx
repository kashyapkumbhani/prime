import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle, MessageSquare, ArrowRight, Clock, Shield, Star } from "lucide-react";

export default function FAQsPage() {
  const faqCategories = [
    {
      title: "General Questions",
      icon: HelpCircle,
      faqs: [
        {
          question: "What is a dummy ticket and why do I need it for visa applications?",
          answer: "A dummy ticket is a temporary flight reservation that shows your travel intent to embassy officials. It contains real booking details and PNR numbers but is not a paid ticket. Many embassies require proof of onward travel as part of the visa application process, and dummy tickets fulfill this requirement without the risk of purchasing expensive flights before your visa is approved."
        },
        {
          question: "Are your documents really accepted by embassies?",
          answer: "Yes, absolutely! Our documents are created in embassy-approved formats and contain real booking confirmations, PNR numbers, and reservation details. We've successfully served over 50,000 customers with a 98% visa success rate. Our team stays updated with embassy requirements to ensure all documents meet current standards."
        },
        {
          question: "How quickly can I get my documents?",
          answer: "Most documents are delivered within 15-30 minutes of order confirmation. For urgent requests, we offer express service with delivery in 5-15 minutes for an additional fee. Our automated systems work 24/7 to ensure fast processing and delivery."
        },
        {
          question: "What if my visa application gets rejected?",
          answer: "While we cannot guarantee visa approval (as this depends on various factors assessed by embassy officials), we do guarantee that our documents meet embassy requirements. If your visa is rejected due to issues with our documents specifically, we offer a full refund as per our money-back guarantee policy."
        }
      ]
    },
    {
      title: "Flight Reservations",
      icon: Shield,
      faqs: [
        {
          question: "Do flight reservations contain real PNR numbers?",
          answer: "Yes, all our flight reservations contain genuine PNR (Passenger Name Record) numbers that can be verified directly with the airline. These are real reservations in the airline's system, though they are temporary and will expire after a specified period."
        },
        {
          question: "How long are flight reservations valid?",
          answer: "Flight reservations are typically valid for 48-72 hours, which is sufficient time for visa submission. If you need the reservation for a longer period, please contact our support team, and we can arrange extended validity for an additional fee."
        },
        {
          question: "Can I modify the flight details after booking?",
          answer: "Yes, minor modifications like dates or passenger names can be made within 24 hours of booking at no extra charge. For major changes like destinations or completely new itineraries, a new reservation may need to be created."
        },
        {
          question: "What airlines do you work with?",
          answer: "We work with major international airlines including Emirates, Qatar Airways, Turkish Airlines, Lufthansa, British Airways, Air France, and many others. The specific airline will depend on your chosen route and availability."
        }
      ]
    },
    {
      title: "Hotel Bookings",
      icon: Star,
      faqs: [
        {
          question: "Are hotel bookings real reservations?",
          answer: "Yes, all hotel bookings are genuine reservations with real confirmation numbers. They are made with actual hotels and can be verified through the hotel's booking system. These are temporary reservations that will be automatically cancelled after the specified period."
        },
        {
          question: "What types of hotels do you book?",
          answer: "We work with a wide range of accommodations from 3-star to 5-star hotels in major cities worldwide. We select reputable hotels that are commonly accepted by embassies and provide all necessary documentation for visa purposes."
        },
        {
          question: "Can I specify a particular hotel?",
          answer: "While we cannot guarantee a specific hotel due to availability and embassy requirements, you can mention preferences in the special requests section, and we'll do our best to accommodate them while ensuring the booking meets embassy standards."
        },
        {
          question: "How long are hotel bookings valid?",
          answer: "Hotel bookings are typically valid for 7-14 days, providing sufficient time for visa processing. The exact validity period will be clearly mentioned in your booking confirmation."
        }
      ]
    },
    {
      title: "Travel Insurance",
      icon: Clock,
      faqs: [
        {
          question: "What coverage does your travel insurance provide?",
          answer: "Our travel insurance provides comprehensive coverage including medical expenses (up to €30,000 for basic, €100,000 for premium), emergency evacuation, trip cancellation, personal liability, and 24/7 emergency assistance. Premium plans also cover pre-existing conditions and adventure sports."
        },
        {
          question: "Is your travel insurance valid for Schengen visas?",
          answer: "Yes, our travel insurance meets all Schengen visa requirements including minimum coverage of €30,000 for medical expenses and emergency evacuation. The insurance certificate includes all required details and is accepted by Schengen country embassies."
        },
        {
          question: "Can I use this insurance for actual travel?",
          answer: "While our insurance certificates are primarily designed for visa applications, they do represent real insurance policies with actual coverage. However, we recommend purchasing comprehensive travel insurance from major providers for your actual travel needs."
        },
        {
          question: "What if I need to extend my travel insurance?",
          answer: "Insurance extensions are possible but must be arranged before the original policy expires. Contact our support team with your new travel dates, and we can arrange an extension for an additional fee."
        }
      ]
    },
    {
      title: "Payment & Delivery",
      icon: MessageSquare,
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards, UPI payments, net banking, and digital wallets. All transactions are secured with 256-bit SSL encryption to protect your financial information."
        },
        {
          question: "How will I receive my documents?",
          answer: "Documents are delivered via email as PDF attachments within 15-30 minutes of payment confirmation. You'll receive a confirmation email with your documents and instructions for use in your visa application."
        },
        {
          question: "What if I don't receive my documents?",
          answer: "If you don't receive your documents within the promised timeframe, please check your spam folder first. If still not received, contact our 24/7 support immediately, and we'll resend your documents or process an urgent replacement."
        },
        {
          question: "Can I get a refund if I change my mind?",
          answer: "Refunds are available within 1 hour of purchase if no documents have been generated. Once documents are created and sent, refunds are only available under our money-back guarantee conditions (e.g., if documents don't meet embassy requirements)."
        }
      ]
    }
  ];

  const quickFacts = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "15-30 minutes average delivery time"
    },
    {
      icon: Shield,
      title: "Embassy Approved",
      description: "100% compliant with visa requirements"
    },
    {
      icon: Star,
      title: "High Success Rate",
      description: "98% visa approval rate with our documents"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <HelpCircle className="w-4 h-4 mr-1" />
              Got Questions? We Have Answers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about our visa document services, 
              delivery process, and everything you need to know for a successful application.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {quickFacts.map((fact, index) => {
              const IconComponent = fact.icon;
              return (
                <Card key={index} className="text-center border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{fact.title}</h3>
                    <p className="text-gray-600 text-sm">{fact.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <Card key={categoryIndex} className="overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <IconComponent className="h-5 w-5 mr-2 text-blue-600" />
                      {category.title}
                    </h2>
                  </div>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border-b last:border-b-0">
                          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                            <span className="font-medium text-gray-900">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Can&apos;t find what you&apos;re looking for? Our expert support team is available 24/7
              to help with any questions about our services or your specific visa requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                <Link href="/contact" className="flex items-center">
                  Contact Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                <Link href="/services">
                  Browse Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Additional Help Resources
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Email Support",
                description: "Get detailed help via email",
                contact: "support@dummyticket.com",
                icon: "📧"
              },
              {
                title: "Phone Support",
                description: "Speak with our experts",
                contact: "+1 (555) 123-4567",
                icon: "📞"
              },
              {
                title: "Live Chat",
                description: "Instant help when you need it",
                contact: "Available 24/7",
                icon: "💬"
              },
              {
                title: "Help Center",
                description: "Comprehensive guides and tutorials",
                contact: "Browse articles",
                icon: "📚"
              }
            ].map((resource, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{resource.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                  <p className="text-blue-600 font-medium text-sm">{resource.contact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}