"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
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
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg("");
    reset(); 
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        router.push('/dashboard'); 
      } else {
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: { full_name: data.name } 
          }
        });
        if (error) throw error;
        router.push('/onboarding');
      }
    } catch (error: any) {
      setErrorMsg(error.message || "A apărut o eroare de conectare.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            {isLogin ? "Loghează-te pentru a-ți accesa dashboard-ul." : "Creează un cont pentru a-ți atinge potențialul."}
          </p>
        </div>

        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium p-4 rounded-2xl mb-6 text-center shadow-[0_0_15px_rgba(239,68,68,0.1)]"
          >
            {errorMsg === "Invalid login credentials" ? "Email sau parolă incorecte." : errorMsg}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Input Nume (Doar la înregistrare) */}
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Email */}
          <div>
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
          </div>

          {/* Input Parolă */}
          <div>
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
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm font-medium">
            {isLogin ? "Nu ai cont încă?" : "Ai deja un cont creat?"}{" "}
            <button 
              onClick={toggleMode} 
              type="button"
              className="text-fuchsia-400 font-bold hover:text-white hover:underline transition-colors"
            >
              {isLogin ? "Înregistrează-te" : "Loghează-te aici"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}