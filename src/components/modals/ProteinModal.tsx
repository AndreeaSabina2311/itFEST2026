"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Activity } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

// Trebuie să copiem și tipul Meal aici ca să știe componenta ce structură au mesele
type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
};

// Definim datele pe care componenta le primește de la pagina principală
interface ProteinModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalProteins: number;
  meals: Meal[];
}

export default function ProteinModal({ isOpen, onClose, totalProteins, meals }: ProteinModalProps) {
  const [targetProtein, setTargetProtein] = useState<number>(160);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUserGoal = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        let { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (!profile) {
          const { data: fallbackProfile } = await supabase.from('users').select('*').eq('id', session.user.id).maybeSingle();
          if (fallbackProfile) profile = fallbackProfile;
        }

        const userMeta = session.user.user_metadata || {};
        
        const rawWeight = userMeta.weight ?? profile?.current_weight ?? profile?.weight ?? 75;
        const rawHeight = userMeta.height ?? profile?.height ?? 170;
        const rawAge = userMeta.age ?? profile?.age ?? 30;
        
        const weight = parseFloat(String(rawWeight)) || 75;
        const height = parseFloat(String(rawHeight)) || 170;
        const age = parseInt(String(rawAge)) || 30;
        
        const gender = String(userMeta.gender ?? profile?.gender ?? 'masculin').toLowerCase();
        const activityLevel = String(userMeta.activity_level ?? profile?.activity_level ?? 'sedentar').toLowerCase();
        const goal = String(userMeta.goal ?? profile?.goal ?? 'mentinere').toLowerCase();

        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr = (gender.includes('masculin') || gender === 'm') ? bmr + 5 : bmr - 161;

        let multiplier = 1.2;
        if (activityLevel.includes('usor') || activityLevel.includes('ușor')) multiplier = 1.375;
        else if (activityLevel.includes('moderat')) multiplier = 1.55;
        else if (activityLevel.includes('foarte') || activityLevel.includes('activ')) multiplier = 1.725;

        let calculatedTdee = Math.round(bmr * multiplier);
        if (goal.includes('slabi') || goal.includes('slăbi') || goal.includes('pierd')) calculatedTdee -= 500;
        else if (goal.includes('masa') || goal.includes('masă') || goal.includes('muscul') || goal.includes('cres')) calculatedTdee += 300;

        const userCalorieGoal = userMeta.calorie_goal ? parseInt(String(userMeta.calorie_goal)) : calculatedTdee;
        
        // 30% din calorii din proteine
        setTargetProtein(Math.round((userCalorieGoal * 0.3) / 4));
      } catch (error) {
        console.error("Eroare la preluarea obiectivului de proteine:", error);
      }
    };

    fetchUserGoal();
  }, [isOpen]);

  if (!isOpen) return null; // Nu randăm nimic dacă e închis

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg relative shadow-[0_0_40px_rgba(59,130,246,0.15)]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-xl">
            <Activity className="text-blue-400" size={24} />
          </div>
          Sinteză Proteică
        </h2>
        <p className="text-gray-400 text-sm mb-6">Aportul de proteine din mesele tale de azi.</p>
        
        <div className="flex items-center justify-between text-sm bg-blue-500/10 text-blue-400 p-4 rounded-xl border border-blue-500/20 mb-4">
          <span className="font-semibold">Total Consumat:</span>
          <span className="font-bold text-xl text-white">{totalProteins} / {targetProtein} g</span>
        </div>

        <div className="space-y-3">
          {meals.map((meal) => (
            <div key={meal.id} className="flex justify-between items-center bg-white/5 border border-white/5 p-3 px-4 rounded-xl">
              <span className="text-gray-300 font-medium">{meal.name}</span>
              <span className="font-bold text-blue-400">+{meal.protein} g</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}