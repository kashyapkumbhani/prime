import Link from "next/link";
import { Plane, Mail, Phone, MessageCircle, Globe, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white">
                <Plane className="h-4 w-4" />
              </div>
              <span className="font-bold text-xl text-gray-900">PrimeDummyTicket</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm leading-6">
              Professional visa documentation service providing flight reservations, hotel bookings, and travel insurance for visa applications worldwide. Embassy-approved documents delivered within 15-30 minutes.
            </p>
            <div className="mt-4">
              <a href="https://primedummyticket.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                <Globe className="h-4 w-4 mr-1" />
                primedummyticket.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: "Flight Reservation", href: "/flight-reservation" },
                { name: "Hotel Booking", href: "/hotel-booking" },
                { name: "Travel Insurance", href: "/travel-insurance" },
                { name: "FAQs", href: "/faqs" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="https://wa.me/919316105685" target="_blank" rel="noopener noreferrer" className="flex items-center text-green-600 hover:text-green-800">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">WhatsApp (Fastest)</span>
                </a>
                <span className="text-xs text-gray-500 ml-6">+91 93161 05685</span>
              </li>
              <li>
                <a href="mailto:primedummyticket@gmail.com" className="flex items-center text-gray-600 hover:text-blue-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">primedummyticket@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+919316105685" className="flex items-center text-gray-600 hover:text-blue-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">+91 93161 05685</span>
                </a>
              </li>
              <li className="flex items-start text-gray-600">
                <Clock className="h-4 w-4 mr-2 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">24/7 Support</div>
                  <div className="text-xs text-gray-500">Avg response: 30 min</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} PrimeDummyTicket. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;