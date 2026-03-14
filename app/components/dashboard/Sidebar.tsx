"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Importul pentru logica de autentificare
import { 
  LayoutDashboard, 
  Utensils, 
  Dumbbell, 
  TrendingUp, 
  Settings, 
  LogOut,
  Zap
} from 'lucide-react';

// Elementele de meniu conform structurii tale
const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Nutriție', href: '/dashboard/nutritie', icon: Utensils },
  { name: 'Antrenamente', href: '/dashboard/antrenamente', icon: Dumbbell },
  { name: 'Progres', href: '/dashboard/progres', icon: TrendingUp },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Funcția pentru ieșirea din cont
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/'); // Redirecționare către Home după logout
      router.refresh();
    }
  };

  // Funcția pentru Setări (redirecționare către onboarding pentru editare date)
  const handleSettings = () => {
    router.push('/onboarding');
  };

  return (
    <aside className="w-64 h-screen bg-[#050505] border-r border-white/5 flex flex-col p-6 relative z-20">
      
      {/* Logo cu Link către Pagina Principală (Landing Page) */}
      <Link href="/" className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
        <div className="bg-fuchsia-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(217,70,239,0.3)]">
          <Zap className="text-white" size={20} fill="white" />
        </div>
        <span className="text-xl font-black tracking-tighter uppercase italic text-white group-hover:text-fuchsia-500 transition-colors">
          Q&K<span className="text-fuchsia-600 group-hover:text-white transition-colors">Cardio</span>
        </span>
      </Link>

      {/* Navigația Principală */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.2)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Butoanele de Control (Setări și Logout) */}
      <div className="pt-6 border-t border-white/5 space-y-2">
        <button 
          onClick={handleSettings}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all group"
        >
          <Settings size={20} className="group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-bold text-sm">Setări Cont</span>
        </button>

        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-bold text-sm">Deconectare</span>
        </button>
      </div>
    </aside>
  );
}