'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { DESKS, CHAIRS, ACCESSORIES, RENTAL_DISCOUNTS } from '../../data/workspaceData';
import { Calendar, Percent, ShieldCheck, Truck, ShoppingCart, HelpCircle } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import { motion } from 'framer-motion';

export default function SummaryPanel() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const {
    selectedDeskId,
    selectedDeskColor,
    selectedChairId,
    selectedChairColor,
    accessories,
    rentalDuration,
    setRentalDuration
  } = useWorkspaceStore();

  const activeDesk = DESKS.find(d => d.id === selectedDeskId) || DESKS[0];
  const activeChair = CHAIRS.find(c => c.id === selectedChairId) || CHAIRS[0];

  // Calculate pricing breakdown
  const deskPrice = activeDesk.monthlyPrice;
  const chairPrice = activeChair.monthlyPrice;
  
  const accessoriesPrice = Object.values(accessories).reduce((sum, item) => {
    const accSpec = ACCESSORIES.find(a => a.id === item.id);
    return sum + (accSpec ? accSpec.monthlyPrice * item.quantity : 0);
  }, 0);

  const subtotal = deskPrice + chairPrice + accessoriesPrice;
  const discountPct = RENTAL_DISCOUNTS[rentalDuration] || 0;
  const discountAmount = subtotal * (discountPct / 100);
  const monthlyTotal = subtotal - discountAmount;

  // Real SaaS details
  const securityDeposit = Math.round(monthlyTotal);
  const deliveryFee = monthlyTotal > 35 ? 0 : 15;
  const totalUpfront = Math.round(monthlyTotal + securityDeposit + deliveryFee);

  const durationOptions = [1, 3, 6, 12];

  return (
    <div className="flex flex-col gap-5 p-6 bg-white/70 dark:bg-zinc-950/70 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl backdrop-blur-md shadow-2xl transition-all duration-300">
      {/* Title */}
      <div className="flex items-center gap-2 pb-3 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <ShoppingCart className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Rental Setup Summary</h2>
      </div>

      {/* Itemized list */}
      <div className="flex flex-col gap-3.5">
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          Selected Items
        </span>

        <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto pr-1">
          {/* Desk */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{activeDesk.name}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Finish: {selectedDeskColor}</span>
            </div>
            <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">${deskPrice}/mo</span>
          </div>

          {/* Chair */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{activeChair.name}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Fabric: {selectedChairColor}</span>
            </div>
            <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">${chairPrice}/mo</span>
          </div>

          {/* Accessories */}
          {Object.values(accessories).map((item) => {
            const spec = ACCESSORIES.find(a => a.id === item.id);
            if (!spec) return null;
            return (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{spec.name}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Qty: {item.quantity}</span>
                </div>
                <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">
                  ${spec.monthlyPrice * item.quantity}/mo
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rental Duration Slider/Tabs */}
      <div className="flex flex-col gap-2 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-orange-500" />
            Rental Term
          </span>
          <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {rentalDuration} {rentalDuration === 1 ? 'Month' : 'Months'}
          </span>
        </div>

        {/* Buttons for Durations */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/20 dark:border-zinc-800/20">
          {durationOptions.map((months) => {
            const discount = RENTAL_DISCOUNTS[months];
            const isSelected = rentalDuration === months;
            return (
              <button
                key={months}
                onClick={() => setRentalDuration(months)}
                className={`flex flex-col items-center py-2 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs border border-white/5'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                <span className="text-xs font-black">{months}M</span>
                {discount > 0 && (
                  <span className="text-[8px] font-bold text-green-500 mt-0.5 flex items-center gap-0.5">
                    -{discount}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing Breakdown Card */}
      <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800/40">
        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>Subtotal</span>
          <span className="font-mono font-semibold">${subtotal.toFixed(2)}/mo</span>
        </div>

        {discountPct > 0 && (
          <div className="flex justify-between text-xs text-green-600 dark:text-green-400 font-semibold">
            <span className="flex items-center gap-1">
              <Percent className="h-3.5 w-3.5" /> Term Discount ({discountPct}%)
            </span>
            <span className="font-mono">-${discountAmount.toFixed(2)}/mo</span>
          </div>
        )}

        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Security Deposit
          </span>
          <span className="font-mono font-semibold">${securityDeposit.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <Truck className="h-3.5 w-3.5" /> Delivery & Assembly
          </span>
          <span className="font-mono font-semibold">
            {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}.00`}
          </span>
        </div>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1" />

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs font-black text-zinc-900 dark:text-white">Monthly Rent</span>
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500">Excl. local taxes</span>
          </div>
          <span className="text-xl font-black text-orange-600 dark:text-orange-400 font-mono">
            ${monthlyTotal.toFixed(2)}<span className="text-xs font-normal">/mo</span>
          </span>
        </div>
      </div>

      {/* Rent Button */}
      <button
        onClick={() => setIsCheckoutOpen(true)}
        className="w-full py-3.5 px-4 bg-gradient-to-tr from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <ShoppingCart className="h-4 w-4" /> Rent Workspace Setup
      </button>

      {/* Safety details */}
      <p className="text-[10px] text-center text-zinc-400 dark:text-zinc-500 leading-normal">
        Free cancellations up to 48h prior to delivery. Full coverage maintenance included.
      </p>

      {/* Simulated checkout dialog modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
