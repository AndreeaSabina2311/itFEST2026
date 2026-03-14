"use client";

import React from 'react';
import UserProfile from '@/src/components/landing/UserProfile';
import { useAuth } from '@/src/hooks/useAuth';

export default function DashboardHeader() {
  const { userGender } = useAuth();
  
  // Analizăm sexul primit de la Supabase (îl facem cu litere mici ca să fim siguri că se potrivește)
  const normalizedGender = userGender?.toLowerCase() || '';
  
  // Setăm titlul implicit (în caz că utilizatorul a sărit peste pasul de selectare a sexului)
  let userTitle = 'Campion'; 
  
  // Verificăm dacă e bărbat sau femeie
  if (normalizedGender.includes('barbat') || normalizedGender.includes('bărbat') || normalizedGender === 'm' || normalizedGender === 'male') {
    userTitle = 'King';
  } else if (normalizedGender.includes('femeie') || normalizedGender === 'f' || normalizedGender === 'female') {
    userTitle = 'Queen';
  }

  return (
    <div className="flex justify-between items-end mb-10 relative z-10">
      <div>
        <p className="text-fuchsia-600 font-mono text-sm tracking-widest uppercase mb-1">
          {new Date().toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tight text-white">
          Salut, {userTitle}! ⚡
        </h1>
      </div>

      <UserProfile />
    </div>
  );
}