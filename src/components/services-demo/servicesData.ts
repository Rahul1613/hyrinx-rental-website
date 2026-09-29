export interface ServiceCategory {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  badge?: string;
  accentColor: string;
  gradient: string;
  iconName: string;
  heroHeadline: string;
  heroDescription: string;
  problem: {
    title: string;
    points: string[];
  };
  solution: {
    title: string;
    points: string[];
  };
  workflowTitle: string;
  workflowSteps: {
    step: string;
    label: string;
    desc: string;
    icon?: string;
  }[];
  interactiveConcept: 'construction' | 'creative' | 'content-engine' | 'whatsapp-intel' | 'architecture' | 'ecommerce-flow' | 'digitalization' | 'management-hub' | 'security-shield' | 'cyber-lab' | 'future-lab' | 'originals-grid' | 'generic';
  features: {
    title: string;
    desc: string;
  }[];
  useCases: {
    title: string;
    client: string;
    outcome: string;
  }[];
  process: string[];
  deliverables: string[];
  managementSupport?: string;
  disclaimer?: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

export const HYRINX_SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'web-dev',
    number: '01',
    tag: 'BUILD',
    title: 'Website Development',
    subtitle: 'Futuristic Digital Construction',
    shortDesc: 'From high-conversion landing pages to full web applications. Engineered for sub-second speeds, flawless SEO, and conversion architecture.',
    accentColor: '#3b82f6',
    gradient: 'from-blue-600/30 via-indigo-600/20 to-transparent',
    iconName: 'Code',
    heroHeadline: 'We Don’t Just Code Websites. We Build High-Performance Digital Real Estate.',
    heroDescription: 'Every pixel, server request, and conversion trigger is calculated. Modern responsive layouts backed by ultra-fast cloud architectures, Google-verified local SEO, and turnkey deployment.',
    problem: {
      title: 'The Outdated Web Dilemma',
      points: [
        'Templates that look like every other competitor on the internet.',
        'Bloated, sluggish load times driving away 53% of mobile visitors within 3 seconds.',
        'Zero tracking, zero analytics visibility, and no technical maintenance.',
        'Agencies charging lakhs upfront with zero accountability after launch.'
      ]
    },
    solution: {
      title: 'The Hyrinx Digital Construction Standard',
      points: [
        'Custom built with modern Next.js and Tailwind architecture for 95+ Core Web Vitals.',
        'Integrated Google Business Profile verification, structured Schema JSON-LD, and local search dominance.',
        'Full operational stack: domain mapping, automated SSL, enterprise CDN, and daily health audits.',
        'Flexible renting or turnkey ownership models suited to business scale.'
      ]
    },
    workflowTitle: 'Digital Assembly Protocol',
    workflowSteps: [
      { step: '01', label: 'Structure', desc: 'Wireframe blueprints & information hierarchy' },
      { step: '02', label: 'UI & Motion', desc: 'Micro-interactions & responsive viewports' },
      { step: '03', label: 'Content', desc: 'Copywriting, visual assets & conversion triggers' },
      { step: '04', label: 'Backend', desc: 'Database, APIs, WhatsApp & payment integrations' },
      { step: '05', label: 'Launch & SEO', desc: 'Global edge CDN deployment & Google Indexing' }
    ],
    interactiveConcept: 'construction',
    features: [
      { title: 'Business & Brand Sites', desc: 'Authority websites for corporations, consulting firms, clinics, and professional practices.' },
      { title: 'E-Commerce & Rental Platforms', desc: 'Dynamic product catalogs, time-based rental bookings, and instant payment settlement.' },
      { title: 'High-Converting Landing Pages', desc: 'Single-minded campaign pages with tested A/B conversion architecture and instant lead webhooks.' },
      { title: 'Google Business Profile Engine', desc: 'Complete local verification, map rank optimization, and customer review pipeline.' },
      { title: 'Website Redesign & Speed Upgrades', desc: 'Migrate legacy WordPress/slow sites to blazing-fast modern web applications.' },
      { title: '24/7 Uptime & Security Hardening', desc: 'DDoS shielding, SSL renewal, and regular zero-downtime maintenance.' }
    ],
    useCases: [
      { title: 'Luxury Jeweler & Bridal House', client: 'Retail & Heritage Brand', outcome: 'Boosted qualified consultation inquiries by 310% in 45 days with 3D product previews.' },
      { title: 'Multi-Location Health Clinic', client: 'Healthcare Enterprise', outcome: 'Automated 1,400+ monthly appointment bookings with zero front-desk phone congestion.' },
      { title: 'Commercial Architecture Firm', client: 'B2B Turnkey Builders', outcome: 'Secured ₹4.8 Cr tender inquiries via interactive portfolio blueprints.' }
    ],
    process: ['Requirement Blueprinting', 'UX & Technical Architecture', 'Interactive Development', 'SEO & Speed Hardening', 'Zero-Downtime Launch', 'Ongoing Edge Monitoring'],
    deliverables: ['Production Next.js Source Code', 'Custom Domain & Cloudflare SSL', 'Google Business & Search Console Linkage', 'Admin Lead Dashboard', 'Analytics & Heatmaps'],
    managementSupport: 'Includes weekly speed audits, software dependency security patches, and monthly content refreshments.',
    primaryCtaText: 'Build My Website',
    secondaryCtaText: 'Inspect Live Web Blueprints'
  },
  {
    id: 'branding',
    number: '02',
    tag: 'DESIGN',
    title: 'Branding & Design Studio',
    subtitle: 'From Raw Sketch to Iconic Brand Identity',
    shortDesc: 'Strategic visual identities that make your business instantly recognizable. Logos, guidelines, stationery, print packaging, and digital asset systems.',
    accentColor: '#a855f7',
    gradient: 'from-purple-600/30 via-pink-600/20 to-transparent',
    iconName: 'Palette',
    heroHeadline: 'Your Brand Is the Only Thing Your Competitors Can’t Copy.',
    heroDescription: 'We translate your company’s core advantage into a unified visual language. From geometric emblem engineering to luxury packaging, signage, and digital design tokens.',
    problem: {
      title: 'Why Generic Aesthetics Kill Growth',
      points: [
        'Stock logo generators make brands look unverified, amateurish, and untrustworthy.',
        'Inconsistent fonts, colors, and graphics across Instagram, invoices, and physical stores.',
        'Inability to charge premium prices because customers perceive low brand value.',
        'Designers delivering raw vector files with no real-world application manual.'
      ]
    },
    solution: {
      title: 'The Complete Hyrinx Identity Suite',
      points: [
        'Scientifically engineered vector iconography backed by brand psychology.',
        'Comprehensive 40+ page Brand Bible covering typography, hex palettes, and forbidden usages.',
        'Print-ready master vectors for billboards, packaging, uniforms, and corporate stationery.',
        'Ready-to-post social media templates and digital motion marks.'
      ]
    },
    workflowTitle: 'Creative Metamorphosis Pipeline',
    workflowSteps: [
      { step: '01', label: 'Concept Sketch', desc: 'Mind-mapping, golden ratio geometry & moodboards' },
      { step: '02', label: 'Vector Geometry', desc: 'Precision vector construction & mathematical symmetry' },
      { step: '03', label: 'Identity System', desc: 'Color harmonizing, typography pairings & brand voice' },
      { step: '04', label: 'Collateral & Print', desc: 'Business cards, packaging, brochures & merchandise' },
      { step: '05', label: 'Brand Guidelines', desc: 'Enterprise brand book & editable Figma/vector suite' }
    ],
    interactiveConcept: 'creative',
    features: [
      { title: 'Master Logo & Mark Design', desc: 'Primary lockups, secondary badges, favicons, and monochrome variants.' },
      { title: 'Brand Guidelines Manual', desc: 'Spacing rules, color profiles (CMYK, RGB, Pantone), typography hierarchies.' },
      { title: 'Stationery & Executive Collateral', desc: 'Luxury visiting cards, letterheads, invoice templates, and custom envelopes.' },
      { title: 'Physical Packaging & Labels', desc: 'Die-cut packaging blueprints, box sleeves, bottle wraps, and luxury tags.' },
      { title: 'Social Media Design Kit', desc: 'Cohesive Instagram highlights, feed grids, story templates, and banners.' },
      { title: 'Event & Spatial Signage', desc: 'Storefront fascias, exhibition standees, banners, and acrylic office boards.' }
    ],
    useCases: [
      { title: 'Artisanal Coffee & Roastery', client: 'F&B Retail Chain', outcome: 'Rebranded packaging led to immediate retail onboarding across 28 gourmet supermarkets.' },
      { title: 'Fintech Advisory Group', client: 'Financial Services', outcome: 'Transformed investor perception, closing $1.2M seed round within 60 days of brand rollout.' }
    ],
    process: ['Discovery & Brand Audit', 'Geometric Concept Ideation', 'Vector Crafting & Typography', 'Collateral Prototyping', 'Guideline Documentation', 'Asset Delivery'],
    deliverables: ['Vector AI/EPS/SVG Master Files', 'Print-ready PDF with Bleed Marks', 'Complete Brand Style Guide PDF', 'Social Media Asset Vault', 'Commercial Font Licenses'],
    primaryCtaText: 'Create My Brand Identity',
    secondaryCtaText: 'Explore Brand Portfolio'
  },
  {
    id: 'social-marketing',
    number: '03',
    tag: 'MARKET',
    title: 'Social Media & Performance Marketing',
    subtitle: 'Audience Capture, Meta Ads & Local Domination',
    shortDesc: 'Strategic social management, hyper-targeted ad campaigns, and local community outreach designed to generate customers, not vanity metrics.',
    accentColor: '#ec4899',
    gradient: 'from-pink-600/30 via-rose-600/20 to-transparent',
    iconName: 'Megaphone',
    heroHeadline: 'Stop Spending on Ads That Get Likes. Start Running Campaigns That Drive Revenue.',
    heroDescription: 'From organic Instagram authority to algorithmic Meta advertising and localized Google Ads, we position your business where paying customers actually look.',
    problem: {
      title: 'The Social Media Money Pit',
      points: [
        'Posting daily with zero strategy, speaking into an empty algorithmic void.',
        'Wasting money on "Boost Post" buttons without audience retargeting or pixel tracking.',
        'Zero conversion funnels between an Instagram click and an actual paying sale.',
        'Agencies providing vanity like counts while your business revenue remains flat.'
      ]
    },
    solution: {
      title: 'Precision Paid & Organic Engine',
      points: [
        'High-converting hook, story, and offer copywriting tuned for Indian consumer psychology.',
        'Granular hyper-local targeting: pin codes, purchase intent, and high-income clusters.',
        'Custom retargeting pixels tracking leads from first impression to closed deal.',
        'Weekly transparent ROAS (Return On Ad Spend) performance dashboards.'
      ]
    },
    workflowTitle: 'Audience Acquisition Lifecycle',
    workflowSteps: [
      { step: '01', label: 'Market Research', desc: 'Competitor tear-downs & buyer persona mapping' },
      { step: '02', label: 'Creative Testing', desc: 'Multi-variant ad creatives, hooks & carousel graphics' },
      { step: '03', label: 'Ad Launch', desc: 'Meta & Google campaign activation with pixel tracking' },
      { step: '04', label: 'Funnel Optimization', desc: 'Retargeting cart drop-offs & WhatsApp warm leads' },
      { step: '05', label: 'Scale & ROAS', desc: 'Doubling down on winning creatives with positive ROI' }
    ],
    interactiveConcept: 'generic',
    features: [
      { title: 'Instagram & Facebook Management', desc: 'Structured weekly calendars, custom carousel posts, stories, and engagement.' },
      { title: 'Meta Ads (Facebook & Instagram)', desc: 'Lead generation campaigns, click-to-WhatsApp ads, and catalog sales engines.' },
      { title: 'Local Search & Google Ads', desc: 'High-intent search campaigns targeting users actively searching for your service in your city.' },
      { title: 'Customer Lead Routing', desc: 'Instant dispatch of ad inquiries directly into your WhatsApp or CRM within 5 seconds.' },
      { title: 'Reputation & Review Management', desc: 'Systematic Google Maps review collection systems to cement 5-star local credibility.' },
      { title: 'Retargeting Funnels', desc: 'Bring back 70%+ of people who viewed your site or Instagram without buying.' }
    ],
    useCases: [
      { title: 'Premium Cosmetic Dental Studio', client: 'Healthcare / Pune', outcome: 'Generated 142 high-ticket smile makeover leads in 30 days at ₹94 per verified inquiry.' },
      { title: 'Real Estate Developer Showcase', client: 'Property Infrastructure', outcome: 'Booked 68 qualified site visits for a luxury villa project using Meta retargeting.' }
    ],
    process: ['Audience & Market Mapping', 'Creative Scripting & Design', 'Tracking Setup & Pixel Install', 'Campaign Launch & Split Testing', 'Daily Optimization', 'Scale Winning Sets'],
    deliverables: ['Monthly Ad Creative Suite', 'Live Analytics & ROAS Dashboard', 'Direct WhatsApp Lead Webhook', 'Ad Spend Optimization Reports'],
    managementSupport: 'Includes active daily campaign bid adjustments, negative keyword hygiene, and weekly creative refreshes.',
    primaryCtaText: 'Manage My Social Media',
    secondaryCtaText: 'Request Growth Strategy'
  },
  {
    id: 'content-engine',
    number: '04',
    tag: 'CREATE',
    title: 'Hyrinx Content Engine',
    subtitle: 'Turnkey Video Shooting, Reels & Motion Production',
    shortDesc: 'A full-cycle media production house inside your business. Professional video shoots, cinematic editing, viral hooks, and algorithm-optimized Reels.',
    badge: 'Flagship Media Service',
    accentColor: '#f59e0b',
    gradient: 'from-amber-600/30 via-orange-600/20 to-transparent',
    iconName: 'Clapperboard',
    heroHeadline: 'We Film It. We Edit It. We Publish It. Your Brand Stays Irresistible.',
    heroDescription: 'Short-form video is the #1 customer acquisition channel in the world today. Hyrinx Content Engine handles scripting, on-location video shooting, cinema editing, audio mastering, and daily publishing.',
    problem: {
      title: 'The Video Production Bottleneck',
      points: [
        'Business owners don’t have 20 hours a week to film, edit, write captions, and find audio trends.',
        'Hiring full-time videographers, sound editors, and copywriters costs ₹1,50,000+ monthly.',
        'Inconsistent posting schedules destroy social reach and brand momentum.',
        'Boring product videos with no hook that viewers scroll past in 0.5 seconds.'
      ]
    },
    solution: {
      title: 'The Fully Managed Content Production Machine',
      points: [
        'Dedicated on-site filming crew capturing 30–60 pieces of raw footage in a single day.',
        'Fast turnaround: dynamic typography, sound design, color grading, and viral pacing.',
        'Engineered 20K+ View Campaign Strategy built on proven narrative hooks and curiosity loops.',
        'Scheduled publishing, trend hijacking, and performance feedback loops.'
      ]
    },
    workflowTitle: 'The 6-Phase Production Engine',
    workflowSteps: [
      { step: '01', label: 'Script & Concept', desc: 'Hook ideation, trending audio research & storyboards' },
      { step: '02', label: 'Cinema Shoot', desc: '4K cinema cameras, wireless audio & dynamic lighting on-site' },
      { step: '03', label: 'Pacing & Edit', desc: 'Fast-cut montage, sound FX, sound design & motion graphics' },
      { step: '04', label: 'Algorithm Tuning', desc: 'Thumbnail A/B test, retention pacing & keyword captions' },
      { step: '05', label: 'Daily Publishing', desc: 'Cross-posting on Instagram Reels, YouTube Shorts & LinkedIn' },
      { step: '06', label: 'Feedback Loop', desc: 'Audience watch-time analysis to double down on viral patterns' }
    ],
    interactiveConcept: 'content-engine',
    features: [
      { title: 'On-Location 4K Video Shooting', desc: 'Professional camera crew, gimbal operators, studio lighting, and pro lapel microphones.' },
      { title: 'Cinematic Reels & Shorts Editing', desc: 'Jump cuts, 3D text tracking, custom sound design, and energetic pacing.' },
      { title: 'Promotional & Product Commercials', desc: 'High-end brand films showing your services, facility, craftsmanship, and customer testimonials.' },
      { title: '20K+ View Campaign Strategy', desc: 'Targeted short-form strategy engineered to maximize organic reach and discoverability.' },
      { title: 'Motion Graphics & 3D Typography', desc: 'Subtitles that pop, animated statistics, and animated product callouts.' },
      { title: 'Done-For-You Content Calendar', desc: 'Never ask "what should we post today?" — 30 scheduled posts ready every month.' }
    ],
    useCases: [
      { title: 'Modern Rooftop Lounge & Kitchen', client: 'Hospitality Brand', outcome: 'Produced 12 cinematic food & atmosphere reels totaling 480K+ views; weekend tables fully booked.' },
      { title: 'Fitness Gym & CrossFit Arena', client: 'Health & Wellness', outcome: 'Member transformation video campaign drove 78 annual memberships within 3 weeks.' }
    ],
    process: ['Creative Content Strategy', 'Scheduled Shoot Day', 'Rapid Post-Production', 'Client Review & Polish', 'Automated Scheduled Publishing', 'Reach Analytics & Tuning'],
    deliverables: ['15 to 30 Polished 4K Reels/Shorts per month', 'Raw High-Res B-Roll Vault', 'Custom Designed Thumbnails & Hooks', 'Optimized SEO Captions & Hashtag Sets'],
    disclaimer: '20K+ View Target is an editorial campaign strategy. Views and reach depend on platform algorithms, audience engagement, content quality, targeting, and market conditions. Hyrinx does not guarantee a specific number of views.',
    managementSupport: 'Complete monthly retainers with guaranteed filming slots and zero-stress scheduled publishing.',
    primaryCtaText: 'Start Hyrinx Content Engine',
    secondaryCtaText: 'Review Video Showreel'
  },
  {
    id: 'ai-automation',
    number: '05',
    tag: 'AUTOMATE',
    title: 'AI & WhatsApp Intelligence',
    subtitle: 'Autonomous Customer Service & Workflow Bots',
    shortDesc: 'Turn WhatsApp into your most lucrative 24/7 sales agent. AI customer support, instant product catalogs, appointment booking, and CRM synchronization.',
    badge: 'Enterprise Automation',
    accentColor: '#10b981',
    gradient: 'from-emerald-600/30 via-teal-600/20 to-transparent',
    iconName: 'Bot',
    heroHeadline: 'Never Lose a Customer to a 10-Minute Reply Delay Ever Again.',
    heroDescription: 'Over 80% of Indian customers prefer conducting business on WhatsApp. We engineer custom AI agents that answer product questions, send catalog links, take orders, and book appointments 24/7/365.',
    problem: {
      title: 'The Silent Lead Bleed',
      points: [
        'Customers messaging at 10 PM and waiting until 10 AM the next day — by which time they bought from a competitor.',
        'Staff spending 4+ hours every day answering the exact same 15 questions.',
        'Messy phone chats with lost addresses, missed follow-ups, and uncollected payments.',
        'Zero integration between WhatsApp conversations and your billing or CRM software.'
      ]
    },
    solution: {
      title: 'Hyrinx WhatsApp Intelligence Platform',
      points: [
        'Trained on your exact business knowledge: pricing, menus, schedules, policies, and FAQs.',
        'Sub-second natural language answers in English, Hindi, and regional languages.',
        'Automated order generation with instant Razorpay/UPI payment links inside WhatsApp.',
        'Smooth human handoff when a VIP client needs custom personal attention.'
      ]
    },
    workflowTitle: 'Autonomous Customer Flow',
    workflowSteps: [
      { step: '01', label: 'Incoming Message', desc: 'Customer reaches out on official WhatsApp Business API' },
      { step: '02', label: 'Natural AI Parsing', desc: 'Understands intent, language, sentiment & product interest' },
      { step: '03', label: 'Business Knowledge', desc: 'Queries real-time stock, pricing, calendar & business rules' },
      { step: '04', label: 'Action Executed', desc: 'Sends catalog, collects details, books time or generates payment link' },
      { step: '05', label: 'CRM & Alert', desc: 'Logs customer in database & alerts team on high-priority inquiries' }
    ],
    interactiveConcept: 'whatsapp-intel',
    features: [
      { title: 'Official WhatsApp Business API Setup', desc: 'Verified green tick assistance, unlimited broadcast messaging, and multi-agent inboxes.' },
      { title: 'Custom AI Trained Knowledge Base', desc: 'Answers questions about services, directions, timings, and policies with zero hallucinations.' },
      { title: 'Interactive Catalogs & Instant Orders', desc: 'Customers can browse products, add items to cart, and checkout directly inside chat.' },
      { title: 'Smart Appointment & Slot Booking', desc: 'Syncs with your Google Calendar or booking system to prevent double-booking.' },
      { title: 'Automated Payment Collection', desc: 'Sends UPI and Razorpay payment links with automatic invoice generation upon success.' },
      { title: 'CRM & Sheet Synchronization', desc: 'Every phone number, lead source, and purchase synced directly to Google Sheets or CRM.' }
    ],
    useCases: [
      { title: 'Celebrity Unisex Hair & Beauty Salon', client: 'Wellness Business', outcome: 'Handled 2,300+ WhatsApp appointment bookings per month with 0 front desk errors.' },
      { title: 'D2C Custom Cake & Bakery Brand', client: 'Food Retail', outcome: 'Recovered 43% of late-night inquiries and automated ₹3.2L in weekend orders via WhatsApp bot.' }
    ],
    process: ['Knowledge Base Extraction', 'Dialogue Flow Engineering', 'API & Webhook Integration', 'Sandbox Testing', 'Meta Business Verification', 'Live Rollout & Handoff Training'],
    deliverables: ['Official WhatsApp Business API Connection', 'Trained AI Agent', 'Integrated Payment Gateway Webhook', 'Lead Dashboard / Google Sheet Sync', 'Staff Admin Portal'],
    managementSupport: 'Includes quarterly FAQ updates, prompt optimization, and server uptime monitoring.',
    primaryCtaText: 'Build My WhatsApp Bot',
    secondaryCtaText: 'Test Live Bot Demo'
  },
  {
    id: 'software-apps',
    number: '06',
    tag: 'SOFTWARE',
    title: 'Software & App Engineering',
    subtitle: 'Custom Internal Tools, Admin Panels & Mobile Apps',
    shortDesc: 'Custom software built to replace messy spreadsheets. Custom business dashboards, CRM systems, Android & iOS apps, and scalable SaaS platforms.',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-600/30 via-blue-600/20 to-transparent',
    iconName: 'Cpu',
    heroHeadline: 'Stop Running a Multi-Lakh Business on Spreadsheets and Paper Notebooks.',
    heroDescription: 'When off-the-shelf software doesn’t fit your workflow, Hyrinx builds custom web software, management dashboards, client portals, and mobile apps tailored precisely to your operation.',
    problem: {
      title: 'Spreadsheet Chaos & Subscription Fatigue',
      points: [
        'Paying thousands of dollars every year for foreign SaaS tools you only use 10% of.',
        'Critical business data trapped in disconnected Excel files across 5 different computers.',
        'Human errors in inventory calculations, staff commissions, and order statuses.',
        'No mobile access for owners to see today’s real-time sales and staff performance.'
      ]
    },
    solution: {
      title: 'Custom-Tailored Digital Software',
      points: [
        '100% custom workflows built specifically around how your team actually works.',
        'Role-based access controls: owners see financials, managers see tasks, staff see jobs.',
        'Cross-platform: runs seamlessly on desktop web browsers, Android phones, and iPads.',
        'Zero per-user monthly SaaS taxes — you own your software infrastructure.'
      ]
    },
    workflowTitle: 'Software Architecture Lifecycle',
    workflowSteps: [
      { step: '01', label: 'Workflow Mapping', desc: 'Documenting operational bottlenecks & data inputs' },
      { step: '02', label: 'Database Schema', desc: 'Secure PostgreSQL architecture & relationship mapping' },
      { step: '03', label: 'Full-Stack Build', desc: 'Next.js frontend, REST APIs & real-time WebSockets' },
      { step: '04', label: 'Security & QA', desc: 'Stress testing, role authentication & data encryption' },
      { step: '05', label: 'Cloud Deploy', desc: 'High-availability server deployment with daily backups' }
    ],
    interactiveConcept: 'architecture',
    features: [
      { title: 'Custom Management Dashboards', desc: 'Track sales, staff attendance, customer records, and live margins on one screen.' },
      { title: 'Android & iOS Mobile Applications', desc: 'Native-feel Flutter and React Native mobile apps for customers or field staff.' },
      { title: 'Client Portals & Booking Platforms', desc: 'Secure customer login areas for project updates, downloadable invoices, and reports.' },
      { title: 'Inventory & Supply Tracking', desc: 'Real-time stock alerts, barcode scanning, supplier management, and reorder triggers.' },
      { title: 'Automated Invoice & PDF Engines', desc: 'Generate GST-compliant tax invoices, receipts, and work orders in 1 click.' },
      { title: 'API & 3rd Party Integrations', desc: 'Connect payment gateways, SMS gateways, WhatsApp APIs, and accounting software.' }
    ],
    useCases: [
      { title: 'Automobile Fleet & Rental Agency', client: 'Logistics Enterprise', outcome: 'Built custom vehicle checkout, GPS tracking, and automated security deposit refunds.' },
      { title: 'Custom Furniture Manufacturer', client: 'Manufacturing B2B', outcome: 'Replaced 14 Google Sheets with a centralized order tracking and timber inventory platform.' }
    ],
    process: ['Operational Workflow Discovery', 'Architecture & Wireframe Review', 'Iterative Sprint Development', 'User Acceptance Testing', 'Staff Training & Cloud Launch', 'Support Retainer'],
    deliverables: ['Full Source Code & Git Repository', 'Production Database Migration', 'Admin & Staff Access Portals', 'API Documentation', 'Self-Hosting or Managed Cloud'],
    primaryCtaText: 'Engineer Custom Software',
    secondaryCtaText: 'Request Technical Consultation'
  },
  {
    id: 'ecommerce',
    number: '07',
    tag: 'COMMERCE',
    title: 'E-Commerce Ecosystems',
    subtitle: 'From Product Catalog to Payment Settlement',
    shortDesc: 'Fast, secure, high-conversion online stores. Integrated payment gateways (Razorpay, UPI, Cards), inventory sync, WhatsApp checkout, and courier tracking.',
    accentColor: '#6366f1',
    gradient: 'from-indigo-600/30 via-violet-600/20 to-transparent',
    iconName: 'ShoppingBag',
    heroHeadline: 'Turn Casual Browsers into Repeat Paying Customers.',
    heroDescription: 'An e-commerce website should not take 6 seconds to load or confuse shoppers with 8 checkout steps. We engineer blazing-fast digital storefronts with 1-click UPI payments and instant order confirmation.',
    problem: {
      title: 'The 70% Cart Abandonment Crisis',
      points: [
        'Clunky mobile checkout interfaces with too many form fields.',
        'Payment gateway drops and failed transactions causing frustrated buyers.',
        'High Shopify app fees eating 30% of your net profits.',
        'Zero integration with Indian delivery partners like Shiprocket or Delhivery.'
      ]
    },
    solution: {
      title: 'High-Velocity Commerce Stack',
      points: [
        'Instant mobile checkout with UPI, NetBanking, and cash-on-delivery validation.',
        'Sub-second page speeds with optimized image delivery on global CDNs.',
        'Direct WhatsApp order confirmation alerts sent immediately to both buyer and store owner.',
        'Automated courier API integration for real-time tracking numbers.'
      ]
    },
    workflowTitle: 'Frictionless Order Journey',
    workflowSteps: [
      { step: '01', label: 'Product Discovery', desc: 'Instant search, category filters & high-res media' },
      { step: '02', label: 'Smart Cart', desc: 'Bundle discounts, upsell prompts & delivery estimates' },
      { step: '03', label: '1-Click Checkout', desc: 'Mobile-first phone number login & UPI payments' },
      { step: '04', label: 'Instant Settlement', desc: 'Automated tax invoice & WhatsApp notification' },
      { step: '05', label: 'Dispatch Tracking', desc: 'Courier AWB generation & live customer tracking link' }
    ],
    interactiveConcept: 'ecommerce-flow',
    features: [
      { title: 'Custom Digital Storefronts', desc: 'Tailored aesthetic shopping experiences designed specifically for your brand category.' },
      { title: 'Indian Payment Gateway Integration', desc: 'Seamless Razorpay, Cashfree, PhonePe, and Paytm checkout with 99.9% success rates.' },
      { title: 'Inventory & Variant Management', desc: 'Handle sizes, colors, bundles, and automatically display "Out of Stock" labels.' },
      { title: 'Coupons & Dynamic Discounts', desc: 'Create percentage, flat discount, first-order, or minimum cart value promotional codes.' },
      { title: 'WhatsApp Direct Ordering', desc: 'Allow customers to tap a button and send their cart directly to WhatsApp for manual closure.' },
      { title: 'Automated Shipping & Courier Sync', desc: 'Connect Shiprocket or Delhivery to print packing slips and update tracking links automatically.' }
    ],
    useCases: [
      { title: 'Designer Ethnic Fashion Label', client: 'Direct-to-Consumer Brand', outcome: 'Boosted mobile checkout completion rate from 21% to 64% after migrating to custom Next.js storefront.' },
      { title: 'Organic Farm-to-Table Grocery', client: 'Regional Food Commerce', outcome: 'Processed 8,200+ monthly recurring vegetable box orders with auto-debit and WhatsApp delivery alerts.' }
    ],
    process: ['Product Catalog Architecture', 'Storefront UI/UX Design', 'Payment & Logistics Integration', 'Checkout Load Testing', 'Merchant Onboarding', 'Launch & Performance Tuning'],
    deliverables: ['Custom E-Commerce Storefront', 'Merchant Admin Dashboard', 'Integrated Payment Gateway Account', 'Courier API Automation', 'Product Upload Spreadsheet'],
    primaryCtaText: 'Build My Online Store',
    secondaryCtaText: 'Explore Store Demos'
  },
  {
    id: 'digitalization',
    number: '08',
    tag: 'DIGITALIZE',
    title: 'Offline-to-Online Digitalization',
    subtitle: 'Transform Traditional Businesses into Connected Enterprises',
    shortDesc: 'Take local brick-and-mortar operations into the modern digital era. Smart QR ordering, digital menus, online slot booking, automated customer follow-ups, and review engines.',
    accentColor: '#14b8a6',
    gradient: 'from-teal-600/30 via-emerald-600/20 to-transparent',
    iconName: 'QrCode',
    heroHeadline: 'Bridging the Gap Between Your Physical Counter and the Digital World.',
    heroDescription: 'From restaurants and salons to retail stores and automotive garages, we build the digital infrastructure that captures walk-in customers, retains their contact details, and turns them into repeat patrons.',
    problem: {
      title: 'The "Invisible Walk-In" Problem',
      points: [
        'Thousands of customers visit your store each month, yet you don’t have their phone numbers or names.',
        'Zero ways to bring walk-in customers back on slow weekdays.',
        'Printed paper menus and price sheets get torn, stained, and expensive to reprint when prices change.',
        'Relying entirely on word of mouth while newer digital-first competitors win local search.'
      ]
    },
    solution: {
      title: 'The Connected Business Transformation',
      points: [
        'Interactive QR codes on tables, bills, or counters that reveal digital menus and service catalogs.',
        'Automated digital loyalty: collect customer details effortlessly during visit.',
        'Scheduled WhatsApp greetings and birthday offers that bring customers back.',
        '1-tap Google Maps review links that build hundreds of verified local 5-star ratings.'
      ]
    },
    workflowTitle: 'The Transformation Bridge',
    workflowSteps: [
      { step: '01', label: 'Physical Touchpoint', desc: 'Customer scans elegant table QR or counter standee' },
      { step: '02', label: 'Digital Hub', desc: 'Instant mobile menu, portfolio or service catalog opens' },
      { step: '03', label: 'Lead Capture', desc: 'Customer registers phone number for digital perks or bill' },
      { step: '04', label: '5-Star Feedback', desc: 'Directs satisfied customers to leave verified Google reviews' },
      { step: '05', label: 'Re-Engagement', desc: 'Automated WhatsApp offers on slow days to drive repeat footfall' }
    ],
    interactiveConcept: 'digitalization',
    features: [
      { title: 'Smart QR Menu & Catalog Solutions', desc: 'Update prices, photos, and item availability in 10 seconds without reprinting anything.' },
      { title: 'Table-Side & Counter Ordering', desc: 'Customers can place food orders or service requests directly from their phones.' },
      { title: 'Digital Visiting Cards & NFC Cards', desc: 'Tap-to-share NFC smart cards that save your business profile directly into customer contacts.' },
      { title: 'Automated Review Booster', desc: 'Smart filter redirects happy customers to Google Maps and unhappy feedback to the manager privately.' },
      { title: 'Digital Queue & Token Displays', desc: 'Eliminate chaotic waiting crowds with live digital tokens accessible on customer phones.' },
      { title: 'Customer Database & Loyalty Hub', desc: 'Own your customer phone numbers and run automated broadcast campaigns with high open rates.' }
    ],
    useCases: [
      { title: 'Multi-Cuisine Family Restaurant', client: 'Hospitality', outcome: 'Gathered 4,800+ customer phone numbers in 90 days; generated ₹3.4L extra revenue on slow Tuesdays.' },
      { title: 'Automotive Detailing & Ceramic Studio', client: 'Automotive Services', outcome: 'Boosted Google Reviews from 42 to 418 in 4 months, dominating local city searches.' }
    ],
    process: ['On-Site Physical Audit', 'Digital Catalog & Menu Design', 'QR & NFC Hardware Configuration', 'Staff Onboarding', 'Launch & Customer Campaign Setup'],
    deliverables: ['Custom QR Standees & NFC Cards', 'Interactive Mobile Web Catalog', 'Google Review Booster Link', 'Customer Loyalty Database', 'Staff Training Guide'],
    primaryCtaText: 'Digitalize My Business',
    secondaryCtaText: 'See Before & After'
  },
  {
    id: 'management',
    number: '09',
    tag: 'MANAGE',
    title: 'Hyrinx Management',
    subtitle: 'Complete Digital Presence Management',
    shortDesc: 'You run your business. Hyrinx manages your digital side. Full-service handling of your website updates, social media posting, video editing, Google reviews, and digital systems.',
    badge: 'Executive Retainer',
    accentColor: '#3b82f6',
    gradient: 'from-blue-600/30 via-slate-800/40 to-transparent',
    iconName: 'ShieldCheck',
    heroHeadline: 'You Run the Business. Hyrinx Manages the Entire Digital Side.',
    heroDescription: 'Hiring a social media manager, web developer, video editor, and digital marketer costs ₹2,50,000+ per month. Hyrinx Management provides a unified dedicated team running every aspect of your online presence under one accountable roof.',
    problem: {
      title: 'The Digital Management Headache',
      points: [
        'Juggling 4 different freelancers who blame each other when something breaks or delays.',
        'Websites left untouched for 8 months with outdated prices and broken contact forms.',
        'Social media pages abandoned because the business owner simply has no time.',
        'Negative Google reviews sitting unaddressed, damaging your hard-earned reputation.'
      ]
    },
    solution: {
      title: 'The Unified Digital Operations Team',
      points: [
        'Single accountable partner: 1 dedicated account manager handling all requests.',
        'Guaranteed turnarounds: website edits completed within 2 to 6 hours.',
        'Consistent weekly calendar: filming, editing, captions, and publishing on autopilot.',
        'Active reputation guarding: professional review replies and monthly executive reports.'
      ]
    },
    workflowTitle: 'Digital Operations Command Loop',
    workflowSteps: [
      { step: '01', label: 'Weekly Planning', desc: 'Content calendar, promotion priorities & updates aligned' },
      { step: '02', label: 'Execution', desc: 'Designers, editors & developers craft assets & website updates' },
      { step: '03', label: 'Publish & Maintain', desc: 'Scheduled posts, server health check & plugin updates' },
      { step: '04', label: 'Reputation Defense', desc: 'Customer reviews monitored & answered professionally' },
      { step: '05', label: 'Executive Report', desc: 'Monthly metrics: website traffic, leads generated & social growth' }
    ],
    interactiveConcept: 'management-hub',
    features: [
      { title: 'Full Website Maintenance & Updates', desc: 'Change prices, add new team members, upload banners, and keep all software patched.' },
      { title: 'Social Media Management', desc: 'Instagram, Facebook, and LinkedIn handled end-to-end: reels, carousels, and stories.' },
      { title: 'Content Engine Retainer', desc: 'Regular video editing, graphic design, promotional posters, and event announcements.' },
      { title: 'Google Business Profile Custody', desc: 'Weekly photo uploads, service listing updates, review replies, and ranking defense.' },
      { title: 'Customer Lead Oversight', desc: 'Monitoring contact forms, WhatsApp bots, and ad leads to ensure zero dropped prospects.' },
      { title: 'Dedicated Priority WhatsApp Group', desc: 'Direct access to your Hyrinx tech and creative leads with instant response times.' }
    ],
    useCases: [
      { title: 'Premier Real Estate Agency', client: 'Property Broking', outcome: 'Offloaded 100% of digital management; maintained flawless weekly listings, driving 40+ buyer calls monthly.' },
      { title: 'Super-Specialty Orthopedic Hospital', client: 'Healthcare Group', outcome: 'Patient reviews managed, website updated daily with OPD schedules, and Instagram grew by 18,000 local followers.' }
    ],
    process: ['Digital Onboarding & Asset Audit', 'Account Setup & Access Delegation', 'Monthly Strategy Roadmap', 'Daily Active Management', 'Quarterly Executive Review'],
    deliverables: ['Dedicated Senior Account Manager', 'Weekly Content Publishing', 'Unlimited Website Text/Image Updates', 'Monthly Performance & Lead Audit Report'],
    primaryCtaText: 'Get Hyrinx Management',
    secondaryCtaText: 'Compare Management Tiers'
  },
  {
    id: 'security',
    number: '10',
    tag: 'PROTECT',
    title: 'Hyrinx Security',
    subtitle: 'Cybersecurity Hardening & Vulnerability Defense',
    shortDesc: 'Shield your digital infrastructure before attackers exploit it. Security audits, vulnerability assessments, SSL hardening, access control, and incident defense.',
    accentColor: '#ef4444',
    gradient: 'from-red-600/30 via-amber-600/20 to-transparent',
    iconName: 'ShieldAlert',
    heroHeadline: 'Security Isn’t an Afterthought. It Is Your Business’s Most Critical Asset.',
    heroDescription: 'Over 43% of cyber attacks target small and mid-sized businesses with inadequate defenses. Hyrinx Security audits your web platforms, hardens cloud configurations, and protects customer data against modern cyber threats.',
    problem: {
      title: 'The Invisible Cybersecurity Threat',
      points: [
        'Outdated server packages and CMS plugins containing known critical CVE exploits.',
        'Weak administrative credentials and lack of two-factor authentication leading to data breaches.',
        'Data leaks exposing customer phone numbers, orders, and financial records.',
        'Website defacement, malware injection, and blacklist removal nightmares from Google.'
      ]
    },
    solution: {
      title: 'Enterprise-Grade Defense Protocols',
      points: [
        'Comprehensive black-box & white-box security audits identifying zero-day and OWASP vulnerabilities.',
        'Web Application Firewall (WAF) integration blocking automated SQLi, XSS, and DDoS floods.',
        'Encrypted database backups and rapid disaster recovery protocols.',
        'Staff security hygiene training to eliminate phishing and social engineering vulnerabilities.'
      ]
    },
    workflowTitle: 'Security Hardening Cycle',
    workflowSteps: [
      { step: '01', label: 'Vulnerability Audit', desc: 'OWASP Top 10 automated & manual penetration testing' },
      { step: '02', label: 'Threat Surface Map', desc: 'Identify open ports, outdated libraries & exposed endpoints' },
      { step: '03', label: 'Code & Server Hardening', desc: 'Patching vulnerabilities, enforcing 2FA & CSP headers' },
      { step: '04', label: 'WAF & Shielding', desc: 'Deploying edge Cloudflare rules, bot blockers & rate limiters' },
      { step: '05', label: 'Continuous Monitoring', desc: 'Automated health pings & immediate tamper notification alerts' }
    ],
    interactiveConcept: 'security-shield',
    features: [
      { title: 'Website & App Penetration Testing', desc: 'Rigorous manual and automated testing for SQL injection, Cross-Site Scripting, and auth bypass.' },
      { title: 'Cloud Server Hardening', desc: 'Secure SSH configurations, firewall rules, disabled root access, and minimal attack surface.' },
      { title: 'SSL/TLS & Security Headers', desc: 'Implementation of HSTS, CSP, X-Frame-Options, and robust modern cryptographic ciphers.' },
      { title: 'Customer Data Encryption', desc: 'Ensure passwords, API keys, and customer records are securely salted and encrypted at rest.' },
      { title: 'Automated Offsite Backup Strategy', desc: 'Daily encrypted backups stored across geographic locations for 1-click disaster recovery.' },
      { title: 'Security Incident Response', desc: 'Emergency cleanup, malware removal, and blacklist resolution if your site is compromised.' }
    ],
    useCases: [
      { title: 'Regional Payment Gateway Integrator', client: 'Fintech Service', outcome: 'Discovered and remediated 3 critical authorization vulnerabilities prior to official RBI compliance audit.' },
      { title: 'E-Commerce Health Supplement Store', client: 'Direct-to-Consumer', outcome: 'Cleaned up legacy malware injection, secured database credentials, and restored Google search trust.' }
    ],
    process: ['Non-Disclosure Agreement', 'Authorized Scope Definition', 'Vulnerability Assessment & Pen-Test', 'Remediation Roadmap', 'Verification Re-Test', 'Security Certificate Issuance'],
    deliverables: ['Detailed Security Audit Report', 'Executive Risk Summary', 'Step-by-Step Patching Guide', 'Hyrinx Security Verification Badge'],
    primaryCtaText: 'Secure My Business',
    secondaryCtaText: 'Request Security Audit'
  },
  {
    id: 'cyber-lab',
    number: '11',
    tag: 'LEARN',
    title: 'Hyrinx Cyber Lab',
    subtitle: 'Defensive Security & Ethical Hacking Education',
    shortDesc: 'Hands-on practical cybersecurity training in legal, authorized sandbox environments. CTF training, web security, Linux hardening, OSINT, and secure coding for developers.',
    accentColor: '#38bdf8',
    gradient: 'from-sky-600/30 via-indigo-600/20 to-transparent',
    iconName: 'Terminal',
    heroHeadline: 'Learn to Think Like an Attacker. Build Defenses That Never Break.',
    heroDescription: 'All cyber defense starts with understanding offensive methodologies in strictly authorized environments. Hyrinx Cyber Lab teaches students, developers, and corporate teams how to test, harden, and defend modern software systems.',
    problem: {
      title: 'The Cyber Skills Deficit',
      points: [
        'Universities teach 15-year-old textbook theory with zero real terminal or lab experience.',
        'Developers writing code that inadvertently leaks database credentials or allows easy SQL injection.',
        'Employees falling for modern AI-assisted phishing and voice spoofing attacks.',
        'Aspiring security researchers having no legal, structured environment to practice CTFs.'
      ]
    },
    solution: {
      title: 'Practical Hands-On Cyber Education',
      points: [
        '100% legal, isolated virtualization sandboxes with intentional vulnerability targets.',
        'Curriculum curated by active security practitioners focusing on OWASP, Linux, and OSINT.',
        'CTF (Capture The Flag) competitions and defense drills simulating real scenarios.',
        'Corporate employee awareness workshops that reduce phishing risk by 90%.'
      ]
    },
    workflowTitle: 'Ethical Training Progression',
    workflowSteps: [
      { step: '01', label: 'Vulnerability Fundamentals', desc: 'Networking protocols, Linux architecture & web foundations' },
      { step: '02', label: 'Recon & OSINT', desc: 'Ethical open-source intelligence gathering & scanning' },
      { step: '03', label: 'Web Exploitation Labs', desc: 'Hands-on SQLi, XSS, CSRF & IDOR testing in authorized labs' },
      { step: '04', label: 'Defensive Remediation', desc: 'Writing patch code, configuring WAFs & input sanitization' },
      { step: '05', label: 'CTF Live Defense', desc: 'Timed simulated defense exercises and security certification' }
    ],
    interactiveConcept: 'cyber-lab',
    features: [
      { title: 'Web Application Security', desc: 'Deep dive into OWASP Top 10 vulnerabilities, Burp Suite mastery, and secure API design.' },
      { title: 'Linux & Network Defense', desc: 'Command line mastery, firewall configuration, network packet analysis with Wireshark.' },
      { title: 'Defensive Ethical Hacking', desc: 'Methodologies used by certified ethical hackers (CEH) to legally identify weaknesses.' },
      { title: 'OSINT & Intelligence Gathering', desc: 'Ethical open-source intelligence research techniques for digital footprints and domain audits.' },
      { title: 'CTF Competitions & Challenges', desc: 'Gamified security problems designed to sharpen rapid problem-solving and terminal skills.' },
      { title: 'Corporate Security Awareness', desc: 'Tailored workshops training company staff on phishing recognition, 2FA, and password hygiene.' }
    ],
    useCases: [
      { title: 'Engineering College Cyber Club', client: 'Higher Education', outcome: 'Trained 120 computer science undergraduates through a 3-day CTF boot camp; 14 students placed in infosec roles.' },
      { title: 'SaaS Software Development Team', client: 'Tech Enterprise', outcome: 'Trained 25 full-stack developers in secure code review, cutting staging vulnerabilities by 78%.' }
    ],
    process: ['Skill Assessment', 'Lab Environment Provisioning', 'Hands-on Guided Instruction', 'Live Sandbox Challenges', 'Practical Assessment & Certification'],
    deliverables: ['Cloud Lab Sandbox Access', 'Curated Video & Documentation Guides', 'CTF Challenge Pack', 'Certificate of Completion'],
    disclaimer: 'Hyrinx Cyber Lab provides educational training strictly within authorized, legal sandbox environments, CTF platforms, and defensive security contexts. We do not provide or teach illegal intrusion, hacking of unauthorized systems, or malicious tool deployment.',
    primaryCtaText: 'Join Hyrinx Cyber Lab',
    secondaryCtaText: 'Explore Syllabus'
  },
  {
    id: 'creative-tech',
    number: '12',
    tag: 'FUTURE LAB',
    title: 'Creative Technology & 3D Experiences',
    subtitle: 'Experimental Web, Interactive 3D & AI Concepts',
    shortDesc: 'Where digital artistry meets cutting-edge engineering. Interactive 3D web experiences, WebGL product configurators, generative AI showcases, and cinematic microsites.',
    badge: 'Innovation Laboratory',
    accentColor: '#8b5cf6',
    gradient: 'from-violet-600/30 via-fuchsia-600/20 to-transparent',
    iconName: 'Sparkles',
    heroHeadline: 'Step into the Next Generation of the World Wide Web.',
    heroDescription: 'When standard 2D flat pages are not enough, Hyrinx Future Lab crafts immersive 3D, WebGL, scrollytelling, and AI-driven interactions that place your brand in a league of its own.',
    problem: {
      title: 'The Sea of Sameness',
      points: [
        'Websites that all look like identical clone templates from the same theme marketplace.',
        'High-end luxury brands unable to showcase the tactile depth and engineering of their products.',
        'Static pitch decks that fail to excite investors and enterprise clients.',
        'Boring web interfaces that fail to create an emotional, memorable experience.'
      ]
    },
    solution: {
      title: 'Cinematic Creative Engineering',
      points: [
        'Real-time 3D models with smooth lighting, exploded assemblies, and 360-degree rotation.',
        'Interactive audio synthesizers reacting seamlessly to mouse and touch interactions.',
        'Scroll-driven storytelling where animations advance synchronously with user scroll.',
        'Gamified brand journeys that multiply user session duration by 400%.'
      ]
    },
    workflowTitle: 'Creative Engineering Lab Flow',
    workflowSteps: [
      { step: '01', label: 'Vision & Concept', desc: 'Experimental storyboard & interaction choreography' },
      { step: '02', label: '3D Asset Crafting', desc: 'Low-poly optimized 3D geometry & texture baking' },
      { step: '03', label: 'Shader & Canvas', desc: 'WebGL shaders, lighting calculations & particle dynamics' },
      { step: '04', label: 'Touch & Interaction', desc: 'Smooth camera choreography & cursor magnetic reactivity' },
      { step: '05', label: 'Device Optimization', desc: '60 FPS frame rate locked across high-end PCs and mobile' }
    ],
    interactiveConcept: 'future-lab',
    features: [
      { title: 'Interactive 3D Product Viewers', desc: 'Allow customers to rotate, explode, customize, and inspect products in real time.' },
      { title: 'Scroll-Driven Web Experiences', desc: 'Cinematic brand journeys where elements react dynamically to user scrolling.' },
      { title: 'Generative AI Media Concepts', desc: 'AI-assisted visual art, audio synthesis, and interactive dynamic content generation.' },
      { title: 'Experimental Brand Microsites', desc: 'Specialized high-impact landing pages for major product reveals or brand milestones.' },
      { title: 'Interactive Web Audio Synthesizers', desc: 'Custom soundscapes and acoustic reactions that elevate visual design into an emotional realm.' },
      { title: 'Digital Brand Showrooms', desc: 'Virtual booths, galleries, and interactive architectures accessible instantly in browser.' }
    ],
    useCases: [
      { title: 'Electric Vehicle Prototype Showcase', client: 'CleanTech Startup', outcome: 'Exploded battery and chassis 3D experience generated 3,200 investor deck views and $4M funding.' },
      { title: 'Luxury Architectural Penthouse Reveal', client: 'Real Estate Developer', outcome: 'Interactive sun-path and floorplan visualizer sold 18 luxury units prior to construction.' }
    ],
    process: ['Creative Brief & Conceptualization', '3D Asset Pipeline & Shader Prep', 'WebGL / Canvas Prototyping', 'Optimization for 60 FPS', 'Cross-Device Polish', 'Global Edge Deployment'],
    deliverables: ['Custom 3D WebGL Application', 'Optimized 3D Models (.gltf / .glb)', 'Sound FX & Interactive Audio Layer', 'Zero-Asset Code Package'],
    primaryCtaText: 'Commission a Creative Experience',
    secondaryCtaText: 'Test Interactive Canvas'
  },
  {
    id: 'originals',
    number: '13',
    tag: 'ORIGINALS',
    title: 'Hyrinx Originals',
    subtitle: 'Proprietary Packaged Business Products',
    shortDesc: 'Not just services. Turnkey proprietary business systems built and licensed exclusively by Hyrinx to solve exact operational bottlenecks.',
    badge: 'Proprietary Inventions',
    accentColor: '#f43f5e',
    gradient: 'from-rose-600/30 via-red-600/20 to-transparent',
    iconName: 'Box',
    heroHeadline: 'Packaged Proprietary Business Systems. Ready to Deploy.',
    heroDescription: 'Instead of starting from zero every time, Hyrinx Originals are specialized turnkey business technologies we designed, built, and perfected — ready to deploy for your company in 24 to 48 hours.',
    problem: {
      title: 'Why Re-Invent the Wheel?',
      points: [
        'Custom software development takes 3 to 6 months and costs tens of lakhs.',
        'Businesses need specific solutions like digital warranties, missed call recovery, or queue tokens TODAY.',
        'Generic apps don’t integrate seamlessly with Indian business payment and WhatsApp flows.'
      ]
    },
    solution: {
      title: 'Turnkey Hyrinx Innovations',
      points: [
        'Pre-engineered, battle-tested proprietary systems ready to rebrand and launch.',
        'Fixed, transparent pricing with no hidden developer hourly rates.',
        'Full support, cloud hosting, and continuous feature enhancements included.'
      ]
    },
    workflowTitle: 'Turnkey Deployment Engine',
    workflowSteps: [
      { step: '01', label: 'Select Original', desc: 'Choose the exact business product for your need' },
      { step: '02', label: 'Brand Injection', desc: 'Apply your logo, brand colors, catalog & WhatsApp numbers' },
      { step: '03', label: 'Data Sync', desc: 'Connect products, pricing & customer databases' },
      { step: '04', label: 'Staff Briefing', desc: '15-minute operational walkthrough for your team' },
      { step: '05', label: 'Go Live', desc: 'Immediate deployment to customers and physical counters' }
    ],
    interactiveConcept: 'originals-grid',
    features: [
      { title: 'Digital Business-in-a-Box', desc: 'Complete digital setup for a new company: website + WhatsApp bot + brand pack + Google Maps in 72 hours.' },
      { title: 'Business Digital Twin', desc: 'Centralized live dashboard mirroring your physical store: sales, staff, stock, and customer flow.' },
      { title: 'Missed Customer Recovery', desc: 'Automated AI callback and WhatsApp recovery system for unanswered phone calls and inquiries.' },
      { title: 'QR Smart System', desc: 'Dynamic QR codes for contactless ordering, digital menus, staff tips, and Google reviews.' },
      { title: 'Digital Warranty Vault', desc: 'Paperless digital warranty cards and repair histories linked directly to customer mobile numbers.' },
      { title: 'Digital Queue & Token', desc: 'Live mobile token displays for waiting rooms, salons, and restaurants that reduce crowd frustration.' },
      { title: 'AI Business Audit', desc: 'Comprehensive algorithmic diagnostic analyzing your current digital footprint and automation opportunities.' },
      { title: 'Website-as-a-Service (WaaS)', desc: 'Enterprise website + hosting + unlimited updates + 24/7 care on a simple recurring subscription.' },
      { title: 'Digital Continuity System', desc: 'Secure digital backup of all credentials, customer databases, domain assets, and business procedures.' }
    ],
    useCases: [
      { title: 'New Commercial Clinic Launch', client: 'Digital Business-in-a-Box', outcome: 'Doctor opened clinic with full website, Google Maps, online appointments, and branding ready on Day 1.' },
      { title: 'Consumer Electronics Retailer', client: 'Digital Warranty Vault', outcome: 'Eliminated paper warranty slips; saved 14,000 physical cards and built a 100% verified customer mobile database.' }
    ],
    process: ['Product Selection', 'Brand & Asset Customization', 'Cloud Provisioning', 'Staff Walkthrough', 'Customer Launch'],
    deliverables: ['Custom-Branded Original License', 'Cloud Infrastructure & Hosting', 'Admin Management Panel', 'Physical QR/Counter Collateral', '24/7 Priority Support'],
    primaryCtaText: 'Deploy a Hyrinx Original',
    secondaryCtaText: 'Request Product Demo'
  }
];
