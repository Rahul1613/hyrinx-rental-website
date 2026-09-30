import React from 'react'

export default function DetailMockup({ website }: { website: any }) {
  const cat = website.category || ''

  if (cat === 'Wedding') {
    return (
      <div className="w-full h-full bg-[#FAF5EE] text-stone-800 p-8 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-amber-900">
            Royal Wedding Celebration
          </span>
          <span className="text-xs text-stone-500 font-serif">Dec 2026 &bull; Udaipur Palace</span>
        </div>
        <div className="text-center py-4">
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            {website.name}
          </h2>
          <p className="text-sm text-stone-600 font-serif italic mt-1">
            &ldquo;A celebration of eternal love and timeless traditions&rdquo;
          </p>
          <div className="mt-4 inline-flex items-center gap-3 bg-amber-900/10 text-amber-900 border border-amber-900/20 text-xs font-serif px-4 py-1.5 rounded-full">
            <span>Online RSVP</span>
            <span>&bull;</span>
            <span>Digital Itinerary</span>
            <span>&bull;</span>
            <span>Photo Story</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-stone-200 text-xs text-stone-500 font-serif">
          <span>✨ Full Interactive Experience</span>
          <span>Click &apos;View Live Demo&apos; below</span>
        </div>
      </div>
    )
  }

  if (cat === 'Birthday' || cat === 'Celebration') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 text-slate-800 p-8 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-100 px-3 py-1 rounded-md">
            Party Live Invitation
          </span>
          <span className="text-xs text-purple-600 font-bold">🎉 Live Countdown Active</span>
        </div>
        <div className="text-center py-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {website.name}
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Music, Dance, Photo Booth &amp; Delicious Cake
          </p>
          <div className="mt-4 flex justify-center gap-3 text-xs font-bold text-slate-700">
            <span className="bg-white shadow-xs px-3 py-1 rounded-lg border border-pink-200">08 Days</span>
            <span className="bg-white shadow-xs px-3 py-1 rounded-lg border border-pink-200">14 Hours</span>
            <span className="bg-white shadow-xs px-3 py-1 rounded-lg border border-pink-200">30 Mins</span>
          </div>
        </div>
        <div className="text-xs text-center text-pink-700 font-semibold bg-white/80 py-1.5 rounded-xl border border-pink-100">
          Skyline Rooftop Lounge &bull; RSVP &amp; Wishes Active
        </div>
      </div>
    )
  }

  if (cat === 'Projects for College Students' || cat === 'Project') {
    return (
      <div className="w-full h-full bg-[#0a0f1d] text-slate-100 p-8 flex flex-col justify-between font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-3 py-1 rounded border border-indigo-800/40">
            College Capstone &bull; Final Year Engineering Project
          </span>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/40">
            ● Full Working Code Included
          </span>
        </div>
        <div className="text-center py-4 font-sans">
          <h2 className="text-3xl font-black text-white tracking-tight">
            {website.name}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
            {website.shortDesc || website.description}
          </p>
          <div className="mt-4 inline-flex items-center gap-3 bg-slate-900 border border-slate-800 text-xs text-indigo-300 font-mono px-4 py-1.5 rounded-full">
            <span>Verified System Architecture</span>
            <span>&bull;</span>
            <span>Viva &amp; PPT Guide</span>
            <span>&bull;</span>
            <span>Complete GitHub Code</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-xs text-slate-400">
          <span>Ready for Semester / Examiner Submission</span>
          <span className="text-indigo-300 font-bold">Rent for Your Viva Demo</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded border border-cyan-800/40">
          {cat} Edition
        </span>
        <span className="text-xs text-blue-200">🚀 Ready to Rent</span>
      </div>
      <div className="text-center py-4">
        <h2 className="text-3xl font-black text-white tracking-tight">
          {website.name}
        </h2>
        <p className="text-sm text-blue-200 mt-1 max-w-md mx-auto">
          {website.shortDesc || website.description}
        </p>
      </div>
      <div className="text-xs text-center text-cyan-200 bg-white/10 py-1.5 rounded-xl backdrop-blur-xs border border-white/10">
        Click &apos;View Live Demo&apos; to interact with this website live
      </div>
    </div>
  )
}
