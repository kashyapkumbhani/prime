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
    console.log('Creating order with token data:', tokenData);
    
    // Mark token as used to prevent reuse
    markTokenAsUsed(token);
    
    // Map service type to enum and generate readable order IDs
    const serviceTypeMap = {
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

    // First, create or find the customer
    const customer = await prisma.customer.upsert({
      where: { email: tokenData.bookingDetails.customerEmail },
      update: {
        phone: tokenData.bookingDetails.customerPhone
      },
      create: {
        email: tokenData.bookingDetails.customerEmail,
        phone: tokenData.bookingDetails.customerPhone
      }
    });

    // Create the order with proper relations
    const order = await prisma.order.create({
      data: {
        id: customOrderId,
        serviceType: serviceTypeMap[tokenData.service],
        customerId: customer.id,
        customerName: tokenData.bookingDetails.customerName || "Unknown Customer",
        customerEmail: tokenData.bookingDetails.customerEmail,
        customerPhone: tokenData.bookingDetails.customerPhone,
        numberOfTravelers: tokenData.travelers,
        totalAmount: tokenData.totalAmount,
        paymentMethod: paymentMethod,
        status: "COMPLETED",
        completedAt: new Date(),
        
        // Create travelers
        travelers: {
          create: [
            // Primary traveler
            ...(tokenData.bookingDetails.primaryTraveler ? [{
              title: tokenData.bookingDetails.primaryTraveler.title,
              firstName: tokenData.bookingDetails.primaryTraveler.firstName,
              lastName: tokenData.bookingDetails.primaryTraveler.lastName,
              isPrimary: true
            }] : []),
            // Additional travelers
            ...(tokenData.bookingDetails.additionalTravelers || []).map(traveler => ({
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
              tripType: tokenData.bookingDetails.tripType || 'one-way',
              departureAirport: tokenData.bookingDetails.departureAirport ? 
                `${tokenData.bookingDetails.departureAirport.city} (${tokenData.bookingDetails.departureAirport.code})` : 
                'Unknown',
              arrivalAirport: tokenData.bookingDetails.arrivalAirport ? 
                `${tokenData.bookingDetails.arrivalAirport.city} (${tokenData.bookingDetails.arrivalAirport.code})` : 
                'Unknown',
              departureDate: tokenData.bookingDetails.departureDate ? 
                new Date(tokenData.bookingDetails.departureDate) : new Date(),
              returnDate: tokenData.bookingDetails.returnDate ? 
                new Date(tokenData.bookingDetails.returnDate) : null,
              purpose: tokenData.bookingDetails.purpose || 'Visa Application',
              specialRequests: tokenData.bookingDetails.specialRequest,
              deliveryTiming: tokenData.bookingDetails.deliveryTiming || 'now'
            }
          }
        }),

        ...(tokenData.service === 'hotel-booking' && {
          hotelBooking: {
            create: {
              destinationCity: tokenData.bookingDetails.destinationCity || 'Unknown',
              checkInDate: tokenData.bookingDetails.checkInDate ? 
                new Date(tokenData.bookingDetails.checkInDate) : new Date(),
              checkOutDate: tokenData.bookingDetails.checkOutDate ? 
                new Date(tokenData.bookingDetails.checkOutDate) : new Date(),
              numberOfRooms: tokenData.bookingDetails.numberOfHotels || 1,
              numberOfGuests: tokenData.travelers,
              purpose: tokenData.bookingDetails.purpose || 'Visa Application',
              specialRequests: tokenData.bookingDetails.specialRequest
            }
          }
        }),

        ...(tokenData.service === 'travel-insurance' && {
          insuranceBooking: {
            create: {
              destinationCountry: tokenData.bookingDetails.destinationCountry || 'Unknown',
              travelStartDate: tokenData.bookingDetails.travelStartDate ? 
                new Date(tokenData.bookingDetails.travelStartDate) : new Date(),
              travelEndDate: tokenData.bookingDetails.travelEndDate ? 
                new Date(tokenData.bookingDetails.travelEndDate) : new Date(),
              coverageType: tokenData.bookingDetails.coverageType || 'basic',
              purpose: tokenData.bookingDetails.travelPurpose || 'Tourism',
              preExistingConditions: tokenData.bookingDetails.preExistingConditions,
              specialRequests: tokenData.bookingDetails.specialRequests
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