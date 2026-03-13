"use client";

import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useAuth } from '@/lib/useAuth'; // Noul sistem custom
import UserProfile from './UserProfile'; // Butonul custom de profil

export default function Navbar() {
  const { userId } = useAuth(); // Extragem starea de autentificare

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-fuchsia-600 to-purple-600 p-2 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            <Zap className="text-white" size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Queen&King<span className="text-fuchsia-600 font-light">Cardio</span>
          </span>
        </div>

<<<<<<< HEAD
        {/* Link-uri Meniu (Desktop) - Culorile distincte au revenit! */}
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/dashboard" className="px-5 py-2.5 bg-fuchsia-600 text-white text-sm font-bold rounded-full hover:bg-fuchsia-500 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
            Dashboard
          </Link>
          <Link href="/dashboard/nutritie" className="px-5 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-full hover:bg-purple-500 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            Plan Nutriție
          </Link>
          <Link href="/dashboard/antrenamente" className="px-5 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-full hover:bg-violet-500 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
            Antrenamente
          </Link>
          <Link href="/dashboard/progres" className="px-5 py-2.5 bg-pink-600 text-white text-sm font-bold rounded-full hover:bg-pink-500 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            Progresul meu
          </Link>
=======
        {/* Link-uri Meniu (Desktop) */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/dashboard/nutritie" className="hover:text-white transition-colors">Plan Nutriție</Link>
          <Link href="/dashboard/antrenamente" className="hover:text-white transition-colors">Antrenamente</Link>
          <Link href="/dashboard/progres" className="hover:text-white transition-colors">Progresul meu</Link>
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        </div>

        {/* Butoane Autentificare (Custom) */}
        <div className="flex items-center gap-4">
          {!userId ? (
<<<<<<< HEAD
            /* Ce vede utilizatorul DELOGAT */
            <Link href="/auth">
              <button className="px-5 py-2.5 bg-fuchsia-600 text-white text-sm font-bold rounded-full hover:bg-fuchsia-500 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
=======
            /* Ce vede utilizatorul DELOGAT (fostul SignedOut) */
            <Link href="/auth">
              <button className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-fuchsia-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
                Log In
              </button>
            </Link>
          ) : (
<<<<<<< HEAD
            /* Ce vede utilizatorul LOGAT */
            <div className="border border-white/10 rounded-full p-1 bg-white/5 flex items-center justify-center">
              {/* Înlocuitorul pentru UserButton-ul de la Clerk */}
              <UserProfile />
            </div>
=======
            /* Ce vede utilizatorul LOGAT (fostul SignedIn) */
            <>
              <Link href="/dashboard" className="hidden sm:block px-6 py-2.5 bg-fuchsia-600 text-white text-sm font-bold rounded-full hover:bg-fuchsia-500 transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                Către Dashboard
              </Link>
              <div className="border border-white/10 rounded-full p-1 bg-white/5 flex items-center justify-center">
                {/* Înlocuitorul pentru UserButton-ul de la Clerk */}
                <UserProfile />
              </div>
            </>
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
          )}
        </div>

      </div>
    </nav>
  );
}