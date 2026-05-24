'use client';

import React from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { RefreshCw, Moon, Sun, Share2, Bookmark, Monitor, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { isRoomLightsOn, toggleRoomLights, resetWorkspace } = useWorkspaceStore();

  const handleShare = () => {
    // Premium share simulation
    if (navigator.share) {
      navigator.share({
        title: 'Monis Workspace Builder',
        text: 'Lihat desain setup workspace impian saya di Monis Workspace Builder!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Tautan setup berhasil disalin ke clipboard! Bagikan ke temanmu.');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleSave = () => {
    alert('Setup kamu berhasil disimpan! Akses kembali kapan saja di dashboard Monis.');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-md dark:bg-zinc-950/70 transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Logo and Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20">
            <Monitor className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold tracking-tight text-zinc-900 dark:text-white text-lg">
                Monis
              </span>
              <span className="text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Configurator
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
              Create your dream remote office
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleRoomLights}
            className={`flex h-10 items-center gap-2 px-3.5 rounded-xl border transition-all duration-300 text-xs font-medium cursor-pointer ${
              isRoomLightsOn
                ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20 text-amber-600'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-purple-400'
            }`}
            title={isRoomLightsOn ? 'Switch to Night Mode' : 'Switch to Day Mode'}
          >
            {isRoomLightsOn ? (
              <>
                <Sun className="h-4 w-4 animate-spin-slow text-amber-500" />
                <span className="hidden sm:inline">Day Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-purple-400" />
                <span className="hidden sm:inline">Night Mode</span>
              </>
            )}
          </button>

          {/* Reset Workspace */}
          <button
            onClick={resetWorkspace}
            className="flex h-10 w-10 sm:w-auto items-center justify-center gap-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
            title="Reset Workspace"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Save Setup */}
          <button
            onClick={handleSave}
            className="flex h-10 w-10 sm:w-auto items-center justify-center gap-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
            title="Save Setup"
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Share Setup */}
          <button
            onClick={handleShare}
            className="flex h-10 items-center justify-center gap-2 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
