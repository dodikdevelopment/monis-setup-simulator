'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Monitor, Armchair, ToggleLeft } from 'lucide-react';

interface SidebarTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SidebarTabs({ activeTab, setActiveTab }: SidebarTabsProps) {
  const tabs = [
    { id: 'themes', label: 'Themes', icon: Layout },
    { id: 'desks', label: 'Desks', icon: Monitor },
    { id: 'chairs', label: 'Chairs', icon: Armchair },
    { id: 'accessories', label: 'Accessories', icon: ToggleLeft },
  ];

  return (
    <div className="flex w-full bg-zinc-100/80 dark:bg-zinc-900/60 p-1.5 rounded-2xl border border-white/5 shadow-inner gap-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col sm:flex-row flex-1 items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              isActive
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-white/10"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <Icon className="h-4 w-4 relative z-10" />
            <span className="relative z-10 text-[10px] sm:text-xs">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
