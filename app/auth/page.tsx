"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
<<<<<<< HEAD
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
=======
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight } from 'lucide-react';
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
import Link from 'next/link';

// --- SCHEMELE DE VALIDARE (ZOD) ---
const loginSchema = z.object({
  email: z.string().email("Introdu o adresă de email validă"),
  password: z.string().min(6, "Parola trebuie să aibă minim 6 caractere"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(3, "Numele trebuie să aibă minim 3 caractere"),
});

export default function AuthPage() {
  const router = useRouter();
<<<<<<< HEAD
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

=======
  const [isLogin, setIsLogin] = useState(true); // Toggle între Login și Creare Cont
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Setup pentru formular (comută schema în funcție de starea isLogin)
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg("");
<<<<<<< HEAD
    reset(); 
=======
    reset(); // Curăță inputurile când schimbi modul
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
<<<<<<< HEAD
=======
        // --- LOGICA DE LOGARE ---
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
<<<<<<< HEAD
        router.push('/dashboard'); 
      } else {
=======
        router.push('/dashboard'); // Dacă logarea e ok, merge pe Dashboard
      } else {
        // --- LOGICA DE CREARE CONT ---
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
<<<<<<< HEAD
            data: { full_name: data.name } 
          }
        });
        if (error) throw error;
=======
            data: { full_name: data.name } // Salvăm numele în metadata Supabase
          }
        });
        if (error) throw error;
        
        // Dacă s-a creat contul cu succes, îl trimitem la Onboarding (pagină completare date)
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        router.push('/onboarding');
      }
    } catch (error: any) {
      setErrorMsg(error.message || "A apărut o eroare de conectare.");
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-fuchsia-500/30">
      
      {/* Background Glows Premium */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Buton Înapoi la Home Premium */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 sm:top-10 sm:left-10 group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 z-20 shadow-lg"
      >
        <ArrowLeft size={18} className="text-gray-400 group-hover:-translate-x-1 group-hover:text-fuchsia-400 transition-all duration-300" />
        <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300">
          Înapoi acasă
        </span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-[2.5rem] backdrop-blur-2xl relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
      >
        <div className="mb-10 text-center">
          <motion.h1 
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black italic uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            {isLogin ? "Bine ai revenit" : "Începe călătoria"}
          </motion.h1>
          <p className="text-gray-400 mt-3 text-sm font-medium">
=======
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Buton Înapoi la Home */}
      <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 z-20">
        ← Acasă
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-8 sm:p-10 rounded-[32px] backdrop-blur-xl relative z-10 shadow-2xl shadow-black/50"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            {isLogin ? "Bine ai revenit" : "Începe călătoria"}
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
            {isLogin ? "Loghează-te pentru a-ți accesa dashboard-ul." : "Creează un cont pentru a-ți atinge potențialul."}
          </p>
        </div>

        {errorMsg && (
<<<<<<< HEAD
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium p-4 rounded-2xl mb-6 text-center shadow-[0_0_15px_rgba(239,68,68,0.1)]"
          >
            {errorMsg === "Invalid login credentials" ? "Email sau parolă incorecte." : errorMsg}
          </motion.div>
=======
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-6 text-center">
            {errorMsg === "Invalid login credentials" ? "Email sau parolă incorecte." : errorMsg}
          </div>
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Input Nume (Doar la înregistrare) */}
<<<<<<< HEAD
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon size={18} className="text-gray-500 group-focus-within:text-fuchsia-400 transition-colors duration-300" />
                  </div>
                  <input 
                    {...register("name")} 
                    placeholder="Numele complet" 
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:bg-white/5 focus:border-fuchsia-500/50 focus:ring-4 focus:ring-fuchsia-500/10 transition-all outline-none" 
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-2 ml-2 font-medium">{errors.name.message?.toString()}</p>}
=======
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <UserIcon size={14}/> Numele tău
                </label>
                <input 
                  {...register("name")} 
                  placeholder="Ex: Artur Ionescu" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" 
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message?.toString()}</p>}
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Email */}
          <div>
<<<<<<< HEAD
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500 group-focus-within:text-fuchsia-400 transition-colors duration-300" />
              </div>
              <input 
                {...register("email")} 
                type="email"
                placeholder="Adresa de email" 
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:bg-white/5 focus:border-fuchsia-500/50 focus:ring-4 focus:ring-fuchsia-500/10 transition-all outline-none" 
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-2 ml-2 font-medium">{errors.email.message?.toString()}</p>}
=======
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Mail size={14}/> Adresa de Email
            </label>
            <input 
              {...register("email")} 
              type="email"
              placeholder="Ex: salut@email.com" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" 
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message?.toString()}</p>}
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
          </div>

          {/* Input Parolă */}
          <div>
<<<<<<< HEAD
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500 group-focus-within:text-fuchsia-400 transition-colors duration-300" />
              </div>
              <input 
                {...register("password")} 
                type="password"
                placeholder="Parola" 
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:bg-white/5 focus:border-fuchsia-500/50 focus:ring-4 focus:ring-fuchsia-500/10 transition-all outline-none" 
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-2 ml-2 font-medium">{errors.password.message?.toString()}</p>}
          </div>

          {/* Buton Submit Premium */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-8 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:-translate-y-1"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isLogin ? "Conectare" : "Creează Cont"} 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
=======
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Lock size={14}/> Parolă
            </label>
            <input 
              {...register("password")} 
              type="password"
              placeholder="••••••••" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none" 
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message?.toString()}</p>}
          </div>

          {/* Buton Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isLogin ? "Conectare" : "Creează Cont"} <ArrowRight size={18} />
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
<<<<<<< HEAD
          <p className="text-gray-400 text-sm font-medium">
=======
          <p className="text-gray-500 text-sm">
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
            {isLogin ? "Nu ai cont încă?" : "Ai deja un cont creat?"}{" "}
            <button 
              onClick={toggleMode} 
              type="button"
<<<<<<< HEAD
              className="text-fuchsia-400 font-bold hover:text-white hover:underline transition-colors"
=======
              className="text-fuchsia-500 font-bold hover:underline"
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
            >
              {isLogin ? "Înregistrează-te" : "Loghează-te aici"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}