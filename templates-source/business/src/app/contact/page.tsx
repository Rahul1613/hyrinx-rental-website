"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, AlertCircle, Layers, Truck, FileText } from "lucide-react";
import { submitBusinessLead, BusinessLead } from "@/lib/supabaseClient";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const prefillSpec = searchParams.get("spec") || searchParams.get("service") || searchParams.get("project") || "";

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [substrate, setSubstrate] = useState("Extruded Aluminum (6063-T6)");
  const [coatingSystem, setCoatingSystem] = useState("Qualicoat Class 2 Superdurable Polyester");
  const [estimatedSqft, setEstimatedSqft] = useState("5,000 – 25,000 sq.ft");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<{ type: "success" | "error"; text: string; id?: string } | null>(null);

  useEffect(() => {
    if (prefillSpec) {
      setMessage(`Technical Specification Reference: ${prefillSpec}\n\nPlease quote for component drawings attached / dispatched.`);
    }
  }, [prefillSpec]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !companyName) return;

    setLoading(true);
    setResultMessage(null);

    const lead: BusinessLead = {
      full_name: fullName.trim(),
      company_name: companyName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      substrate_type: substrate,
      coating_type: coatingSystem,
      estimated_sqft: estimatedSqft,
      message: message.trim(),
    };

    const res = await submitBusinessLead(lead);

    setLoading(false);
    if (res.success) {
      setResultMessage({
        type: "success",
        text: res.message,
        id: `RFQ-VG-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      setMessage("");
    } else {
      setResultMessage({
        type: "error",
        text: res.message,
      });
    }
  };

  return (
    <div className="space-y-16 py-12">
      
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>TECHNICAL ESTIMATING & PLANT DISPATCH</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight">
            Request Coating RFQ & Plant Contact
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            Submit your component drawings (PDF/DXF/STEP) or project bill of quantities. Our estimating engineers review substrate metallurgy and return a formal cost estimate within 4 business hours.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Logistics Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* RFQ Form (7 Cols) */}
          <div className="lg:col-span-7 pro-card p-6 sm:p-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                  Coating Quotation Request Form
                </h2>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Synchronized with Supabase database table: <code className="text-blue-700 font-mono-spec font-bold">business_leads</code>
                </span>
              </div>
              <span className="pro-tag text-emerald-700 bg-emerald-50 border-emerald-200">
                ACTIVE QUEUE
              </span>
            </div>

            {resultMessage ? (
              <div
                className={`p-6 rounded-lg border space-y-3 ${
                  resultMessage.type === "success"
                    ? "bg-emerald-50/80 border-emerald-300 text-slate-800"
                    : "bg-red-50/80 border-red-300 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {resultMessage.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <strong className="font-display font-bold text-base text-slate-900">
                    {resultMessage.type === "success" ? "RFQ Dispatched to Technical Estimating" : "Submission Notice"}
                  </strong>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed">
                  {resultMessage.text}
                </p>

                {resultMessage.id && (
                  <div className="font-mono-spec text-xs bg-white p-3.5 rounded border border-emerald-200 space-y-1">
                    <span className="text-slate-500 block text-[10px]">VERIFIED TRACKING TICKET ID:</span>
                    <span className="text-blue-700 font-bold text-base">{resultMessage.id}</span>
                    <p className="text-xs text-slate-600 pt-1 font-sans">
                      Our Lead Estimator has been assigned to your drawing review. Direct phone inquiry: +91 (2135) 662-800.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setResultMessage(null)}
                  className="mt-3 btn-secondary-white text-xs py-2 px-4"
                >
                  Submit Another Project Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                
                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Legal / Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Patil"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. L&T Construction / Godrej Tooling"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="r.patil@company.com"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Direct Mobile / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98220 00000"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Substrate & Coating System */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Substrate Material
                    </label>
                    <select
                      value={substrate}
                      onChange={(e) => setSubstrate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    >
                      <option value="Extruded Aluminum (6063-T6)">Extruded Aluminum (6063-T6)</option>
                      <option value="Cold Rolled Mild Steel (CRCA)">Cold Rolled Mild Steel (CRCA)</option>
                      <option value="Hot-Dip Galvanized Iron (GI)">Hot-Dip Galvanized Iron (GI)</option>
                      <option value="Heavy Structural Steel (S355/IS2062)">Heavy Structural Steel (S355/IS2062)</option>
                      <option value="Stainless Steel 304/316">Stainless Steel 304/316</option>
                      <option value="Cast Iron / Forgings">Cast Iron / Forgings</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Target Coating Specification
                    </label>
                    <select
                      value={coatingSystem}
                      onChange={(e) => setCoatingSystem(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    >
                      <option value="Qualicoat Class 2 Superdurable Polyester">Qualicoat Class 2 Superdurable Polyester</option>
                      <option value="Heavy Equipment Dual-Coat (Epoxy + Polyurethane)">Heavy Equipment Dual-Coat (Epoxy + Polyurethane)</option>
                      <option value="Thermal Arc Spray Zinc Metallizing">Thermal Arc Spray Zinc Metallizing</option>
                      <option value="Abrasive Blast (SA 2.5) + Single Coat">Abrasive Blast (SA 2.5) + Single Coat</option>
                      <option value="Custom Chemical Resistance / Anti-Graffiti">Custom Chemical Resistance / Anti-Graffiti</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Estimated Run Volume */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Estimated Production Volume / Surface Area
                  </label>
                  <select
                    value={estimatedSqft}
                    onChange={(e) => setEstimatedSqft(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  >
                    <option value="Prototype / Sample Run (< 1,000 sq.ft)">Prototype / Sample Run (&lt; 1,000 sq.ft)</option>
                    <option value="1,000 – 5,000 sq.ft">1,000 – 5,000 sq.ft batch</option>
                    <option value="5,000 – 25,000 sq.ft">5,000 – 25,000 sq.ft project run</option>
                    <option value="Continuous OEM Contract (> 50,000 sq.ft/month)">Continuous OEM Contract (&gt; 50,000 sq.ft/month)</option>
                  </select>
                </div>

                {/* Row 5: Project Details & Drawing Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Requirements / Tolerances / Drawing Links
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify RAL shade code, target DFT, salt-spray requirements, component maximum dimensions, or paste Google Drive / Dropbox drawing links..."
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary-blue w-full text-center text-xs py-3.5"
                  >
                    {loading ? "TRANSMITTING TO ESTIMATING..." : "DISPATCH RFQ TO TECHNICAL ESTIMATING"}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Submissions are encrypted and stored in table `business_leads`. NDA maintained on all proprietary drawings.</span>
                </div>

              </form>
            )}
          </div>

          {/* Plant Logistics & Gate Map Information (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Plant Address & Contacts */}
            <div className="pro-card p-6 sm:p-8 space-y-6">
              <h3 className="font-display font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
                Chakan Plant Direct Access
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold text-sm">VANGUARD SURFACE FINISHING PVT. LTD.</strong>
                    <span className="text-slate-600 block mt-1 leading-relaxed">
                      Plot No. B-42, Phase II, Chakan Industrial Area, MIDC,
                      Taluka Khed, Pune 410501, Maharashtra, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">MAIN ESTIMATING DESK</span>
                    <strong className="text-slate-900 font-semibold text-sm">+91 (2135) 662-800 / 801</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">DRAWING DISPATCH EMAIL</span>
                    <strong className="text-blue-700 font-semibold text-sm">rfq@vanguardsurface.com</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">OPERATIONAL SHIFTS</span>
                    <span className="text-slate-800 font-medium">Monday to Saturday • 06:00 – 22:30 IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heavy Transport Gate Protocols */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-blue-700">
                <Truck className="w-4 h-4" />
                <span className="font-bold font-mono-spec uppercase tracking-wider">Trailer Inward / Outward Gates</span>
              </div>

              <div className="space-y-3 text-slate-600 leading-relaxed font-sans">
                <div className="p-3 bg-white rounded border border-slate-200/80">
                  <strong className="text-slate-900 block text-xs font-semibold">GATE 1 (HEAVY WEIGHBRIDGE)</strong>
                  <span>Dedicated access for 40-foot flatbed trailers, 20-tonne coil trucks, and raw material steel bundles. Overhead 10T gantry crane unloading.</span>
                </div>

                <div className="p-3 bg-white rounded border border-slate-200/80">
                  <strong className="text-slate-900 block text-xs font-semibold">GATE 2 (SAMPLES & VISITORS)</strong>
                  <span>Courier drop-off for test coupons, commercial meetings, and client inspection engineers. Security verification requires photo ID.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-mono-spec text-slate-500">Loading estimating desk...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
