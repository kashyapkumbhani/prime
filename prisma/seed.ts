import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin users
  const admin1 = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@dummyticket.com',
      password: 'admin123', // In production, this should be hashed
      role: 'admin',
    },
  });

  const admin2 = await prisma.adminUser.upsert({
    where: { username: 'ravi' },
    update: {},
    create: {
      username: 'ravi',
      email: 'ravi@dummyticket.com',
      password: 'ravi123', // In production, this should be hashed
      role: 'admin',
    },
  });

  // Create sample customers
  const customer1 = await prisma.customer.upsert({
    where: { email: 'john.doe@email.com' },
    update: {},
    create: {
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
    },
  });

  const customer2 = await prisma.customer.upsert({
    where: { email: 'jane.smith@email.com' },
    update: {},
    create: {
      email: 'jane.smith@email.com',
      phone: '+1-555-0456',
    },
  });

  const customer3 = await prisma.customer.upsert({
    where: { email: 'mike.johnson@email.com' },
    update: {},
    create: {
      email: 'mike.johnson@email.com',
      phone: '+1-555-0789',
    },
  });

  // Create sample orders
  const order1 = await prisma.order.create({
    data: {
      id: 'ORD-001',
      serviceType: 'FLIGHT_RESERVATION',
      customerId: customer1.id,
      customerName: 'John Doe',
      customerEmail: 'john.doe@email.com',
      customerPhone: '+1-555-0123',
      numberOfTravelers: 2,
      totalAmount: 1998,
      status: 'COMPLETED',
      completedAt: new Date('2024-01-15T10:45:00Z'),
      travelers: {
        create: [
          {
            title: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            isPrimary: true,
          },
          {
            title: 'Mrs',
            firstName: 'Jane',
            lastName: 'Doe',
            isPrimary: false,
          },
        ],
      },
      flightBooking: {
        create: {
          tripType: 'round-trip',
          departureAirport: 'John F. Kennedy International Airport - New York, United States',
          arrivalAirport: 'London Heathrow Airport - London, United Kingdom',
          departureDate: new Date('2024-02-15'),
          returnDate: new Date('2024-02-28'),
          purpose: 'Visa Submission / Application',
          deliveryTiming: 'now',
          pnrNumber: 'ABC123XYZ',
        },
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      id: 'ORD-002',
      serviceType: 'HOTEL_BOOKING',
      customerId: customer2.id,
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@email.com',
      customerPhone: '+1-555-0456',
      numberOfTravelers: 1,
      totalAmount: 799,
      status: 'PROCESSING',
      travelers: {
        create: [
          {
            title: 'Miss',
            firstName: 'Jane',
            lastName: 'Smith',
            isPrimary: true,
          },
        ],
      },
      hotelBooking: {
        create: {
          destinationCity: 'Paris',
          checkInDate: new Date('2024-03-01'),
          checkOutDate: new Date('2024-03-07'),
          numberOfRooms: 1,
          numberOfGuests: 1,
          purpose: 'Tourism',
          confirmationNumber: 'HTL789456',
        },
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      id: 'ORD-003',
      serviceType: 'TRAVEL_INSURANCE',
      customerId: customer3.id,
      customerName: 'Mike Johnson',
      customerEmail: 'mike.johnson@email.com',
      customerPhone: '+1-555-0789',
      numberOfTravelers: 3,
      totalAmount: 4497,
      status: 'COMPLETED',
      completedAt: new Date('2024-01-14T09:25:00Z'),
      travelers: {
        create: [
          {
            title: 'Mr',
            firstName: 'Mike',
            lastName: 'Johnson',
            isPrimary: true,
          },
          {
            title: 'Mrs',
            firstName: 'Sarah',
            lastName: 'Johnson',
            isPrimary: false,
          },
          {
            title: 'Child (0-12 Years - Male)',
            firstName: 'Tommy',
            lastName: 'Johnson',
            isPrimary: false,
          },
        ],
      },
      insuranceBooking: {
        create: {
          destinationCountry: 'Germany',
          travelStartDate: new Date('2024-04-10'),
          travelEndDate: new Date('2024-04-25'),
          coverageType: 'basic',
          purpose: 'Business Travel',
          policyNumber: 'INS789123',
        },
      },
    },
  });

  console.log('Database seeded successfully!');
  console.log({ admin1, admin2, customer1, customer2, customer3, order1, order2, order3 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });