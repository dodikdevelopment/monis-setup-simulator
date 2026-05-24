'use client';

import React from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { CHAIRS } from '../../data/workspaceData';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChairSelector() {
  const { selectedChairId, selectedChairColor, setChair, setChairColor } = useWorkspaceStore();

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Select Seating Comfort
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Support your spine during long creative sessions. Choose from ergonomic or cozy boho setups.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {CHAIRS.map((chair, idx) => {
          const isSelected = selectedChairId === chair.id;

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={chair.id}
              className={`flex flex-col p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/40 shadow-md shadow-orange-500/5'
                  : 'bg-white/50 hover:bg-zinc-50 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {/* Select Action Wrapper */}
              <div
                onClick={() => setChair(chair.id)}
                className="flex items-start justify-between cursor-pointer flex-1 gap-2"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                    {chair.name}
                  </span>
                  <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {chair.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-xs font-black text-orange-600 dark:text-orange-400 whitespace-nowrap">
                    ${chair.monthlyPrice}/mo
                  </span>
                  {isSelected ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm shadow-orange-500/20">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-zinc-400 hover:text-zinc-600 uppercase tracking-wider">
                      Select
                    </span>
                  )}
                </div>
              </div>

              {/* Color Swatch Options (Rendered only when active) */}
              {isSelected && (
                <div className="mt-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-2 animate-fadeIn">
                  <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Frame & Fabric Color
                  </span>
                  <div className="flex items-center gap-2">
                    {chair.colorOptions.map((opt) => {
                      const isActiveColor = selectedChairColor === opt.name;
                      return (
                        <button
                          key={opt.name}
                          onClick={() => setChairColor(opt.name)}
                          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                            isActiveColor
                              ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white shadow-sm'
                              : 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <span
                            className={`h-3 w-3 rounded-full border border-white/20 ${opt.colorClass}`}
                          />
                          {opt.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
