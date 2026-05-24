'use client';

import React from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { THEMES } from '../../data/workspaceData';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemePresetSelector() {
  const { selectedThemeId, setTheme } = useWorkspaceStore();

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Choose Workspace Theme
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Apply a curated style preset to instantly configure your room.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {THEMES.map((theme, index) => {
          const isActive = selectedThemeId === theme.id;
          
          return (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`group flex items-start text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/40 shadow-md shadow-orange-500/5'
                  : 'bg-white/50 hover:bg-zinc-50 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {/* Highlight Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col flex-1 gap-1.5 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                    {theme.name}
                  </span>
                  {isActive && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm shadow-orange-500/20">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>
                
                <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {theme.description}
                </p>

                {/* Micro Accents (Accent Color Tag) */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    VIBE:
                  </span>
                  <div className={`h-2.5 w-2.5 rounded-full border border-white/20`} 
                       style={{
                         backgroundColor: 
                           theme.id === 'theme-minimalist' ? '#a1a1aa' :
                           theme.id === 'theme-gamer' ? '#a855f7' :
                           theme.id === 'theme-bali' ? '#d97706' :
                           theme.id === 'theme-startup' ? '#3b82f6' : '#d97706'
                       }} 
                  />
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                    {theme.id === 'theme-minimalist' ? 'Nordic Clean' :
                     theme.id === 'theme-gamer' ? 'RGB Neon' :
                     theme.id === 'theme-bali' ? 'Bali Sunset' :
                     theme.id === 'theme-startup' ? 'Startup Hub' : 'Creator Dark'}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
