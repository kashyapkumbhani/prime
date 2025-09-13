import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Shield, AlertTriangle, CreditCard, Mail, Phone, Clock, CheckCircle, XCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service - PrimeDummyTicket",
  description: "Read PrimeDummyTicket's terms and conditions for visa document services, refund policy, and user agreements.",
  keywords: "terms of service, terms and conditions, user agreement, refund policy, PrimeDummyTicket",
  alternates: {
    canonical: 'https://primedummyticket.com/terms'
  }
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <FileText className="w-4 h-4 mr-1" />
              Legal Terms
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Please read these terms and conditions carefully before using PrimeDummyTicket&apos;s
              visa document services. By using our services, you agree to these terms.
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              <span>Last updated: January 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-8">
            
            {/* Quick Summary */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Quick Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <ul className="space-y-2">
                  <li>• Our services provide dummy tickets and documents for visa application purposes only</li>
                  <li>• All documents come with real PNR numbers and embassy-approved formats</li>
                  <li>• Refunds available within 24 hours if service cannot be delivered</li>
                  <li>• Users must provide accurate information for document preparation</li>
                  <li>• Services are delivered digitally via email within 15-30 minutes</li>
                </ul>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">1. Service Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    PrimeDummyTicket provides professional visa documentation services including:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Flight Reservations</h4>
                      <p className="text-sm text-blue-700">Real PNR flight bookings valid for visa applications with airline verification</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Hotel Bookings</h4>
                      <p className="text-sm text-green-700">Confirmed hotel reservations with real confirmation numbers</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">Travel Insurance</h4>
                      <p className="text-sm text-purple-700">Travel insurance certificates meeting embassy requirements</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Important Note</h4>
                        <p className="text-yellow-700 text-sm">
                          Our services provide temporary reservations for visa application purposes. 
                          These are not actual travel bookings and should not be used for actual travel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Obligations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">2. User Obligations and Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    By using our services, you agree to:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Provide Accurate Information</h4>
                        <p className="text-gray-600 text-sm">Submit correct passenger details, travel dates, and destinations for document preparation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Use for Visa Purposes Only</h4>
                        <p className="text-gray-600 text-sm">Use our documents solely for visa application purposes and not for actual travel</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Comply with Laws</h4>
                        <p className="text-gray-600 text-sm">Ensure your use of our services complies with local and international laws</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Timely Communication</h4>
                        <p className="text-gray-600 text-sm">Respond promptly to any requests for clarification or additional information</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2" />
                  3. Payment Terms and Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Service Pricing</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Flight Reservation</span>
                          <span className="font-semibold text-blue-600">₹999 per traveler</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Hotel Booking</span>
                          <span className="font-semibold text-green-600">₹799 per traveler</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Travel Insurance</span>
                          <span className="font-semibold text-purple-600">₹1,499 per traveler</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Payment Terms</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">Payment required before document processing</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">Secure payment processing with encryption</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">Multiple payment methods accepted</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">Instant order confirmation upon payment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery and Service Guarantee */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">4. Delivery and Service Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Service Delivery</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-600 text-sm">Standard delivery: 15-30 minutes</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600 text-sm">Documents delivered via email</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-600 text-sm">Embassy-approved document formats</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600 text-sm">Real PNR numbers included</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Quality Guarantee</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        We guarantee that all documents will be:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">Properly formatted for embassy submission</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">Include all required information</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">Verifiable through official channels</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">5. Refund and Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Eligible for Full Refund
                    </h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• Service cannot be delivered within 24 hours</li>
                      <li>• Technical issues prevent document generation</li>
                      <li>• Duplicate orders placed by mistake</li>
                      <li>• Service cancellation within 1 hour of payment</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      No Refund Policy
                    </h4>
                    <ul className="space-y-1 text-red-700 text-sm">
                      <li>• Documents already delivered successfully</li>
                      <li>• Visa application rejection (not related to document quality)</li>
                      <li>• Change of travel plans after document delivery</li>
                      <li>• User-provided incorrect information</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Refund Process</h4>
                    <p className="text-blue-700 text-sm">
                      Refunds are processed within 3-5 business days to the original payment method. 
                      Contact our support team via WhatsApp (+91 93161 05685) or email (primedummyticket@gmail.com) 
                      for refund requests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitations and Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">6. Service Limitations and Disclaimers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">Important Disclaimers</h4>
                        <ul className="space-y-2 text-yellow-700 text-sm">
                          <li>• We cannot guarantee visa approval - approval depends on embassy decisions</li>
                          <li>• Documents are for visa application purposes only, not actual travel</li>
                          <li>• We are not responsible for embassy policy changes or requirements</li>
                          <li>• Users must verify current embassy requirements independently</li>
                          <li>• We reserve the right to refuse service for suspicious or fraudulent requests</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Limitation of Liability</h4>
                    <p className="text-gray-600 text-sm">
                      PrimeDummyTicket&apos;s liability is limited to the amount paid for our services.
                      We are not liable for any indirect, incidental, or consequential damages arising 
                      from the use of our services, including but not limited to visa rejection, 
                      travel delays, or financial losses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">7. Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    All content, designs, formats, and proprietary technology used in our services 
                    are the intellectual property of PrimeDummyTicket.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Our Rights</h4>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>• Website content and design</li>
                        <li>• Document templates and formats</li>
                        <li>• Service processes and technology</li>
                        <li>• Trademark and brand elements</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Your Rights</h4>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>• Use documents for intended visa purposes</li>
                        <li>• Make necessary copies for embassy submission</li>
                        <li>• Share with authorized representatives</li>
                        <li>• Store for personal records</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">8. Governing Law and Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    These terms are governed by the laws of India. Any disputes arising from these 
                    terms or our services will be resolved through the following process:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Direct Communication</h4>
                        <p className="text-gray-600 text-sm">Contact our support team to resolve issues amicably</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Mediation</h4>
                        <p className="text-gray-600 text-sm">Attempt resolution through mutually agreed mediation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Legal Action</h4>
                        <p className="text-gray-600 text-sm">Disputes subject to exclusive jurisdiction of Indian courts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">Questions About Our Terms?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-green-700">
                    If you have any questions about these Terms of Service or need clarification 
                    about our policies, please contact us immediately.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-green-800">Email Support</p>
                      <p className="text-sm text-green-700">primedummyticket@gmail.com</p>
                    </div>
                    
                    <div className="text-center">
                      <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-green-800">WhatsApp</p>
                      <p className="text-sm text-green-700">+91 93161 05685</p>
                    </div>
                    
                    <div className="text-center">
                      <Button asChild className="bg-green-600 hover:bg-green-700">
                        <Link href="/contact">Contact Support</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agreement Acknowledgment */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Agreement Acknowledgment</h3>
                  <p className="text-blue-700">
                    By using PrimeDummyTicket services, you acknowledge that you have read, 
                    understood, and agree to be bound by these Terms of Service.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
}