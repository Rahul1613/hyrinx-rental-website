// ==========================================
// BACKEND DATABASE (COMMENTED OUT)
// Pure frontend mode is active
// ==========================================

// import Database from "better-sqlite3";
// import path from "path";
// import fs from "fs";

// // Store database in project root under data/
// const dataDir = path.join(process.cwd(), "data");
// if (!fs.existsSync(dataDir)) {
//   fs.mkdirSync(dataDir, { recursive: true });
// }

// const dbPath = path.join(dataDir, "birthday.db");
// const db = new Database(dbPath);

// // Initialize tables: birthday_rsvps and guestbook_messages
// db.exec(`
//   CREATE TABLE IF NOT EXISTS birthday_rsvps (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     email TEXT,
//     attending TEXT NOT NULL,
//     plus_ones INTEGER DEFAULT 0,
//     dietary TEXT,
//     song_request TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS guestbook_messages (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     relation TEXT,
//     message TEXT NOT NULL,
//     emoji TEXT DEFAULT '🎉',
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );
// `);

// // Insert initial seed messages if empty so the live wall is immediately warm and inviting
// const countStmt = db.prepare("SELECT COUNT(*) as count FROM guestbook_messages");
// const count = (countStmt.get() as { count: number }).count;

// if (count === 0) {
//   const insertStmt = db.prepare(`
//     INSERT INTO guestbook_messages (name, relation, message, emoji, created_at)
//     VALUES (?, ?, ?, ?, ?)
//   `);

//   insertStmt.run("Kavya & Rohan", "College Gang", "Happy Birthday! Still can't believe another year has passed. Save us front-row seats for the cake cutting!", "🥂", "2026-09-26 18:30:00");
//   insertStmt.run("Uncle Suresh", "Family", "Wishing you another year filled with good health, laughter, and endless curious energy. Keep shining!", "✨", "2026-09-26 19:45:00");
//   insertStmt.run("Tara M.", "Work Bestie", "To the person who makes Mondays bearable and coffee runs mandatory. Have the happiest birthday!", "☕", "2026-09-27 08:15:00");
// }

// export default db;
export default null;
