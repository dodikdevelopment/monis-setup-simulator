'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { DESKS, CHAIRS, ACCESSORIES, RENTAL_DISCOUNTS } from '../../data/workspaceData';
import { X, CheckCircle, Calendar, Truck, ShieldCheck, Mail, User, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const {
    selectedDeskId,
    selectedDeskColor,
    selectedChairId,
    selectedChairColor,
    accessories,
    rentalDuration,
    resetWorkspace
  } = useWorkspaceStore();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    date: ''
  });

  const activeDesk = DESKS.find(d => d.id === selectedDeskId) || DESKS[0];
  const activeChair = CHAIRS.find(c => c.id === selectedChairId) || CHAIRS[0];

  // Pricing math
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
  const securityDeposit = Math.round(monthlyTotal);
  const deliveryFee = monthlyTotal > 35 ? 0 : 15;
  const totalUpfront = Math.round(monthlyTotal + securityDeposit + deliveryFee);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert('Mohon isi semua data formulir pengiriman!');
      return;
    }
    setStep('success');
  };

  const handleOrderReset = () => {
    resetWorkspace();
    setStep('form');
    setFormData({ name: '', email: '', address: '', date: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 px-6 py-4">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {step === 'form' ? 'Checkout Setup Rental' : 'Order Confirmed!'}
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 flex-1">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      Delivery Details
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Enter your address to schedule delivery and professional setup.
                    </p>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-zinc-400" /> Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-zinc-400" /> Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-400" /> Shipping Address
                    </label>
                    <textarea
                      required
                      rows={3}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Jalan Canggu No. 8, Kuta Utara, Bali"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Pricing Overview */}
                  <div className="flex flex-col gap-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-900 p-4 mt-2">
                    <h5 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      Upfront Payment Due
                    </h5>
                    <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-300">
                      <span>1st Month Rental</span>
                      <span className="font-mono font-bold">${monthlyTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-300">
                      <span className="flex items-center gap-1">
                        Security Deposit <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
                      </span>
                      <span className="font-mono font-bold">${securityDeposit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-300">
                      <span className="flex items-center gap-1">
                        Delivery & Assembly <Truck className="h-3.5 w-3.5 text-zinc-400" />
                      </span>
                      <span className="font-mono font-bold">
                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}.00`}
                      </span>
                    </div>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-zinc-800 dark:text-zinc-200">
                        Total Upfront Due
                      </span>
                      <span className="text-lg font-black text-orange-600 dark:text-orange-400 font-mono">
                        ${totalUpfront.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-gradient-to-tr from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/20 mt-2 cursor-pointer"
                  >
                    Confirm & Authorize Rent
                  </button>
                </form>
              ) : (
                /* Success step rendering */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-4 py-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 border border-green-500/20 shadow-md">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-black text-zinc-950 dark:text-zinc-50">
                      Booking Confirmed!
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      Order ID: #MONIS-2026-{Math.floor(1000 + Math.random() * 9000)}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                    Terima kasih, <strong>{formData.name}</strong>! Setup workspace impianmu sedang diproses. Kami telah mengirimkan kontrak rental dan detail pembayaran ke <strong>{formData.email}</strong>.
                  </p>

                  <div className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 p-4 mt-2 flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-3 text-xs text-zinc-700 dark:text-zinc-300">
                      <Truck className="h-5 w-5 text-orange-500 shrink-0" />
                      <div>
                        <p className="font-bold">Professional Delivery & Assembly</p>
                        <p className="text-[10px] text-zinc-400">Scheduled within 2-3 business days.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-700 dark:text-zinc-300">
                      <Calendar className="h-5 w-5 text-orange-500 shrink-0" />
                      <div>
                        <p className="font-bold">Rental Term Period</p>
                        <p className="text-[10px] text-zinc-400">Active for {rentalDuration} months starting on delivery.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleOrderReset}
                    className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 rounded-xl text-xs font-bold transition-all mt-4 cursor-pointer"
                  >
                    Build Another Setup
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
