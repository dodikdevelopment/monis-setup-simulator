'use client';

import React, { useRef, useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { DESKS, CHAIRS, ACCESSORIES, THEMES } from '../../data/workspaceData';
import AccessoryItem from './AccessoryItem';
import { Lamp, Moon, Sparkles } from 'lucide-react';

// Static base slots config
const BASE_SLOTS: { [key: string]: { x: number; y: number; label: string } } = {
  wall_slot: { x: 50, y: 22, label: 'Wall Mount' },
  monitor_slot: { x: 50, y: 47, label: 'Monitor Area' },
  left_desk_slot: { x: 30, y: 53, label: 'Left Desk' },
  right_desk_slot: { x: 70, y: 53, label: 'Right Desk' },
  keyboard_slot: { x: 50, y: 62, label: 'Keyboard Area' },
  floor_left_slot: { x: 18, y: 80, label: 'Floor Left' },
  floor_right_slot: { x: 82, y: 80, label: 'Floor Right' },
};

export default function WorkspaceStage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const {
    selectedDeskId,
    selectedDeskColor,
    selectedChairId,
    selectedChairColor,
    deskHeight,
    accessories,
    selectedThemeId,
    isRoomLightsOn,
    moveAccessory,
    toggleRoomLights
  } = useWorkspaceStore();

  const activeTheme = THEMES.find(t => t.id === selectedThemeId) || THEMES[0];
  const activeDesk = DESKS.find(d => d.id === selectedDeskId) || DESKS[0];
  const activeChair = CHAIRS.find(c => c.id === selectedChairId) || CHAIRS[0];

  // Calculate desk top Y coordinate based on deskHeight (72cm to 120cm)
  // Maps to visual vertical position percentage (56% to 40% from top of stage)
  const minHeight = 72;
  const maxHeight = 120;
  const minVisualY = 56;
  const maxVisualY = 40;
  
  const deskYPct = minVisualY - ((deskHeight - minHeight) / (maxHeight - minHeight)) * (minVisualY - maxVisualY);

  // Dynamic slot calculations
  const getSlotPercentage = (slotName: string) => {
    const base = BASE_SLOTS[slotName];
    if (['monitor_slot', 'keyboard_slot', 'left_desk_slot', 'right_desk_slot'].includes(slotName)) {
      // Offset vertical position based on active desk height
      const deskOffset = deskYPct - minVisualY;
      return { x: base.x, y: base.y + deskOffset };
    }
    return base;
  };

  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };

  const handleDragEnd = (id: string, clientX: number, clientY: number) => {
    setDraggedItemId(null);
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const pctX = ((clientX - rect.left) / rect.width) * 100;
    const pctY = ((clientY - rect.top) / rect.height) * 100;

    const accessory = ACCESSORIES.find(a => a.id === id);
    if (!accessory) return;

    let closestSlot: string | null = null;
    let minDistance = 999999;
    const snapThreshold = 14; // percentage radius distance

    accessory.allowedSlots.forEach((slotName) => {
      const slotCoords = getSlotPercentage(slotName);
      const dist = Math.sqrt(Math.pow(pctX - slotCoords.x, 2) + Math.pow(pctY - slotCoords.y, 2));
      if (dist < minDistance && dist < snapThreshold) {
        minDistance = dist;
        closestSlot = slotName;
      }
    });

    if (closestSlot) {
      moveAccessory(id, closestSlot);
    }
  };

  // Find allowed slots for the currently dragged accessory
  const getActiveDropSlots = () => {
    if (!draggedItemId) return [];
    const accessory = ACCESSORIES.find(a => a.id === draggedItemId);
    return accessory ? accessory.allowedSlots : [];
  };

  // Get hex color codes for rendering furniture shapes
  const deskColorVal = activeDesk.colorOptions.find(o => o.name === selectedDeskColor)?.value || '#e6c280';
  const chairColorVal = activeChair.colorOptions.find(o => o.name === selectedChairColor)?.value || '#708090';

  const allowedSlots = getActiveDropSlots();

  return (
    <div className="flex flex-col flex-1 w-full gap-4">
      {/* Visual Canvas Panel */}
      <div
        ref={canvasRef}
        className={`relative w-full aspect-video md:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 select-none ${
          activeTheme.bgClass
        } ${activeTheme.lightingClass}`}
      >
        {/* Day/Night Room Lights Tint Overlay */}
        <div
          className={`absolute inset-0 bg-indigo-950 transition-all duration-1000 ease-in-out pointer-events-none z-[49] ${
            isRoomLightsOn ? 'opacity-0' : 'opacity-60 mix-blend-multiply'
          }`}
        />

        {/* Ambient Room Glow for Dark Mode */}
        {!isRoomLightsOn && (
          <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-950/20 via-indigo-950/40 to-transparent pointer-events-none z-[48]" />
        )}

        {/* Window Aesthetic with Palm Leaf Shadow */}
        <div className="absolute top-8 right-12 w-32 h-44 border-4 border-white/20 rounded-t-full bg-white/5 backdrop-blur-xs flex items-center justify-center overflow-hidden pointer-events-none">
          {/* Bali/Tropical Sun in window */}
          {selectedThemeId === 'theme-bali' && (
            <div className="absolute bottom-2 w-20 h-20 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 opacity-60 filter blur-xs" />
          )}
          {/* Palm shadow animation */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent animate-pulse opacity-70" />
        </div>

        {/* Layer 1: Wall Mounts (e.g. whiteboard) */}
        {Object.values(accessories).map((acc) => {
          const spec = ACCESSORIES.find(a => a.id === acc.id);
          if (spec && acc.slot === 'wall_slot') {
            const coords = getSlotPercentage('wall_slot');
            return (
              <AccessoryItem
                key={acc.id}
                accessory={spec}
                slot={acc.slot}
                x={coords.x}
                y={coords.y}
                canvasRef={canvasRef}
                onDragStart={() => handleDragStart(acc.id)}
                onDragEnd={handleDragEnd}
                isDraggingActive={draggedItemId === acc.id}
              />
            );
          }
          return null;
        })}

        {/* Layer 2: Chair Base/Backrest (Partially Tucked Behind Desk) */}
        <div
          className="absolute left-1/2 transition-all duration-500 ease-out z-[20]"
          style={{
            bottom: '22%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Chair Graphic */}
          <div className="relative flex flex-col items-center">
            {/* Backrest */}
            <div
              className="w-24 h-28 rounded-t-3xl rounded-b-xl border shadow-lg transition-all duration-300"
              style={{
                backgroundColor: chairColorVal,
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: '2px',
              }}
            >
              {/* Ergonomic lumbar highlight */}
              {activeChair.type !== 'rattan' && (
                <div className="mx-auto mt-6 w-16 h-12 rounded-lg bg-black/10 border-t border-white/10" />
              )}
              {/* Rattan wicker design overlay */}
              {activeChair.type === 'rattan' && (
                <div className="w-full h-full opacity-35 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
              )}
            </div>
            {/* Seat cushion */}
            <div
              className="w-26 h-5 rounded-md -mt-2 shadow-md transition-all duration-300"
              style={{
                backgroundColor: activeChair.type === 'rattan' ? '#f5e6d3' : chairColorVal,
                filter: 'brightness(90%)'
              }}
            />
            {/* Cylinder shaft & base */}
            <div className="w-2 h-14 bg-zinc-700/90 shadow-sm" />
            <div className="w-20 h-4 bg-zinc-800 rounded-full flex justify-between px-1 relative">
              {/* Casters */}
              <div className="w-3 h-3 rounded-full bg-zinc-950 absolute left-2 bottom-[-2px] border border-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-950 absolute right-2 bottom-[-2px] border border-zinc-700" />
            </div>
          </div>
        </div>

        {/* Layer 3: Desk Frame and Surface */}
        <div
          className="absolute left-0 right-0 z-[30] transition-all duration-500 ease-out"
          style={{
            top: `${deskYPct}%`,
          }}
        >
          {/* Desk Surface (Table Top) */}
          <div
            className="mx-auto w-[68%] h-5 rounded-t-lg rounded-b-sm shadow-xl transition-all duration-300 border-b border-black/25 relative"
            style={{
              backgroundColor: deskColorVal,
            }}
          >
            {/* Wooden desk grain effect */}
            {activeDesk.type !== 'standing' && (
              <div className="absolute inset-0 opacity-10 bg-repeat bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.15)_50%)] [background-size:20px_100%]" />
            )}
            {/* Standing desk controller switch */}
            {activeDesk.type === 'standing' && (
              <div className="absolute right-4 bottom-[-6px] w-6 h-3 bg-zinc-900 rounded-sm flex items-center justify-around px-0.5 border border-zinc-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[4px] font-mono text-zinc-300">{deskHeight}</span>
              </div>
            )}
          </div>

          {/* Desk Legs (extends to floor) */}
          <div className="mx-auto w-[64%] flex justify-between h-[150px] relative pointer-events-none z-[-1] mt-[-2px]">
            {activeDesk.type === 'standing' ? (
              <>
                {/* Electric columns */}
                <div className="w-5 bg-zinc-800 border-x border-zinc-700 shadow-md flex flex-col justify-end">
                  <div className="w-7 h-2 bg-zinc-900 self-center rounded-sm" />
                </div>
                <div className="w-5 bg-zinc-800 border-x border-zinc-700 shadow-md flex flex-col justify-end">
                  <div className="w-7 h-2 bg-zinc-900 self-center rounded-sm" />
                </div>
              </>
            ) : activeDesk.type === 'teak' ? (
              <>
                {/* Heavy black metal trapezoids */}
                <div className="w-8 border-x-8 border-b-16 border-zinc-900 h-full transform skew-x-3 shadow-md" style={{ borderStyle: 'solid' }} />
                <div className="w-8 border-x-8 border-b-16 border-zinc-900 h-full transform -skew-x-3 shadow-md" style={{ borderStyle: 'solid' }} />
              </>
            ) : (
              <>
                {/* Clean round steel legs */}
                <div className="w-3 bg-zinc-200 border-r border-zinc-300 shadow-sm rounded-b" />
                <div className="w-3 bg-zinc-200 border-r border-zinc-300 shadow-sm rounded-b" />
              </>
            )}
          </div>
        </div>

        {/* Floor Level Shadow overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-[10]" />

        {/* Layer 4: Desk & Floor Accessories */}
        {Object.values(accessories).map((acc) => {
          const spec = ACCESSORIES.find(a => a.id === acc.id);
          if (spec && acc.slot !== 'wall_slot') {
            const coords = getSlotPercentage(acc.slot);
            return (
              <AccessoryItem
                key={acc.id}
                accessory={spec}
                slot={acc.slot}
                x={coords.x}
                y={coords.y}
                canvasRef={canvasRef}
                onDragStart={() => handleDragStart(acc.id)}
                onDragEnd={handleDragEnd}
                isDraggingActive={draggedItemId === acc.id}
              />
            );
          }
          return null;
        })}

        {/* Layer 5: Drag Target Snap Hotspots */}
        {draggedItemId &&
          allowedSlots.map((slotName) => {
            const coords = getSlotPercentage(slotName);
            const slotConfig = BASE_SLOTS[slotName];
            return (
              <div
                key={slotName}
                className="absolute flex flex-col items-center justify-center z-[80] pointer-events-none"
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Pulse Outline */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-dashed border-amber-500 bg-amber-500/10 animate-ping opacity-60" />
                <div className="absolute w-8 h-8 rounded-full border-2 border-amber-500 bg-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                </div>
                {/* Text Badge */}
                <span className="absolute top-[36px] bg-zinc-900/90 text-white border border-zinc-800 text-[8px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase shadow-md whitespace-nowrap">
                  {slotConfig.label}
                </span>
              </div>
            );
          })}
      </div>

      {/* Under-canvas Desk Height Controller slider */}
      {activeDesk.type === 'standing' && (
        <div className="flex flex-col gap-2 p-4 bg-white/40 dark:bg-zinc-900/40 border border-white/10 rounded-2xl backdrop-blur-md transition-all duration-300">
          <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
              Adjust Desk Height
            </span>
            <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono px-2 py-0.5 rounded-md border border-amber-500/25">
              {deskHeight} cm
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">72cm</span>
            <input
              type="range"
              min="72"
              max="120"
              value={deskHeight}
              onChange={(e) => useWorkspaceStore.getState().setDeskHeight(Number(e.target.value))}
              className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">120cm</span>
          </div>
        </div>
      )}
    </div>
  );
}
