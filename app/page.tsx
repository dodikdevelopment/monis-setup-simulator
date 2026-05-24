'use client';

import React, { useState } from 'react';
import Navbar from '../components/workspace/Navbar';
import WorkspaceStage from '../components/workspace/WorkspaceStage';
import SidebarTabs from '../components/sidebar/SidebarTabs';
import ThemePresetSelector from '../components/sidebar/ThemePresetSelector';
import DeskSelector from '../components/sidebar/DeskSelector';
import ChairSelector from '../components/sidebar/ChairSelector';
import AccessoryCard from '../components/sidebar/AccessoryCard';
import SummaryPanel from '../components/summary/SummaryPanel';
import { useWorkspaceStore } from '../store/workspaceStore';
import { Sparkles, ArrowRight, Eye, ShieldCheck, Heart, Moon, Sun, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('themes');
  const { isRoomLightsOn, selectedThemeId } = useWorkspaceStore();

  // Dynamic aesthetic class for the outer background based on room lights state.
  // Appends "dark" class when lights are off so dark mode is active for all nested items.
  const bgThemeClass = isRoomLightsOn
    ? 'bg-zinc-50 text-zinc-900'
    : 'dark bg-zinc-950 text-zinc-100';

  const renderActiveSelector = () => {
    switch (activeTab) {
      case 'themes':
        return <ThemePresetSelector />;
      case 'desks':
        return <DeskSelector />;
      case 'chairs':
        return <ChairSelector />;
      case 'accessories':
        return <AccessoryCard />;
      default:
        return <ThemePresetSelector />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-1000 ${bgThemeClass}`}>
      {/* Premium Header */}
      <Navbar />

      {/* Main Experience Layout */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 sm:py-8 flex flex-col gap-6">

        {/* Intoduction/Hero Section for Setup Builder */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/40 rounded-3xl p-6 backdrop-blur-md transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
                Monis Setup Simulator
                <span className="text-[10px] font-bold tracking-wider uppercase bg-orange-500 text-white px-2 py-0.5 rounded-md">
                  V1.2
                </span>
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Design your dream workspace with premium ergonomic furniture and unique accessories. Drag and drop items directly onto the canvas, adjust desk height, and rent the entire package instantly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400 border-l border-zinc-200 dark:border-zinc-800 pl-6 shrink-0">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-zinc-900 dark:text-white">
                <ShieldCheck className="h-4 w-4 text-green-500" /> Full Maintenance
              </span>
              <span className="flex items-center gap-1.5 text-zinc-900 dark:text-white">
                <Truck className="h-4 w-4 text-green-500" /> Free Setup & Delivery
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Grid Configuration Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Column 1: Product & Config Selectors (Left Sidebar) */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4 lg:sticky lg:top-20 z-40">
            <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="bg-white/70 dark:bg-zinc-950/70 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-5 backdrop-blur-md shadow-xl transition-all duration-300 min-h-[380px] max-h-[580px] overflow-y-auto pr-1.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderActiveSelector()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Column 2: Interactive Stage Canvas (Center Stage) */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col gap-4">
            <WorkspaceStage />

            {/* Quick Canvas Controls Info */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white/40 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/40 rounded-2xl backdrop-blur-md text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold transition-all">
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-zinc-400" />
                Drag & Drop accessories anywhere to reposition
              </span>
              <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">
                Real-time Rendering <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Column 3: Live Pricing & Duration (Right Sidebar) */}
          <div className="lg:col-span-3 xl:col-span-3 lg:sticky lg:top-20">
            <SummaryPanel />
          </div>

        </div>

      </main>

      {/* Cozy Footer Info */}
      <footer className="w-full border-t border-zinc-200/40 dark:border-zinc-900/40 py-6 mt-12 bg-white/30 dark:bg-zinc-950/20 backdrop-blur-xs">
        <div className="max-w-[1600px] mx-auto px-4 2xl:px-12 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© 2026 Monis Workspace Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 justify-center sm:justify-end">
            Crafted with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" /> in Bali & Jakarta.
          </p>
        </div>
      </footer>
    </div>
  );
}
