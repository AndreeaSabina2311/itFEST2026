"use client";

import React from 'react';
import Sidebar from '@/app/components/dashboard/Sidebar';
import StarsCanvas from '@/app/components/canvas/Stars';
import { DashboardProvider } from '@/lib/context/DashboardContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-[#030303] relative overflow-hidden">
        
        {/* Fundalul cu stele în spatele Dashboard-ului */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <StarsCanvas />
        </div>

        {/* Sidebar-ul peste fundal */}
        <div className="relative z-20">
          <Sidebar />
        </div>

        {/* Conținutul paginilor (Nutriție, Antrenamente etc.) */}
        <div className="flex-1 relative z-10 h-screen overflow-y-auto custom-scrollbar">
           {/* Glow-uri opționale pentru extra design */}
           <div className="absolute top-0 left-0 w-full h-full bg-fuchsia-500/5 pointer-events-none blur-[120px]" />
           {children}
        </div>
        
      </div>
    </DashboardProvider>
  );
}