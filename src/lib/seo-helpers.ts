import { Metadata } from 'next'
import { WebsiteTemplate } from '@/lib/templates-data'

export const BASE_URL = 'https://hyrinx.in'

export interface TemplateSeoData {
  title: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  h1: string
  whoItsFor: string[]
  whatsIncluded: string[]
  rentalProcessSteps: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  imageAlt: string
}

export function generateTemplateMetadata(website: WebsiteTemplate): Metadata {
  const category = website.category || 'Website'
  const price = website.startingPrice || 149
  
  // Title: 50-60 chars, keyword first, brand last
  let primaryKeyword = `${website.name} Website on Rent`
  if (category === 'Wedding') {
    primaryKeyword = `${website.name} Wedding Invitation Website on Rent`
  } else if (category === 'College') {
    primaryKeyword = `${website.name} College Fest Website on Rent`
  } else if (category === 'Projects for College Students') {
    primaryKeyword = `${website.name} College Project on Rent`
  } else if (category === 'Business') {
    primaryKeyword = `${website.name} Business Website on Rent`
  }

  const rawTitle = `${primaryKeyword} from ₹${price}/Day | Hyrinx`
  const title = rawTitle.length > 60 ? `${website.name} Website on Rent from ₹${price}/Day | Hyrinx` : rawTitle

  // Meta description: 140-160 chars: benefit + keyword + CTA
  let description = `Rent ${website.name} ${category.toLowerCase()} website template from ₹${price}/day in India. Live in minutes with custom domain & RSVP. Rent now on Hyrinx.`
  if (description.length < 140) {
    description = `Rent ${website.name} ${category.toLowerCase()} website template from ₹${price}/day in India. Mobile responsive, zero hosting fees, live in minutes. Rent now on Hyrinx.`
  }
  if (description.length > 160) {
    description = description.slice(0, 157) + '...'
  }

  const url = `${BASE_URL}/websites/${website.slug}`
  const ogImage = website.thumbnail || `${BASE_URL}/icon-512.png`

  return {
    title,
    description,
    keywords: [
      website.name.toLowerCase(),
      `${website.name.toLowerCase()} website on rent`,
      `${category.toLowerCase()} website rental`,
      `rent website from ₹${price}`,
      'temporary website rental India',
      'website for event',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Hyrinx Rental',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${website.name} website template preview on Hyrinx Rental`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@_rahulsisode',
    },
  }
}

