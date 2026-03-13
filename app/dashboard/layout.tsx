<<<<<<< HEAD
"use client";

import React from 'react';
import Sidebar from '@/app/components/dashboard/Sidebar';
import { DashboardProvider } from '@/lib/context/DashboardContext';
import StarsCanvas from '@/app/components/canvas/Stars';
=======
import React from 'react';
import Sidebar from '@/app/components/dashboard/Sidebar';
import { DashboardProvider } from '@/lib/context/DashboardContext';
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <DashboardProvider>
      <div className="flex min-h-screen bg-[#030303] text-white selection:bg-fuchsia-600 selection:text-white overflow-hidden relative">
        
        {/* FUNDALUL: Trebuie să aibă z-[-1] și pointer-events-none pentru a nu bloca click-urile */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <StarsCanvas />
        </div>

        {/* SIDEBAR: Îl lăsăm cu z-10 pentru a fi vizibil și accesibil */}
        <div className="relative z-10 flex flex-none">
          <Sidebar />
        </div>

        {/* CONȚINUTUL PAGINII: Îi punem z-10 și ne asigurăm că ocupă spațiul rămas */}
        <div className="flex-1 relative h-screen overflow-hidden z-10">
          {/* Glow-uri subtile de fundal */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Conținutul propriu-zis al paginii */}
          <div className="relative h-full w-full overflow-y-auto custom-scrollbar">
            {children}
          </div>
=======
    // Învelim totul în Provider-ul nostru care ține datele în memorie
    <DashboardProvider>
      <div className="flex min-h-screen bg-[#030303] text-white selection:bg-fuchsia-600 selection:text-white overflow-hidden">
        
        <Sidebar />

        <div className="flex-1 relative h-screen overflow-hidden">
          {children}
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
        </div>
        
      </div>
    </DashboardProvider>
  );
}