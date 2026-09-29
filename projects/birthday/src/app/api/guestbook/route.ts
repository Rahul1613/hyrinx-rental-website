// ==========================================
// BACKEND GUESTBOOK API ROUTE (COMMENTED OUT)
// App runs 100% on the frontend
// ==========================================

import { NextResponse } from "next/server";
// import db from "@/lib/db";

export async function GET() {
  // try {
  //   const stmt = db.prepare("SELECT * FROM guestbook_messages ORDER BY created_at DESC");
  //   const messages = stmt.all();
  //   return NextResponse.json({ success: true, messages });
  // } catch (error: unknown) {
  //   const message = error instanceof Error ? error.message : "Failed to fetch guestbook messages";
  //   return NextResponse.json({ success: false, error: message }, { status: 500 });
  // }
  return NextResponse.json({ success: true, messages: [] });
}

export async function POST(request: Request) {
  // try {
  //   const body = await request.json();
  //   const { name, relation, message, emoji } = body;
  //   if (!name || !message) {
  //     return NextResponse.json(
  //       { success: false, error: "Name and message are required." },
  //       { status: 400 }
  //     );
  //   }
  //   const stmt = db.prepare(`
  //     INSERT INTO guestbook_messages (name, relation, message, emoji)
  //     VALUES (?, ?, ?, ?)
  //   `);
  //   const result = stmt.run(
  //     name.trim(),
  //     relation ? relation.trim() : "Friend",
  //     message.trim(),
  //     emoji || "🎉"
  //   );
  //   const inserted = db.prepare("SELECT * FROM guestbook_messages WHERE id = ?").get(result.lastInsertRowid);
  //   return NextResponse.json({
  //     success: true,
  //     message: "Guestbook note posted!",
  //     data: inserted,
  //   });
  // } catch (error: unknown) {
  //   const message = error instanceof Error ? error.message : "Failed to post message";
  //   return NextResponse.json({ success: false, error: message }, { status: 500 });
  // }
  return NextResponse.json({ success: true, message: "Frontend mode active" });
}
