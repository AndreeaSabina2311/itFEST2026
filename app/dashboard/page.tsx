"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Droplet, Dumbbell } from 'lucide-react';

// Importăm contextul global pentru a elimina lag-ul de fetch
import { useDashboardContext } from '@/lib/context/DashboardContext';

// Componente shared
import UserProfile from '@/app/components/shared/UserProfile';
import FitnessCalendar from '@/app/components/shared/FitnessCalendar';
import CalorieModal from '@/app/components/modals/CalorieModal';
import WorkoutModal from '@/app/components/modals/WorkoutModal';

// Componente specifice dashboard-ului
import StatCard from '@/app/components/dashboard/StatCard';
import MealsList from '@/app/components/dashboard/MealsList';

export default function Dashboard() {
  const router = useRouter(); 
  const { dailyStats } = useDashboardContext();
  
  const { 
    meals, 
    exercises, 
    waterGlasses, 
    todayWorkout, 
    totalCalories, 
    burnedCalories, 
    loading, 
    isSavingMeal, 
    addMeal,
    drinkWater, 
    isSavingWater 
  } = dailyStats;

  const [isCalorieModalOpen, setIsCalorieModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false); 

  const [newMealName, setNewMealName] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('');
  const [newMealProtein, setNewMealProtein] = useState('');

  const handleAddMealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName || !newMealCalories) return;

    const success = await addMeal(newMealName, parseInt(newMealCalories), parseInt(newMealProtein) || 0);
    if (success) {
      setNewMealName(''); 
      setNewMealCalories(''); 
      setNewMealProtein('');
      setIsCalorieModalOpen(false); 
    } else {
      alert("A apărut o eroare la salvarea mesei.");
    }
  };

  const handleWaterClick = async () => {
    if (isSavingWater || waterGlasses >= 8) return;
    await drinkWater();
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } } };

  return (
    <main className="h-full w-full p-6 lg:p-12 overflow-y-auto relative z-10 custom-scrollbar">
      <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="show" variants={containerVariants}>
        
        {/* Header Secțiune */}
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-10">
          <div>
            <p className="text-fuchsia-600 font-mono text-sm tracking-widest uppercase mb-1">
              {new Date().toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <h1 className="text-4xl font-black italic tracking-tight">Salut, Rege! ⚡</h1>
          </div>
          
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 p-[2px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,70,239,0.3)] cursor-pointer">
            <div className="h-full w-full bg-black rounded-full flex items-center justify-center overflow-hidden">
              <UserProfile />
            </div>
          </div>
        </motion.div>

        {/* Grid Statistici Interactive - Am mărit gap-ul pentru aerisire */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            icon={<Flame className="text-orange-500" />} 
            title="Calorii Consumate" 
            value={loading ? "..." : totalCalories.toLocaleString('en-US')} 
            subtext="/ 2,500 kcal" 
            onClick={() => router.push('/dashboard/nutritie')} 
          />
          <StatCard 
            icon={<Droplet className="text-cyan-500" />} 
            title="Hidratare" 
            value={loading ? "..." : `${(waterGlasses * 0.25).toFixed(1)}L`} 
            subtext={waterGlasses >= 8 ? "Obiectiv atins! 💧" : `Apasa pt +1 pahar (${waterGlasses}/8)`} 
            onClick={handleWaterClick} 
          />
          <StatCard 
            icon={<Dumbbell className="text-purple-500" />} 
            title="Antrenament" 
            value={loading ? "..." : todayWorkout} 
            subtext={todayWorkout === "Fără antrenament" ? "Nu uita să te miști!" : "Completat azi"} 
            highlight={todayWorkout !== "Fără antrenament"} 
            onClick={() => setIsWorkoutModalOpen(true)} 
          />
        </motion.div>

        {/* Zona Aerisită: Calendar și Lista de Mese */}
        {/* NOU: xl:grid-cols-2 și gap-10 împart ecranul perfect în două jumătăți aerisite pe monitoare */}
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

      {/* --- MODALE --- */}
      <AnimatePresence>
        {isCalorieModalOpen && (
          <CalorieModal 
            isOpen={isCalorieModalOpen} 
            onClose={() => setIsCalorieModalOpen(false)} 
            meals={meals} 
            newMealName={newMealName} 
            setNewMealName={setNewMealName} 
            newMealCalories={newMealCalories} 
            setNewMealCalories={setNewMealCalories} 
            newMealProtein={newMealProtein} 
            setNewMealProtein={setNewMealProtein} 
            isSavingMeal={isSavingMeal} 
            handleAddMeal={handleAddMealSubmit} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWorkoutModalOpen && (
          <WorkoutModal 
            isOpen={isWorkoutModalOpen} 
            onClose={() => setIsWorkoutModalOpen(false)} 
            burnedCalories={burnedCalories || 0}
            exercises={exercises}
          />
        )}
      </AnimatePresence>
    </main>
  );
}