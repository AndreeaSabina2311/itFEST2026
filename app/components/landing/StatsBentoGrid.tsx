"use client";

import React from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import { Flame, Activity, Droplets, Dumbbell } from 'lucide-react';

// Am adăugat noile proprietăți pentru Caloriile Arse (marcate cu ? ca să fie opționale temporar)
=======
import { Flame, Activity, Droplets } from 'lucide-react';

// Aici definim ce "unelte" (date și funcții) așteaptă componenta de la pagina mare
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
interface StatsBentoGridProps {
  totalCalories: number;
  mealsCount: number;
  totalProteins: number;
  currentWater: number;
  isSavingWater: boolean;
<<<<<<< HEAD
  burnedCalories?: number; // NOU
=======
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
  handleCalorieClick: () => void;
  handleProteinClick: () => void;
  handleWaterClick: () => void;
  handleDrinkWater: (e: React.MouseEvent) => void;
<<<<<<< HEAD
  handleWorkoutClick?: () => void; // NOU
=======
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
}

export default function StatsBentoGrid({
  totalCalories,
  mealsCount,
  totalProteins,
  currentWater,
  isSavingWater,
<<<<<<< HEAD
  burnedCalories = 0, // Valoare default
  handleCalorieClick,
  handleProteinClick,
  handleWaterClick,
  handleDrinkWater,
  handleWorkoutClick
}: StatsBentoGridProps) {
  
=======
  handleCalorieClick,
  handleProteinClick,
  handleWaterClick,
  handleDrinkWater
}: StatsBentoGridProps) {
  
  // Animațiile pentru a face cardurile să apară frumos
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } } };

  return (
<<<<<<< HEAD
    // Transformăm într-un grid perfect 2x2
    <motion.div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full" initial="hidden" animate="show" variants={containerVariants}>
      
      {/* 1. CARD CALORII CONSUMATE */}
      <motion.div 
        variants={itemVariants} onClick={handleCalorieClick}
        className="cursor-pointer bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[32px] p-6 flex flex-col justify-between backdrop-blur-md hover:border-fuchsia-500/40 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] transition-all duration-300 group relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl group-hover:bg-fuchsia-500/30 transition-all" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-fuchsia-500/20 text-fuchsia-400 p-3 rounded-2xl group-hover:bg-fuchsia-500/30 transition-colors">
              <Flame size={22} />
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full border border-white/5">Consum</span>
          </div>
          <div className="flex items-end gap-2 text-white">
            <span className="text-4xl lg:text-5xl font-bold tracking-tighter">{totalCalories}</span>
            <span className="text-gray-500 font-medium mb-1">/ 2500 kcal</span>
          </div>
        </div>
        
        <div className="mt-6 relative z-10">
           <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-fuchsia-500" 
               initial={{ width: 0 }} animate={{ width: `${Math.min((totalCalories / 2500) * 100, 100)}%` }} transition={{ duration: 1, ease: "easeOut" }}
             />
           </div>
           <p className="text-xs text-gray-400 mt-2 font-medium">{mealsCount} mese adăugate azi</p>
=======
    <motion.div className="xl:col-span-7 grid grid-cols-2 grid-rows-2 gap-4 h-full" initial="hidden" animate="show" variants={containerVariants}>
      
      {/* 1. CARD CALORII */}
      <motion.div 
        variants={itemVariants} onClick={handleCalorieClick}
        className="cursor-pointer row-span-2 col-span-1 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[32px] p-8 flex flex-col justify-between backdrop-blur-md hover:border-fuchsia-600/30 transition-colors group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-all" />
        <div className="relative z-10">
          <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Flame className="text-fuchsia-600" size={24} />
          </div>
          <h3 className="text-gray-400 font-medium mb-1">Calorii Consumate</h3>
          <div className="flex items-baseline gap-2 mb-2 text-white">
            <span className="text-5xl font-bold tracking-tighter">{totalCalories}</span>
            <span className="text-gray-500 font-medium">kcal</span>
          </div>
          <span className="text-fuchsia-600 text-sm font-semibold">Obiectiv: 2500 kcal</span>
        </div>
        
        <div className="mt-8 relative z-10">
           <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-fuchsia-500" 
               initial={{ width: 0 }} animate={{ width: `${Math.min((totalCalories / 2500) * 100, 100)}%` }} transition={{ duration: 1 }}
             />
           </div>
           <p className="text-xs text-gray-400 mt-2">{mealsCount} mese adăugate azi</p>
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        </div>
      </motion.div>

      {/* 2. CARD PROTEINE */}
      <motion.div 
        variants={itemVariants} onClick={handleProteinClick}
<<<<<<< HEAD
        className="cursor-pointer bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[32px] p-6 flex flex-col justify-between backdrop-blur-md hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-500/20 text-blue-400 p-3 rounded-2xl group-hover:bg-blue-500/30 transition-colors">
              <Activity size={22} />
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full border border-white/5">Proteine</span>
          </div>
          <div className="flex items-end gap-2 text-white mt-auto">
            <span className="text-4xl lg:text-5xl font-bold tracking-tighter">{totalProteins}</span>
            <span className="text-gray-500 font-medium mb-1">g / 160g</span>
          </div>
        </div>
        
        <div className="w-full bg-white/10 h-2 rounded-full mt-6 overflow-hidden relative z-10">
          <motion.div 
            className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out" 
=======
        className="cursor-pointer bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col justify-center backdrop-blur-md hover:border-blue-500/30 transition-colors group relative"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-500/20 text-blue-400 p-2.5 rounded-xl group-hover:bg-blue-500/30 transition-colors">
            <Activity size={20} />
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full">Proteine</span>
        </div>
        <div className="flex items-end gap-2 text-white">
          <span className="text-4xl font-bold tracking-tighter">{totalProteins}</span>
          <span className="text-gray-500 mb-1">g / 160g</span>
        </div>
        <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden relative">
          <motion.div 
            className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out absolute left-0 top-0" 
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
            initial={{ width: 0 }} animate={{ width: `${Math.min((totalProteins / 160) * 100, 100)}%` }}
          />
        </div>
      </motion.div>

<<<<<<< HEAD
      {/* 3. CARD CALORII ARSE (NOU!) */}
      <motion.div 
        variants={itemVariants} onClick={handleWorkoutClick}
        className="cursor-pointer bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[32px] p-6 flex flex-col justify-between backdrop-blur-md hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all duration-300 group relative overflow-hidden"
      >
        <div className="absolute bottom-[-20%] left-[-20%] w-32 h-32 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/30 transition-all" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-orange-500/20 text-orange-400 p-3 rounded-2xl group-hover:bg-orange-500/30 transition-colors">
              <Dumbbell size={22} />
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full border border-white/5">Arse</span>
          </div>
          <div className="mt-2">
            <h3 className="text-gray-400 text-sm font-medium mb-1">Din Antrenamente</h3>
            <div className="flex items-end gap-2 text-white">
              <span className="text-4xl lg:text-5xl font-bold tracking-tighter">{burnedCalories}</span>
              <span className="text-gray-500 font-medium mb-1">kcal</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. CARD APĂ */}
      <motion.div 
        variants={itemVariants} onClick={handleWaterClick}
        className="cursor-pointer bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[32px] p-6 flex flex-col justify-between backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 group relative overflow-hidden"
      >
        <div className="absolute bottom-[-20%] right-[-20%] w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-cyan-500/20 text-cyan-400 p-3 rounded-2xl group-hover:bg-cyan-500/30 transition-colors">
              <Droplets size={22} />
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full border border-white/5">Hidratare</span>
          </div>
          
          <div className="flex items-end justify-between mt-auto">
            <div className="flex items-end gap-2 text-white">
              <span className="text-4xl lg:text-5xl font-bold tracking-tighter">{currentWater}</span>
              <span className="text-gray-500 font-medium mb-1">/ 8 px</span>
            </div>
            <button 
              onClick={handleDrinkWater}
              disabled={isSavingWater || currentWater >= 8}
              className={`p-3 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                currentWater >= 8 ? 'bg-cyan-500/20 text-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-110 hover:-translate-y-1 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              }`}
            >
              <span className="text-2xl font-bold leading-none">+</span>
            </button>
          </div>
=======
      {/* 3. CARD APĂ */}
      <motion.div 
        variants={itemVariants} onClick={handleWaterClick}
        className="cursor-pointer bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col justify-center backdrop-blur-md hover:border-cyan-500/30 transition-colors group relative"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="bg-cyan-500/20 text-cyan-400 p-2.5 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
            <Droplets size={20} />
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full">Hidratare</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-2 text-white">
            <span className="text-4xl font-bold tracking-tighter">{currentWater}</span>
            <span className="text-gray-500 mb-1">/ 8 pahare</span>
          </div>
          <button 
            onClick={handleDrinkWater}
            disabled={isSavingWater || currentWater >= 8}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              currentWater >= 8 ? 'bg-cyan-500/20 text-cyan-500 cursor-not-allowed' : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            }`}
          >
            <span className="text-xl font-bold leading-none">+</span>
          </button>
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        </div>
      </motion.div>

    </motion.div>
  );
}