# 🌐 Hyrinx — Website Rental Platform

A full-stack, production-ready **website rental marketplace** built with **Next.js 16**, **TypeScript**, **Prisma ORM**, **SQLite**, and **Tailwind CSS**.

Customers can browse, preview, and rent professionally-designed websites for events, businesses, and projects — without buying permanent solutions.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | SQLite via Prisma ORM |
| Styling | Tailwind CSS v4 |
| Auth | Custom session-based auth (bcrypt) |
| Icons | Lucide React |
| Validation | Zod + React Hook Form |

---

## 📁 Project Structure

```
hyrinx/
│
├── prisma/
│   ├── schema.prisma              # Database schema (all models)
│   ├── seed.ts                    # Seed: admins, categories, pricing, websites
│   └── migrations/                # Prisma migration history
│       ├── 20260915080237_init/
│       └── 20260915080455_add_unique_pricing_plan_name/
│
├── public/
│   └── logo.png                   # Site logo
│
├── src/
│   ├── app/
│   │   │
│   │   ├── (public pages)
│   │   ├── page.tsx               # Homepage (CMS-driven hero, featured sites)
│   │   ├── layout.tsx             # Root layout
│   │   ├── not-found.tsx          # 404 page
│   │   ├── robots.ts              # SEO: robots.txt
│   │   ├── sitemap.ts             # SEO: sitemap.xml
│   │   │
│   │   ├── websites/
│   │   │   ├── page.tsx           # Website marketplace (browse & filter)
│   │   │   ├── layout.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # Website detail & pricing
│   │   │       └── layout.tsx
│   │   │
│   │   ├── checkout/
│   │   │   └── page.tsx           # Multi-step checkout flow
│   │   │
│   │   ├── order/
│   │   │   └── success/
│   │   │       └── page.tsx       # Order confirmation
│   │   │
│   │   ├── pricing/
│   │   │   ├── page.tsx           # Public pricing plans
│   │   │   └── layout.tsx
│   │   │
│   │   ├── contact/
│   │   │   ├── page.tsx           # Contact form → custom requests
│   │   │   └── layout.tsx
│   │   │
│   │   ├── custom-website/
│   │   │   ├── page.tsx           # Custom website request form
│   │   │   └── layout.tsx
│   │   │
│   │   ├── how-it-works/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── use-cases/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   │
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   │
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   │
│   │   ├── admin/                 # ─── Admin Panel ───
│   │   │   ├── layout.tsx         # Admin layout (no auth guard on shell)
│   │   │   ├── page.tsx           # Dashboard (stats & quick actions)
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # Admin login
│   │   │   ├── websites/
│   │   │   │   ├── page.tsx       # List / feature / publish websites
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx   # Add new website
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx  # Edit existing website
│   │   │   ├── categories/
│   │   │   │   └── page.tsx       # Category management
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx       # Pricing plan management
│   │   │   ├── orders/
│   │   │   │   └── page.tsx       # Order management
│   │   │   ├── rentals/
│   │   │   │   └── page.tsx       # Active rental tracking
│   │   │   ├── custom-requests/
│   │   │   │   └── page.tsx       # Inbox for custom website requests
│   │   │   ├── homepage/
│   │   │   │   └── page.tsx       # Homepage CMS editor
│   │   │   └── settings/
│   │   │       └── page.tsx       # Platform settings
│   │   │
│   │   └── api/                   # ─── API Routes ───
│   │       │
│   │       ├── admin/             # Protected admin APIs
│   │       │   ├── login/
│   │       │   │   └── route.ts   # POST: admin login
│   │       │   ├── logout/
│   │       │   │   └── route.ts   # POST: admin logout
│   │       │   ├── websites/
│   │       │   │   ├── route.ts   # GET/POST websites
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts  # GET/PUT/DELETE website
│   │       │   ├── categories/
│   │       │   │   └── route.ts   # GET/POST/PATCH/DELETE categories
│   │       │   ├── pricing-plans/
│   │       │   │   └── route.ts   # GET/POST/PATCH/DELETE pricing
│   │       │   ├── custom-requests/
│   │       │   │   └── route.ts   # GET/PATCH/DELETE requests
│   │       │   ├── homepage/
│   │       │   │   └── route.ts   # GET/POST homepage CMS content
│   │       │   └── settings/
│   │       │       └── route.ts   # GET/POST platform settings
│   │       │
│   │       └── (public APIs)
│   │           ├── websites/
│   │           │   ├── route.ts          # GET all websites (public)
│   │           │   ├── [slug]/
│   │           │   │   └── route.ts      # GET website by slug
│   │           │   └── by-id/[id]/
│   │           │       └── route.ts      # GET website by ID (checkout)
│   │           ├── categories/
│   │           │   └── route.ts          # GET categories
│   │           ├── pricing-plans/
│   │           │   └── route.ts          # GET pricing plans
│   │           ├── orders/
│   │           │   └── route.ts          # POST create order
│   │           └── custom-requests/
│   │               └── route.ts          # POST submit custom request
│   │
│   ├── components/
│   │   ├── Navbar.tsx             # Top navigation (public + admin link)
│   │   └── admin/
│   │       ├── AdminShell.tsx     # Admin layout wrapper (sidebar + main)
│   │       └── AdminSidebar.tsx   # Admin sidebar navigation
│   │
│   └── lib/
│       ├── prisma.ts              # Prisma client singleton
│       ├── auth.ts                # bcrypt password helpers
│       ├── session.ts             # Cookie session management
│       ├── security.ts            # Security helpers
│       ├── validation.ts          # Zod schemas
│       ├── rate-limit.ts          # API rate limiting
│       └── utils.ts               # Shared utility functions
│
├── .env.example                   # Environment variable template
├── .gitignore
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config (inline v4)
├── tsconfig.json
└── package.json
```

