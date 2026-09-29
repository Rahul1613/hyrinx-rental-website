'use client';

import React from 'react';
import { useTrip } from '@/lib/tripStore';
import { Utensils, Check, Plus, Sparkles } from 'lucide-react';

export default function FoodSection() {
  const { currentTrip, toggleFood } = useTrip();

  return (
    <section id="food-section" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
              <Utensils className="w-3.5 h-3.5" />
              <span>Gastronomy & Local Rituals</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
              What's Worth Tasting
            </h2>
            <p className="mt-3 text-white/65 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Travel is understood through flavor. From sizzling street-side takoyaki under Dotonbori neon to meditative matcha ceremonies and aged bluefin omakase.
            </p>
          </div>

          <div className="text-right text-xs text-white/60">
            <span>Saved Dishes: </span>
            <strong className="text-amber-300 font-semibold">
              {currentTrip.foods.filter((f) => f.selected).length} of {currentTrip.foods.length}
            </strong>
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTrip.foods.map((food) => (
            <div
              key={food.id}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 group flex flex-col justify-between ${
                food.selected
                  ? 'bg-[#0e1422] border-amber-400/40 shadow-xl'
                  : 'bg-[#090c14] border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Food Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1422] via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-amber-300 font-medium">
                  {food.origin}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">{food.name}</h3>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed font-light">{food.description}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">~${food.priceEstimate}</span>
                  <button
                    onClick={() => toggleFood(food.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                      food.selected
                        ? 'bg-amber-400 text-black hover:bg-amber-300 font-semibold'
                        : 'bg-white/10 hover:bg-white text-white hover:text-black border border-white/20'
                    }`}
                  >
                    {food.selected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    <span>{food.selected ? 'Saved' : 'Add'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
