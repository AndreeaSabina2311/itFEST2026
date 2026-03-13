"use client";

import React from 'react';
import Link from 'next/link';
<<<<<<< HEAD
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
=======
import { usePathname } from 'next/navigation'; // <-- Noul nostru prieten pentru rute
import { LayoutDashboard, Dumbbell, Utensils, User, Settings, LogOut } from 'lucide-react';

function SidebarLink({ icon, text, href }: { icon: React.ReactNode, text: string, href: string }) {
  const pathname = usePathname();
  
  // Verificăm dacă URL-ul curent se potrivește cu link-ul butonului
  const active = pathname === href;

  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
      active ? 'bg-fuchsia-600/10 text-fuchsia-600' : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}>
      {icon}
      {text}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-white/[0.02] p-6 justify-between relative z-20">
      <div>
        <Link href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
          <div className="bg-fuchsia-600 p-1.5 rounded-lg">
            <LayoutDashboard className="text-black" size={20} />
          </div>
          <span className="text-xl font-black tracking-tight">Queen&King Cardio</span>
        </Link>

        {/* Nu mai avem nevoie să trimitem manual "active"! Se calculează singur în SidebarLink */}
        <nav className="space-y-4">
          <SidebarLink href="/dashboard" icon={<LayoutDashboard size={18} />} text="Overview" />
          <SidebarLink href="/dashboard/antrenamente" icon={<Dumbbell size={18} />} text="Antrenamente" />
          <SidebarLink href="/dashboard/nutritie" icon={<Utensils size={18} />} text="Plan Nutriție" />
          <SidebarLink href="/dashboard/progres" icon={<User size={18} />} text="Progresul Meu" />
        </nav>
      </div>

      <div className="space-y-4 pt-8 border-t border-white/5">
        <SidebarLink href="/setari" icon={<Settings size={18} />} text="Setări" />
        <SidebarLink href="/logout" icon={<LogOut size={18} />} text="Deconectare" />
>>>>>>> 8bebb57754bc1f54798aadde33c225e9d7aa5034
      </div>
    </aside>
  );
}