"use client";

import React, { useState } from 'react';
<<<<<<< HEAD
import { useRouter } from 'next/navigation'; // Adăugat pentru redirecționare
import { useAuth } from '@/lib/useAuth';
=======
import { useAuth } from '@/lib/useAuth';
// Importăm contextul global în loc de hook-ul local
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
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

export default function PremiumNutritionApp() {
  const { userId } = useAuth();
<<<<<<< HEAD
  const router = useRouter(); // Inițializăm router-ul
  
  // 1. UTILIZĂM DATELE DIN CONTEXTUL GLOBAL
  const { dailyStats } = useDashboardContext();
  const { 
    meals, waterGlasses, totalCalories, totalProteins, 
    burnedCalories, // NOU: Extragem caloriile arse
=======
  
  // 1. UTILIZĂM DATELE DIN CONTEXTUL GLOBAL (Fără lag la navigare)
  const { dailyStats } = useDashboardContext();
  const { 
    meals, waterGlasses, totalCalories, totalProteins, 
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
    isSavingMeal, isSavingWater, addMeal, drinkWater 
  } = dailyStats;

  // 2. STĂRI DOAR PENTRU UI
  const [isCalorieModalOpen, setIsCalorieModalOpen] = useState(false);
  const [isProteinModalOpen, setIsProteinModalOpen] = useState(false);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);

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

<<<<<<< HEAD
  // NOU: Ce se întâmplă când dă click pe cardul de Calorii Arse
  const handleWorkoutClick = () => {
    if (userId) router.push('/dashboard/antrenamente');
    else alert("Pika! ⚡ Loghează-te pentru a-ți vedea antrenamentele!");
  };

=======
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
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
      <StarsCanvas />

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
<<<<<<< HEAD
          burnedCalories={burnedCalories || 0} // Trimitem valoarea către grid
=======
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
          handleCalorieClick={handleCalorieClick}
          handleProteinClick={handleProteinClick}
          handleWaterClick={handleWaterClick}
          handleDrinkWater={handleDrinkWaterClick}
<<<<<<< HEAD
          handleWorkoutClick={handleWorkoutClick} // Trimitem funcția de click
        />
      </div>
      
      <RotatingTickets />
      <TestimonialsSection />
=======
        />
      </div>

      <TestimonialsSection />
      <RotatingTickets />
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
      <SponsorsSection />
      <ContactSection />

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
      
    </main>
  );
}