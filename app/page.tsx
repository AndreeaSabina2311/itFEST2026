"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useDashboardContext } from '@/lib/context/DashboardContext'; 
import { AnimatePresence } from 'framer-motion';

// --- COMPONENTE SHARED & CANVAS ---
import Navbar from '@/app/components/shared/Navbar';
import StarsCanvas from '@/app/components/canvas/Stars';

// --- COMPONENTE LANDING PAGE ---
import HeroSection from '@/app/components/landing/HeroSection';
import StatsBentoGrid from '@/app/components/landing/StatsBentoGrid';
import TestimonialsSection from '@/app/components/landing/TestimonialsSection';
import RotatingTickets from '@/app/components/landing/RotatingTickets';
import SponsorsSection from '@/app/components/landing/SponsorsSection';
import ContactSection from '@/app/components/landing/ContactSection';

// --- MODALE ---
import CalorieModal from '@/app/components/modals/CalorieModal';
import ProteinModal from '@/app/components/modals/ProteinModal';
import WaterModal from '@/app/components/modals/WaterModal';
import WorkoutModal from '@/app/components/modals/WorkoutModal'; // NOU: Importăm modalul pentru antrenamente

export default function PremiumNutritionApp() {
  const { userId } = useAuth();
  
  // 1. UTILIZĂM DATELE DIN CONTEXTUL GLOBAL
  const { dailyStats } = useDashboardContext();
  const { 
    meals, 
    exercises, // NOU: Extragem lista de exerciții
    waterGlasses, 
    totalCalories, 
    totalProteins, 
    burnedCalories, 
    isSavingMeal, 
    isSavingWater, 
    addMeal, 
    drinkWater 
  } = dailyStats;

  // 2. STĂRI DOAR PENTRU UI
  const [isCalorieModalOpen, setIsCalorieModalOpen] = useState(false);
  const [isProteinModalOpen, setIsProteinModalOpen] = useState(false);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false); // NOU: Stare pentru modalul de antrenamente

  const [newMealName, setNewMealName] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('');
  const [newMealProtein, setNewMealProtein] = useState('');

  // 3. HANDLERE PENTRU INTERACȚIUNI
  const handleCalorieClick = () => {
    if (userId) setIsCalorieModalOpen(true);
    else alert("Pika! ⚡ Loghează-te pentru a-ți adăuga mesele!");
  };

  const handleProteinClick = () => {
    if (userId) setIsProteinModalOpen(true);
    else alert("Pika! ⚡ Loghează-te pentru a vedea aportul proteic!");
  };

  const handleWaterClick = () => {
    if (userId) setIsWaterModalOpen(true);
    else alert("Pika-pi! 💧 Loghează-te pentru a salva hidratarea!");
  };

  const handleDrinkWaterClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (userId) await drinkWater();
  };

  // NOU: Acum deschide modalul de antrenamente
  const handleWorkoutClick = () => {
    if (userId) setIsWorkoutModalOpen(true);
    else alert("Pika! ⚡ Loghează-te pentru a-ți vedea antrenamentele!");
  };

  const handleAddMealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !newMealName || !newMealCalories) return;

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

  return (
    <main className="relative min-h-screen bg-[#030303] text-white font-sans overflow-hidden selection:bg-fuchsia-600 selection:text-white">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* FUNDAL 3D STELE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsCanvas />
      </div>

      <div className="relative z-10">
        {/* NAVBAR */}
        <Navbar />

        {/* HERO SECTION & BENTO GRID */}
        <div className="max-w-7xl mx-auto px-6 pt-40 pb-20 grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8 items-center min-h-screen">
          <HeroSection />

          <StatsBentoGrid
            totalCalories={totalCalories}
            mealsCount={meals.length}
            totalProteins={totalProteins}
            currentWater={waterGlasses}
            isSavingWater={isSavingWater}
            burnedCalories={burnedCalories || 0}
            handleCalorieClick={handleCalorieClick}
            handleProteinClick={handleProteinClick}
            handleWaterClick={handleWaterClick}
            handleDrinkWater={handleDrinkWaterClick}
            handleWorkoutClick={handleWorkoutClick}
          />
        </div>
        
        <RotatingTickets />
        <TestimonialsSection />
        <SponsorsSection />
        <ContactSection />
      </div>

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
        {isProteinModalOpen && (
          <ProteinModal 
            isOpen={isProteinModalOpen} 
            onClose={() => setIsProteinModalOpen(false)} 
            totalProteins={totalProteins}
            meals={meals}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWaterModalOpen && (
          <WaterModal 
            isOpen={isWaterModalOpen} 
            onClose={() => setIsWaterModalOpen(false)} 
            currentWater={waterGlasses} 
          />
        )}
      </AnimatePresence>

      {/* NOU: Modalul pentru antrenamente */}
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