---

## 🗄️ Database Schema

| Model | Purpose |
|---|---|
| `AdminUser` | Admin accounts with roles (`admin` / `super_admin`) |
| `Website` | Website templates with features, pricing, categories |
| `Category` | Website categories (Birthday, Wedding, Business…) |
| `PricingPlan` | Rental duration plans (1 Day → 1 Year) |
| `Order` | Customer orders with line items |
| `Rental` | Active rentals with expiry tracking |
| `CustomRequest` | Bespoke website requests from customers |
| `Settings` | Key-value platform configuration |
| `HomepageContent` | CMS-driven homepage hero, CTAs |

---

## ⚙️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
```

### 3. Run Database Migrations
```bash
npm run db:migrate
```

### 4. Seed the Database
```bash
npm run seed
```

Creates admin accounts, categories, pricing plans, sample websites, and default settings.

### 5. Start Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Admin Access

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

| Email | Password | Role |
|---|---|---|
| `rahul@gmail.com` | `Rahul@9890` | super_admin |
| `harshal@gmail.com` | `Harshal@9890` | super_admin |
| `admin@hyrinx.com` | `admin123` | super_admin |

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run seed` | Seed database with initial data |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |
| `npm run db:reset` | Reset DB and re-seed |
| `npm run lint` | Run ESLint |

---

## 🔒 Security

- Passwords hashed with **bcrypt**
- Session stored in **HTTP-only cookies** (base64-encoded JSON)
- Admin routes protected via `requireAuth()` middleware
- Input validated with **Zod** on all API routes
- SQL injection prevented via **Prisma**
- Rate limiting on sensitive endpoints

---

## 🚢 Deployment

### Build
```bash
npm run build
npm start
```

### Environment Variables (`.env`)
```env
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV="production"
```

---

## 📈 Future Enhancements

- [ ] Payment gateway (Razorpay / Stripe)
- [ ] Media library with file uploads
- [ ] Email notifications for orders
- [ ] Background job for rental expiry alerts
- [ ] Advanced analytics dashboard
- [ ] Customer account portal
- [ ] Multi-language support

---

## 📄 License

Proprietary — © Hyrinx. All rights reserved.

## 📬 Support

Contact: [admin@hyrinx.com](mailto:admin@hyrinx.com)

