import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Lock, Eye, UserCheck, Mail, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - PrimeDummyTicket",
  description: "Learn how PrimeDummyTicket protects your personal information and handles data privacy for visa document services.",
  keywords: "privacy policy, data protection, personal information, PrimeDummyTicket",
  alternates: {
    canonical: 'https://primedummyticket.com/privacy'
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Shield className="w-4 h-4 mr-1" />
              Privacy & Security
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your privacy is important to us. This policy explains how PrimeDummyTicket 
              collects, uses, and protects your personal information.
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
                  <Eye className="w-5 h-5 mr-2" />
                  Quick Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <ul className="space-y-2">
                  <li>• We collect only essential information needed to process your visa documents</li>
                  <li>• Your personal data is encrypted and securely stored</li>
                  <li>• We never sell or share your information with third parties</li>
                  <li>• You can request data deletion at any time</li>
                  <li>• We comply with international privacy laws (GDPR, CCPA)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                    <p className="text-gray-600 mb-3">
                      When you use our visa document services, we collect:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Full name and contact details (email, phone number)</li>
                      <li>Travel information (destinations, dates, purpose)</li>
                      <li>Payment information (processed securely through our payment providers)</li>
                      <li>Passenger details for ticket reservations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Data</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on our website</li>
                      <li>Referral source</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-800">Primary Uses</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <UserCheck className="w-4 h-4 mr-2 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">Process your visa document orders</span>
                        </li>
                        <li className="flex items-start">
                          <Mail className="w-4 h-4 mr-2 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">Send order confirmations and documents</span>
                        </li>
                        <li className="flex items-start">
                          <Phone className="w-4 h-4 mr-2 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">Provide customer support</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-800">Service Improvement</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Shield className="w-4 h-4 mr-2 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">Enhance security and prevent fraud</span>
                        </li>
                        <li className="flex items-start">
                          <Eye className="w-4 h-4 mr-2 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">Analyze website usage patterns</span>
                        </li>
                        <li className="flex items-start">
                          <Lock className="w-4 h-4 mr-2 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">Comply with legal requirements</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">3. How We Protect Your Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    We implement industry-standard security measures to protect your personal information:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <Lock className="w-6 h-6 text-green-600 mb-2" />
                      <h4 className="font-semibold text-green-800">Encryption</h4>
                      <p className="text-sm text-green-700">256-bit SSL encryption for all data transmission</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <Shield className="w-6 h-6 text-blue-600 mb-2" />
                      <h4 className="font-semibold text-blue-800">Secure Storage</h4>
                      <p className="text-sm text-blue-700">Protected servers with regular security audits</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <UserCheck className="w-6 h-6 text-purple-600 mb-2" />
                      <h4 className="font-semibold text-purple-800">Access Control</h4>
                      <p className="text-sm text-purple-700">Limited access on a need-to-know basis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">4. Data Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">We Never Sell Your Data</h3>
                    <p className="text-red-700">
                      PrimeDummyTicket does not sell, rent, or trade your personal information to third parties for marketing purposes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Limited Sharing Scenarios</h3>
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-800">Service Providers</h4>
                        <p className="text-gray-600">We may share data with trusted service providers who help us deliver our services (payment processors, email services).</p>
                      </div>
                      
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <h4 className="font-semibold text-gray-800">Legal Requirements</h4>
                        <p className="text-gray-600">We may disclose information when required by law or to protect our rights and safety.</p>
                      </div>
                      
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-800">Business Transfers</h4>
                        <p className="text-gray-600">In the event of a merger or acquisition, customer data may be transferred as part of business assets.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">5. Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Access</h4>
                          <p className="text-sm text-gray-600">Request access to your personal data</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Correction</h4>
                          <p className="text-sm text-gray-600">Request correction of inaccurate data</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Deletion</h4>
                          <p className="text-sm text-gray-600">Request deletion of your personal data</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Portability</h4>
                          <p className="text-sm text-gray-600">Request a copy of your data in portable format</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">5</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Restriction</h4>
                          <p className="text-sm text-gray-600">Request restriction of data processing</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">6</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Objection</h4>
                          <p className="text-sm text-gray-600">Object to certain data processing activities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">6. Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    We use cookies and similar tracking technologies to improve your experience on our website.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">Essential Cookies</h4>
                      <p className="text-gray-600 text-sm">Required for basic website functionality and security.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800">Analytics Cookies</h4>
                      <p className="text-gray-600 text-sm">Help us understand how visitors interact with our website.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800">Preference Cookies</h4>
                      <p className="text-gray-600 text-sm">Remember your settings and preferences for future visits.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">Questions About Privacy?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-green-700">
                    If you have any questions about this Privacy Policy or how we handle your personal information, 
                    please don&apos;t hesitate to contact us.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-green-800">Email</p>
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

          </div>
        </div>
      </section>
    </div>
  );
}