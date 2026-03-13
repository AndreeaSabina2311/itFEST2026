"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Meal } from '@/types';

export function useDailyStats(userId: string | null | undefined) {
  // --- STĂRI ---
  const [meals, setMeals] = useState<Meal[]>([]);
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [todayWorkout, setTodayWorkout] = useState("Fără antrenament");
<<<<<<< HEAD
  const [burnedCalories, setBurnedCalories] = useState(0); // NOU
=======
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
  const [loading, setLoading] = useState(true);
  const [isSavingMeal, setIsSavingMeal] = useState(false);
  const [isSavingWater, setIsSavingWater] = useState(false);

  // --- FETCH RAPID (TOATE SIMULTAN) ---
  const fetchTodayData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];

    try {
      const [ waterRes, mealsRes, exercisesRes ] = await Promise.all([
        supabase.from('daily_stats').select('water_glasses').eq('user_id', userId).eq('date', today).maybeSingle(),
        supabase.from('meals').select('*').eq('user_id', userId).eq('date', today).order('created_at', { ascending: true }),
<<<<<<< HEAD
        // Selectăm și calories_burned pentru a le putea aduna (eliminăm limit(1) ca să putem calcula totalul)
        supabase.from('exercises').select('name, calories_burned').eq('user_id', userId).eq('date', today)
=======
        supabase.from('exercises').select('name').eq('user_id', userId).eq('date', today).limit(1)
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
      ]);

      if (waterRes.data) setWaterGlasses(waterRes.data.water_glasses || 0);
      if (mealsRes.data) setMeals(mealsRes.data);
<<<<<<< HEAD
      
      if (exercisesRes.data) {
        // Dacă are cel puțin un exercițiu, îi setăm numele ultimului ca "workout de azi"
        if (exercisesRes.data.length > 0) {
          setTodayWorkout(exercisesRes.data[0].name);
        }
        
        // NOU: Calculăm totalul de calorii arse
        const totalBurned = exercisesRes.data.reduce((sum, ex) => sum + (ex.calories_burned || 0), 0);
        setBurnedCalories(totalBurned);
      }
=======
      if (exercisesRes.data && exercisesRes.data.length > 0) setTodayWorkout(exercisesRes.data[0].name);
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034

    } catch (error) {
      console.error("Eroare la fetch-ul datelor:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Executăm fetch-ul la încărcare
  useEffect(() => {
    fetchTodayData();
  }, [fetchTodayData]);

  // --- ACȚIUNI (ADĂUGARE DATE) ---
  const addMeal = async (name: string, calories: number, protein: number) => {
    if (!userId) return false;
    setIsSavingMeal(true);
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const { data, error } = await supabase
        .from('meals')
        .insert([{ user_id: userId, date: today, name, calories, protein }])
        .select()
        .single();

      if (error) throw error;
      setMeals(prev => [...prev, data]);
      return true;
    } catch (error) {
      console.error("Eroare la adăugarea mesei:", error);
      return false;
    } finally {
      setIsSavingMeal(false);
    }
  };

  const drinkWater = async () => {
    if (!userId) return false;
    setIsSavingWater(true);
    const newWaterCount = waterGlasses + 1;
    setWaterGlasses(newWaterCount); // Optimistic UI update
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const { error } = await supabase
        .from('daily_stats')
        .upsert({ user_id: userId, date: today, water_glasses: newWaterCount }, { onConflict: 'user_id, date' });
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Eroare la salvarea apei:", error);
      setWaterGlasses(prev => prev - 1); // Revert
      return false;
    } finally {
      setIsSavingWater(false);
    }
  };

  // --- CALCULE UTILE ---
  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const totalProteins = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);

  return {
    meals,
    waterGlasses,
    todayWorkout,
<<<<<<< HEAD
    burnedCalories, // Exportăm caloriile arse către context
=======
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
    totalCalories,
    totalProteins,
    loading,
    isSavingMeal,
    isSavingWater,
    addMeal,
    drinkWater,
    refreshData: fetchTodayData
  };
}