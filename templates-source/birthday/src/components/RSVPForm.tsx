"use client";

import { useState } from "react";
import { CheckCircle2, Send, Users, Music2, Utensils } from "lucide-react";
import { submitRSVP, RSVPRecord } from "@/lib/api";

interface RSVPFormProps {
  name: string;
}

export default function RSVPForm({ name }: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPRecord>({
    name: "",
    email: "",
    attending: "yes",
    plus_ones: 0,
    dietary: "",
    song_request: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Please share your name so we can add you to the door list.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await submitRSVP(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || "Failed to submit RSVP. Please try again.");
      }
    } catch {
      setErrorMessage("Network issue. Please try submitting once more.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp-section" className="py-16 md:py-24 border-b border-white/10">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-mono text-amber-300">
            Headcount & Guest Registry
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Let Us Know If You're Coming
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
            Catering and seating are tailored to the exact count. Please confirm by October 10.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0C1220] p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {formData.attending === "yes" ? "You're on the list!" : "Note received with love!"}
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
                {formData.attending === "yes"
                  ? `Thank you, ${formData.name}. We have saved a spot for you${
                      formData.plus_ones > 0 ? ` plus ${formData.plus_ones}` : ""
                    }. Get ready for good food and celebrations.`
                  : `We'll miss you deeply at the party, ${formData.name}. We'll save a slice of cake in spirit!`}
              </p>

              {formData.song_request && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-amber-300 border border-white/5">
                  <Music2 className="h-3.5 w-3.5" />
                  <span>DJ Queue: "{formData.song_request}"</span>
                </div>
              )}

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      attending: "yes",
                      plus_ones: 0,
                      dietary: "",
                      song_request: "",
                    });
                  }}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
                >
                  Submit another response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {errorMessage}
                </div>
              )}

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Will you be celebrating in person with {name.split(" ")[0]}?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "yes" })}
                    className={`rounded-xl border p-3.5 text-left text-sm font-medium transition-all ${
                      formData.attending === "yes"
                        ? "border-amber-400 bg-amber-400/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="font-semibold text-white">Yes, I'll be there</div>
                    <div className="text-xs text-slate-400 mt-0.5">Ready to raise a toast</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "no" })}
                    className={`rounded-xl border p-3.5 text-left text-sm font-medium transition-all ${
                      formData.attending === "no"
                        ? "border-rose-400 bg-rose-400/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="font-semibold text-white">Sadly missing out</div>
                    <div className="text-xs text-slate-400 mt-0.5">Sending love from afar</div>
                  </button>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guest-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    placeholder="e.g. Samarth Mehta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#070A11] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="guest-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    id="guest-email"
                    type="email"
                    placeholder="For photo album link after party"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#070A11] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Plus Ones (Only if attending) */}
              {formData.attending === "yes" && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="plus-ones" className="flex items-center gap-1.5 text-xs font-mono text-slate-300 mb-1.5">
                        <Users className="h-3.5 w-3.5 text-amber-400" />
                        <span>Bringing a Plus-One?</span>
                      </label>
                      <select
                        id="plus-ones"
                        value={formData.plus_ones}
                        onChange={(e) =>
                          setFormData({ ...formData, plus_ones: Number(e.target.value) })
                        }
                        className="w-full rounded-xl border border-white/10 bg-[#070A11] px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value={0}>Just me</option>
                        <option value={1}>+1 (Partner / Friend)</option>
                        <option value={2}>+2 (Family / Kids)</option>
                        <option value={3}>+3 (Group)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="dietary" className="flex items-center gap-1.5 text-xs font-mono text-slate-300 mb-1.5">
                        <Utensils className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Dietary Preferences</span>
                      </label>
                      <input
                        id="dietary"
                        type="text"
                        placeholder="e.g. Vegetarian, Jain, Nut allergy"
                        value={formData.dietary}
                        onChange={(e) =>
                          setFormData({ ...formData, dietary: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-[#070A11] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="song-request" className="flex items-center gap-1.5 text-xs font-mono text-slate-300 mb-1.5">
                      <Music2 className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Must-Play Song Request</span>
                    </label>
                    <input
                      id="song-request"
                      type="text"
                      placeholder="Track title & artist that will get you dancing"
                      value={formData.song_request}
                      onChange={(e) =>
                        setFormData({ ...formData, song_request: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#070A11] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-[#090D16] py-3.5 text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {loading ? (
                  <span>Recording your response...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Confirm RSVP</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