export function getTemplateEditorialContent(website: WebsiteTemplate): TemplateSeoData {
  const category = website.category || 'General'
  const price = website.startingPrice || 149
  const name = website.name

  // Generate category-tailored FAQ, audience and features
  let whoItsFor = [
    `Organizers and hosts needing a verified, launch-ready ${category.toLowerCase()} website without paying ₹25,000+ for custom development.`,
    'People looking for a fast, elegant web presence active for exactly the duration of their celebration or campaign.',
    'Users wanting WhatsApp-friendly digital sharing with instant RSVPs and directions for guests.',
  ]

  let whatsIncluded = [
    'Ultra-fast cloud hosting with 99.9% uptime and zero maintenance required.',
    'Mobile-first responsive layout tested across iOS, Android, tablets, and desktops.',
    'Complete personalization with your text, event timings, photos, and branding.',
    'Google Maps venue integration and WhatsApp RSVP notification support.',
    'Dedicated support from the Hyrinx technical team throughout your rental period.',
  ]

  let faqs = [
    {
      question: `How does renting the ${name} website template work?`,
      answer: `Renting ${name} is simple: select your rental duration (from 1 day to 1 year starting at ₹${price}/day), submit your customization details (names, dates, photos, venue), and our team launches your site live within 2 to 6 hours with hosting included.`,
    },
    {
      question: `Can I customize the text, images, and colors on ${name}?`,
      answer: `Yes, 100%. Every element of ${name} is fully customizable, including headers, event itineraries, family blessings, photo galleries, Google Maps locations, and WhatsApp RSVP details.`,
    },
    {
      question: `What happens when my rental period for ${name} ends?`,
      answer: `When your selected rental duration finishes, the website is safely archived. We maintain a secure backup of your content for 30 days in case you wish to extend or renew your rental.`,
    },
    {
      question: `Can I use my own custom domain for ${name}?`,
      answer: `Yes. Your rental includes a clean Hyrinx subdomain (e.g., yourname.hyrinx.com) for free. If you own a custom domain (e.g., yourwedding.com), our engineering team will configure the DNS mapping for you.`,
    },
    {
      question: `How quickly can the ${name} website go live?`,
      answer: `Most standard template orders for ${name} go live within 2 to 6 hours after we receive your content. Priority rush deployment is also available for urgent events.`,
    },
    {
      question: `Is technical support included with my rental?`,
      answer: `Yes, every rental includes end-to-end technical support, continuous cloud hosting, SSL security certificates, and WhatsApp support from our team.`,
    },
  ]

  if (category === 'Wedding') {
    whoItsFor = [
      'Couples and wedding families looking for an opulent royal Indian digital invitation to share on WhatsApp.',
      'Destination weddings requiring interactive Google Maps, hotel itineraries, and RSVP tracking.',
      'Families wanting to save ₹30,000 to ₹50,000 compared to expensive traditional wedding website agencies.',
    ]
    whatsIncluded = [
      'Interactive 3D wax-sealed digital patrika and Ganesha invocation.',
      'Saat Phere (7 Sacred Vows) display with couple love story timeline.',
      'Background Shehnai and devotional audio player with mute controls.',
      'Direct WhatsApp RSVP and digital blessings guestbook.',
      'Live event pass downloads and ceremony muhurat schedule.',
    ]
    faqs.push({
      question: 'Can guests RSVP directly through WhatsApp?',
      answer: 'Yes! When guests click RSVP on your wedding website, their response is automatically formatted and sent directly to your family WhatsApp number.',
    })
  } else if (category === 'College' || category === 'Projects for College Students') {
    whoItsFor = [
      'College fest committees, student councils, and technical clubs needing a stable registration portal.',
      'Final year engineering and MCA students needing a verified working capstone project with live demo and documentation for examiner viva.',
      'Hackathon organizers wanting real-time problem statement announcements and team registration.',
    ]
    whatsIncluded = [
      'Verified working source code and modular full-stack architecture.',
      'Live interactive demo deployment with sub-second response times.',
      'Comprehensive system design diagrams, PPT templates, and viva presentation guide.',
      'Event schedule matrix and participant pass verification.',
    ]
    faqs.push({
      question: 'Is full source code and viva documentation provided?',
      answer: 'Yes! Student capstone and project rentals include complete working GitHub repository access, system architecture documentation, and examiner viva Q&A guidance.',
    })
  } else if (category === 'Business') {
    whoItsFor = [
      'Restaurants, cafes, salons, gyms, and local businesses wanting a high-converting online profile without monthly agency retainers.',
      'Pop-up shops, trade exhibition stalls, and temporary seasonal campaigns.',
      'Entrepreneurs validating market demand before investing in permanent multi-lakh custom software.',
    ]
    whatsIncluded = [
      'Digital QR menu integration and service pricing tables.',
      'Click-to-call, WhatsApp direct inquiry, and lead capture forms.',
      'Local SEO metadata tags configured for Indian city searches.',
      'Mobile-optimized booking and inquiry workflows.',
    ]
  }

  const rentalProcessSteps = [
    { title: '1. Select Your Rental Plan', description: `Choose between 1-day, 3-day, 7-day, 15-day, or monthly rental plans starting from ₹${price}/day.` },
    { title: '2. Provide Customization Details', description: 'Share your event dates, photos, venue address, and custom text through our quick order form.' },
    { title: '3. Instant Staging & Review', description: 'Our engineering team configures your website and sends you a private preview link to verify.' },
    { title: '4. Go Live on Cloud', description: 'Your site goes live on your dedicated link, ready to share with friends, guests, attendees, or customers.' },
  ]

  return {
    title: `${name} Website on Rent from ₹${price}/Day | Hyrinx`,
    metaDescription: `Rent ${name} ${category.toLowerCase()} website template from ₹${price}/day. Live in minutes with custom domain & RSVP.`,
    primaryKeyword: `${name.toLowerCase()} website on rent`,
    secondaryKeywords: [
      `${category.toLowerCase()} website rental`,
      `rent website ₹${price}`,
      'temporary website India',
    ],
    h1: `${name} — Professional ${category} Website on Rent`,
    whoItsFor,
    whatsIncluded,
    rentalProcessSteps,
    faqs,
    imageAlt: `${name} - ${category} Website Template on Rent with Live Demo & RSVP - Hyrinx Rental`,
  }
}
