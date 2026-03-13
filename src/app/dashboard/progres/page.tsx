"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trophy, Zap, Star, Droplets, Flame } from 'lucide-react';

// Importăm contextul global pentru a accesa datele deja încărcate în memorie
import { useDashboardContext } from '@/src/context/DashboardContext';

// Componente shared


export default function ProgresPage() {
  // Extragem progressStats direct din contextul gestionat în DashboardLayout
  const { progressStats } = useDashboardContext();
  
  // Destructurăm datele de progres (vin instantaneu din memorie)
  const { 
    loading, 
    streak, 
    weeklyBurned, 
    evolutionData, 
    badges 
  } = progressStats;

  // Configurare animații
  const containerVariants = { 
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.1 } } 
  };
  
  const itemVariants = { 
    hidden: { opacity: 0, y: 20 }, 
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } } 
  };

  return (
    <main className="h-full w-full p-6 lg:p-12 overflow-y-auto relative z-10">
      
      {/* Background Glows decorative */}
      <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header-ul paginii */}
        <header className="flex justify-between items-center mb-10 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Progresul <span className="text-fuchsia-500">Meu</span>
          </h1>
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 p-[2px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            <div className="h-full w-full bg-black rounded-full flex items-center justify-center overflow-hidden">
              
            </div>
          </div>
        </header>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          
          {/* Partea Stângă: Streak și Calorii Arse */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 p-8 rounded-[32px] backdrop-blur-md relative overflow-hidden flex flex-col items-center text-center">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />
               <div className="bg-orange-500/20 p-4 rounded-full mb-4 inline-block relative z-10">
                 <Zap className="text-orange-500" size={32} />
               </div>
               <h2 className="text-gray-400 font-medium mb-1 relative z-10">Streak Activ</h2>
               <div className="flex items-baseline gap-2 mb-2 justify-center relative z-10">
                  <span className="text-6xl font-black text-white tracking-tighter">
                    {loading ? "-" : streak}
                  </span>
                  <span className="text-orange-400 font-medium">zile</span>
               </div>
               <p className="text-sm text-gray-400 font-light mt-2 relative z-10">
                 {streak > 0 
                   ? `Ai înregistrat date ${streak} zile la rând. Continuă tot așa!` 
                   : "Nu ai înregistrat nicio activitate recent. Începe azi!"}
               </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-md flex items-center justify-between group hover:border-fuchsia-500/30 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Flame size={16} className="text-fuchsia-500" />
                  <span className="text-sm text-gray-400">Arse Săptămânal</span>
                </div>
                <span className="text-3xl font-bold text-white">
                  {loading ? "..." : weeklyBurned} <span className="text-lg text-gray-500">kcal</span>
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Obiectiv</div>
                <span className="text-xl font-bold text-fuchsia-500">2000 <span className="text-sm">kcal</span></span>
              </div>
            </motion.div>
          </div>

          {/* Partea Dreaptă: Grafic și Trofee */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-md">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="text-fuchsia-500" /> Evoluție Ultimele 7 Zile
                </h2>
                <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full text-fuchsia-400">
                  Target: 2500 kcal
                </span>
              </div>
              
              <div className="flex items-end gap-3 h-48 w-full">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 animate-pulse">
                    Calculăm evoluția ta...
                  </div>
                ) : (
                  evolutionData.map((item: any, i: number) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer h-full relative">
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold px-3 py-2 rounded-xl text-white whitespace-nowrap z-20">
                        {item.realCals} kcal
                      </div>
                      <div className="w-full bg-white/5 rounded-t-xl relative overflow-hidden flex items-end justify-center" style={{ height: '100%' }}>
                        <motion.div 
                          initial={{ height: 0 }} 
                          animate={{ height: `${item.valoare}%` }} 
                          transition={{ duration: 1, delay: i * 0.1, type: "spring" }} 
                          className={`w-full rounded-t-xl ${item.valoare >= 90 ? 'bg-fuchsia-500' : 'bg-fuchsia-600/40 group-hover:bg-fuchsia-500/70 transition-colors'}`} 
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors">
                        {i === 6 ? "Azi" : item.zi}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Secțiunea de Badges / Trofee */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Titan de Fier */}
              <div className={`border p-5 rounded-3xl flex flex-col items-center text-center gap-2 transition-all duration-500 ${badges.titan ? 'bg-white/5 border-yellow-500/30 hover:border-yellow-500/60' : 'bg-black/20 border-white/5 opacity-50 grayscale'}`}>
                <div className={`p-3 rounded-full ${badges.titan ? 'bg-yellow-500/20' : 'bg-white/5'}`}>
                  <Trophy className={badges.titan ? 'text-yellow-500' : 'text-gray-500'} size={24} />
                </div>
                <span className="font-bold text-sm text-gray-200 mt-2">Titan de Fier</span>
                <span className="text-xs text-gray-500">3 antrenamente / 7 zile</span>
              </div>

              {/* Regele Hidratării */}
              <div className={`border p-5 rounded-3xl flex flex-col items-center text-center gap-2 transition-all duration-500 ${badges.hidratare ? 'bg-white/5 border-blue-500/30 hover:border-blue-500/60' : 'bg-black/20 border-white/5 opacity-50 grayscale'}`}>
                <div className={`p-3 rounded-full ${badges.hidratare ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                  <Droplets className={badges.hidratare ? 'text-blue-500' : 'text-gray-500'} size={24} />
                </div>
                <span className="font-bold text-sm text-gray-200 mt-2">Regele Hidratării</span>
                <span className="text-xs text-gray-500">40 pahare apă / 7 zile</span>
              </div>

              {/* Precizie AI */}
              <div className={`border p-5 rounded-3xl flex flex-col items-center text-center gap-2 transition-all duration-500 ${badges.precizie ? 'bg-white/5 border-fuchsia-500/30 hover:border-fuchsia-500/60' : 'bg-black/20 border-white/5 opacity-50 grayscale'}`}>
                <div className={`p-3 rounded-full ${badges.precizie ? 'bg-fuchsia-500/20' : 'bg-white/5'}`}>
                  <Star className={badges.precizie ? 'text-fuchsia-500' : 'text-gray-500'} size={24} />
                </div>
                <span className="font-bold text-sm text-gray-200 mt-2">Precizie AI</span>
                <span className="text-xs text-gray-500">Streak de minim 3 zile</span>
              </div>

            </motion.div>

          </div>
        </motion.div>
      </div>
    </main>
  );
}