"use client";

<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardContext } from '@/src/context/DashboardContext';
import { Activity, BarChart3, TrendingUp, Zap, Cpu, Sparkles } from 'lucide-react';
=======
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardContext } from '@/src/context/DashboardContext';
>>>>>>> d351a2d (added Antrenaments)

import DashboardHeader from '@/src/components/dashboard/DashboardHeader';
import DashboardStatsGrid from '@/src/components/dashboard/DashboardStatsGrid';
import FitnessCalendar from '@/src/components/dashboard/FitnessCalendar';
import MealsList from '@/src/components/dashboard/MealsList';
import CalorieModal from '@/src/components/modals/CalorieModal';
import WorkoutModal from '@/src/components/modals/WorkoutModal';
<<<<<<< HEAD
import WaterModal from '@/src/components/modals/WaterModal';

// --- DATE MOCK PENTRU GRAFICE STATICE ---
const mockGraphData = {
  zile: [
    { label: 'Lun', value: 65, calories: 2100 },
    { label: 'Mar', value: 45, calories: 1800 },
    { label: 'Mie', value: 85, calories: 2600 },
    { label: 'Joi', value: 55, calories: 2000 },
    { label: 'Vin', value: 95, calories: 2900 },
    { label: 'Sâm', value: 75, calories: 2400 },
    { label: 'Dum', value: 60, calories: 2150 },
  ],
  saptamani: [
    { label: 'Săpt 1', value: 70, calories: 15400 },
    { label: 'Săpt 2', value: 85, calories: 17200 },
    { label: 'Săpt 3', value: 65, calories: 14800 },
    { label: 'Săpt 4', value: 90, calories: 18500 },
  ],
  luni: [
    { label: 'Ian', value: 55, calories: 65000 },
    { label: 'Feb', value: 75, calories: 72000 },
    { label: 'Mar', value: 85, calories: 78000 },
    { label: 'Apr', value: 45, calories: 54000 },
    { label: 'Mai', value: 95, calories: 85000 },
  ]
};

type TimeRange = 'zile' | 'saptamani' | 'luni';
=======
import WaterModal from '@/src/components/modals/WaterModal'; // Importăm modalul
>>>>>>> d351a2d (added Antrenaments)

export default function Dashboard() {
  const { dailyStats } = useDashboardContext();
  const { meals, exercises, waterGlasses, burnedCalories, loading, isSavingMeal, isSavingWater, addMeal, deleteExercise, drinkWater } = dailyStats;

  const [isCalorieModalOpen, setIsCalorieModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false); 
<<<<<<< HEAD
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [mealForm, setMealForm] = useState({ name: '', calories: '', protein: '' });
  
  const [timeRange, setTimeRange] = useState<TimeRange>('zile');
=======
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false); // State pentru apă

  const [mealForm, setMealForm] = useState({ name: '', calories: '', protein: '' });
>>>>>>> d351a2d (added Antrenaments)

  const handleAddMealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealForm.name || !mealForm.calories) return;
<<<<<<< HEAD
=======

