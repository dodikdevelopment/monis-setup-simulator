'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Accessory } from '../../types';
import { useWorkspaceStore } from '../../store/workspaceStore';

interface AccessoryItemProps {
  accessory: Accessory;
  slot: string;
  x: number; // percentage X
  y: number; // percentage Y
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onDragEnd: (id: string, clientX: number, clientY: number) => void;
  isDraggingActive: boolean;
  onDragStart: () => void;
}

export default function AccessoryItem({
  accessory,
  slot,
  x,
  y,
  canvasRef,
  onDragEnd,
  isDraggingActive,
  onDragStart
}: AccessoryItemProps) {
  const { isRoomLightsOn, selectedThemeId } = useWorkspaceStore();
  const itemRef = useRef<HTMLDivElement>(null);

  // Swaying animation for plants
  const plantSway = {
    animate: {
      rotate: [-1, 1, -1],
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: 'easeInOut' as const,
      },
    },
  };

  // Steam particle animation for coffee machine
  const steamParticles = [
    { delay: 0, x: -3 },
    { delay: 1, x: 2 },
    { delay: 2, x: 0 },
  ];

  // Render high fidelity visuals based on accessory ID
  const renderVisual = () => {
    switch (accessory.id) {
      case 'acc-curved-monitor': {
        const isGamer = selectedThemeId === 'theme-gamer';
        const isBali = selectedThemeId === 'theme-bali';
        const isCreator = selectedThemeId === 'theme-creator';
        
        let screenBg = 'bg-slate-800';
        let wallpaperContent = (
          <div className="flex flex-col items-center justify-center h-full text-[6px] text-zinc-400 font-mono">
            <span className="text-emerald-400 text-[8px]">&lt;Monis /&gt;</span>
            <span>npm run dev</span>
          </div>
        );

        if (isGamer) {
          screenBg = 'bg-gradient-to-tr from-purple-900 to-indigo-900';
          wallpaperContent = (
            <div className="flex flex-col items-center justify-center h-full text-[5px] text-purple-300 font-bold relative overflow-hidden w-full">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-500/20 via-transparent to-transparent animate-pulse" />
              <span className="tracking-widest uppercase text-cyan-400 text-[7px] drop-shadow-[0_0_2px_#06b6d4]">BATTLESTATION</span>
              <span className="text-[4px] font-mono mt-1 opacity-70">FPS: 144 | TEMP: 62°C</span>
            </div>
          );
        } else if (isBali) {
          screenBg = 'bg-gradient-to-tr from-amber-400 to-orange-500';
          wallpaperContent = (
            <div className="flex flex-col items-center justify-center h-full text-[6px] text-white font-sans font-bold">
              <span className="text-[9px] drop-shadow">Bali Sunset</span>
              <span className="text-[4px] font-light opacity-80">Remote Work Heaven</span>
            </div>
          );
        } else if (isCreator) {
          screenBg = 'bg-gradient-to-b from-zinc-800 to-zinc-950';
          wallpaperContent = (
            <div className="flex flex-col items-center justify-center h-full text-[5px] text-zinc-400 font-sans w-full px-2">
              <div className="flex justify-between w-full border-b border-zinc-700/50 pb-0.5 mb-1">
                <span className="font-bold text-amber-500">Timeline.prproj</span>
                <span>00:14:23</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-sm overflow-hidden relative">
                <div className="w-2/3 h-full bg-amber-500 rounded-sm" />
              </div>
            </div>
          );
        }

        return (
          <div className="relative w-44 h-28 flex flex-col items-center select-none pointer-events-none">
            {/* Monitor Screen ambient glow */}
            {!isRoomLightsOn && (
              <div className={`absolute -inset-2 blur-xl rounded-lg opacity-40 transition-all ${
                isGamer ? 'bg-purple-600' : isBali ? 'bg-amber-400' : isCreator ? 'bg-amber-500/20' : 'bg-blue-400'
              }`} />
            )}
            {/* Curved Frame */}
            <div className="w-full h-24 bg-zinc-900 rounded-lg p-1.5 shadow-2xl border border-zinc-800 relative flex items-center justify-center">
              <div className={`w-full h-full ${screenBg} rounded-md overflow-hidden transition-all duration-500`}>
                {wallpaperContent}
              </div>
              {/* Inner Curve Shadow overlay */}
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
            </div>
            {/* Stand */}
            <div className="w-3 h-5 bg-zinc-800 border-x border-zinc-700 shadow-md" />
            <div className="w-14 h-1.5 bg-zinc-800 rounded-full shadow-md" />
          </div>
        );
      }
      case 'acc-dual-monitor': {
        const isGamer = selectedThemeId === 'theme-gamer';
        return (
          <div className="relative w-52 h-26 flex flex-col items-center select-none pointer-events-none">
            {/* Glow */}
            {!isRoomLightsOn && (
              <div className={`absolute -inset-2 blur-xl rounded-lg opacity-45 transition-all ${
                isGamer ? 'bg-purple-600' : 'bg-blue-400'
              }`} />
            )}
            {/* Two Monitors Angled */}
            <div className="flex gap-1 w-full justify-center">
              {/* Left Screen */}
              <div className="w-24 h-20 bg-zinc-900 rounded-md p-1 shadow-xl border border-zinc-800 transform rotate-y-6 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 rounded overflow-hidden p-1 flex flex-col justify-between">
                  <div className="w-full h-2 bg-zinc-800 rounded-sm flex items-center px-1 text-[3px] text-zinc-500">Search Workspace...</div>
                  <div className="flex flex-col gap-0.5">
                    <div className="w-full h-1 bg-zinc-700/50 rounded" />
                    <div className="w-5/6 h-1 bg-zinc-700/50 rounded" />
                    <div className="w-2/3 h-1 bg-zinc-700/50 rounded" />
                  </div>
                </div>
              </div>
              {/* Right Screen */}
              <div className="w-24 h-20 bg-zinc-900 rounded-md p-1 shadow-xl border border-zinc-800 transform -rotate-y-6 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-bl from-slate-900 to-indigo-950 rounded overflow-hidden p-1 flex flex-col justify-between">
                  <span className="text-[5px] font-mono text-cyan-400 font-bold">&lt;Index.tsx&gt;</span>
                  <div className="flex flex-col gap-0.5 font-mono text-[3px] text-zinc-400">
                    <span>const store = useStore();</span>
                    <span>store.setTheme('gamer');</span>
                    <span>console.log('snapped!');</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Stand */}
            <div className="w-4 h-4 bg-zinc-800 border-x border-zinc-700" />
            <div className="w-16 h-1 bg-zinc-800 rounded-sm shadow-md" />
          </div>
        );
      }
      case 'acc-lamp': {
        return (
          <div className="relative w-16 h-28 flex flex-col items-center justify-end select-none pointer-events-none">
            {/* Lamp Light Projection Layer */}
            {!isRoomLightsOn && (
              <div className="absolute bottom-[-10px] w-48 h-36 bg-gradient-to-b from-yellow-400/20 via-yellow-400/5 to-transparent rounded-full blur-md pointer-events-none transform -translate-y-4" 
                   style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} />
            )}
            
            {/* Lamp Stand */}
            <svg width="40" height="100" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
              {/* Arm */}
              <path d="M 10 90 L 10 50 L 30 30 L 25 20" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Shade */}
              <path d="M 15 15 L 35 25 L 30 35 L 10 25 Z" fill="#d4af37" />
              {/* Light Bulb Bulb Glow */}
              <circle cx="22" cy="27" r="4" fill={isRoomLightsOn ? "#ffffff" : "#ffe066"} className={isRoomLightsOn ? "" : "animate-pulse"} />
              {/* Base */}
              <rect x="5" y="88" width="12" height="4" rx="1" fill="#c5a028" />
            </svg>
          </div>
        );
      }
      case 'acc-plant': {
        return (
          <motion.div 
            variants={plantSway}
            animate="animate"
            className="relative w-20 h-28 flex flex-col items-center justify-end select-none pointer-events-none origin-bottom"
          >
            {/* Monstera Leaves SVG */}
            <svg width="70" height="85" viewBox="0 0 70 85" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Leaves */}
              <path d="M35 50 C20 40, 10 20, 15 10 C20 5, 30 15, 35 30 C40 15, 50 5, 55 10 C60 20, 50 40, 35 50 Z" fill="#1b4332" />
              <path d="M35 50 C15 45, 5 35, 8 25 C12 15, 25 25, 32 38 Z" fill="#2d6a4f" />
              <path d="M35 50 C55 45, 65 35, 62 25 C58 15, 45 25, 38 38 Z" fill="#2d6a4f" />
              <path d="M35 50 C25 60, 15 65, 12 55 C10 45, 20 45, 30 48 Z" fill="#40916c" />
              <path d="M35 50 C45 60, 55 65, 58 55 C60 45, 50 45, 40 48 Z" fill="#40916c" />
              
              {/* Stem */}
              <path d="M35 50 L35 80" stroke="#52b788" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {/* White Ceramic Pot */}
            <div className="w-12 h-10 bg-white border border-zinc-200 rounded-b-xl rounded-t-sm shadow-md flex items-center justify-center overflow-hidden">
              <div className="w-full h-1 bg-amber-800/20" />
            </div>
          </motion.div>
        );
      }
      case 'acc-keyboard': {
        return (
          <div className="relative w-28 h-8 bg-amber-900/90 rounded-md p-1 shadow-md border border-amber-950 flex items-center justify-center select-none pointer-events-none">
            {/* Keyboard Keys Layout */}
            <div className="w-full h-full bg-zinc-800 rounded p-0.5 flex flex-col gap-0.5">
              {/* Keycap lines */}
              <div className="flex gap-0.5 justify-between w-full h-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`flex-1 rounded-sm bg-zinc-300 ${selectedThemeId === 'theme-gamer' ? 'shadow-[0_0_1px_#a855f7]' : ''}`} style={{ fontSize: '1px' }} />
                ))}
              </div>
              <div className="flex gap-0.5 justify-between w-full h-1">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-zinc-100" />
                ))}
              </div>
              <div className="flex gap-0.5 justify-between w-full h-1">
                <div className="w-3 rounded-sm bg-zinc-400" />
                <div className="flex-1 rounded-sm bg-zinc-200" />
                <div className="w-3 rounded-sm bg-zinc-400" />
              </div>
              <div className="flex gap-0.5 justify-between w-full h-1">
                <div className="w-4 rounded-sm bg-zinc-400" />
                <div className="w-10 rounded-sm bg-zinc-100" />
                <div className="w-4 rounded-sm bg-zinc-400" />
              </div>
            </div>
          </div>
        );
      }
      case 'acc-mouse': {
        return (
          <div className="w-6 h-8 bg-zinc-800 rounded-full shadow-md border border-zinc-700 flex flex-col items-center pt-1 select-none pointer-events-none">
            {/* Scroll wheel */}
            <div className="w-1 h-2 bg-amber-500 rounded-sm" />
            <div className="w-0.5 h-3 bg-zinc-700/50 mt-1" />
          </div>
        );
      }
      case 'acc-laptop-stand': {
        return (
          <div className="relative w-20 h-20 flex flex-col items-center justify-end select-none pointer-events-none">
            {/* Aluminum Riser Stand */}
            <div className="absolute bottom-0 w-16 h-8 border-x-4 border-t-4 border-zinc-400/80 rounded-t-lg bg-zinc-200/20" />
            {/* Laptop Base */}
            <div className="w-18 h-1 bg-zinc-300 rounded shadow-md transform -rotate-6 translate-y-[-6px]" />
            {/* Screen */}
            <div className="w-16 h-12 bg-zinc-800 rounded-t-md p-0.5 shadow-xl border border-zinc-700 transform origin-bottom-left -rotate-6 translate-y-[-7px] translate-x-[2px] flex items-center justify-center">
              {/* Screen Glow */}
              {!isRoomLightsOn && (
                <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-md animate-pulse" />
              )}
              {/* Code visual */}
              <div className="w-full h-full bg-zinc-950 rounded-sm p-1 flex flex-col gap-0.5 font-mono text-[2.5px] text-emerald-400">
                <span>npm run start</span>
                <span>✓ Ready in 120ms</span>
                <span className="text-zinc-500">o- monis server listening</span>
              </div>
            </div>
          </div>
        );
      }
      case 'acc-coffee': {
        return (
          <div className="relative w-16 h-22 flex flex-col items-center justify-end select-none pointer-events-none">
            {/* Steam animation */}
            <div className="absolute top-1 flex gap-1 justify-center">
              {steamParticles.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 8, opacity: 0, scale: 0.5 }}
                  animate={{
                    y: [-4, -18],
                    x: [p.x, p.x + (idx % 2 === 0 ? 3 : -3)],
                    opacity: [0, 0.7, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    delay: p.delay,
                    ease: 'easeOut'
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-white/40 blur-[0.5px]"
                />
              ))}
            </div>

            {/* Coffee Maker Body */}
            <div className="w-12 h-18 bg-zinc-900 border border-zinc-800 rounded-t-lg rounded-b-sm shadow-xl p-1 flex flex-col justify-between">
              {/* Dynamic light indicator */}
              <div className="w-full flex justify-between px-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-4 h-1 bg-zinc-700 rounded-sm" />
              </div>
              {/* Dispenser */}
              <div className="w-full h-6 bg-zinc-800 rounded flex items-end justify-center pb-0.5 relative">
                {/* Drip Nozzle */}
                <div className="absolute top-0 w-2 h-1.5 bg-zinc-600 rounded-b" />
                {/* Espresso Cup */}
                <div className="w-5 h-4 bg-zinc-200 border border-zinc-300 rounded-b shadow-sm flex items-center justify-center">
                  <div className="w-4 h-1 bg-amber-900/80 rounded-b-sm" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'acc-beanbag': {
        return (
          <div className="relative w-28 h-20 flex flex-col items-center justify-end select-none pointer-events-none">
            {/* Soft Shadow */}
            <div className="absolute bottom-[-2px] w-26 h-4 bg-black/25 rounded-full blur-sm" />
            {/* Beanbag Body */}
            <svg width="105" height="75" viewBox="0 0 105 75" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50 C0 35, 15 10, 52 10 C90 10, 105 35, 95 50 C85 65, 20 65, 10 50 Z" fill="#e5e5e0" className="dark:fill-zinc-800 transition-colors duration-300" />
              {/* Creases and cushion texture */}
              <path d="M30 40 C45 42, 60 42, 75 40" stroke="#ccc" className="dark:stroke-zinc-700" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 48 C42 53, 62 53, 83 48" stroke="#ccc" className="dark:stroke-zinc-700" strokeWidth="1" strokeLinecap="round" />
              <path d="M52 10 C50 25, 45 40, 52 58" stroke="#d5d5d0" className="dark:stroke-zinc-700" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        );
      }
      case 'acc-whiteboard': {
        return (
          <div className="w-40 h-24 bg-white border-[4px] border-amber-900/90 rounded-md shadow-2xl p-1 flex flex-col select-none pointer-events-none relative">
            {/* Diagram sketches */}
            <svg className="w-full h-full" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Grid or diagrams */}
              <rect x="5" y="10" width="20" height="12" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
              <text x="7" y="18" fill="#1e40af" style={{ fontSize: '4px', fontWeight: 'bold' }}>IDEATE</text>
              
              <path d="M 25 16 L 38 16" stroke="#475569" strokeWidth="1" markerEnd="url(#arrow)" />
              
              <rect x="38" y="5" width="22" height="22" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
              <text x="40" y="14" fill="#14532d" style={{ fontSize: '4.5px', fontWeight: 'bold' }}>MONIS APP</text>
              <text x="40" y="21" fill="#166534" style={{ fontSize: '3px' }}>Workspace Config</text>
              
              <path d="M 60 16 L 73 16" stroke="#475569" strokeWidth="1" />
              
              <rect x="73" y="10" width="22" height="12" rx="2" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
              <text x="75" y="18" fill="#713f12" style={{ fontSize: '4px', fontWeight: 'bold' }}>RENTAL</text>
            </svg>
            {/* Magnetic post-it note */}
            <div className="absolute bottom-1 right-2 w-5 h-5 bg-orange-200 border border-orange-300 shadow-sm transform -rotate-6 p-0.5 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-orange-400" />
              <div className="w-full h-0.5 bg-orange-400" />
            </div>
            {/* Wooden shelf bottom for markers */}
            <div className="absolute bottom-[-4px] left-4 right-4 h-1 bg-amber-900 rounded" />
          </div>
        );
      }
      default:
        return <div className="p-2 border bg-zinc-100 rounded text-xs">{accessory.name}</div>;
    }
  };

  return (
    <motion.div
      ref={itemRef}
      drag
      dragConstraints={canvasRef}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={(e, info) => {
        // Retrieve dynamic client coordinates of drop location
        onDragEnd(accessory.id, info.point.x, info.point.y);
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        // Optional floating animation for aesthetic look if not being dragged
        translateY: isDraggingActive ? 0 : [0, -3, 0],
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        opacity: { duration: 0.2 },
        translateY: {
          repeat: Infinity,
          duration: 3 + Math.random() * 2,
          ease: 'easeInOut',
        },
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: slot === 'wall_slot' ? 10 : slot === 'monitor_slot' ? 30 : slot.includes('floor') ? 15 : 40,
        cursor: 'grab',
        touchAction: 'none'
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 100,
        cursor: 'grabbing',
        filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.25))'
      }}
      className="active:cursor-grabbing hover:filter hover:drop-shadow-lg transition-[filter] duration-200"
    >
      {renderVisual()}
    </motion.div>
  );
}
