import React from 'react';
import { Meal } from '@/types'; // Importăm tipul definit anterior
import MealItem from './MealItem';
import { motion } from 'framer-motion';

type MealsListProps = {
  meals: Meal[];
  loading: boolean;
  onAddClick: () => void;
  variants?: any;
};

export default function MealsList({ meals, loading, onAddClick, variants }: MealsListProps) {
  return (
    <motion.div variants={variants} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col h-full">
      <h3 className="text-xl font-bold mb-6">Mesele de azi</h3>
      
      {/* Lista cu custom scrollbar */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {loading ? (
          <p className="text-gray-500 text-sm text-center py-4">Se încarcă mesele...</p>
        ) : meals.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">Nu ai adăugat nicio masă încă azi.</p>
        ) : (
          meals.map((meal) => {
            const timeString = meal.created_at 
                ? new Date(meal.created_at).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
                : new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
                
            return (
              <MealItem 
                key={meal.id} 
                time={timeString} 
                name={meal.name} 
                cals={`${meal.calories} kcal`} 
                status="done" 
              />
            );
          })
        )}
      </div>
      
      {/* Buton adăugare */}
      <button 
        onClick={onAddClick}
        className="w-full mt-4 py-3 border border-dashed border-white/20 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:border-white/50 hover:bg-white/5 transition-colors shrink-0"
      >
        + Adaugă Masă Nouă
      </button>
    </motion.div>
  );
}