>>>>>>> d351a2d (added Antrenaments)
    const success = await addMeal(mealForm.name, parseInt(mealForm.calories), parseInt(mealForm.protein) || 0);
    if (success) {
      setMealForm({ name: '', calories: '', protein: '' });
      setIsCalorieModalOpen(false); 
<<<<<<< HEAD
=======
    } else {
      alert("A apărut o eroare la salvarea mesei.");
>>>>>>> d351a2d (added Antrenaments)
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } } };

  return (
<<<<<<< HEAD
    <main className="w-full flex-1 p-6 lg:p-12 relative z-10 overflow-hidden">
      {/* Ambient Glows de fundal pentru un efect mai dramatic */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div className="max-w-7xl mx-auto space-y-10" initial="hidden" animate="show" variants={containerVariants}>
=======
    <main className="w-full flex-1 p-6 lg:p-12 relative z-10">
      <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="show" variants={containerVariants}>
>>>>>>> d351a2d (added Antrenaments)
        
        <motion.div variants={itemVariants}>
          <DashboardHeader />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardStatsGrid 
             onOpenWorkout={() => setIsWorkoutModalOpen(true)} 
<<<<<<< HEAD
             onOpenWater={() => setIsWaterModalOpen(true)}
          />
        </motion.div>

        {/* --- CENTRUL DE COMANDĂ (GRAFICE + INOVAȚII AI) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Graficul de Performanță (Ocupă 2 coloane) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[32px] p-6 lg:p-8 backdrop-blur-md relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-3xl group-hover:bg-fuchsia-500/10 transition-all duration-700 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-fuchsia-500/20 p-3 rounded-xl border border-fuchsia-500/30">
                  <BarChart3 className="text-fuchsia-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Evoluție Performanță</h2>
                  <p className="text-sm text-gray-400">Activitatea și caloriile arse în timp</p>
                </div>
              </div>

              <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
                {(['zile', 'saptamani', 'luni'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      timeRange === range 
                        ? 'bg-fuchsia-600/20 text-fuchsia-400 shadow-md border border-fuchsia-500/30' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 sm:h-72 flex items-end justify-between gap-2 sm:gap-4 relative z-10 pt-10">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full border-b border-gray-500 border-dashed h-0" />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={timeRange}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-end justify-between gap-2 sm:gap-6 px-2 sm:px-6"
                >
                  {mockGraphData[timeRange].map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 group/bar relative">
                      {/* Tooltip Holografic */}
                      <div className="opacity-0 group-hover/bar:opacity-100 transition-all absolute -top-12 bg-black/90 border border-fuchsia-500/50 px-3 py-2 rounded-xl text-xs font-bold text-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.3)] flex items-center gap-2 pointer-events-none whitespace-nowrap z-20 backdrop-blur-md transform scale-95 group-hover/bar:scale-100">
                        <TrendingUp size={14} /> {item.calories} kcal
                      </div>
                      
                      <div className="w-full relative h-full flex items-end justify-center">
                        <motion.div 
                          initial={{ height: 0 }} animate={{ height: `${item.value}%` }} transition={{ duration: 0.8, delay: index * 0.05, type: "spring" }}
                          className="w-full max-w-[40px] bg-gradient-to-t from-fuchsia-600/20 via-fuchsia-500/60 to-fuchsia-400 rounded-t-xl relative overflow-hidden border-t border-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(to_top,transparent,rgba(255,255,255,0.4))] opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                        </motion.div>
                      </div>
                      <span className="text-gray-400 text-xs sm:text-sm font-bold mt-4 tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 2. ZONA SPECTACULOASĂ (Nucleul Metabolic & AI) Ocupă 1 coloană */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            
            {/* Nucleul Metabolic */}
            <div className="bg-[#0a0a0a]/60 border border-white/10 rounded-[32px] p-6 relative overflow-hidden h-64 flex flex-col items-center justify-center backdrop-blur-xl shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
              <h3 className="absolute top-6 left-6 text-sm font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
                <Activity size={16} className="text-blue-400" />
                Ritm Metabolic
              </h3>
              
              {/* Orb 3D Animat */}
              <div className="relative flex items-center justify-center mt-4">
                {/* Undă 1 (Exterioară) */}
                <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute w-40 h-40 rounded-full border border-blue-500/30" />
                {/* Undă 2 (Rotire Dashed) */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32 rounded-full border-2 border-dashed border-cyan-400/50" />
                {/* Core-ul Radiant */}
                <motion.div animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px #06b6d4", "0 0 60px #06b6d4", "0 0 20px #06b6d4"] }} transition={{ duration: 2, repeat: Infinity }} className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center z-10">
                  <Zap className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" size={32} />
                </motion.div>
              </div>
              <div className="absolute bottom-6 text-center w-full">
                <span className="text-2xl font-black text-white tracking-tighter">OPTIM</span>
                <p className="text-xs text-cyan-400 font-bold tracking-widest uppercase mt-1">Sinteză Activă</p>
              </div>
            </div>

            {/* Terminal AI Insights */}
            <div className="flex-1 bg-gradient-to-br from-[#120518] to-[#0a0a0a] border border-fuchsia-500/20 rounded-[32px] p-6 relative overflow-hidden group">
              {/* Linia de Scanare Laser */}
              <motion.div animate={{ y: ['0%', '300%', '0%'] }} transition={{ duration: 4, ease: "linear", repeat: Infinity }} className="absolute left-0 right-0 top-0 h-[2px] bg-fuchsia-500/50 shadow-[0_0_15px_#d946ef] z-20 w-full opacity-50" />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="bg-fuchsia-600/20 p-2 rounded-lg border border-fuchsia-500/30 animate-pulse">
                  <Cpu className="text-fuchsia-400" size={18} />
                </div>
                <h3 className="text-sm font-bold text-fuchsia-400 tracking-widest uppercase">AI Coach Sync</h3>
              </div>

              <div className="space-y-3 relative z-10 font-mono text-sm">
                <p className="text-gray-300">
                  <span className="text-fuchsia-500 font-bold">{">"}</span> Analiză date curente...
                </p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-300 leading-relaxed">
                  <span className="text-fuchsia-500 font-bold">{">"}</span> Rata de recuperare excelentă. Recomand <span className="text-white font-bold bg-white/10 px-1 rounded">20 min Cardio HIIT</span> astăzi pentru a maximiza arderea calorică.
                </motion.p>
                <div className="flex items-center gap-2 text-xs text-green-400 mt-4 pt-4 border-t border-white/10">
                  <Sparkles size={14} />
                  Sistem Optimizat
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* --- CALENDAR ȘI MESE --- */}
=======
             onOpenWater={() => setIsWaterModalOpen(true)} // Trimitem funcția!
          />
        </motion.div>

>>>>>>> d351a2d (added Antrenaments)
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 min-h-[500px]">
          <motion.div variants={itemVariants} className="h-full">
            <FitnessCalendar />
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <MealsList 
              meals={meals} 
              loading={loading} 
              onAddClick={() => setIsCalorieModalOpen(true)} 
            />
          </motion.div>
        </div>
      </motion.div>

<<<<<<< HEAD
      {/* --- MODALE --- */}
=======
>>>>>>> d351a2d (added Antrenaments)
      <AnimatePresence>
        {isCalorieModalOpen && (
          <CalorieModal isOpen={isCalorieModalOpen} onClose={() => setIsCalorieModalOpen(false)} meals={meals} newMealName={mealForm.name} setNewMealName={(val) => setMealForm(prev => ({...prev, name: val}))} newMealCalories={mealForm.calories} setNewMealCalories={(val) => setMealForm(prev => ({...prev, calories: val}))} newMealProtein={mealForm.protein} setNewMealProtein={(val) => setMealForm(prev => ({...prev, protein: val}))} isSavingMeal={isSavingMeal} handleAddMeal={handleAddMealSubmit} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWorkoutModalOpen && (
          <WorkoutModal isOpen={isWorkoutModalOpen} onClose={() => setIsWorkoutModalOpen(false)} burnedCalories={burnedCalories || 0} exercises={exercises} deleteExercise={deleteExercise} />
        )}
      </AnimatePresence>

<<<<<<< HEAD
=======
      {/* Adăugăm Modalul de apă și aici */}
>>>>>>> d351a2d (added Antrenaments)
      <AnimatePresence>
        {isWaterModalOpen && (
          <WaterModal 
            isOpen={isWaterModalOpen} 
            onClose={() => setIsWaterModalOpen(false)} 
            waterGlasses={waterGlasses}
            drinkWater={drinkWater}
            isSavingWater={isSavingWater}
          />
        )}
      </AnimatePresence>
    </main>
  );
}