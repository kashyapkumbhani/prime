import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentToken, markTokenAsUsed } from '@/lib/token';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { token, paymentMethod } = await request.json();
    
    if (!token || !paymentMethod) {
      return NextResponse.json(
        { error: 'Token and payment method are required' },
        { status: 400 }
      );
    }
    
    // Validate the token
    const validation = validatePaymentToken(token);
    
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || 'Invalid token' },
        { status: 400 }
      );
    }
    
    const tokenData = validation.data;
    
    if (!tokenData) {
      return NextResponse.json(
        { error: 'No token data found' },
        { status: 400 }
      );
    }
    
    console.log('Creating order with token data:', tokenData);
    
    // Mark token as used to prevent reuse
    markTokenAsUsed(token);
    
    // Map service type to enum and generate readable order IDs
    const serviceTypeMap: Record<string, string> = {
      'flight-reservation': 'FLIGHT_RESERVATION',
      'hotel-booking': 'HOTEL_BOOKING',
      'travel-insurance': 'TRAVEL_INSURANCE'
    };

    // Generate human-readable order ID with collision detection
    const generateOrderId = async (serviceType: string): Promise<string> => {
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        const randomNum = Math.floor(Math.random() * 900000) + 100000; // 6-digit number
        let orderId: string;
        
        switch (serviceType) {
          case 'flight-reservation':
            orderId = `FLIGHT-${randomNum}`;
            break;
          case 'hotel-booking':
            orderId = `HOTEL-${randomNum}`;
            break;
          case 'travel-insurance':
            orderId = `INSURANCE-${randomNum}`;
            break;
          default:
            orderId = `ORDER-${randomNum}`;
            break;
        }
        
        // Check if this ID already exists
        const existingOrder = await prisma.order.findUnique({
          where: { id: orderId }
        });
        
        if (!existingOrder) {
          return orderId;
        }
        
        attempts++;
      }
      
      // Fallback to timestamp-based ID if all attempts fail
      const timestamp = Date.now();
      return `${serviceType.toUpperCase()}-${timestamp}`;
    };

    const customOrderId = await generateOrderId(tokenData.service);

    // Type assertion for bookingDetails since we know it contains our data
    const bookingDetails = tokenData.bookingDetails as {
      customerName?: string;
      customerEmail: string;
      customerPhone?: string;
      primaryTraveler?: { title: string; firstName: string; lastName: string };
      additionalTravelers?: { title: string; firstName: string; lastName: string }[];
      [key: string]: unknown;
    };
    
    // First, create or find the customer
    const customer = await prisma.customer.upsert({
      where: { email: bookingDetails.customerEmail as string },
      update: {
        phone: bookingDetails.customerPhone as string
      },
      create: {
        email: bookingDetails.customerEmail as string,
        phone: bookingDetails.customerPhone as string
      }
    });

    // Create the order with proper relations
    const order = await prisma.order.create({
      data: {
        id: customOrderId,
        serviceType: serviceTypeMap[tokenData.service] as 'FLIGHT_RESERVATION' | 'HOTEL_BOOKING' | 'TRAVEL_INSURANCE',
        customerId: customer.id,
        customerName: bookingDetails.customerName || "Unknown Customer",
        customerEmail: bookingDetails.customerEmail,
        customerPhone: bookingDetails.customerPhone as string,
        numberOfTravelers: tokenData.travelers,
        totalAmount: tokenData.totalAmount,
        paymentMethod: paymentMethod,
        status: "COMPLETED",
        completedAt: new Date(),
        
        // Create travelers
        travelers: {
          create: [
            // Primary traveler
            ...(bookingDetails.primaryTraveler ? [{
              title: bookingDetails.primaryTraveler.title,
              firstName: bookingDetails.primaryTraveler.firstName,
              lastName: bookingDetails.primaryTraveler.lastName,
              isPrimary: true
            }] : []),
            // Additional travelers
            ...(bookingDetails.additionalTravelers || []).map(traveler => ({
              title: traveler.title,
              firstName: traveler.firstName,
              lastName: traveler.lastName,
              isPrimary: false
            }))
          ]
        },

        // Create service-specific booking details
        ...(tokenData.service === 'flight-reservation' && {
          flightBooking: {
            create: {
              tripType: (bookingDetails.tripType as string) || 'one-way',
              departureAirport: (bookingDetails.departureAirport as { city: string; code: string })?.city ? 
                `${(bookingDetails.departureAirport as { city: string; code: string }).city} (${(bookingDetails.departureAirport as { city: string; code: string }).code})` : 
                'Unknown',
              arrivalAirport: (bookingDetails.arrivalAirport as { city: string; code: string })?.city ? 
                `${(bookingDetails.arrivalAirport as { city: string; code: string }).city} (${(bookingDetails.arrivalAirport as { city: string; code: string }).code})` : 
                'Unknown',
              departureDate: bookingDetails.departureDate ? 
                new Date(bookingDetails.departureDate as string) : new Date(),
              returnDate: bookingDetails.returnDate ? 
                new Date(bookingDetails.returnDate as string) : null,
              purpose: (bookingDetails.purpose as string) || 'Visa Application',
              specialRequests: bookingDetails.specialRequest as string,
              deliveryTiming: (bookingDetails.deliveryTiming as string) || 'now'
            }
          }
        }),

        ...(tokenData.service === 'hotel-booking' && {
          hotelBooking: {
            create: {
              destinationCity: (bookingDetails.destinationCity as string) || 'Unknown',
              checkInDate: bookingDetails.checkInDate ? 
                new Date(bookingDetails.checkInDate as string) : new Date(),
              checkOutDate: bookingDetails.checkOutDate ? 
                new Date(bookingDetails.checkOutDate as string) : new Date(),
              numberOfRooms: (bookingDetails.numberOfHotels as number) || 1,
              numberOfGuests: tokenData.travelers,
              purpose: (bookingDetails.purpose as string) || 'Visa Application',
              specialRequests: bookingDetails.specialRequest as string
            }
          }
        }),

        ...(tokenData.service === 'travel-insurance' && {
          insuranceBooking: {
            create: {
              destinationCountry: (bookingDetails.destinationCountry as string) || 'Unknown',
              travelStartDate: bookingDetails.travelStartDate ? 
                new Date(bookingDetails.travelStartDate as string) : new Date(),
              travelEndDate: bookingDetails.travelEndDate ? 
                new Date(bookingDetails.travelEndDate as string) : new Date(),
              coverageType: (bookingDetails.coverageType as string) || 'basic',
              purpose: (bookingDetails.travelPurpose as string) || 'Tourism',
              preExistingConditions: bookingDetails.preExistingConditions as string,
              specialRequests: bookingDetails.specialRequests as string
            }
          }
        })
      }
    });

    console.log('Order created successfully:', order.id);

    return NextResponse.json({ 
      success: true, 
      orderId: order.id 
    });
    
  } catch (error) {
    console.error('Error creating order with token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}