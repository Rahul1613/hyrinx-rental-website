import Link from 'next/link'
import Navbar from '@/components/Navbar'
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  MapPin,
  Quote,
  Rocket,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react'

const founders = [
  {
    name: 'Rahul Sisode',
    title: 'Founder & CEO',
    handle: '@_rahulsisode',
    instagram: 'https://www.instagram.com/_rahulsisode/',
    location: 'India',
    summary:
      'Rahul leads the vision behind Hyrinx with a sharp focus on bold branding, scalable product thinking, and a premium customer experience that turns ideas into unforgettable digital moments.',
    quote:
      'We build experiences that feel as premium as the moments they represent.',
    image:
      '/rahul.png',
    accent: 'from-blue-600 via-indigo-600 to-violet-600',
  },
  {
    name: 'Harshal',
    title: 'Founder & Creative Strategist',
    handle: '@hxrshxl_07',
    instagram: 'https://www.instagram.com/hxrshxl_07/',
    location: 'India',
    summary:
      'Harshal brings artistic direction, communication energy, and product instinct to every launch, crafting experiences that feel more human, more premium, and unmistakably memorable.',
    quote:
      'The best digital experiences feel effortless, emotional, and unforgettable.',
    image:
      '/harshal.png',
    accent: 'from-pink-500 via-rose-500 to-orange-500',
  },
]

const values = [
  {
    title: 'Creative-first thinking',
    desc: 'Every launch is crafted to feel premium, modern, and memorable from the very first impression.',
    icon: Sparkles,
  },
  {
    title: 'Built for momentum',
    desc: 'We design experiences that move fast, feel effortless, and help brands launch in days instead of months.',
    icon: Rocket,
  },
  {
    title: 'Human connection',
    desc: 'Every product decision is made with the end user in mind — clear, emotional, and conversion-friendly.',
    icon: Users,
  },
]

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="pt-28 pb-24">
        <section className="relative overflow-hidden">
          <div className="absolute -left-28 top-12 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.18),transparent_30%)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-200 backdrop-blur-sm shadow-lg shadow-blue-500/10">
                <Star className="h-3.5 w-3.5 fill-current" />
                Founders behind the brand
              </p>

              <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                The visionaries
                <span className="mt-3 block bg-gradient-to-r from-blue-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent">
                  building HYRINX
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl leading-relaxed">
                From product thinking to visual storytelling, Rahul and Harshal build experiences that feel elevated, unforgettable, and impossible to ignore.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                { label: 'Years of vision', value: '2+' },
                { label: 'Startups shaped', value: '19+' },
                { label: 'Creative energy', value: '∞' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 ${
                    index === 1 ? 'border-blue-400/30 bg-blue-500/10' : ''
                  }`}
                >
                  <div className="text-3xl sm:text-4xl font-black text-white">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(14,116,144,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-300/40"
              >
                <div className={`h-1.5 bg-gradient-to-r ${founder.accent}`} />
                <div className="grid md:grid-cols-[260px_1fr]">
                  <div className="relative min-h-[330px] overflow-hidden bg-slate-900">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200 backdrop-blur-sm">
                        <Camera className="h-3.5 w-3.5" />
                        Founder profile
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300">{founder.title}</p>
                        <h2 className="mt-3 text-3xl font-black text-white">{founder.name}</h2>
                      </div>
                      <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 p-2 text-emerald-300">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                      <MapPin className="h-4 w-4 text-pink-300" />
                      {founder.location}
                    </div>

                    <p className="mt-6 text-base leading-8 text-slate-300">{founder.summary}</p>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <Quote className="h-5 w-5 text-blue-300" />
                      <p className="mt-3 text-sm italic leading-7 text-slate-200">“{founder.quote}”</p>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <a
                        href={founder.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-pink-500/30"
                      >
                        <Camera className="h-4 w-4" />
                        {founder.handle}
                      </a>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-100 transition-colors hover:border-blue-300 hover:text-blue-200"
                      >
                        Book a call
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8 sm:p-10 lg:p-12 shadow-[0_30px_80px_rgba(59,130,246,0.15)]">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Why HYRINX exists</p>
              <h3 className="mt-4 text-3xl font-black text-white sm:text-4xl leading-tight">We turn big moments into digital experiences people remember, trust, and share.</h3>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {values.map(({ title, desc, icon: Icon }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-slate-950 shadow-lg shadow-blue-500/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-5 text-xl font-bold text-white">{title}</h4>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10">
            <div className="flex items-center gap-3 text-blue-300">
              <Zap className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">The core idea</span>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <h3 className="text-3xl font-black text-white sm:text-4xl">
                  Premium websites for events, brands, and launches that need to stand out instantly.
                </h3>
                <div className="mt-6 space-y-4 text-slate-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                    <p>More than templates — handcrafted experiences designed to feel personal, premium, and conversion-ready.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                    <p>Fast to launch, elegant to explore, and flexible enough for modern events, brands, and digital storytelling.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">Our mission</p>
                <p className="mt-5 text-xl font-semibold leading-8 text-slate-100">
                  To help people launch faster, look sharper, and turn attention into action with memorable digital first impressions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
