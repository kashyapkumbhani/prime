import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Shield, 
  Clock, 
  Star, 
  Users, 
  CheckCircle, 
  Globe, 
  Heart,
  Award,
  Target,
  Eye,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "50,000+", label: "Documents Delivered", icon: CheckCircle },
    { value: "98%", label: "Visa Success Rate", icon: Star },
    { value: "5+ Years", label: "Industry Experience", icon: Award },
    { value: "24/7", label: "Customer Support", icon: Clock }
  ];

  const features = [
    {
      icon: Shield,
      title: "Embassy Approved",
      description: "All our documents are created in embassy-approved formats and accepted worldwide by visa offices."
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Quick turnaround time with most documents delivered within 15-30 minutes of order confirmation."
    },
    {
      icon: Star,
      title: "High Success Rate",
      description: "98% visa success rate with our professionally crafted documents that meet embassy requirements."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated team of visa experts with years of experience in embassy requirements and documentation."
    },
    {
      icon: Globe,
      title: "Worldwide Coverage",
      description: "Supporting visa applications for destinations worldwide with country-specific requirements."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "24/7 customer support and personalized service to ensure your visa application success."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      experience: "10+ years in visa consultancy",
      description: "Former embassy liaison with deep expertise in visa requirements across 50+ countries."
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      experience: "8+ years in document processing",
      description: "Ensuring quality and compliance in every document we deliver to our clients."
    },
    {
      name: "Amit Patel",
      role: "Technical Director",
      experience: "7+ years in technology",
      description: "Building secure and efficient systems for fast document delivery and processing."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Star className="w-4 h-4 mr-1" />
              Trusted by Thousands
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About DummyTicket
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your trusted partner for visa documentation services. We&apos;ve been helping travelers
              secure their visa applications with professional, embassy-approved documents for over 5 years.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission & Vision
              </h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mr-4 flex-shrink-0">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      To simplify the visa application process by providing quick, reliable, and 
                      embassy-approved documentation services that help travelers achieve their 
                      international travel goals with confidence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mr-4 flex-shrink-0">
                    <Eye className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                      To become the world&apos;s most trusted platform for visa documentation services,
                      making international travel accessible and stress-free for everyone, everywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>100% Embassy Approved Documents</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Lightning Fast 15-30 Min Delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Real PNR Numbers & Confirmations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>24/7 Dedicated Customer Support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Money Back Guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine expertise, technology, and dedication to deliver exceptional visa documentation services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to making your visa application process smooth and successful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                  <Badge variant="outline" className="text-gray-600">
                    {member.experience}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Integrity",
                description: "We maintain the highest standards of honesty and transparency in all our services."
              },
              {
                title: "Excellence",
                description: "We strive for perfection in every document and interaction with our customers."
              },
              {
                title: "Innovation",
                description: "We continuously improve our processes and technology to serve you better."
              },
              {
                title: "Reliability",
                description: "You can count on us to deliver quality documents on time, every time."
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {value.title[0]}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Visa Application?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have successfully obtained their visas with our help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/services" className="flex items-center">
                View Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/contact">
                Contact Us Today
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}