"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Droplets } from 'lucide-react';

// Definim ce date (props) trebuie să primească această componentă de la pagina principală
interface WaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWater: number;
}

export default function WaterModal({ isOpen, onClose, currentWater }: WaterModalProps) {
  if (!isOpen) return null; // Dacă nu e deschis, nu afișăm nimic

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg relative shadow-[0_0_40px_rgba(6,182,212,0.15)]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-3">
          <div className="bg-cyan-500/20 p-2 rounded-xl">
            <Droplets className="text-cyan-400" size={24} />
          </div>
          Hidratare Azi
        </h2>
        <p className="text-gray-400 text-sm mb-6">Progresul tău zilnic de consum de apă.</p>
        
        <div className="flex flex-col items-center justify-center py-6">
          <div className="text-6xl font-black text-cyan-400 mb-2">{currentWater}</div>
          <div className="text-gray-400 uppercase tracking-widest text-sm font-bold">Pahare Băute</div>
        </div>

        <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden mt-4 flex">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              className={`flex-1 h-full border-r border-[#0a0a0a] last:border-r-0 ${index < currentWater ? 'bg-cyan-500' : 'bg-transparent'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}