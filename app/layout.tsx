import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeDummyTicket - Professional Visa Document Services",
  description: "Get embassy-approved flight reservations, hotel bookings, and travel insurance for visa applications. Delivered within 15-30 minutes with real PNR numbers from PrimeDummyTicket.com.",
  keywords: "dummy ticket, flight reservation, hotel booking, travel insurance, visa application, PNR number, embassy approved",
  authors: [{ name: "PrimeDummyTicket", url: "https://primedummyticket.com" }],
  creator: "PrimeDummyTicket",
  publisher: "PrimeDummyTicket",
  metadataBase: new URL('https://primedummyticket.com'),
  alternates: {
    canonical: 'https://primedummyticket.com'
  },
  openGraph: {
    title: "PrimeDummyTicket - Professional Visa Document Services",
    description: "Get embassy-approved flight reservations, hotel bookings, and travel insurance for visa applications. Delivered within 15-30 minutes.",
    url: "https://primedummyticket.com",
    siteName: "PrimeDummyTicket",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
