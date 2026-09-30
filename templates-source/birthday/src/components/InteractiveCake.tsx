"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { celebrationAudio } from "@/lib/celebrationAudio";
import { Sparkles, Flame, RotateCcw, Heart, Gift } from "lucide-react";

interface InteractiveCakeProps {
  name: string;
  age: number;
}

export default function InteractiveCake({ name, age }: InteractiveCakeProps) {
  // 5 candles on the cake, all lit initially
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [wishMade, setWishMade] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);

  const litCount = candles.filter(Boolean).length;
  const allBlown = litCount === 0;

  const blowCandle = (index: number) => {
    if (!candles[index]) return;
    celebrationAudio.playCandleBlow();

    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // If this was the last candle
    if (newCandles.every((c) => !c)) {
      triggerCelebration();
    }
  };

  const blowAllCandles = () => {
    celebrationAudio.playCandleBlow();
    setCandles([false, false, false, false, false]);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    setWishMade(true);
    setTimeout(() => {
      celebrationAudio.playFanfare();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#F59E0B", "#EC4899", "#8B5CF6", "#10B981", "#3B82F6"],
      });
      setShowWishModal(true);
    }, 400);
  };

  const relightCandles = () => {
    celebrationAudio.playMagicChime();
    setCandles([true, true, true, true, true]);
    setWishMade(false);
  };

  return (
    <section id="cake-ceremony" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 mb-4 backdrop-blur-md">
          <Sparkles className="h-4 w-4 animate-spin" />
          <span>Interactive Cake Cutting & Candle Ceremony</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Blow The Candles & Make A Wish! 🎂
        </h2>
        <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
          {allBlown
            ? `All candles blown for ${name}! Your secret birthday wish has been cast to the universe! ✨`
            : `Click individual candles or hit the button below to blow them all out and reveal your birthday blessing.`}
        </p>

        {/* 3D-styled Cake Stage Container */}
        <div className="relative mt-12 mb-8 mx-auto flex flex-col items-center justify-center">
          {/* Subtle Ambient Glow underneath */}
          <div className="absolute -inset-10 bg-gradient-to-t from-pink-500/20 via-amber-500/20 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* Candle Rack on Top of the Cake */}
          <div className="relative z-10 flex items-end justify-center gap-6 sm:gap-9 pb-2">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => blowCandle(idx)}
                className="group relative cursor-pointer flex flex-col items-center transition-transform hover:scale-110"
                title={isLit ? "Click to blow this candle!" : "Blown out candle"}
              >
                {/* Flame or Smoke */}
                {isLit ? (
                  <div className="relative mb-1 flex flex-col items-center">
                    <div className="animate-flame h-8 w-4 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_15px_#f59e0b]" />
                    <div className="absolute top-1 h-3 w-1.5 rounded-full bg-white/80 blur-[1px]" />
                  </div>
                ) : (
                  <div className="mb-1 h-8 flex items-center justify-center">
                    {/* Smoke curls */}
                    <span className="text-xs text-slate-400 font-mono animate-pulse">💨</span>
                  </div>
                )}

                {/* Candle Wick */}
                <div className="h-2 w-0.5 bg-neutral-800" />

                {/* Candle Body */}
                <div
                  className={`h-14 sm:h-16 w-3 sm:w-3.5 rounded-t-sm bg-gradient-to-b ${
                    idx % 2 === 0 ? "from-pink-300 to-rose-400" : "from-amber-200 to-yellow-400"
                  } shadow-md border-t border-white/50 relative overflow-hidden`}
                >
                  {/* Decorative stripes */}
                  <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#fff_3px,#fff_6px)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Top Layer of Cake */}
          <div className="relative z-10 w-64 sm:w-80 h-16 sm:h-20 rounded-t-3xl bg-gradient-to-b from-rose-400 via-pink-500 to-rose-600 shadow-xl border-t-2 border-pink-200 flex flex-col items-center justify-start overflow-hidden">
            {/* Frosting drippings */}
            <div className="w-full flex justify-between px-2 pt-0.5">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 sm:w-6 h-4 sm:h-5 rounded-b-full bg-amber-100 shadow-sm"
                />
              ))}
            </div>
            {/* Cake details */}
            <div className="mt-1 sm:mt-2 text-white/90 font-display font-bold text-xs sm:text-sm tracking-widest uppercase">
              ★ {name} ★
            </div>
          </div>

          {/* Middle Layer of Cake */}
          <div className="relative z-0 w-80 sm:w-96 h-20 sm:h-24 -mt-2 rounded-t-3xl bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 shadow-2xl border-t-2 border-amber-100 flex flex-col items-center overflow-hidden">
            {/* Cream swirls */}
            <div className="w-full flex justify-around px-3 pt-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-rose-400 shadow-inner" />
              ))}
            </div>
            <div className="mt-2 text-amber-950 font-display font-extrabold text-base sm:text-lg">
              Level {age} Unlocked 🎈
            </div>
          </div>

          {/* Bottom Cake Stand / Plate */}
          <div className="relative z-0 w-96 sm:w-[28rem] h-6 sm:h-7 -mt-1 rounded-full bg-gradient-to-r from-slate-300 via-white to-slate-400 shadow-2xl border border-white/60 flex items-center justify-center">
            <div className="w-3/4 h-1 bg-amber-300/40 rounded-full" />
          </div>
          <div className="w-48 sm:w-56 h-8 bg-gradient-to-b from-slate-400 to-slate-600 rounded-b-xl shadow-lg border-t border-slate-300" />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          {!allBlown ? (
            <button
              onClick={blowAllCandles}
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-8 py-4 font-display font-bold text-lg text-slate-950 shadow-xl shadow-orange-500/25 hover:scale-105 active:scale-95 transition-transform"
            >
              <Flame className="h-5 w-5 text-amber-950" />
              <span>Blow All Candles ({litCount} Lit)</span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowWishModal(true)}
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 font-display font-bold text-lg text-white shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-transform"
              >
                <Gift className="h-5 w-5" />
                <span>View Birthday Wish Card</span>
              </button>
              <button
                onClick={relightCandles}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-4 font-display font-semibold text-base text-slate-200 transition-all hover:scale-105"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Light Candles Again</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Make a Wish Birthday Blessing Modal */}
      {showWishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#171226] border border-amber-400/40 p-8 shadow-2xl text-center">
            {/* Top decorative seal */}
            <div className="mx-auto -mt-14 mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-1 shadow-2xl shadow-amber-500/50">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                <Sparkles className="h-9 w-9 text-amber-400 animate-spin" />
              </div>
            </div>

            <h3 className="font-display text-3xl font-black text-amber-300">
              A Special Birthday Wish For {name}!
            </h3>

            <p className="mt-4 font-handwriting text-2xl text-slate-100 leading-relaxed">
              &ldquo;May every candle you blow out today illuminate a new dream, bring unbreakable health, endless joy, and friends who always stand by you. Happy {age}th Birthday! You are truly one of a kind.&rdquo;
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-rose-400">
              <Heart className="h-5 w-5 fill-rose-500" />
              <span className="font-display font-bold text-sm tracking-wide">
                SENT WITH INFINITE LOVE & CHEERS
              </span>
              <Heart className="h-5 w-5 fill-rose-500" />
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => {
                  celebrationAudio.playFanfare();
                  confetti({ particleCount: 80, spread: 70 });
                }}
                className="rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-2.5 text-sm transition-all"
              >
                🎉 More Confetti!
              </button>
              <button
                onClick={() => setShowWishModal(false)}
                className="rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 text-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
