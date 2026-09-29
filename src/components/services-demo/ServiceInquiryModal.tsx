"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, PhoneCall, CheckCircle2, Sparkles, MessageSquare } from "lucide-react";

interface ServiceInquiryModalProps {
  isOpen: boolean;
  serviceTitle: string;
  onClose: () => void;
}

export default function ServiceInquiryModal({
  isOpen,
  serviceTitle,
  onClose
}: ServiceInquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppDirect = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Hyrinx Services Inquiry*\n\n*Service:* ${serviceTitle}\n*Name:* ${name || "Client"}\n*Business:* ${businessName || "Not specified"}\n*Phone:* ${phone || "Not specified"}\n*Requirements:* ${notes || "I want to discuss this project with Hyrinx."}`;
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919730213645?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 text-white shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Hyrinx Direct Advisory
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-1">
          Initiate Project Consultation
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Selected Service: <strong className="text-blue-300">{serviceTitle || "Custom Solution"}</strong>
        </p>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-emerald-950/30 rounded-xl border border-emerald-500/40">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Opening Direct WhatsApp</h4>
            <p className="text-xs text-slate-300">
              Your inquiry has been compiled. You are being connected with a Hyrinx technical lead now.
            </p>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppDirect} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1.5">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1.5">Business or Brand Name</label>
              <input
                type="text"
                placeholder="e.g. Apex Hospital / Gourmet Roasters"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1.5">WhatsApp / Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1.5">Specific Needs or Current Problem</label>
              <textarea
                rows={3}
                placeholder="Tell us what you want to build, automate, market or manage..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Connect on Official WhatsApp (+91-9730213645)</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2">
                Fast response within 15 minutes during standard operational hours.
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
