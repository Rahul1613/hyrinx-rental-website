"use client";

import { useEffect, useState } from "react";
import { MessageSquareHeart, Send, HeartHandshake } from "lucide-react";
import { fetchGuestbook, submitGuestbook, GuestbookEntry } from "@/lib/birthdayApi";
import { fireSignatureConfetti } from "./SignatureConfetti";

interface GuestbookWallProps {
  name: string;
  accentColor?: string;
}

const EMOJI_OPTIONS = ["🎉", "🥂", "✨", "🎂", "🎸", "☕", "💛", "🚀"];

export default function GuestbookWall({ name, accentColor = "#F6D062" }: GuestbookWallProps) {
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [relation, setRelation] = useState("Friend");
  const [messageText, setMessageText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");
  const [toast, setToast] = useState<string | null>(null);

  const loadMessages = async () => {
    try {
      const data = await fetchGuestbook();
      setMessages(data);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !messageText.trim()) return;

    setSubmitting(true);

    const newEntry: Omit<GuestbookEntry, "id" | "created_at"> = {
      name: guestName.trim(),
      relation: relation.trim(),
      message: messageText.trim(),
      emoji: selectedEmoji,
    };

    try {
      const res = await submitGuestbook(newEntry);
      if (res.success) {
        // Optimistic UI update
        const created: GuestbookEntry = res.data || {
          ...newEntry,
          id: Date.now(),
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [created, ...prev]);
        setGuestName("");
        setMessageText("");
        setToast("Your note has been posted to the wall!");
        fireSignatureConfetti(accentColor);
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Could not post note right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook-section" className="py-16 md:py-24 border-b border-white/10 bg-[#060910]">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
            <MessageSquareHeart className="h-3.5 w-3.5 text-amber-400" />
            <span>Community Wall</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Wishes & Keepsakes for {name.split(" ")[0]}
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Leave an unscripted note, a favorite memory, or a private blessing for their next chapter.
          </p>
        </div>

        {/* Grid: Form on Left, Live Wall on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sign Form */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0C1220] p-6 sm:p-7 sticky top-24">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              Pin Your Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Saved permanently to the birthday archive.
            </p>

            {toast && (
              <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                {toast}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diya"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  How do you know {name.split(" ")[0]}?
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Best Friend">Best Friend</option>
                  <option value="College Gang">College Gang</option>
                  <option value="School Buddy">School Buddy</option>
                  <option value="Family & Cousin">Family & Cousin</option>
                  <option value="Colleague / Mentor">Colleague / Mentor</option>
                  <option value="Partner / Loved One">Partner / Loved One</option>
                  <option value="Well-wisher">Well-wisher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Stamp Emoji
                </label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`h-9 w-9 rounded-lg border text-lg flex items-center justify-center transition-all ${
                        selectedEmoji === emoji
                          ? "border-amber-400 bg-amber-400/20 scale-105"
                          : "border-white/10 bg-[#070A11] hover:border-white/20"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Your Note *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={`Write something genuine for ${name.split(" ")[0]}...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-[#090D16] py-3 text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {submitting ? (
                  <span>Posting...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Post Note to Wall</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Wall Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono text-slate-400">
                {messages.length} Notes on the Wall
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Feed
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs font-mono text-slate-500">
                Fetching guestbook messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#0C1220] p-8 text-center">
                <HeartHandshake className="mx-auto h-8 w-8 text-slate-500 mb-2" />
                <p className="text-sm font-medium text-slate-300">
                  Be the first to sign the guestbook!
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Share a note on the left and see it appear here immediately.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {messages.map((entry) => (
                  <div
                    key={entry.id || Math.random()}
                    className="rounded-xl border border-white/10 bg-[#0A0E1A] p-5 flex flex-col justify-between transition-colors hover:border-white/20"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-2xl">{entry.emoji}</span>
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-mono text-slate-300 border border-white/5">
                          {entry.relation}
                        </span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed italic">
                        "{entry.message}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-white">{entry.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {entry.created_at ? new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Today"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
