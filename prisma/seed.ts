import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin users
  const adminUsers = [
    {
      email: 'rahul@gmail.com',
      passwordRaw: 'Rahul@9890',
      name: 'Rahul',
      role: 'super_admin',
    },
    {
      email: 'harshal@gmail.com',
      passwordRaw: 'Harshal@9890',
      name: 'Harshal',
      role: 'super_admin',
    },
  ]

  for (const user of adminUsers) {
    const hashedPassword = await bcrypt.hash(user.passwordRaw, 12)
    await prisma.adminUser.upsert({
      where: { email: user.email },
      update: {
        password: hashedPassword,
        active: true,
      },
      create: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        role: user.role,
        active: true,
      },
    })
    console.log('Upserted admin user:', user.email)
  }

  // Create categories
  const categories = [
    'Birthday',
    'Wedding',
    'Invitation',
    'College',
    'Events',
    'Business',
    'Startup',
    'Portfolio',
    'Project',
    'Product Launch',
    'Celebration',
    'Personal',
  ]

  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        enabled: true,
      },
    })
  }

  console.log('Created categories')

  // Create pricing plans
  const pricingPlans = [
    { name: '1 Day', durationDays: 1, price: 149, description: 'Perfect for quick celebrations' },
    { name: '3 Days', durationDays: 3, price: 399, description: 'Short events & surprises' },
    { name: '7 Days', durationDays: 7, price: 599, description: 'Most popular', popular: true },
    { name: '15 Days', durationDays: 15, price: 799, description: 'Events & campaigns' },
    { name: '1 Month', durationDays: 30, price: 1099, description: 'Startups & projects' },
    { name: '3 Months', durationDays: 90, price: 2099, description: 'Growing businesses' },
    { name: '6 Months', durationDays: 180, price: 3599, description: 'Longer use & branding' },
    { name: '1 Year', durationDays: 365, price: 6099, description: 'Complete online presence' },
  ]

  for (const plan of pricingPlans) {
    await prisma.pricingPlan.upsert({
      where: { name: plan.name },
      update: {},
      create: {
        name: plan.name,
        duration: plan.name,
        durationDays: plan.durationDays,
        price: plan.price,
        description: plan.description,
        popular: plan.popular || false,
        active: true,
      },
    })
  }

  console.log('Created pricing plans')

  // Create default settings
  const settings = [
    { key: 'business_name', value: 'Hyrinx', category: 'business' },
    { key: 'business_email', value: 'contact@hyrinx.com', category: 'business' },
    { key: 'business_phone', value: '+91 98765 43210', category: 'business' },
    { key: 'business_whatsapp', value: '+91 98765 43210', category: 'business' },
    { key: 'currency', value: 'INR', category: 'payment' },
    { key: 'order_prefix', value: 'HYX', category: 'orders' },
  ]

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('Created settings')

  // Create homepage content
  await prisma.homepageContent.upsert({
    where: { section: 'hero' },
    update: {},
    create: {
      section: 'hero',
      content: JSON.stringify({
        heading: 'Why Buy a Website?\nRent One Instead.',
        subheading: 'Beautiful, ready-to-use websites for events, celebrations, businesses, portfolios and projects. Rent for a day, a week, a month or longer.',
        ctaText: 'Browse Websites',
        ctaLink: '/websites',
        secondaryCtaText: 'View Live Demos',
        secondaryCtaLink: '/websites',
        badgeText: 'Starting at ₹149 / day',
      }),
      enabled: true,
    },
  })

  console.log('Created homepage content')

  // Create sample websites (all categories)
  const sampleWebsites = [
    // Wedding (W01 - W05)
    {
      name: 'Eternal Moments',
      slug: 'eternal-moments',
      category: 'Wedding',
      description: 'Elegant luxury wedding website featuring couple love story, ceremony itinerary, RSVP form, and interactive location map.',
      shortDesc: 'Luxury wedding celebration website with story, venue details, and RSVP.',
      featured: true,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Love Story Timeline', 'Digital RSVP', 'Venue Directions', 'Event Schedule', 'Photo Gallery']),
      customization: JSON.stringify(['Couple Names', 'Wedding Date', 'Venue Address', 'Photo Album', 'Contact Details']),
      liveDemoUrl: 'https://example.com/demo/wedding',
    },
    {
      name: 'Royal Union',
      slug: 'royal-union',
      category: 'Wedding',
      description: 'Traditional royal theme wedding invitation with countdown timer, family blessings, and sangeet / reception schedule.',
      shortDesc: 'Royal golden-accent wedding website for traditional Indian ceremonies.',
      featured: false,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Sangeet & Reception Schedule', 'Family Tree', 'Blessings Guestbook', 'Digital Map']),
      customization: JSON.stringify(['Couple Names', 'Function Dates', 'Hotel Venue', 'RSVP WhatsApp']),
      liveDemoUrl: 'https://example.com/demo/royal-union',
    },
    {
      name: 'Soulmates Forever',
      slug: 'soulmates-forever',
      category: 'Wedding',
      description: 'Minimalist aesthetic wedding site with romantic background music player, photo wall, and dietary preference RSVP.',
      shortDesc: 'Modern aesthetic wedding site with photo gallery and online RSVP.',
      featured: false,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Photo Wall', 'Dietary Preference RSVP', 'Music Player', 'Live Stream Link']),
      customization: JSON.stringify(['Names', 'Dates', 'Live Stream URL', 'Photos']),
      liveDemoUrl: 'https://example.com/demo/soulmates',
    },

    // Birthday & Celebrations (BD01, AN01, BS01)
    {
      name: 'Birthday Bash',
      slug: 'birthday-bash',
      category: 'Birthday',
      description: 'Vibrant and joyful birthday celebration website with live party countdown, wish board, venue map, and RSVP.',
      shortDesc: 'Joyful birthday party site with live countdown, wish wall, and party details.',
      featured: true,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Party Countdown', 'Guest Wish Wall', 'Location Map', 'Dress Code Details']),
      customization: JSON.stringify(['Birthday Star Name', 'Age/Milestone', 'Party Venue', 'Date & Time']),
      liveDemoUrl: 'https://example.com/demo/birthday',
    },
    {
      name: 'Silver Jubilee',
      slug: 'silver-jubilee',
      category: 'Celebration',
      description: 'Cherished 25th wedding anniversary celebration site highlighting life memories, travel stories, and dinner invite.',
      shortDesc: 'Anniversary celebration page honoring 25 years of togetherness.',
      featured: false,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Journey Timeline', 'Memory Slideshow', 'Dinner RSVP', 'Venue Guide']),
      customization: JSON.stringify(['Couple Names', 'Years of Marriage', 'Venue', 'Photos']),
      liveDemoUrl: 'https://example.com/demo/anniversary',
    },
    {
      name: 'Little Miracle Baby Shower',
      slug: 'baby-shower-miracle',
      category: 'Celebration',
      description: 'Cute pastel baby shower invite website featuring gift registry links, fun baby games schedule, and RSVP.',
      shortDesc: 'Pastel baby shower invitation site with gift registry and schedule.',
      featured: false,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Baby Shower Countdown', 'Gift Registry', 'Baby Games Schedule', 'RSVP']),
      customization: JSON.stringify(['Parents Names', 'Baby Due Date', 'Event Venue', 'Gift Links']),
      liveDemoUrl: 'https://example.com/demo/baby-shower',
    },

    // Digital Invitation & RSVP (RSVP01)
    {
      name: 'QuickInvite RSVP',
      slug: 'quickinvite-rsvp',
      category: 'Invitation',
      description: 'Streamlined one-page digital event invitation with instant 1-click WhatsApp RSVP confirmation and calendar integration.',
      shortDesc: 'Instant digital invitation page with calendar add and WhatsApp RSVP.',
      featured: false,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['1-Click RSVP', 'Add to Google Calendar', 'Apple Maps / Google Maps', 'Host Contact']),
      customization: JSON.stringify(['Event Title', 'Date & Time', 'Location', 'Host Mobile']),
      liveDemoUrl: 'https://example.com/demo/invite',
    },

    // College & Academic Events (C01 - C04)
    {
      name: 'College Fest Pro',
      slug: 'college-fest-pro',
      category: 'College',
      description: 'Comprehensive college festival website featuring dynamic event schedules, rulebooks, sponsor tiers, and registrations.',
      shortDesc: 'All-in-one college cultural & sports fest portal with online registration.',
      featured: true,
      published: true,
      startingPrice: 199,
      features: JSON.stringify(['Inter-College Registration', 'Rulebooks PDF', 'Sponsor Tiers', 'Live Leaderboard']),
      customization: JSON.stringify(['Fest Name', 'College Name', 'Event Schedule', 'Sponsor Logos']),
      liveDemoUrl: 'https://example.com/demo/college',
    },
    {
      name: 'HackSprint TechFest',
      slug: 'hacksprint-techfest',
      category: 'College',
      description: 'High-energy 24-hour hackathon portal with problem statements, mentor list, judging criteria, and submission links.',
      shortDesc: 'National level hackathon & technical symposium portal.',
      featured: false,
      published: true,
      startingPrice: 199,
      features: JSON.stringify(['Team Registration', 'Tracks & Prizes', 'Mentor Profiles', 'Discord Community']),
      customization: JSON.stringify(['Hackathon Name', 'Prize Pool', 'Tracks', 'Sponsors']),
      liveDemoUrl: 'https://example.com/demo/hackathon',
    },
    {
      name: 'National Research Symposium',
      slug: 'national-research-symposium',
      category: 'College',
      description: 'Academic conference website with paper submission guidelines, keynote speaker lineup, and schedule agenda.',
      shortDesc: 'Scholarly seminar & research conference event portal.',
      featured: false,
      published: true,
      startingPrice: 199,
      features: JSON.stringify(['Call for Papers', 'Speaker Lineup', 'Conference Schedule', 'Certificate Info']),
      customization: JSON.stringify(['Department Name', 'Conference Theme', 'Important Dates', 'Contact Email']),
      liveDemoUrl: 'https://example.com/demo/symposium',
    },

    // Business & Services (B01 - B09)
    {
      name: 'Gourmet Bistro & Cafe',
      slug: 'gourmet-bistro-cafe',
      category: 'Business',
      description: 'Delectable restaurant and café website featuring online visual food menu, chef specials, opening hours, and table reservations.',
      shortDesc: 'Stylish café & restaurant website with menu showcase and table reservation.',
      featured: true,
      published: true,
      startingPrice: 199,
      features: JSON.stringify(['Digital Menu', 'Table Booking Form', 'Opening Hours', 'Google Reviews']),
      customization: JSON.stringify(['Restaurant Name', 'Menu Items', 'Pricing', 'Phone / Zomato Links']),
      liveDemoUrl: 'https://example.com/demo/cafe',
    },
    {
      name: 'Luxe Salon & Day Spa',
      slug: 'luxe-salon-spa',
      category: 'Business',
      description: 'Premium beauty parlour and wellness spa site featuring package pricing, expert stylists list, and appointment booking.',
      shortDesc: 'Luxury salon & wellness spa website with service menu and booking.',
      featured: false,
      published: true,
      startingPrice: 199,
      features: JSON.stringify(['Service Price List', 'Stylist Profiles', 'Appointment Inquiry', 'Customer Testimonials']),
      customization: JSON.stringify(['Salon Name', 'Services Offered', 'Price Sheet', 'WhatsApp Booking']),
      liveDemoUrl: 'https://example.com/demo/salon',
    },
    {
      name: 'IronPulse Fitness Gym',
      slug: 'ironpulse-fitness-gym',
      category: 'Business',
      description: 'Modern gym & CrossFit center website showcasing daily workout batches, membership pricing plans, and certified trainers.',
      shortDesc: 'Energetic gym website with batch schedules, trainer bios, and memberships.',
      featured: false,
      published: true,
      startingPrice: 199,
      features: JSON.stringify(['Class Schedule', 'Membership Tiers', 'Trainer Bios', 'Free Trial Pass']),
      customization: JSON.stringify(['Gym Name', 'Batch Timings', 'Membership Fees', 'Address']),
      liveDemoUrl: 'https://example.com/demo/gym',
    },
    {
      name: 'PrimeEstates Realty',
      slug: 'prime-estates-realty',
      category: 'Business',
      description: 'High-converting real estate broker and project showcase website with property listings, specifications, and site tour booking.',
      shortDesc: 'Real estate property rental & sales showcase website with inquiry lead form.',
      featured: false,
      published: true,
      startingPrice: 249,
      features: JSON.stringify(['Property Cards', 'Floor Plans', 'Amenities Grid', 'Schedule Site Visit']),
      customization: JSON.stringify(['Builder/Agent Name', 'Property List', 'Price Ranges', 'Brochure PDF']),
      liveDemoUrl: 'https://example.com/demo/real-estate',
    },
    {
      name: 'Apex Buildcon & Architecture',
      slug: 'apex-buildcon',
      category: 'Business',
      description: 'Heavy construction and interior design firm profile showcasing portfolio projects, turnkey services, and quotation requests.',
      shortDesc: 'Construction firm & civil contractor website with project portfolio.',
      featured: false,
      published: true,
      startingPrice: 249,
      features: JSON.stringify(['Completed Projects Grid', 'Service Offerings', 'Client Logos', 'Request a Quote']),
      customization: JSON.stringify(['Company Name', 'Projects Gallery', 'Client List', 'Phone & Email']),
      liveDemoUrl: 'https://example.com/demo/construction',
    },
    {
      name: 'ShutterCraft Studio',
      slug: 'shuttercraft-studio',
      category: 'Portfolio',
      description: 'Clean, full-bleed photography portfolio featuring wedding, portrait, and commercial shoots with package booking inquiry.',
      shortDesc: 'Visual photo gallery portfolio for professional photographers.',
      featured: true,
      published: true,
      startingPrice: 179,
      features: JSON.stringify(['Full-Width Gallery', 'Shoot Packages', 'Gear Specs', 'Direct Booking Inquiry']),
      customization: JSON.stringify(['Photographer Name', 'Portfolio Albums', 'Shoot Rates', 'Instagram Feed']),
      liveDemoUrl: 'https://example.com/demo/photographer',
    },
    {
      name: 'DevCraft Freelance Studio',
      slug: 'devcraft-freelance',
      category: 'Portfolio',
      description: 'Modern developer portfolio with live project case studies, client reviews, tech stack tags, and freelance availability badge.',
      shortDesc: 'High-impact freelance portfolio with project case studies and skills.',
      featured: false,
      published: true,
      startingPrice: 179,
      features: JSON.stringify(['Case Studies', 'Tech Stack Icons', 'Client Recommendations', 'Contact Form']),
      customization: JSON.stringify(['Developer Name', 'Github / LinkedIn', 'Projects', 'Hourly / Project Rate']),
      liveDemoUrl: 'https://example.com/demo/freelance',
    },
    {
      name: 'Nexus Corporate Consult',
      slug: 'nexus-corporate-consult',
      category: 'Business',
      description: 'Trustworthy corporate consultancy profile site with company vision, leadership team bios, client case studies, and contact.',
      shortDesc: 'Corporate consulting & advisory firm website with services and team bios.',
      featured: false,
      published: true,
      startingPrice: 249,
      features: JSON.stringify(['Leadership Bios', 'Corporate Solutions', 'Client Case Studies', 'Inquiry Form']),
      customization: JSON.stringify(['Firm Name', 'Services', 'Partner Profiles', 'Office Location']),
      liveDemoUrl: 'https://example.com/demo/corporate',
    },
    {
      name: 'BrightMinds Academy',
      slug: 'brightminds-academy',
      category: 'Business',
      description: 'Coaching institute portal with entrance exam course details, batch schedules, faculty achievements, and admission inquiry.',
      shortDesc: 'Coaching classes website with batch timings, fee details, and demo seat booking.',
      featured: false,
      published: true,
      startingPrice: 199,
      features: JSON.stringify(['Course Catalog', 'Topper Hall of Fame', 'Batch Schedules', 'Demo Class Registration']),
      customization: JSON.stringify(['Institute Name', 'Exams Covered', 'Faculty List', 'Phone & Address']),
      liveDemoUrl: 'https://example.com/demo/coaching',
    },

    // Startup & Product Launch (Startup, Product Launch)
    {
      name: 'Startup Launchpad',
      slug: 'startup-launchpad',
      category: 'Startup',
      description: 'High-converting SaaS landing page with product mockups, benefit breakdown, customer proof, and early-access CTA.',
      shortDesc: 'SaaS & startup landing page with product mockups and lead capture.',
      featured: true,
      published: true,
      startingPrice: 299,
      features: JSON.stringify(['Feature Hero', 'Product Walkthrough', 'Pricing Grid', 'Early Access Waitlist']),
      customization: JSON.stringify(['Product Name', 'Pitch Slogan', 'Features List', 'Waitlist Email']),
      liveDemoUrl: 'https://example.com/demo/startup',
    },
    {
      name: 'NextGen Gadget Launch',
      slug: 'nextgen-gadget-launch',
      category: 'Product Launch',
      description: 'Cinematic single-product landing page designed for hardware, fashion, or book releases with preorder button.',
      shortDesc: 'Product announcement page with countdown timer and preorder checkout.',
      featured: false,
      published: true,
      startingPrice: 299,
      features: JSON.stringify(['360 Product Showcase', 'Technical Specs', 'Launch Countdown', 'Pre-Order CTA']),
      customization: JSON.stringify(['Product Title', 'Launch Date', 'Specs Sheet', 'Order Link']),
      liveDemoUrl: 'https://example.com/demo/product-launch',
    },

    // Events & Project
    {
      name: 'Summit Global Conference',
      slug: 'summit-global-conference',
      category: 'Events',
      description: 'International conference and expo website with multi-track agendas, speaker highlights, ticketing tiers, and venue guide.',
      shortDesc: 'Conference & summit portal with speaker lineup and ticket passes.',
      featured: true,
      published: true,
      startingPrice: 249,
      features: JSON.stringify(['Multi-Track Agenda', 'Keynote Speakers', 'Pass Tiers', 'Sponsors Carousel']),
      customization: JSON.stringify(['Conference Title', 'Dates', 'Speakers List', 'Venue']),
      liveDemoUrl: 'https://example.com/demo/summit',
    },
    {
      name: 'Project Capstone Demo',
      slug: 'project-capstone-demo',
      category: 'Project',
      description: 'Dedicated final-year or client project website with live interactive demo preview, architecture diagram, and Github repository link.',
      shortDesc: 'Project portfolio site highlighting system architecture, live demo, and tech docs.',
      featured: false,
      published: true,
      startingPrice: 179,
      features: JSON.stringify(['System Architecture', 'Live Embedded Demo', 'Tech Stack Badges', 'Documentation PDF']),
      customization: JSON.stringify(['Project Title', 'Authors', 'Github URL', 'Demo Link']),
      liveDemoUrl: 'https://example.com/demo/project',
    },

    // Personal & Celebration
    {
      name: 'Creative Identity',
      slug: 'creative-identity',
      category: 'Personal',
      description: 'Modern digital bio link and resume website for creators, consultants, and public figures with links and newsletter sign-up.',
      shortDesc: 'Personal branding & bio-link page with career timeline and social channels.',
      featured: false,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Hero Avatar', 'Social Link Tree', 'Resume Timeline', 'Newsletter Box']),
      customization: JSON.stringify(['Your Name', 'Bio Blurb', 'Social Handles', 'Contact']),
      liveDemoUrl: 'https://example.com/demo/personal',
    },
    {
      name: 'Grand Celebration Gala',
      slug: 'grand-celebration-gala',
      category: 'Celebration',
      description: 'Festive event landing page for community festivals, cultural galas, and religious get-togethers with passes and timings.',
      shortDesc: 'Gala & community celebration website with program schedule and venue access.',
      featured: false,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Gala Schedule', 'Chief Guests', 'Pass Registration', 'Location Map']),
      customization: JSON.stringify(['Gala Name', 'Event Date', 'Venue', 'Special Guests']),
      liveDemoUrl: 'https://example.com/demo/gala',
    },
  ]

  for (const website of sampleWebsites) {
    await prisma.website.upsert({
      where: { slug: website.slug },
      update: {
        published: true,
        category: website.category,
        startingPrice: website.startingPrice,
        featured: website.featured,
        description: website.description,
        shortDesc: website.shortDesc,
        features: website.features,
        customization: website.customization,
      },
      create: website,
    })
  }

  console.log('Created sample websites')

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
