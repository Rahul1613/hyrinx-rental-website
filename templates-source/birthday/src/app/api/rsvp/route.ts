// ==========================================
// BACKEND RSVP API ROUTE (COMMENTED OUT)
// App runs 100% on the frontend
// ==========================================

import { NextResponse } from "next/server";
// import db from "@/lib/db";

export async function GET() {
  // try {
  //   const stmts = db.prepare("SELECT * FROM birthday_rsvps ORDER BY created_at DESC");
  //   const rsvps = stmts.all();
  //   return NextResponse.json({ success: true, rsvps });
  // } catch (error: unknown) {
  //   const message = error instanceof Error ? error.message : "Failed to fetch RSVPs";
  //   return NextResponse.json({ success: false, error: message }, { status: 500 });
  // }
  return NextResponse.json({ success: true, rsvps: [] });
}

export async function POST(request: Request) {
  // try {
  //   const body = await request.json();
  //   const { name, email, attending, plus_ones, dietary, song_request } = body;
  //   if (!name || !attending) {
  //     return NextResponse.json(
  //       { success: false, error: "Name and attendance status are required." },
  //       { status: 400 }
  //     );
  //   }
  //   const stmt = db.prepare(`
  //     INSERT INTO birthday_rsvps (name, email, attending, plus_ones, dietary, song_request)
  //     VALUES (?, ?, ?, ?, ?, ?)
  //   `);
  //   const result = stmt.run(
  //     name.trim(),
  //     email ? email.trim() : null,
  //     attending,
  //     Number(plus_ones) || 0,
  //     dietary ? dietary.trim() : null,
  //     song_request ? song_request.trim() : null
  //   );
  //   return NextResponse.json({
  //     success: true,
  //     message: "RSVP recorded successfully!",
  //     id: result.lastInsertRowid,
  //   });
  // } catch (error: unknown) {
  //   const message = error instanceof Error ? error.message : "Failed to submit RSVP";
  //   return NextResponse.json({ success: false, error: message }, { status: 500 });
  // }
  return NextResponse.json({ success: true, message: "Frontend mode active" });
}
