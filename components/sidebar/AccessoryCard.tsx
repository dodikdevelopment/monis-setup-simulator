'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { ACCESSORIES } from '../../data/workspaceData';
import { Plus, Minus, Check, Tv, Keyboard, Mouse, Laptop, Coffee, Leaf, Lightbulb, Grid, Sparkles, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Icon helper function
const getAccessoryIcon = (id: string) => {
  switch (id) {
    case 'acc-curved-monitor':
      return Tv;
    case 'acc-dual-monitor':
      return Tv;
    case 'acc-lamp':
      return Lightbulb;
    case 'acc-plant':
      return Leaf;
    case 'acc-keyboard':
      return Keyboard;
    case 'acc-mouse':
      return Mouse;
    case 'acc-laptop-stand':
      return Laptop;
    case 'acc-coffee':
      return Coffee;
    case 'acc-beanbag':
      return Smile; // Represents cozy comfort
    case 'acc-whiteboard':
      return Grid;
    default:
      return Sparkles;
  }
};

export default function AccessoryCard() {
  const { accessories, addAccessory, removeAccessory, updateQuantity } = useWorkspaceStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'decor' | 'comfort' | 'utility'>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'tech', label: 'Tech' },
    { id: 'decor', label: 'Decor' },
    { id: 'comfort', label: 'Comfort' },
    { id: 'utility', label: 'Utility' }
  ] as const;

  const filteredAccessories = ACCESSORIES.filter(
    (acc) => activeCategory === 'all' || acc.category === activeCategory
  );

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Category Header */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Add Accessories & Gadgets
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Supercharge your environment. Click to add and drag elements directly on the screen to relocate.
        </p>
      </div>

      {/* Mini filters */}
      <div className="flex flex-wrap gap-1 bg-zinc-100/50 dark:bg-zinc-900/40 p-1 rounded-xl border border-zinc-200/40 dark:border-zinc-800/40 w-fit">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white shadow-xs border border-white/10'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accessories list */}
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filteredAccessories.map((acc, index) => {
            const selectedItem = accessories[acc.id];
            const isAdded = !!selectedItem;
            const Icon = getAccessoryIcon(acc.id);

            // Translate slot names to human readable labels
            const getFriendlySlotName = (slot: string) => {
              switch (slot) {
                case 'monitor_slot': return 'Center Desk';
                case 'keyboard_slot': return 'In Front';
                case 'left_desk_slot': return 'Left Desk';
                case 'right_desk_slot': return 'Right Desk';
                case 'wall_slot': return 'Wall';
                case 'floor_left_slot': return 'Floor Left';
                case 'floor_right_slot': return 'Floor Right';
                default: return slot;
              }
            };

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={acc.id}
                className={`flex items-start gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                  isAdded
                    ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/40 shadow-md shadow-orange-500/5'
                    : 'bg-white/50 hover:bg-zinc-50 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {/* Visual Icon Box */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                  isAdded
                    ? 'bg-orange-500 text-white border-orange-400/30 shadow-md shadow-orange-500/20'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Text Description */}
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 leading-tight">
                      {acc.name}
                    </span>
                    <span className="text-xs font-black text-orange-600 dark:text-orange-400 whitespace-nowrap">
                      ${acc.monthlyPrice}/mo
                    </span>
                  </div>
                  
                  <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {acc.description}
                  </p>

                  {/* Layout slot badge indicator */}
                  {isAdded && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                        Position:
                      </span>
                      <span className="text-[9px] font-bold bg-orange-500/15 border border-orange-500/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                        {getFriendlySlotName(selectedItem.slot)}
                      </span>
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-500 italic">
                        (Drag items on stage to move)
                      </span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex flex-col items-end justify-center self-center shrink-0">
                  {isAdded ? (
                    <div className="flex items-center bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden h-9">
                      <button
                        onClick={() => updateQuantity(acc.id, selectedItem.quantity - 1)}
                        className="px-2.5 h-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-black text-zinc-800 dark:text-zinc-200 select-none">
                        {selectedItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(acc.id, selectedItem.quantity + 1)}
                        className="px-2.5 h-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addAccessory(acc.id)}
                      className="flex h-9 items-center justify-center gap-1.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
