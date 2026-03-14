"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dumbbell, Target, Zap, Clock, Flame, Trophy, Play, Sparkles } from 'lucide-react';

// Importăm contextul pentru consistență și viteză
import { useDashboardContext } from '@/src/context/DashboardContext';

// Componente shared


const workoutPrograms = [
  { id: 'full-body', title: 'Full Body', description: 'Antrenament complet pentru activarea tuturor grupelor musculare.', icon: <Dumbbell size={24} />, color: 'from-fuchsia-600 to-purple-600', shadow: 'shadow-fuchsia-500/20', duration: '45 min', difficulty: 'Intermediar', calories: 450 },
  { id: 'abs', title: 'Abs & Core', description: 'Definire și forță pentru zona abdominală centrală.', icon: <Target size={24} />, color: 'from-blue-600 to-cyan-600', shadow: 'shadow-cyan-500/20', duration: '20 min', difficulty: 'Începător', calories: 150 },
  { id: 'chest', title: 'Chest Day', description: 'Focus pe mușchii pectorali și forță maximă de împingere.', icon: <Zap size={24} />, color: 'from-orange-500 to-red-600', shadow: 'shadow-orange-500/20', duration: '50 min', difficulty: 'Avansat', calories: 400 },
  { id: 'arms', title: 'Arm Blast', description: 'Izolare extremă pentru pomparea bicepșilor și tricepșilor.', icon: <Flame size={24} />, color: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-500/20', duration: '35 min', difficulty: 'Intermediar', calories: 300 },
  { id: 'shoulder-back', title: 'Shoulder & Back', description: 'Postură corectă și formă de V pentru partea superioară.', icon: <Trophy size={24} />, color: 'from-indigo-600 to-blue-700', shadow: 'shadow-indigo-500/20', duration: '55 min', difficulty: 'Avansat', calories: 420 },
  { id: 'legs', title: 'Leg Day', description: 'Putere brută și anduranță pentru trenul inferior.', icon: <Dumbbell size={24} />, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20', duration: '60 min', difficulty: 'Hardcore', calories: 550 }
];

export default function AntrenamentePage() {
  // Accesăm contextul (chiar dacă aici folosim în principal date statice, 
  // asigurăm că UserProfile și alte elemente de layout sunt sincronizate instant)
  const { dailyStats } = useDashboardContext();

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
      <motion.div 
        className="max-w-6xl mx-auto" 
        initial="hidden" 
        animate="show" 
        variants={containerVariants}
      >
        
        {/* Header Pagina */}
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
          <div>
            <p className="text-fuchsia-600 font-mono text-sm tracking-widest uppercase mb-2 flex items-center gap-2">
              <Sparkles size={16} /> Selectează-ți calea
            </p>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              Programe de <span className="text-fuchsia-600">Antrenament</span>
            </h1>
            <p className="text-gray-400 mt-3 max-w-xl font-medium">
              Sesiuni optimizate pentru ardere calorică maximă și definire musculară.
            </p>
          </div>
          
          <div className="hidden sm:block h-12 w-12 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 p-[2px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            <div className="h-full w-full bg-black rounded-full flex items-center justify-center overflow-hidden">
              
            </div>
          </div>
        </motion.div>

        {/* Grid Programe */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutPrograms.map((program) => (
            <div 
              key={program.id} 
              className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-white/30 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 rounded-full translate-x-1/2 -translate-y-1/2`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg ${program.shadow} text-white`}>
                    {program.icon}
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {program.difficulty}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {program.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                  {program.description}
                </p>

                <div className="flex items-center gap-6 mb-8 border-t border-white/5 pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Durată</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Clock size={14} className="text-fuchsia-500" />
                      {program.duration}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Ardere</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Flame size={14} className="text-orange-500" />
                      {program.calories} kcal
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="relative z-10 w-full py-4 bg-white text-black rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs hover:bg-fuchsia-500 hover:text-white transition-all duration-300 shadow-lg">
                <Play size={16} fill="currentColor" /> Începe Sesiunea
              </button>
            </div>
          ))}
        </motion.div>

        {/* Sectiune AI Pikachu */}
        <motion.div variants={itemVariants} className="mt-12 relative overflow-hidden rounded-3xl border border-fuchsia-600/30 bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 via-transparent to-transparent opacity-50"></div>
          <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-fuchsia-600 flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.4)] shrink-0">
                <Zap size={32} className="text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-black italic uppercase tracking-tight mb-2">Pikachu te poate ajuta</h4>
                <p className="text-gray-400 font-medium text-sm max-w-md">
                  Nu ești sigur ce să alegi astăzi? Întreabă asistentul nostru inteligent ce program să execuți.
                </p>
              </div>
            </div>
            <Link href="/">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap">
                Deschide Chat-ul AI
              </button>
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </main>
  );
}