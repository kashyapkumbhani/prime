# Dummy Ticket Booking Website - Requirements Documentation

## Project Overview
A modern, responsive dummy ticket booking website built with Next.js and Shadcn/UI components. This platform provides visa-ready travel document services including flight reservations, hotel bookings, and travel insurance with real PNR numbers and embassy-approved formats.

## Technical Stack Requirements

### Core Technologies
- **Framework**: Next.js (Latest version with App Router)
- **UI Library**: Shadcn/UI (Latest components)
- **Styling**: Tailwind CSS
- **Database**: Local database solution like json database or something (no mysql no prisma nothing)
- **Deployment**: Vercel-ready configuration
- **Payment**: Dummy payment gateway for testing purposes

### Design System
- **Primary Color**: Blue (#1d4ed8)
- **Secondary Colors**: White (#ffffff) and Light Blue variants of #1d4ed8
- **Typography**: Clean, modern sans-serif fonts
- **Animations**: Smooth transitions, hover effects, and micro-interactions
- **Responsive**: Mobile-first approach with seamless desktop experience

## Website Structure

### Public Pages
1. **Home** - Landing page with hero section and service overview
2. **Services** - Detailed service listings with pricing
3. **Flight Reservation** - Multi-step booking form
4. **Hotel Booking** - Multi-step booking form  
5. **Travel Insurance** - Multi-step booking form
6. **About** - Company information and credibility
7. **FAQs** - Frequently asked questions
8. **Contact** - Contact information and support

### Admin Pages
- **Admin Dashboard**: `/admin/dashboard` with simple authentication
- Display all booking data, order details, and customer information

## Service Pricing Structure

### Flight Reservation
- **Price**: ₹999 per document
- **Features**:
  - Real PNR flight reservation valid for visa applications
  - Delivered in 15-30 minutes
  - Embassy-approved format
  - Real PNR & verification
- **Pricing Logic**: Base price ₹999 × number of travelers

### Hotel Booking  
- **Price**: ₹799 per document
- **Features**:
  - Confirmed hotel reservation for visa documentation
  - Delivered in 15-30 minutes
  - Embassy-approved format
  - Real booking confirmation

### Travel Insurance
- **Price**: ₹1499 per document
- **Features**:
  - Travel insurance certificate for visa requirements
  - Delivered in 15-30 minutes
  - Embassy-approved format
  - Real booking confirmation

## Flight Reservation Form Specifications

### Step 1: Flight Trip Details
- **Trip Type Selection**: Radio buttons for One-way/Round-trip
- **Departure Airport**: Autocomplete search field with airport JSON data
- **Arrival Airport**: Autocomplete search field with airport JSON data
- **Departure Date**: Date picker with validation
- **Return Date**: Conditional field for round-trip bookings

### Step 2: Traveler Information

#### Primary Traveler
- **Title**: Dropdown selection (Mr, Mrs, Miss, Child options)
- **First Name**: Required text input
- **Last Name**: Required text input  
- **Email Address**: Required email validation
- **Phone Number**: Required with format validation
- **Number of Travelers**: Selector (1-10 travelers maximum)

#### Additional Travelers (Up to 9)
- **Title**: Same dropdown options as primary
- **First Name**: Required for each additional traveler
- **Last Name**: Required for each additional traveler
- Dynamic form fields generated based on traveler count

### Step 3: Flight Reservation Delivery Timing
- **Immediate Processing**: "I need it now" (5-15 minutes delivery)
- **Scheduled Processing**: "On a later date" (recommended for 48+ hours)
- Single selection radio buttons

### Step 4: Purpose of Flight Reservation
- **Purpose Selection**: Dropdown with options:
  - Visa Submission / Application
  - Proof of Return  
  - Passport Renewal
  - Visa Extension
  - Other
- **Special Request**: Optional text area for additional requirements

## Airport Data Integration

### Airport JSON Structure
```json
{
  "name": "Airport Name",
  "city": "City Name", 
  "country": "Country Name"
}
```

### Autocomplete Functionality
- Minimum 2 characters to trigger search
- Search across name, city, and country fields
- Display format: "Airport Name - City, Country"
- Real-time filtering with debounced search

## Hotel Booking Form Specifications

### Step 1: Hotel Details
- **Destination City**: Manual text input (no JSON required)
- **Check-in Date**: Date picker with validation
- **Check-out Date**: Date picker with validation
- **Number of Rooms**: Selector (1-10 rooms)
- **Guest Details**: Similar to flight traveler information

### Step 2: Guest Information
- Same structure as flight reservation traveler details
- Support for multiple guests per room

### Step 3: Purpose and Special Requests
- **Purpose**: Dropdown for visa/travel purposes
- **Special Requests**: Text area for additional requirements

## Travel Insurance Form Specifications

### Step 1: Travel Details
- **Destination Country/Region**: Manual text input
- **Travel Start Date**: Date picker
- **Travel End Date**: Date picker
- **Trip Duration**: Auto-calculated from dates

### Step 2: Traveler Information
- Same structure as other forms
- Age validation for insurance eligibility

### Step 3: Coverage and Purpose
- **Coverage Type**: Basic/Premium options
- **Purpose**: Travel reason selection
- **Medical Coverage**: Pre-selected amounts

## User Experience Flow

### Booking Process
1. **Service Selection**: User selects desired service from homepage or services page
2. **Form Completion**: Multi-step guided form with progress indicator
3. **Review & Confirm**: Summary page with all details and pricing
4. **Payment Processing**: Dummy payment gateway integration
5. **Order Confirmation**: Success page with order details and estimated delivery
6. **Email Confirmation**: Automated confirmation email (simulated)

### Payment Integration
- **Dummy Gateway**: Simulated payment process for testing
- **Payment Methods**: Credit/Debit cards, UPI, Net Banking (UI only)
- **Success/Failure**: Proper handling and user feedback
- **Order Tracking**: Basic order status simulation

## Admin Panel Requirements

### Authentication
- **URL**: `/admin/dashboard`
- **Simple Login**: Basic username/password authentication
- **Session Management**: Maintain admin session securely

### Dashboard Features
- **Order Listing**: Tabular view of all bookings
- **Filter Options**: By service type, date, status
- **Order Details**: Expandable view with complete booking information
- **Export Functionality**: Basic CSV export of order data
- **Search**: Quick search by customer name, email, or order ID

### Data Display
- **Customer Information**: Complete traveler details
- **Booking Details**: Service type, dates, special requests
- **Payment Status**: Transaction information
- **Timestamps**: Creation date, completion date
- **Order Status**: Pending, Processing, Completed, Cancelled

## Database Schema Requirements

### Tables Structure

#### Customers
- ID, Email, Phone, Created Date

#### Orders  
- ID, Customer ID, Service Type, Total Amount, Status, Created Date

#### Travelers
- ID, Order ID, Title, First Name, Last Name, Traveler Type (Primary/Additional)

#### Flight Bookings
- ID, Order ID, Trip Type, Departure Airport, Arrival Airport, Departure Date, Return Date, Purpose, Special Requests, Delivery Timing

#### Hotel Bookings
- ID, Order ID, Destination City, Check-in Date, Check-out Date, Number of Rooms, Purpose, Special Requests

#### Insurance Bookings
- ID, Order ID, Destination, Travel Start Date, Travel End Date, Coverage Type, Purpose

## Design and Animation Requirements

### Homepage Design
- **Hero Section**: Eye-catching banner with primary value proposition
- **Service Cards**: Interactive cards with hover effects and animations
- **Pricing Display**: Clear pricing with feature highlights
- **Trust Indicators**: Embassy approval badges, delivery time guarantees
- **Call-to-Action**: Prominent booking buttons with micro-animations

### Animation Specifications
- **Page Transitions**: Smooth fade-in effects
- **Form Animations**: Step-by-step progress indicators with smooth transitions
- **Hover Effects**: Subtle scale and color transitions on interactive elements
- **Loading States**: Skeleton loaders and progress indicators
- **Success Animations**: Celebratory animations for completed bookings
- **Micro-interactions**: Button press feedback, input focus states

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for tablet screens
- **Desktop Enhancement**: Rich desktop experience with advanced features
- **Touch Interactions**: Mobile-friendly touch targets and gestures

## Performance Requirements

### Core Web Vitals
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Strategies
- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Route-based and component-based splitting
- **Lazy Loading**: Deferred loading of non-critical components
- **Caching**: Proper caching strategies for static and dynamic content

## Security Considerations

### Data Protection
- **Input Validation**: Server-side validation for all form inputs
- **XSS Prevention**: Proper sanitization of user inputs
- **CSRF Protection**: Cross-site request forgery protection
- **Rate Limiting**: Prevent spam submissions and abuse

### Admin Security
- **Authentication**: Secure login mechanism
- **Session Management**: Proper session handling and timeout
- **Access Control**: Role-based access to admin features
- **Audit Logging**: Track admin actions and access

## Testing Requirements

### Functionality Testing
- **Form Validation**: All input validation scenarios
- **Multi-step Navigation**: Forward/backward navigation in forms
- **Payment Flow**: Complete payment process simulation
- **Admin Features**: All admin panel functionalities
- **Responsive Testing**: Cross-device compatibility

### User Experience Testing
- **Accessibility**: WCAG 2.1 compliance
- **Performance**: Loading times and responsiveness
- **Browser Compatibility**: Modern browser support
- **Mobile Usability**: Touch interactions and mobile navigation

## Development Guidelines

### Code Quality
- **TypeScript**: Full type safety implementation
- **ESLint/Prettier**: Code formatting and linting
- **Component Structure**: Reusable and maintainable components
- **State Management**: Efficient state management with React hooks
- **Error Handling**: Comprehensive error boundaries and user feedback

### Best Practices
- **SEO Optimization**: Proper meta tags, structured data
- **Performance Monitoring**: Core Web Vitals tracking
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Accessibility**: Screen reader support, keyboard navigation
- **Internationalization**: Structure for future multi-language support

## Deployment Configuration

### Vercel Setup
- **Environment Variables**: Proper configuration management
- **Build Optimization**: Production build settings
- **Analytics**: Performance and user analytics integration
- **Domain Configuration**: Custom domain setup ready

### Monitoring
- **Error Tracking**: Integration with error monitoring services
- **Performance Metrics**: Real user monitoring
- **Uptime Monitoring**: Service availability tracking
- **User Analytics**: Conversion funnel tracking

This comprehensive requirements document provides the foundation for building a professional, scalable dummy ticket booking website that meets all specified functional and technical requirements while maintaining high standards of user experience and code quality.