"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, MapPin, Scale, Ruler, Target, Activity, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/useAuth'; 

// 1. Schema de validare Zod
const onboardingSchema = z.object({
  nume: z.string().min(3, "Numele trebuie să aibă minim 3 caractere"),
  sex: z.enum(["Masculin", "Feminin"], { required_error: "Selectează sexul" }),
  tara: z.string().min(2, "Introdu o țară validă"),
  greutate: z.string().min(1, "Introdu greutatea (ex: 75)"),
  inaltime: z.string().min(1, "Introdu înălțimea (ex: 180)"),
  obiectiv: z.enum(["Slăbire", "Menținere", "Masă Musculară"], { required_error: "Alege un obiectiv" }),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configurăm React Hook Form
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
  });

  const selectedSex = watch('sex');
  const selectedObiectiv = watch('obiectiv');

  // Funcția care se rulează la apăsarea butonului de submit
  const onSubmit = async (data: OnboardingFormValues) => {
    setIsSubmitting(true);

    try {
      // 1. Luăm datele utilizatorului direct din Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        alert("Sesiunea a expirat sau nu ești conectat. Te rugăm să te loghezi din nou.");
        router.push('/auth');
        return; // Oprim execuția aici
      }

      // 2. Salvăm datele în Supabase (într-un tabel numit 'users')
      const { error } = await supabase.from('users').upsert({
        id: user.id, // ID-ul din Supabase
        email: user.email, // Email-ul din Supabase
        name: data.nume,
        gender: data.sex,
        country: data.tara,
        weight: parseFloat(data.greutate),
        height: parseFloat(data.inaltime),
        goal: data.obiectiv,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Dacă totul e ok, îl trimitem pe Dashboard!
      router.push('/dashboard');
    } catch (error) {
      console.error("Eroare la salvare:", error);
      alert("A apărut o eroare. Încearcă din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-[32px] backdrop-blur-xl relative z-10 shadow-2xl shadow-black/50"
      >
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-fuchsia-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-fuchsia-500/30">
            <Activity className="text-fuchsia-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Bine ai venit la <span className="text-fuchsia-500">Q&K Cardio</span></h1>
          <p className="text-gray-400 mt-2 text-sm">Pentru a genera planul perfect pentru tine, AI-ul are nevoie de câteva detalii.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Nume & Țară */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><User size={14}/> Nume Complet</label>
              <input {...register("nume")} placeholder="Ex: Artur Ionescu" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" />
              {errors.nume && <p className="text-red-400 text-xs mt-1">{errors.nume.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><MapPin size={14}/> Țara / Orașul</label>
              <input {...register("tara")} placeholder="Ex: România, București" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" />
              {errors.tara && <p className="text-red-400 text-xs mt-1">{errors.tara.message}</p>}
            </div>
          </div>

          {/* Greutate & Înălțime */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Scale size={14}/> Greutate (kg)</label>
              <input type="number" step="0.1" {...register("greutate")} placeholder="Ex: 75" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" />
              {errors.greutate && <p className="text-red-400 text-xs mt-1">{errors.greutate.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Ruler size={14}/> Înălțime (cm)</label>
              <input type="number" {...register("inaltime")} placeholder="Ex: 180" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" />
              {errors.inaltime && <p className="text-red-400 text-xs mt-1">{errors.inaltime.message}</p>}
            </div>
          </div>

          {/* Sexul */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Sex Biologic</label>
            <div className="grid grid-cols-2 gap-4">
              {["Masculin", "Feminin"].map((s) => (
                <button 
                  type="button" 
                  key={s}
                  onClick={() => setValue("sex", s as any)}
                  className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${selectedSex === s ? 'bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-400' : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors.sex && <p className="text-red-400 text-xs mt-1">{errors.sex.message}</p>}
          </div>

          {/* Obiectivul */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Target size={14}/> Obiectiv Principal</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Slăbire", "Menținere", "Masă Musculară"].map((ob) => (
                <button 
                  type="button" 
                  key={ob}
                  onClick={() => setValue("obiectiv", ob as any)}
                  className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${selectedObiectiv === ob ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  {ob}
                </button>
              ))}
            </div>
            {errors.obiectiv && <p className="text-red-400 text-xs mt-1">{errors.obiectiv.message}</p>}
          </div>

          {/* Buton Submit */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 mt-6 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Salvează Profilul și Începe"}
          </button>
          
        </form>
      </motion.div>
    </div>
  );
}