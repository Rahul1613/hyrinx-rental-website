'use client';

import React, { useState } from 'react';
import { useTrip } from '../lib/tripStore';
import { CheckSquare, Square, Plus, Trash2, StickyNote, Luggage, Sparkles } from 'lucide-react';

export default function PackingAndNotesSection() {
  const { currentTrip, togglePackingItem, addNote, deleteNote } = useTrip();
  const [newNoteText, setNewNoteText] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addNote(newNoteText);
    setNewNoteText('');
  };

  const packedCount = currentTrip.packingList.filter((p) => p.packed).length;
  const packedPct = Math.round((packedCount / (currentTrip.packingList.length || 1)) * 100);

  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Packing Checklist */}
          <div className="lg:col-span-6 bg-[#0d121c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <Luggage className="w-4 h-4 text-amber-300" />
                <h3 className="font-serif text-2xl font-bold text-white">Packing Essentials</h3>
              </div>
              <span className="text-xs text-amber-300 font-medium">
                {packedCount} of {currentTrip.packingList.length} Packed ({packedPct}%)
              </span>
            </div>

            {/* Packing Progress */}
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-6">
              <div
                style={{ width: `${packedPct}%` }}
                className="h-full bg-amber-400 transition-all duration-300 rounded-full"
              />
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              {currentTrip.packingList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => togglePackingItem(item.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-sm ${
                    item.packed
                      ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200 line-through opacity-70'
                      : 'bg-[#121824] border-white/5 text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.packed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-white/40 shrink-0" />
                    )}
                    <span className="font-light">{item.item}</span>
                  </div>

                  <span className="text-[10px] uppercase text-white/40 px-2 py-0.5 rounded bg-black/40">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Personal Trip Notes */}
          <div className="lg:col-span-6 bg-[#0d121c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <StickyNote className="w-4 h-4 text-amber-300" />
                <h3 className="font-serif text-2xl font-bold text-white">Field Notes & Reminders</h3>
              </div>
              <span className="text-xs text-white/50">{currentTrip.notes.length} Notes</span>
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="e.g. Reserve counter seats for sushi dinner..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="flex-1 bg-[#121824] border border-white/10 rounded-2xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:border-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-amber-400 text-black font-semibold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Note</span>
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {currentTrip.notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl bg-[#121824] border border-white/5 flex items-start justify-between gap-3 text-sm"
                >
                  <div>
                    <p className="text-white/90 leading-relaxed font-light">{note.text}</p>
                    <span className="text-[11px] text-amber-300/80 mt-1 block">{note.date}</span>
                  </div>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
