# Hyrinx - Rental Websites Platform

A production-ready website rental marketplace built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Overview

Hyrinx allows customers to rent professionally designed, ready-made websites for events, businesses, celebrations, and projects instead of purchasing permanent websites. The platform features:

- **Public Website**: No login required for browsing, searching, and ordering websites
- **Admin Panel**: Secure authentication for managing websites, orders, rentals, and pricing
- **Flexible Pricing**: Multiple rental durations (1 day to 1 year) with dynamic pricing
- **CMS Features**: Admin-controlled content management without code changes
- **Order Flow**: Multi-step checkout with customization options

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: Custom session-based auth with bcrypt
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
```

3. Seed the database with initial data:
```bash
npm run seed
```

This creates:
- Admin user (email: `admin@hyrinx.com`, password: `admin123`)
- Categories (Birthday, Wedding, College, etc.)
- Pricing plans (1 Day to 1 Year)
- Sample websites
- Default settings

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public website.

### Admin Access

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `admin@hyrinx.com`
- Password: `admin123`

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── login/          # Admin login
│   │   ├── page.tsx        # Admin dashboard
│   │   ├── websites/       # Website management
│   │   ├── orders/         # Order management
│   │   ├── rentals/        # Rental tracking
│   │   └── pricing/        # Pricing management
│   ├── websites/           # Public website pages
│   │   ├── page.tsx        # Website marketplace
│   │   └── [slug]/         # Website detail pages
│   ├── checkout/           # Order flow
│   ├── custom-website/     # Custom request form
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/
│   └── Navbar.tsx          # Navigation component
└── lib/
    ├── prisma.ts           # Prisma client
    ├── auth.ts             # Authentication utilities
    ├── session.ts          # Session management
    └── utils.ts            # Helper functions
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Database seeding
```

## Key Features

### Public Website
- **Hero Section**: Premium landing with browser mockups
- **Website Marketplace**: Search, filter, and browse templates
- **Live Demos**: Preview actual websites before renting
- **Pricing Calculator**: Dynamic pricing based on duration
- **Multi-step Checkout**: Review → Information → Customization → Payment
- **Custom Requests**: Form for bespoke website requests

### Admin Panel
- **Dashboard**: Analytics and quick actions
- **Website Management**: Add, edit, publish websites without coding
- **Order Management**: Track and process customer orders
- **Rental Tracking**: Monitor active, expiring, and expired rentals
- **Pricing Management**: Configure rental plans and pricing
- **CMS**: Control homepage content, settings, and media

## Database Schema

Core entities:
- `AdminUser`: Admin accounts with role-based access
- `Website`: Website templates with features and customization options
- `Category`: Website categories
- `PricingPlan`: Rental duration pricing
- `Order`: Customer orders with items
- `Rental`: Active website rentals with expiry tracking
- `CustomRequest`: Custom website requests
- `Settings`: Platform configuration

## Security Features

- Password hashing with bcrypt
- Secure session management
- Admin-only protected routes
- Input validation on forms
- SQL injection prevention via Prisma
- Order access tokens for customer tracking

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
NODE_ENV="production"
```

## Future Enhancements

- Payment gateway integration (Razorpay, Stripe)
- File upload system for media library
- Email notifications for orders
- Background job for rental expiry
- Advanced analytics dashboard
- Multi-language support
- Customer account system (optional)

## License

This project is proprietary software for Hyrinx.

## Support

For support, contact admin@hyrinx.com
