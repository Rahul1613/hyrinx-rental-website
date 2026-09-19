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
    {
      email: 'admin@hyrinx.com',
      passwordRaw: 'admin123',
      name: 'Super Admin',
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

  // Create sample websites
  const sampleWebsites = [
    {
      name: 'Eternal Moments',
      slug: 'eternal-moments',
      category: 'Wedding',
      description: 'Elegant wedding website with gallery, story, RSVP and event details. Perfect for modern couples who want to share their special day with family and friends.',
      shortDesc: 'Elegant wedding website with gallery, story, RSVP and event details.',
      featured: true,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Gallery', 'RSVP', 'Countdown', 'Contact', 'Map', 'Social Links', 'Custom Branding']),
      customization: JSON.stringify(['Event Name', 'Event Date', 'Venue', 'Logo', 'Gallery', 'Instagram', 'WhatsApp']),
      liveDemoUrl: 'https://example.com/demo/wedding',
    },
    {
      name: 'Birthday Bash',
      slug: 'birthday-bash',
      category: 'Birthday',
      description: 'Fun and colorful birthday website with wishes, memories gallery, and party details. Make your celebration memorable with a dedicated website.',
      shortDesc: 'Fun birthday website with wishes, memories gallery and party details.',
      featured: true,
      published: true,
      startingPrice: 149,
      features: JSON.stringify(['Gallery', 'Wishes', 'Countdown', 'Social Links', 'Custom Branding']),
      customization: JSON.stringify(['Birthday Person Name', 'Date', 'Venue', 'Gallery', 'Wishes', 'Theme Colors']),
      liveDemoUrl: 'https://example.com/demo/birthday',
    },
    {
      name: 'College Fest Pro',
      slug: 'college-fest-pro',
      category: 'College',
      description: 'Professional college event website with schedule, registration, sponsor showcase, and live updates. Perfect for fests, tech events, and cultural programs.',
      shortDesc: 'Professional college event website with schedule and registration.',
      featured: true,
      published: true,
      startingPrice: 199,
      features: JSON.stringify(['Schedule', 'Registration', 'Sponsors', 'Gallery', 'Contact', 'Live Updates', 'Social Links']),
      customization: JSON.stringify(['Event Name', 'Dates', 'Venue', 'Schedule', 'Sponsors', 'Registration Form', 'Social Media']),
      liveDemoUrl: 'https://example.com/demo/college',
    },
    {
      name: 'Startup Launch',
      slug: 'startup-launch',
      category: 'Startup',
      description: 'Modern startup landing page with product showcase, team section, investor information, and contact forms. Perfect for product launches and pitch presentations.',
      shortDesc: 'Modern startup landing page with product showcase and team section.',
      featured: false,
      published: true,
      startingPrice: 299,
      features: JSON.stringify(['Product Showcase', 'Team Section', 'Investor Info', 'Contact Form', 'Analytics', 'SEO']),
      customization: JSON.stringify(['Company Name', 'Product Name', 'Team Members', 'Investor Info', 'Contact Details', 'Brand Colors']),
      liveDemoUrl: 'https://example.com/demo/startup',
    },
    {
      name: 'Portfolio Plus',
      slug: 'portfolio-plus',
      category: 'Portfolio',
      description: 'Beautiful portfolio website with project gallery, about section, skills display, and contact form. Ideal for designers, developers, and creatives.',
      shortDesc: 'Beautiful portfolio website with project gallery and skills display.',
      featured: false,
      published: true,
      startingPrice: 179,
      features: JSON.stringify(['Project Gallery', 'About Section', 'Skills Display', 'Contact Form', 'Social Links', 'Resume Download']),
      customization: JSON.stringify(['Name', 'Bio', 'Projects', 'Skills', 'Contact Details', 'Social Links', 'Resume']),
      liveDemoUrl: 'https://example.com/demo/portfolio',
    },
    {
      name: 'Event Hub',
      slug: 'event-hub',
      category: 'Events',
      description: 'Versatile event website for conferences, seminars, workshops, and meetups. Includes schedule, speaker profiles, registration, and venue information.',
      shortDesc: 'Versatile event website with schedule and speaker profiles.',
      featured: false,
      published: true,
      startingPrice: 249,
      features: JSON.stringify(['Schedule', 'Speaker Profiles', 'Registration', 'Venue Info', 'Sponsors', 'Contact']),
      customization: JSON.stringify(['Event Name', 'Dates', 'Speakers', 'Schedule', 'Venue', 'Registration Form', 'Sponsors']),
      liveDemoUrl: 'https://example.com/demo/event',
    },
  ]

  for (const website of sampleWebsites) {
    await prisma.website.upsert({
      where: { slug: website.slug },
      update: {},
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
