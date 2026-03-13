"use client";

import React, { useState } from 'react';
<<<<<<< HEAD
import { useRouter } from 'next/navigation'; // NOU: Pentru redirecționări
=======
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Droplet, Dumbbell } from 'lucide-react';

// Importăm contextul global pentru a elimina lag-ul de fetch
import { useDashboardContext } from '@/lib/context/DashboardContext';

// Componente shared
import UserProfile from '@/app/components/shared/UserProfile';
import FitnessCalendar from '@/app/components/shared/FitnessCalendar';
import CalorieModal from '@/app/components/modals/CalorieModal';

// Componente specifice dashboard-ului
import StatCard from '@/app/components/dashboard/StatCard';
import MealsList from '@/app/components/dashboard/MealsList';

export default function Dashboard() {
<<<<<<< HEAD
  const router = useRouter(); // Inițializare router
  const { dailyStats } = useDashboardContext();
  
  // Extragem datele și noile funcții pentru apă
=======
  // Extragem dailyStats direct din memorie prin contextul global
  const { dailyStats } = useDashboardContext();
  
  // Destructurăm datele de care avem nevoie
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
  const { 
    meals, 
    waterGlasses, 
    todayWorkout, 
    totalCalories, 
    loading, 
    isSavingMeal, 
<<<<<<< HEAD
    addMeal,
    drinkWater, // Extragem funcția
    isSavingWater // Extragem statusul de loading
  } = dailyStats;

=======
    addMeal 
  } = dailyStats;

  // Stări locale doar pentru controlul formularului din modal
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
  const [isCalorieModalOpen, setIsCalorieModalOpen] = useState(false);
  const [newMealName, setNewMealName] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('');
  const [newMealProtein, setNewMealProtein] = useState('');

<<<<<<< HEAD
=======
  // Handler pentru adăugarea unei mese (folosește funcția addMeal din context)
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
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

<<<<<<< HEAD
  // Funcție pentru click-ul pe cardul de apă
  const handleWaterClick = async () => {
    if (isSavingWater || waterGlasses >= 8) return;
    await drinkWater();
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } } };

  return (
    <main className="h-full w-full p-6 lg:p-12 overflow-y-auto relative z-10 custom-scrollbar">
      <motion.div className="max-w-5xl mx-auto" initial="hidden" animate="show" variants={containerVariants}>
=======
  // Variante pentru animații fluide
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
        className="max-w-5xl mx-auto" 
        initial="hidden" 
        animate="show" 
        variants={containerVariants}
      >
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        
        {/* Header Secțiune */}
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-10">
          <div>
            <p className="text-fuchsia-600 font-mono text-sm tracking-widest uppercase mb-1">
              {new Date().toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <h1 className="text-4xl font-black italic tracking-tight">Salut, Rege! ⚡</h1>
          </div>
          
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 p-[2px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            <div className="h-full w-full bg-black rounded-full flex items-center justify-center overflow-hidden">
              <UserProfile />
            </div>
          </div>
        </motion.div>

<<<<<<< HEAD
        {/* Grid Statistici Interactive */}
=======
        {/* Grid Statistici (Datele vin instant din context) */}
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard 
            icon={<Flame className="text-orange-500" />} 
            title="Calorii Consumate" 
            value={loading ? "..." : totalCalories.toLocaleString('en-US')} 
            subtext="/ 2,500 kcal" 
<<<<<<< HEAD
            onClick={() => router.push('/dashboard/nutritie')} // Click către Nutriție
          />
          <StatCard 
            icon={<Droplet className="text-cyan-500" />} 
            title="Hidratare" 
            value={loading ? "..." : `${(waterGlasses * 0.25).toFixed(1)}L`} 
            subtext={waterGlasses >= 8 ? "Obiectiv atins! 💧" : `Apasa pt +1 pahar (${waterGlasses}/8)`} 
            onClick={handleWaterClick} // Adaugă apă instant
=======
          />
          <StatCard 
            icon={<Droplet className="text-blue-500" />} 
            title="Hidratare" 
            value={loading ? "..." : `${(waterGlasses * 0.25).toFixed(1)}L`} 
            subtext={`/ 2.0 Litri (${waterGlasses} pahare)`} 
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
          />
          <StatCard 
            icon={<Dumbbell className="text-purple-500" />} 
            title="Antrenament" 
            value={loading ? "..." : todayWorkout} 
            subtext={todayWorkout === "Fără antrenament" ? "Nu uita să te miști!" : "Completat azi"} 
            highlight={todayWorkout !== "Fără antrenament"} 
<<<<<<< HEAD
            onClick={() => router.push('/dashboard/antrenamente')} // Click către Antrenamente
=======
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
          />
        </motion.div>

        {/* Zona de Calendar și Lista de Mese */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <FitnessCalendar />
          </motion.div>

          <MealsList 
            variants={itemVariants} 
            meals={meals} 
            loading={loading} 
            onAddClick={() => setIsCalorieModalOpen(true)} 
          />
        </div>
      </motion.div>

      {/* Modalul pentru adăugarea meselor */}
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
    </main>
  );
}