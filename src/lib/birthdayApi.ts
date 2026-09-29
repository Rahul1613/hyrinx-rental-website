// ==========================================
// CLIENT DATA SERVICE (BACKEND COMMENTED OUT)
// Pure frontend storage & state
// ==========================================

export interface RSVPRecord {
  id?: number;
  name: string;
  email?: string;
  attending: "yes" | "no";
  plus_ones: number;
  dietary?: string;
  song_request?: string;
  created_at?: string;
}

export interface GuestbookEntry {
  id?: number;
  name: string;
  relation: string;
  message: string;
  emoji: string;
  created_at?: string;
}

// In-memory frontend storage
const FRONTEND_WISHES: GuestbookEntry[] = [
  {
    id: 1,
    name: "Kavya & Rohan",
    relation: "College Gang",
    message: "Happy Birthday legend! Save us front-row seats for the cake cutting. Love you!",
    emoji: "🥂",
    created_at: "Just now",
  },
  {
    id: 2,
    name: "Uncle Suresh",
    relation: "Family",
    message: "Wishing you another year filled with good health, laughter, and endless curious energy. Keep shining!",
    emoji: "✨",
    created_at: "Today",
  },
  {
    id: 3,
    name: "Tara & The Crew",
    relation: "Best Friends",
    message: "To the person who brings unmatched energy to every room. Let the party begin!",
    emoji: "🎉",
    created_at: "Today",
  },
];

export async function submitRSVP(data: RSVPRecord): Promise<{ success: boolean; message?: string; error?: string }> {
  // const res = await fetch("/api/rsvp", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // return res.json();
  return { success: true, message: "RSVP recorded on frontend!" };
}

export async function fetchGuestbook(): Promise<GuestbookEntry[]> {
  // const res = await fetch("/api/guestbook");
  // const data = await res.json();
  // if (data.success && Array.isArray(data.messages)) {
  //   return data.messages;
  // }
  return FRONTEND_WISHES;
}

export async function submitGuestbook(
  entry: Omit<GuestbookEntry, "id" | "created_at">
): Promise<{ success: boolean; data?: GuestbookEntry; error?: string }> {
  // const res = await fetch("/api/guestbook", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(entry),
  // });
  // return res.json();
  const newEntry: GuestbookEntry = {
    ...entry,
    id: Date.now(),
    created_at: "Just now",
  };
  FRONTEND_WISHES.unshift(newEntry);
  return { success: true, data: newEntry };
}
