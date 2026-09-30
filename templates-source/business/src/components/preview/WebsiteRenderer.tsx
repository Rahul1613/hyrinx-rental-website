"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Star,
  ChevronDown,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { WebsiteConfig } from "@/lib/types";

export default function WebsiteRenderer({
  config,
  interactive = true,
}: {
  config: WebsiteConfig;
  interactive?: boolean;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");

  const { branding, images, sections, sectionOrder } = config;

  // Font family mapping
  const fontClass =
    branding.fontFamily === "serif"
      ? "font-serif"
      : branding.fontFamily === "grotesk"
      ? "font-display"
      : branding.fontFamily === "mono"
      ? "font-mono"
      : "font-sans";

  // Button radius mapping
  const btnRadius =
    branding.buttonStyle === "pill"
      ? "rounded-full"
      : branding.buttonStyle === "sharp"
      ? "rounded-none"
      : branding.buttonStyle === "outline"
      ? "rounded-md border-2"
      : "rounded-lg";

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName) return;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryMsg("");
  };

  return (
    <div
      className={`min-h-full bg-white text-slate-900 ${fontClass} transition-colors duration-300 selection:text-white`}
      style={
        {
          "--site-primary": branding.primaryColor,
          "--site-accent": branding.accentColor,
        } as React.CSSProperties
      }
    >
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <a href="#hero" className="flex items-center gap-2.5 group">
            {branding.logoUrl ? (
              <img
                src={branding.logoUrl}
                alt={config.name}
                className="w-9 h-9 object-contain rounded"
              />
            ) : (
              <div
                className="w-9 h-9 rounded flex items-center justify-center text-white font-bold text-base shadow-sm"
                style={{ backgroundColor: branding.primaryColor }}
              >
                {config.name.charAt(0)}
              </div>
            )}
            <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:opacity-90">
              {config.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {sections.about && <a href="#about" className="hover:text-slate-900">About</a>}
            {sections.services && <a href="#services" className="hover:text-slate-900">Services</a>}
            {sections.products && <a href="#products" className="hover:text-slate-900">Offerings</a>}
            {sections.gallery && <a href="#gallery" className="hover:text-slate-900">Gallery</a>}
            {sections.testimonials && <a href="#testimonials" className="hover:text-slate-900">Reviews</a>}
            {sections.contact && <a href="#contact" className="hover:text-slate-900">Contact</a>}
          </nav>

          <div className="flex items-center gap-2.5">
            {config.whatsapp && (
              <a
                href={`https://wa.me/${config.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            )}
            <a
              href="#contact"
              className={`px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-transform active:scale-95 ${btnRadius}`}
              style={{ backgroundColor: branding.primaryColor }}
            >
              {config.ctaText || "Get in Touch"}
            </a>
          </div>
        </div>
      </header>

      {/* Dynamic Ordered Sections */}
      {sectionOrder.map((sectionKey) => {
        if (!sections[sectionKey as keyof typeof sections]) return null;

        switch (sectionKey) {
          case "hero":
            return (
              <section
                key="hero"
                id="hero"
                className="relative py-16 sm:py-24 px-4 sm:px-8 border-b border-slate-100 overflow-hidden bg-gradient-to-b from-slate-50/50 to-white"
              >
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: branding.primaryColor }}
                      />
                      <span>{config.category}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
                      {config.tagline || `Welcome to ${config.name}`}
                    </h1>

                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                      {config.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href="#contact"
                        className={`px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-95 ${btnRadius}`}
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        {config.ctaText || "Explore Services"}
                      </a>
                      <a
                        href="#about"
                        className={`px-5 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors ${btnRadius}`}
                      >
                        Learn More
                      </a>
                    </div>

                    {/* Quick Highlights */}
                    <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                      <div>
                        <span className="block text-2xl font-bold text-slate-900">4.9★</span>
                        <span className="text-xs text-slate-500">Customer Rating</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-slate-900">100%</span>
                        <span className="text-xs text-slate-500">Quality Assured</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-slate-900">Verified</span>
                        <span className="text-xs text-slate-500">Local Business</span>
                      </div>
                    </div>
                  </div>

                  {/* Hero Visual */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 sm:aspect-16/11 border border-slate-200/80">
                      <img
                        src={images.hero}
                        alt={config.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
                        <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm">
                          {config.name} • {config.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );

          case "about":
            return (
              <section key="about" id="about" className="py-20 px-4 sm:px-8 bg-slate-50/60 border-b border-slate-200/60">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                  <div className="md:col-span-5">
                    <div className="relative rounded-xl overflow-hidden shadow-md aspect-square border border-slate-200">
                      <img
                        src={images.about || images.hero}
                        alt="About Us"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider block"
                      style={{ color: branding.primaryColor }}
                    >
                      Our Story & Heritage
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                      Dedicated to Excellence in Every Detail
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      At {config.name}, we believe in craftsmanship, warm customer care, and delivering consistent quality. Founded with a vision to redefine local excellence in {config.category.toLowerCase()}, we treat every customer like family.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-3.5 bg-white rounded-lg border border-slate-200/80">
                        <span className="font-bold text-slate-900 block text-sm">Certified Team</span>
                        <span className="text-xs text-slate-500">Expert practitioners & staff</span>
                      </div>
                      <div className="p-3.5 bg-white rounded-lg border border-slate-200/80">
                        <span className="font-bold text-slate-900 block text-sm">Community Loved</span>
                        <span className="text-xs text-slate-500">Serving thousands of patrons</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );

          case "services":
            return (
              <section key="services" id="services" className="py-20 px-4 sm:px-8 border-b border-slate-100">
                <div className="max-w-6xl mx-auto space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span
                      className="text-xs font-bold uppercase tracking-wider block"
                      style={{ color: branding.primaryColor }}
                    >
                      Signature Offerings
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                      Tailored Services & Experiences
                    </h2>
                    <p className="text-slate-600 text-sm">
                      Carefully designed to meet the highest standards of taste, precision, and hospitality.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {config.servicesList.map((service) => (
                      <div
                        key={service.id}
                        className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: branding.primaryColor }}
                            />
                            {service.price && (
                              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                                {service.price}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-slate-900">{service.title}</h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {service.badge && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded w-fit">
                            ✦ {service.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "products":
            return (
              <section key="products" id="products" className="py-20 px-4 sm:px-8 bg-slate-50/70 border-b border-slate-200/60">
                <div className="max-w-6xl mx-auto space-y-12">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <span
                        className="text-xs font-bold uppercase tracking-wider block"
                        style={{ color: branding.primaryColor }}
                      >
                        Featured Products
                      </span>
                      <h2 className="text-3xl font-bold text-slate-900 mt-1">
                        Curated Collections
                      </h2>
                    </div>
                    <a
                      href="#contact"
                      className="text-sm font-semibold flex items-center gap-1 hover:underline"
                      style={{ color: branding.primaryColor }}
                    >
                      Inquire on Availability
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {config.productsList.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                      >
                        <div className="relative aspect-4/3 w-full bg-slate-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-base text-slate-900">{product.name}</h3>
                            <span className="text-sm font-bold" style={{ color: branding.primaryColor }}>
                              {product.price}
                            </span>
                          </div>
                          <p className="text-slate-500 text-xs leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "gallery":
            return (
              <section key="gallery" id="gallery" className="py-20 px-4 sm:px-8 border-b border-slate-100">
                <div className="max-w-6xl mx-auto space-y-8">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider block"
                      style={{ color: branding.primaryColor }}
                    >
                      Visual Experience
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900">
                      Moments at {config.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {images.gallery.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl overflow-hidden aspect-square border border-slate-200 shadow-xs hover:scale-102 transition-transform duration-300"
                      >
                        <img
                          src={imgUrl}
                          alt="Gallery item"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "testimonials":
            return (
              <section key="testimonials" id="testimonials" className="py-20 px-4 sm:px-8 bg-slate-50/50 border-b border-slate-200/60">
                <div className="max-w-6xl mx-auto space-y-10">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider block"
                      style={{ color: branding.primaryColor }}
                    >
                      Client Testimonials
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900">
                      What People Say
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {config.testimonialsList.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(item.rating)].map((_, r) => (
                              <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed italic">
                            "{item.quote}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100">
                          <strong className="text-slate-900 text-sm block">{item.author}</strong>
                          <span className="text-xs text-slate-500">{item.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "team":
            return (
              <section key="team" id="team" className="py-20 px-4 sm:px-8 border-b border-slate-100">
                <div className="max-w-6xl mx-auto space-y-10">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider block"
                      style={{ color: branding.primaryColor }}
                    >
                      Leadership & Artisans
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900">
                      Meet the Team
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {config.teamList.map((member) => (
                      <div
                        key={member.id}
                        className="text-center space-y-3 p-5 rounded-xl border border-slate-200/80 bg-white"
                      >
                        <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-2 border-slate-200 shadow-sm">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <strong className="text-slate-900 font-bold text-base block">{member.name}</strong>
                          <span className="text-xs text-slate-500">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "faq":
            return (
              <section key="faq" id="faq" className="py-20 px-4 sm:px-8 bg-slate-50/50 border-b border-slate-200/60">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="text-center space-y-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider block"
                      style={{ color: branding.primaryColor }}
                    >
                      Frequently Asked Questions
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900">
                      Help & Information
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {config.faqList.map((faq, fIdx) => {
                      const isOpen = openFaq === fIdx;
                      return (
                        <div
                          key={faq.id}
                          className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                            className="w-full p-4.5 text-left font-semibold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4"
                          >
                            <span>{faq.q}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );

          case "contact":
            return (
              <section key="contact" id="contact" className="py-20 px-4 sm:px-8 border-b border-slate-100">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  {/* Left Info */}
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <span
                        className="text-xs font-bold uppercase tracking-wider block"
                        style={{ color: branding.primaryColor }}
                      >
                        Get in Touch
                      </span>
                      <h2 className="text-3xl font-bold text-slate-900 mt-1">
                        Connect With Us
                      </h2>
                      <p className="text-slate-600 text-sm mt-2">
                        Questions, bookings, or custom orders? Reach out directly and our team will get back to you promptly.
                      </p>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                        <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-slate-900 text-xs font-semibold">Location</strong>
                          <span className="text-xs text-slate-600">{config.address}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                        <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                        <div>
                          <strong className="block text-slate-900 text-xs font-semibold">Phone</strong>
                          <a href={`tel:${config.phone}`} className="text-xs text-slate-600 hover:underline">
                            {config.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                        <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                        <div>
                          <strong className="block text-slate-900 text-xs font-semibold">Email</strong>
                          <a href={`mailto:${config.email}`} className="text-xs text-slate-600 hover:underline">
                            {config.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {config.whatsapp && (
                      <a
                        href={`https://wa.me/${config.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Instantly on WhatsApp</span>
                      </a>
                    )}
                  </div>

                  {/* Right Contact Form */}
                  <div className="lg:col-span-7 bg-slate-50/70 p-6 sm:p-8 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-xl text-slate-900 mb-1">Send a Message</h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Fill out the form below and we will contact you within a few hours.
                    </p>

                    {formSent ? (
                      <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                        <h4 className="font-bold text-emerald-900 text-base">Inquiry Received</h4>
                        <p className="text-xs text-emerald-700">
                          Thank you for reaching out to {config.name}. We will get back to you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                          <input
                            type="text"
                            required
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={inquiryEmail}
                            onChange={(e) => setInquiryEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Your Message</label>
                          <textarea
                            rows={4}
                            value={inquiryMsg}
                            onChange={(e) => setInquiryMsg(e.target.value)}
                            placeholder="How can we assist you today?"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>

                        <button
                          type="submit"
                          className={`w-full py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-95 ${btnRadius}`}
                          style={{ backgroundColor: branding.primaryColor }}
                        >
                          Submit Message
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}

      {/* Footer */}
      {sections.footer && (
        <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-8 text-xs">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-8 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white">{config.name}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{config.category}</span>
            </div>
            <p className="text-slate-400 text-center sm:text-right">
              {config.address}
            </p>
          </div>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
            <span>© {new Date().getFullYear()} {config.name}. All rights reserved.</span>
            <span>Created with BusinessSite Studio</span>
          </div>
        </footer>
      )}
    </div>
  );
}
